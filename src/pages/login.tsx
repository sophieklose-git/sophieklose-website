// Email + password auth (sign in / sign up / forgot password).
// All three modes live on one page; a tab toggle switches between them.
// Google SSO is deferred to a later phase (skipped in 11a).
//
// Sign-up flow: collect first_name + last_name + email + password. Supabase sends
// a confirmation email; clicking the link hits /api/auth/callback which exchanges
// the code for a session and lands on /account.
//
// Forgot-password flow: enters email → Supabase sends a recovery email pointing
// at /reset-password, where the user picks a new password.
import { useState } from 'react';
import Head from 'next/head';
import { createClient } from '../lib/supabase/client';

type Mode = 'signin' | 'signup' | 'reset';

export default function LoginPage() {
    const [mode, setMode] = useState<Mode>('signin');

    return (
        <>
            <Head>
                <title>Sign in — Sophie Klose</title>
                <meta name="robots" content="noindex, nofollow" />
            </Head>
            <main className="min-h-screen bg-neutral flex items-center justify-center px-4 py-20">
                <div className="max-w-md w-full bg-light p-10">
                    <Tabs mode={mode} onChange={setMode} />

                    {mode === 'signin' && <SignInForm onForgot={() => setMode('reset')} />}
                    {mode === 'signup' && <SignUpForm />}
                    {mode === 'reset' && <ResetForm onBack={() => setMode('signin')} />}
                </div>
            </main>
        </>
    );
}

function Tabs({ mode, onChange }: { mode: Mode; onChange: (m: Mode) => void }) {
    if (mode === 'reset') {
        return <h1 className="font-serif text-3xl mb-6">Reset password</h1>;
    }
    return (
        <div className="flex border-b border-neutralAlt mb-8">
            {(['signin', 'signup'] as const).map((m) => (
                <button
                    key={m}
                    type="button"
                    onClick={() => onChange(m)}
                    className={`flex-1 py-3 text-sm font-medium transition ${
                        mode === m ? 'text-deepSage border-b-2 border-deepSage -mb-px' : 'text-midGrey hover:text-dark'
                    }`}
                >
                    {m === 'signin' ? 'Sign in' : 'Create account'}
                </button>
            ))}
        </div>
    );
}

function SignInForm({ onForgot }: { onForgot: () => void }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [busy, setBusy] = useState(false);
    const [error, setError] = useState('');

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setBusy(true);
        setError('');
        const supabase = createClient();
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) {
            setError(error.message);
            setBusy(false);
        } else {
            window.location.assign('/account');
        }
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <Field label="Email" type="email" value={email} onChange={setEmail} autoComplete="email" />
            <Field label="Password" type="password" value={password} onChange={setPassword} autoComplete="current-password" />
            <SubmitButton busy={busy} label="Sign in" />
            {error && <p className="text-sm text-red-700">{error}</p>}
            <button type="button" onClick={onForgot} className="text-xs text-deepSage hover:underline">
                Forgot password?
            </button>
        </form>
    );
}

function SignUpForm() {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [street, setStreet] = useState('');
    const [number, setNumber] = useState('');
    const [postcode, setPostcode] = useState('');
    const [city, setCity] = useState('');
    const [country, setCountry] = useState('');
    const [marketingConsent, setMarketingConsent] = useState(false);
    const [busy, setBusy] = useState(false);
    const [error, setError] = useState('');
    const [sent, setSent] = useState(false);

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        if (password.length < 8) {
            setError('Password must be at least 8 characters.');
            return;
        }
        setBusy(true);
        setError('');
        const supabase = createClient();
        const { error } = await supabase.auth.signUp({
            email,
            password,
            options: {
                emailRedirectTo: `${window.location.origin}/api/auth/callback`,
                data: {
                    first_name: firstName,
                    last_name: lastName,
                    street,
                    number,
                    postcode,
                    city,
                    country,
                    marketing_consent: marketingConsent
                }
            }
        });
        if (error) {
            setError(error.message);
            setBusy(false);
        } else {
            setSent(true);
        }
    }

    if (sent) {
        return (
            <div className="bg-neutral p-4 border-l-[3px] border-deepSage">
                <p className="text-deepSage font-medium mb-1">Check your inbox.</p>
                <p className="text-sm text-midGrey">
                    We sent a confirmation link to <strong>{email}</strong>. Click it to finish setting up your account.
                </p>
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
                <Field label="First name" type="text" value={firstName} onChange={setFirstName} autoComplete="given-name" />
                <Field label="Last name" type="text" value={lastName} onChange={setLastName} autoComplete="family-name" />
            </div>
            <Field label="Email" type="email" value={email} onChange={setEmail} autoComplete="email" />
            <Field label="Password" type="password" value={password} onChange={setPassword} autoComplete="new-password" hint="At least 8 characters" />

            <div className="pt-2 mt-2 border-t border-neutralAlt">
                <p className="text-xs uppercase tracking-widest text-midGrey mt-4 mb-3">Address</p>
                <div className="grid grid-cols-[1fr_5rem] gap-3">
                    <Field label="Street" type="text" value={street} onChange={setStreet} autoComplete="address-line1" />
                    <Field label="No." type="text" value={number} onChange={setNumber} autoComplete="address-line2" />
                </div>
                <div className="grid grid-cols-[6rem_1fr] gap-3 mt-4">
                    <Field label="Postcode" type="text" value={postcode} onChange={setPostcode} autoComplete="postal-code" />
                    <Field label="City" type="text" value={city} onChange={setCity} autoComplete="address-level2" />
                </div>
                <div className="mt-4">
                    <Field label="Country" type="text" value={country} onChange={setCountry} autoComplete="country-name" />
                </div>
            </div>

            <label className="flex items-start gap-3 pt-2 cursor-pointer">
                <input
                    type="checkbox"
                    checked={marketingConsent}
                    onChange={(e) => setMarketingConsent(e.target.checked)}
                    className="mt-1 accent-primary"
                />
                <span className="text-xs text-midGrey">
                    I&apos;d like to receive occasional updates about webinars, resources, and book club selections. You can unsubscribe at any time.
                </span>
            </label>

            <SubmitButton busy={busy} label="Create account" />
            {error && <p className="text-sm text-red-700">{error}</p>}
        </form>
    );
}

function ResetForm({ onBack }: { onBack: () => void }) {
    const [email, setEmail] = useState('');
    const [busy, setBusy] = useState(false);
    const [error, setError] = useState('');
    const [sent, setSent] = useState(false);

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setBusy(true);
        setError('');
        const supabase = createClient();
        const { error } = await supabase.auth.resetPasswordForEmail(email, {
            redirectTo: `${window.location.origin}/reset-password`
        });
        if (error) {
            setError(error.message);
            setBusy(false);
        } else {
            setSent(true);
        }
    }

    if (sent) {
        return (
            <div className="bg-neutral p-4 border-l-[3px] border-deepSage">
                <p className="text-deepSage font-medium mb-1">Check your inbox.</p>
                <p className="text-sm text-midGrey">If an account exists for <strong>{email}</strong>, a reset link is on its way.</p>
                <button type="button" onClick={onBack} className="text-xs text-deepSage hover:underline mt-4">
                    ← Back to sign in
                </button>
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <p className="text-sm text-midGrey">Enter your email and we&apos;ll send you a link to set a new password.</p>
            <Field label="Email" type="email" value={email} onChange={setEmail} autoComplete="email" />
            <SubmitButton busy={busy} label="Send reset link" />
            {error && <p className="text-sm text-red-700">{error}</p>}
            <button type="button" onClick={onBack} className="text-xs text-deepSage hover:underline">
                ← Back to sign in
            </button>
        </form>
    );
}

function Field({
    label,
    type,
    value,
    onChange,
    autoComplete,
    hint
}: {
    label: string;
    type: string;
    value: string;
    onChange: (v: string) => void;
    autoComplete?: string;
    hint?: string;
}) {
    return (
        <label className="block">
            <span className="text-sm text-dark mb-1 block">{label}</span>
            <input
                type={type}
                required
                autoComplete={autoComplete}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className="w-full border border-neutralAlt px-4 py-3 focus:outline-none focus:border-deepSage"
            />
            {hint && <span className="text-xs text-midGrey mt-1 block">{hint}</span>}
        </label>
    );
}

function SubmitButton({ busy, label }: { busy: boolean; label: string }) {
    return (
        <button
            type="submit"
            disabled={busy}
            className="w-full bg-primary text-light px-4 py-3 hover:bg-deepSage transition disabled:opacity-60"
        >
            {busy ? 'Working…' : label}
        </button>
    );
}
