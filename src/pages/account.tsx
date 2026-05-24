// Gated account page. SSR-protected by middleware.ts and a getServerSideProps
// session check (defence in depth). Currently shows email + logout — will grow
// with profile fields, purchase history, etc. in later 11.x phases.
import type { GetServerSideProps } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { createClient as createServerSupabase } from '../lib/supabase/server';
import { createClient as createBrowserSupabase } from '../lib/supabase/client';

type Props = { email: string };

export default function AccountPage({ email }: Props) {
    const router = useRouter();

    async function handleLogout() {
        const supabase = createBrowserSupabase();
        await supabase.auth.signOut();
        router.push('/login');
    }

    return (
        <>
            <Head>
                <title>Your account — Sophie Klose</title>
                <meta name="robots" content="noindex, nofollow" />
            </Head>
            <main className="min-h-screen bg-neutral flex items-center justify-center px-4 py-20">
                <div className="max-w-md w-full bg-light p-10">
                    <h1 className="font-serif text-3xl mb-2">Your account</h1>
                    <p className="text-midGrey mb-8 text-sm">
                        Signed in as <strong className="text-dark">{email}</strong>.
                    </p>
                    <button onClick={handleLogout} className="bg-primary text-light px-6 py-3 hover:bg-deepSage transition">
                        Log out
                    </button>
                </div>
            </main>
        </>
    );
}

export const getServerSideProps: GetServerSideProps<Props> = async ({ req, res }) => {
    const supabase = createServerSupabase({ req, res });
    const {
        data: { user }
    } = await supabase.auth.getUser();
    if (!user) {
        return { redirect: { destination: '/login', permanent: false } };
    }
    return { props: { email: user.email ?? '' } };
};
