// OAuth / magic-link callback. Supabase emails a link of the form
//   /auth/callback?code=<one-time-code>[&next=/somewhere]
// We exchange the code for a session (sets the auth cookie) then redirect.
import type { NextApiRequest, NextApiResponse } from 'next';
import { createClient } from '../../../lib/supabase/server';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const code = typeof req.query.code === 'string' ? req.query.code : undefined;
    const next = typeof req.query.next === 'string' ? req.query.next : '/account';

    if (code) {
        const supabase = createClient({ req, res });
        const { error } = await supabase.auth.exchangeCodeForSession(code);
        if (!error) {
            res.redirect(302, next);
            return;
        }
    }
    res.redirect(302, '/login?error=auth');
}
