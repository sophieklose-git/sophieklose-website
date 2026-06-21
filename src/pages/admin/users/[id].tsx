// /admin/users/[id] — full detail view for a single user.
import * as React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import AdminLayout from '../../../components/admin/AdminLayout';

type UserDetail = {
    id: string;
    email: string;
    created_at: string;
    last_sign_in_at: string | null;
    email_confirmed_at: string | null;
    phone: string;
    provider: string;
    metadata: Record<string, any>;
};

function formatDate(iso: string | null) {
    if (!iso) return '—';
    return new Date(iso).toLocaleString('en-GB', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
}

export default function UserDetailPage() {
    const router = useRouter();
    const { id } = router.query;
    const [user, setUser] = React.useState<UserDetail | null>(null);
    const [loading, setLoading] = React.useState(true);
    const [error, setError] = React.useState<string | null>(null);

    React.useEffect(() => {
        if (typeof id !== 'string') return;
        fetch(`/api/admin/users/${encodeURIComponent(id)}`)
            .then(async (r) => {
                if (!r.ok) {
                    const j = await r.json().catch(() => ({}));
                    throw new Error(j.error ?? `HTTP ${r.status}`);
                }
                return r.json();
            })
            .then((j) => setUser(j.user))
            .catch((e) => setError(e.message))
            .finally(() => setLoading(false));
    }, [id]);

    return (
        <AdminLayout title="User detail">
            <Link href="/admin/users" className="text-xs text-deepSage hover:underline mb-6 inline-block">
                ← Back to users
            </Link>
            {error && (
                <div className="bg-red-50 border border-red-200 text-red-800 text-sm p-4 mb-6">{error}</div>
            )}
            {loading ? (
                <p className="text-sm text-midGrey">Loading…</p>
            ) : !user ? (
                <p className="text-sm text-midGrey italic">User not found.</p>
            ) : (
                <div className="bg-light p-8 space-y-8">
                    <Section title="Identity">
                        <Field label="First name" value={user.metadata.first_name} />
                        <Field label="Last name" value={user.metadata.last_name} />
                        <Field label="Email" value={user.email} />
                        <Field label="Phone" value={user.phone} />
                    </Section>

                    <Section title="Address">
                        <Field
                            label="Street"
                            value={[user.metadata.street, user.metadata.number].filter(Boolean).join(' ')}
                        />
                        <Field
                            label="City"
                            value={[user.metadata.postcode, user.metadata.city].filter(Boolean).join(' ')}
                        />
                        <Field label="Country" value={user.metadata.country} />
                    </Section>

                    <Section title="Account">
                        <Field label="Registered" value={formatDate(user.created_at)} />
                        <Field label="Email confirmed" value={formatDate(user.email_confirmed_at)} />
                        <Field label="Last sign in" value={formatDate(user.last_sign_in_at)} />
                        <Field label="Auth provider" value={user.provider} />
                        <Field
                            label="Marketing consent"
                            value={user.metadata.marketing_consent ? 'Yes' : 'No'}
                        />
                        <Field label="User ID" value={user.id} mono />
                    </Section>
                </div>
            )}
        </AdminLayout>
    );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
    return (
        <div>
            <h2 className="text-xs uppercase tracking-widest text-clay mb-4">{title}</h2>
            <dl className="grid sm:grid-cols-2 gap-x-8 gap-y-3">{children}</dl>
        </div>
    );
}

function Field({ label, value, mono = false }: { label: string; value: unknown; mono?: boolean }) {
    const display = value === null || value === undefined || value === '' ? '—' : String(value);
    return (
        <div>
            <dt className="text-xs text-midGrey mb-1">{label}</dt>
            <dd className={mono ? 'text-sm font-mono break-all' : 'text-sm'}>{display}</dd>
        </div>
    );
}
