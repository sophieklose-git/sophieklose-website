// Server-side Supabase client for Pages Router (API routes + getServerSideProps).
// Uses @supabase/ssr cookie adapter so the session is persisted across requests.
import { createServerClient, serializeCookieHeader } from '@supabase/ssr';
import type { GetServerSidePropsContext, NextApiRequest, NextApiResponse } from 'next';

type Req = NextApiRequest | GetServerSidePropsContext['req'];
type Res = NextApiResponse | GetServerSidePropsContext['res'];

export function createClient({ req, res }: { req: Req; res: Res }) {
    return createServerClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!, {
        cookies: {
            getAll() {
                return Object.entries(req.cookies ?? {}).map(([name, value]) => ({ name, value: value as string }));
            },
            setAll(cookiesToSet) {
                res.setHeader(
                    'Set-Cookie',
                    cookiesToSet.map(({ name, value, options }) => serializeCookieHeader(name, value, options))
                );
            }
        }
    });
}
