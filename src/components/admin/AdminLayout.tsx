// Shared chrome for /admin/* pages. Minimal — sidebar nav + main area + logout.
import * as React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { createClient as createBrowserSupabase } from '../../lib/supabase/client';

const NAV = [
    { href: '/admin', label: 'Overview' },
    { href: '/admin/resources', label: 'Resources' },
    { href: '/admin/book-club', label: 'Book club' },
    { href: '/admin/users', label: 'Users' }
];

export default function AdminLayout({ title, children }: { title: string; children: React.ReactNode }) {
    const router = useRouter();
    async function logout() {
        const supabase = createBrowserSupabase();
        await supabase.auth.signOut();
        router.push('/login');
    }
    return (
        <>
            <Head>
                <title>{title} — Admin</title>
                <meta name="robots" content="noindex, nofollow" />
            </Head>
            <main className="min-h-screen bg-neutral">
                <div className="max-w-6xl mx-auto px-6 py-10">
                    <header className="flex items-center justify-between mb-10">
                        <div>
                            <p className="text-xs uppercase tracking-widest text-clay">Admin</p>
                            <h1 className="font-serif text-3xl mt-1">{title}</h1>
                        </div>
                        <div className="flex gap-6 items-center">
                            <Link href="/" className="text-sm text-deepSage border-b border-clayLight hover:border-clay">
                                Back to site
                            </Link>
                            <button onClick={logout} className="text-sm text-deepSage border-b border-clayLight hover:border-clay">
                                Log out
                            </button>
                        </div>
                    </header>
                    <nav className="flex gap-6 border-b border-neutralAlt mb-10">
                        {NAV.map((item) => {
                            const active =
                                item.href === '/admin'
                                    ? router.pathname === '/admin'
                                    : router.pathname.startsWith(item.href);
                            return (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    className={
                                        'pb-3 text-sm ' +
                                        (active
                                            ? 'border-b-2 border-deepSage text-dark'
                                            : 'text-midGrey hover:text-dark')
                                    }
                                >
                                    {item.label}
                                </Link>
                            );
                        })}
                    </nav>
                    {children}
                </div>
            </main>
        </>
    );
}
