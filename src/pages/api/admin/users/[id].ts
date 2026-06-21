// GET /api/admin/users/[id] → single user with all metadata
import { withAdmin } from '../../../../lib/admin-api';

export default withAdmin(async (req, res, { db }) => {
    if (req.method !== 'GET') {
        res.setHeader('Allow', 'GET');
        return res.status(405).end();
    }
    const id = String(req.query.id ?? '');
    if (!id) return res.status(400).json({ error: 'Missing id' });
    const { data, error } = await db.auth.admin.getUserById(id);
    if (error) return res.status(404).json({ error: error.message });
    const u = data.user;
    return res.status(200).json({
        user: {
            id: u.id,
            email: u.email ?? '',
            created_at: u.created_at,
            last_sign_in_at: u.last_sign_in_at ?? null,
            email_confirmed_at: u.email_confirmed_at ?? null,
            phone: u.phone ?? '',
            provider: u.app_metadata?.provider ?? '',
            metadata: u.user_metadata ?? {}
        }
    });
});
