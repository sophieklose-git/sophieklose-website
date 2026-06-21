// /admin/users — table of all registered users. Click a row → detail page.
import * as React from 'react';
import Link from 'next/link';
import AdminLayout from '../../../components/admin/AdminLayout';

type Row = {
    id: string;
    email: string;
    created_at: string;
    last_sign_in_at: string | null;
    email_confirmed_at: string | null;
    first_name: string;
    last_name: string;
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

export default function UsersAdmin() {
    const [users, setUsers] = React.useState<Row[]>([]);
    const [loading, setLoading] = React.useState(true);
    const [error, setError] = React.useState<string | null>(null);

    React.useEffect(() => {
        fetch('/api/admin/users')
            .then(async (r) => {
                if (!r.ok) {
                    const j = await r.json().catch(() => ({}));
                    throw new Error(j.error ?? `HTTP ${r.status}`);
                }
                return r.json();
            })
            .then((j) => setUsers(j.users ?? []))
            .catch((e) => setError(e.message))
            .finally(() => setLoading(false));
    }, []);

    return (
        <AdminLayout title="Users">
            {error && (
                <div className="bg-red-50 border border-red-200 text-red-800 text-sm p-4 mb-6">{error}</div>
            )}
            {loading ? (
                <p className="text-sm text-midGrey">Loading…</p>
            ) : users.length === 0 ? (
                <p className="text-sm text-midGrey italic">No users yet.</p>
            ) : (
                <div className="bg-light overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead className="text-left text-xs uppercase tracking-widest text-clay border-b border-neutralAlt">
                            <tr>
                                <th className="px-4 py-3">First name</th>
                                <th className="px-4 py-3">Last name</th>
                                <th className="px-4 py-3">Email</th>
                                <th className="px-4 py-3">Registered</th>
                                <th className="px-4 py-3">Confirmed</th>
                                <th className="px-4 py-3" aria-label="Actions" />
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-neutralAlt">
                            {users.map((u) => (
                                <tr key={u.id} className="hover:bg-neutral transition">
                                    <td className="px-4 py-3">{u.first_name || '—'}</td>
                                    <td className="px-4 py-3">{u.last_name || '—'}</td>
                                    <td className="px-4 py-3">{u.email}</td>
                                    <td className="px-4 py-3 text-midGrey">{formatDate(u.created_at)}</td>
                                    <td className="px-4 py-3 text-midGrey">
                                        {u.email_confirmed_at ? 'Yes' : 'No'}
                                    </td>
                                    <td className="px-4 py-3 text-right">
                                        <Link
                                            href={`/admin/users/${u.id}`}
                                            className="text-deepSage border-b border-clayLight hover:border-clay"
                                        >
                                            View
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
            <p className="text-xs text-midGrey mt-4">{users.length} user{users.length === 1 ? '' : 's'}.</p>
        </AdminLayout>
    );
}
