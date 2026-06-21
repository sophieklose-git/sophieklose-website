// Wraps an API handler so it only runs for admin users. The handler receives
// the authenticated user + a service-role Supabase client.
import type { NextApiHandler, NextApiRequest, NextApiResponse } from 'next';
import { createClient as createServerSupabase } from './supabase/server';
import { isAdminEmail, createServiceClient } from './admin';

// Trigger on-demand ISR revalidation. Swallow errors — a failed revalidate
// should not fail the admin save. The ISR background refresh will catch up
// within ~60s anyway.
export async function revalidate(res: NextApiResponse, paths: string[]) {
    for (const p of paths) {
        try {
            await res.revalidate(p);
        } catch (e) {
            console.error(`revalidate(${p}) failed`, e);
        }
    }
}

export type AdminHandler = (
    req: NextApiRequest,
    res: NextApiResponse,
    ctx: { user: { id: string; email: string }; db: ReturnType<typeof createServiceClient> }
) => Promise<unknown> | unknown;

export function withAdmin(handler: AdminHandler): NextApiHandler {
    return async (req, res) => {
        const supabase = createServerSupabase({ req, res });
        const {
            data: { user }
        } = await supabase.auth.getUser();
        if (!user) {
            res.status(401).json({ error: 'Unauthenticated' });
            return;
        }
        if (!isAdminEmail(user.email)) {
            res.status(403).json({ error: 'Forbidden' });
            return;
        }
        const db = createServiceClient();
        return handler(req, res, { user: { id: user.id, email: user.email! }, db });
    };
}
