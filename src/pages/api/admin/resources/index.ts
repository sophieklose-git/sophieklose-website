// GET  /api/admin/resources  → list all resources (admin sees order/sort fields too)
// POST /api/admin/resources  → create new resource
import { withAdmin } from '../../../../lib/admin-api';

const RESOURCE_FIELDS =
    'id, slug, title, tag, description, link_label, link_url, group_slug, sort_order, updated_at';

export default withAdmin(async (req, res, { db }) => {
    if (req.method === 'GET') {
        const { data, error } = await db
            .from('resources')
            .select(RESOURCE_FIELDS)
            .order('group_slug')
            .order('sort_order');
        if (error) return res.status(500).json({ error: error.message });
        return res.status(200).json({ resources: data ?? [] });
    }
    if (req.method === 'POST') {
        const body = req.body ?? {};
        const payload = pickResourceFields(body);
        if (!payload.slug || !payload.title || !payload.tag || !payload.group_slug) {
            return res.status(400).json({ error: 'slug, title, tag, group_slug are required' });
        }
        const { data, error } = await db.from('resources').insert(payload).select(RESOURCE_FIELDS).single();
        if (error) return res.status(400).json({ error: error.message });
        return res.status(201).json({ resource: data });
    }
    res.setHeader('Allow', 'GET, POST');
    return res.status(405).end();
});

function pickResourceFields(b: Record<string, any>) {
    return {
        slug: typeof b.slug === 'string' ? b.slug.trim() : '',
        title: typeof b.title === 'string' ? b.title.trim() : '',
        tag: typeof b.tag === 'string' ? b.tag : '',
        description: b.description ?? null,
        link_label: b.link_label ?? null,
        link_url: b.link_url ?? null,
        group_slug: typeof b.group_slug === 'string' ? b.group_slug : '',
        sort_order: Number.isFinite(b.sort_order) ? b.sort_order : 0
    };
}
