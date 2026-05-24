// Landing page for password reset emails. Supabase emails a link of the form
//   /reset-password?code=<one-time-code>
// On mount we exchange the code for a (short-lived) session, which authorises
// updating the user's password via supabase.auth.updateUser({ password }).
import { useEffect, useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { createClient } from '../lib/supabase/client';

type Stage = 'verifying' | 'ready' | 'invalid' | 'done';

export default function ResetPasswordPage() {
    const router = useRouter();
    const [stage, setStage] = useState<Stage>('verifying');
    const [password, setPassword] = useState('');
    const [confirm, setConfirm] = useState('');
    const [busy, setBusy] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        if (!router.isReady) return;
        const code = typeof router.query.code === 'string' ? router.query.code : undefined;
        if (!code) {
            // Could also be a hash-based recovery link from older Supabase flows.
            if (typeof window !== 'undefined' && window.location.hash.includes('type=recovery')) {
                setStage('ready');
                return;
            }
            setStage('invalid');
            return;
        }
        (async () => {
            const supabase = createClient();
            const { error } = await supabase.auth.exchangeCodeForSession(code);
            setStage(error ? 'invalid' : 'ready');
        })();
    }, [router.isReady, router.query.code]);

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        if (password.length < 8) {
            setError('Password must be at least 8 characters.');
            return;
        }
        if (password !== confirm) {
            setError('Passwords do not match.');
            return;
        }
        setBusy(true);
        setError('');
        const supabase = createClient();
        const { error } = await supabase.auth.updateUser({ password });
        if (error) {
            setError(error.message);
            setBusy(false);
        } else {
            setStage('done');
        }
    }

    return (
        <>
            <Head>
                <title>Reset password — Sophie Klose</title>
                <meta name="robots" content="noindex, nofollow" />
            </Head>
            <main className="min-h-screen bg-neutral flex items-center justify-center px-4 py-20">
                <div className="max-w-md w-full bg-light p-10">
                    <h1 className="font-serif text-3xl mb-6">Reset password</h1>

                    {stage === 'verifying' && <p className="text-midGrey text-sm">Verifying your link…</p>}

                    {stage === 'invalid' && (
                        <div className="bg-neutral p-4 border-l-[3px] border-red-700">
                            <p className="text-red-700 font-medium mb-1">Link is invalid or expired.</p>
                            <p className="text-sm text-midGrey">
                                Request a new reset email from the{' '}
                                <a href="/login" className="text-deepSage hover:underline">
                                    sign-in page
                                </a>
                                .
                            </p>
                        </div>
                    )}

                    {stage === 'ready' && (
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <label className="block">
                                <span className="text-sm text-dark mb-1 block">New password</span>
                                <input
                                    type="password"
                                    required
                                    autoComplete="new-password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full border border-neutralAlt px-4 py-3 focus:outline-none focus:border-deepSage"
                                />
                                <span className="text-xs text-midGrey mt-1 block">At least 8 characters</span>
                            </label>
                            <label className="block">
                                <span className="text-sm text-dark mb-1 block">Confirm password</span>
                                <input
                                    type="password"
                                    required
                                    autoComplete="new-password"
                                    value={confirm}
                                    onChange={(e) => setConfirm(e.target.value)}
                                    className="w-full border border-neutralAlt px-4 py-3 focus:outline-none focus:border-deepSage"
                                />
                            </label>
                            <button
                                type="submit"
                                disabled={busy}
                                className="w-full bg-primary text-light px-4 py-3 hover:bg-deepSage transition disabled:opacity-60"
                            >
                                {busy ? 'Saving…' : 'Set new password'}
                            </button>
                            {error && <p className="text-sm text-red-700">{error}</p>}
                        </form>
                    )}

                    {stage === 'done' && (
                        <div className="bg-neutral p-4 border-l-[3px] border-deepSage">
                            <p className="text-deepSage font-medium mb-1">Password updated.</p>
                            <p className="text-sm text-midGrey mb-4">You&apos;re now signed in.</p>
                            <a href="/account" className="text-deepSage hover:underline text-sm">
                                Go to your account →
                            </a>
                        </div>
                    )}
                </div>
            </main>
        </>
    );
}
