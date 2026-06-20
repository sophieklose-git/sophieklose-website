// PUT    /api/admin/resources/[slug]  → update existing resource
// DELETE /api/admin/resources/[slug]  → delete resource
import { withAdmin } from '../../../../lib/admin-api';

export default withAdmin(async (req, res, { db }) => {
    const slug = String(req.query.slug ?? '');
    if (!slug) return res.status(400).json({ error: 'Missing slug' });

    if (req.method === 'PUT') {
        const b = req.body ?? {};
        const update: Record<string, any> = {
            title: b.title,
            tag: b.tag,
            description: b.description ?? null,
            link_label: b.link_label ?? null,
            link_url: b.link_url ?? null,
            group_slug: b.group_slug,
            sort_order: Number.isFinite(b.sort_order) ? b.sort_order : 0,
            updated_at: new Date().toISOString()
        };
        const { data, error } = await db
            .from('resources')
            .update(update)
            .eq('slug', slug)
            .select()
            .single();
        if (error) return res.status(400).json({ error: error.message });
        return res.status(200).json({ resource: data });
    }
    if (req.method === 'DELETE') {
        const { error } = await db.from('resources').delete().eq('slug', slug);
        if (error) return res.status(400).json({ error: error.message });
        return res.status(204).end();
    }
    res.setHeader('Allow', 'PUT, DELETE');
    return res.status(405).end();
});
