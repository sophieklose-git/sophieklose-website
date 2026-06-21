// GET /api/admin/users → list all signed-up users (up to 1000)
import { withAdmin } from '../../../../lib/admin-api';

export default withAdmin(async (req, res, { db }) => {
    if (req.method !== 'GET') {
        res.setHeader('Allow', 'GET');
        return res.status(405).end();
    }
    const { data, error } = await db.auth.admin.listUsers({ page: 1, perPage: 1000 });
    if (error) return res.status(500).json({ error: error.message });
    const users = data.users.map((u) => ({
        id: u.id,
        email: u.email ?? '',
        created_at: u.created_at,
        last_sign_in_at: u.last_sign_in_at ?? null,
        email_confirmed_at: u.email_confirmed_at ?? null,
        first_name: (u.user_metadata?.first_name as string) ?? '',
        last_name: (u.user_metadata?.last_name as string) ?? ''
    }));
    return res.status(200).json({ users });
});
