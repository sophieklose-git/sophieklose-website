// PUT    /api/admin/book-club/[slug]  → update
// DELETE /api/admin/book-club/[slug]  → delete
import { withAdmin } from '../../../../lib/admin-api';

export default withAdmin(async (req, res, { db }) => {
    const slug = String(req.query.slug ?? '');
    if (!slug) return res.status(400).json({ error: 'Missing slug' });

    if (req.method === 'PUT') {
        const b = req.body ?? {};
        const update: Record<string, any> = {
            selection_month: b.selection_month,
            title: b.title,
            author: b.author,
            cover_url: b.cover_url ?? null,
            purchase_url: b.purchase_url ?? null,
            purchase_label: b.purchase_label ?? null,
            intro_md: b.intro_md,
            reflection_md: b.reflection_md ?? null,
            is_published: b.is_published !== false,
            updated_at: new Date().toISOString()
        };
        const { data, error } = await db
            .from('book_club_selections')
            .update(update)
            .eq('slug', slug)
            .select()
            .single();
        if (error) return res.status(400).json({ error: error.message });
        return res.status(200).json({ selection: data });
    }
    if (req.method === 'DELETE') {
        const { error } = await db.from('book_club_selections').delete().eq('slug', slug);
        if (error) return res.status(400).json({ error: error.message });
        return res.status(204).end();
    }
    res.setHeader('Allow', 'PUT, DELETE');
    return res.status(405).end();
});
