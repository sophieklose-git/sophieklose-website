// GET  /api/admin/book-club  → list all selections
// POST /api/admin/book-club  → create new selection
import { withAdmin } from '../../../../lib/admin-api';

const FIELDS =
    'id, slug, selection_month, title, author, cover_url, purchase_url, purchase_label, intro_md, reflection_md, is_published, updated_at';

export default withAdmin(async (req, res, { db }) => {
    if (req.method === 'GET') {
        const { data, error } = await db
            .from('book_club_selections')
            .select(FIELDS)
            .order('selection_month', { ascending: false });
        if (error) return res.status(500).json({ error: error.message });
        return res.status(200).json({ selections: data ?? [] });
    }
    if (req.method === 'POST') {
        const payload = pick(req.body ?? {});
        if (!payload.slug || !payload.selection_month || !payload.title || !payload.author || !payload.intro_md) {
            return res.status(400).json({ error: 'slug, selection_month, title, author, intro_md are required' });
        }
        const { data, error } = await db.from('book_club_selections').insert(payload).select(FIELDS).single();
        if (error) return res.status(400).json({ error: error.message });
        return res.status(201).json({ selection: data });
    }
    res.setHeader('Allow', 'GET, POST');
    return res.status(405).end();
});

function pick(b: Record<string, any>) {
    return {
        slug: typeof b.slug === 'string' ? b.slug.trim() : '',
        selection_month: b.selection_month ?? null,
        title: typeof b.title === 'string' ? b.title.trim() : '',
        author: typeof b.author === 'string' ? b.author.trim() : '',
        cover_url: b.cover_url ?? null,
        purchase_url: b.purchase_url ?? null,
        purchase_label: b.purchase_label ?? null,
        intro_md: typeof b.intro_md === 'string' ? b.intro_md : '',
        reflection_md: b.reflection_md ?? null,
        is_published: b.is_published !== false
    };
}
