// /admin/book-club — list, create, edit, delete monthly selections.
import * as React from 'react';
import AdminLayout from '../../components/admin/AdminLayout';

type Selection = {
    id: string;
    slug: string;
    selection_month: string; // YYYY-MM-DD
    title: string;
    author: string;
    cover_url: string | null;
    purchase_url: string | null;
    purchase_label: string | null;
    intro_md: string;
    reflection_md: string | null;
    is_published: boolean;
};

const EMPTY: Selection = {
    id: '',
    slug: '',
    selection_month: '',
    title: '',
    author: '',
    cover_url: '/images/',
    purchase_url: '',
    purchase_label: '',
    intro_md: '',
    reflection_md: '',
    is_published: true
};

function monthLabel(iso: string) {
    if (!iso) return '';
    const [y, m] = iso.split('-');
    return new Date(Number(y), Number(m) - 1, 1).toLocaleString('en-GB', {
        month: 'long',
        year: 'numeric'
    });
}

export default function BookClubAdmin() {
    const [items, setItems] = React.useState<Selection[]>([]);
    const [loading, setLoading] = React.useState(true);
    const [editing, setEditing] = React.useState<Selection | null>(null);
    const [creating, setCreating] = React.useState(false);
    const [error, setError] = React.useState<string | null>(null);

    async function load() {
        setLoading(true);
        const res = await fetch('/api/admin/book-club');
        const json = await res.json();
        setItems(json.selections ?? []);
        setLoading(false);
    }
    React.useEffect(() => {
        load();
    }, []);

    async function save(payload: Selection, isNew: boolean) {
        setError(null);
        const url = isNew ? '/api/admin/book-club' : `/api/admin/book-club/${encodeURIComponent(payload.slug)}`;
        const method = isNew ? 'POST' : 'PUT';
        const res = await fetch(url, {
            method,
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify(payload)
        });
        if (!res.ok) {
            const j = await res.json().catch(() => ({}));
            setError(j.error ?? `${method} failed (${res.status})`);
            return;
        }
        setEditing(null);
        setCreating(false);
        load();
    }

    async function remove(slug: string) {
        if (!confirm(`Delete book club selection "${slug}"?`)) return;
        const res = await fetch(`/api/admin/book-club/${encodeURIComponent(slug)}`, { method: 'DELETE' });
        if (!res.ok) {
            const j = await res.json().catch(() => ({}));
            setError(j.error ?? `Delete failed (${res.status})`);
            return;
        }
        load();
    }

    return (
        <AdminLayout title="Book club">
            {error && (
                <div className="bg-red-50 border border-red-200 text-red-800 text-sm p-4 mb-6">{error}</div>
            )}
            <div className="mb-8">
                {creating ? (
                    <SelectionForm
                        initial={EMPTY}
                        isNew
                        onCancel={() => setCreating(false)}
                        onSave={(s) => save(s, true)}
                    />
                ) : (
                    <button
                        onClick={() => setCreating(true)}
                        className="bg-primary text-light px-5 py-2 text-sm hover:bg-deepSage transition"
                    >
                        + New monthly selection
                    </button>
                )}
            </div>
            {loading ? (
                <p className="text-sm text-midGrey">Loading…</p>
            ) : items.length === 0 ? (
                <p className="text-sm text-midGrey italic">No selections yet.</p>
            ) : (
                <ul className="divide-y divide-neutralAlt bg-light">
                    {items.map((s) =>
                        editing?.id === s.id ? (
                            <li key={s.id} className="p-4">
                                <SelectionForm
                                    initial={s}
                                    isNew={false}
                                    onCancel={() => setEditing(null)}
                                    onSave={(updated) => save(updated, false)}
                                />
                            </li>
                        ) : (
                            <li key={s.id} className="flex items-center justify-between p-4">
                                <div className="min-w-0">
                                    <p className="font-serif text-base truncate">
                                        {s.title} <span className="text-midGrey italic">— {s.author}</span>
                                    </p>
                                    <p className="text-xs text-midGrey">
                                        {monthLabel(s.selection_month)} · /{s.slug}
                                        {!s.is_published && ' · draft'}
                                        {s.reflection_md ? ' · reflection added' : ''}
                                    </p>
                                </div>
                                <div className="flex gap-3 shrink-0 ml-4">
                                    <button
                                        onClick={() => setEditing(s)}
                                        className="text-sm text-deepSage border-b border-clayLight hover:border-clay"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => remove(s.slug)}
                                        className="text-sm text-red-700 border-b border-red-200 hover:border-red-400"
                                    >
                                        Delete
                                    </button>
                                </div>
                            </li>
                        )
                    )}
                </ul>
            )}
        </AdminLayout>
    );
}

function SelectionForm({
    initial,
    isNew,
    onSave,
    onCancel
}: {
    initial: Selection;
    isNew: boolean;
    onSave: (s: Selection) => void;
    onCancel: () => void;
}) {
    const [s, setS] = React.useState<Selection>(initial);
    function field<K extends keyof Selection>(k: K, v: Selection[K]) {
        setS((prev) => ({ ...prev, [k]: v }));
    }
    return (
        <form
            onSubmit={(e) => {
                e.preventDefault();
                onSave(s);
            }}
            className="bg-light p-6 space-y-4"
        >
            <div className="grid sm:grid-cols-2 gap-4">
                <Label label="Slug (URL-safe, unique)">
                    <input
                        required
                        disabled={!isNew}
                        value={s.slug}
                        onChange={(e) => field('slug', e.target.value)}
                        className="w-full border border-neutralAlt p-2 text-sm disabled:bg-neutral"
                        placeholder="e.g. the-stoic-challenge"
                    />
                </Label>
                <Label label="Selection month (first of month)">
                    <input
                        required
                        type="date"
                        value={s.selection_month?.slice(0, 10) ?? ''}
                        onChange={(e) => field('selection_month', e.target.value)}
                        className="w-full border border-neutralAlt p-2 text-sm"
                    />
                </Label>
                <Label label="Title">
                    <input
                        required
                        value={s.title}
                        onChange={(e) => field('title', e.target.value)}
                        className="w-full border border-neutralAlt p-2 text-sm"
                    />
                </Label>
                <Label label="Author">
                    <input
                        required
                        value={s.author}
                        onChange={(e) => field('author', e.target.value)}
                        className="w-full border border-neutralAlt p-2 text-sm"
                    />
                </Label>
                <Label label="Cover image (path under /public, e.g. /images/foo.png)">
                    <input
                        value={s.cover_url ?? ''}
                        onChange={(e) => field('cover_url', e.target.value)}
                        className="w-full border border-neutralAlt p-2 text-sm"
                    />
                </Label>
                <Label label="Purchase URL">
                    <input
                        type="url"
                        value={s.purchase_url ?? ''}
                        onChange={(e) => field('purchase_url', e.target.value)}
                        className="w-full border border-neutralAlt p-2 text-sm"
                    />
                </Label>
                <Label label="Purchase link label">
                    <input
                        value={s.purchase_label ?? ''}
                        onChange={(e) => field('purchase_label', e.target.value)}
                        className="w-full border border-neutralAlt p-2 text-sm"
                        placeholder="e.g. amazon.de →"
                    />
                </Label>
                <Label label="Published">
                    <select
                        value={s.is_published ? 'yes' : 'no'}
                        onChange={(e) => field('is_published', e.target.value === 'yes')}
                        className="w-full border border-neutralAlt p-2 text-sm"
                    >
                        <option value="yes">Published</option>
                        <option value="no">Draft (hidden)</option>
                    </select>
                </Label>
            </div>
            <Label label="Introduction (markdown)">
                <textarea
                    required
                    rows={8}
                    value={s.intro_md}
                    onChange={(e) => field('intro_md', e.target.value)}
                    className="w-full border border-neutralAlt p-2 text-sm font-mono"
                />
            </Label>
            <Label label="Reflection (markdown — add at end of month)">
                <textarea
                    rows={6}
                    value={s.reflection_md ?? ''}
                    onChange={(e) => field('reflection_md', e.target.value)}
                    className="w-full border border-neutralAlt p-2 text-sm font-mono"
                />
            </Label>
            <div className="flex gap-3">
                <button type="submit" className="bg-primary text-light px-5 py-2 text-sm hover:bg-deepSage transition">
                    {isNew ? 'Create' : 'Save'}
                </button>
                <button
                    type="button"
                    onClick={onCancel}
                    className="text-sm text-midGrey border-b border-neutralAlt hover:border-midGrey"
                >
                    Cancel
                </button>
            </div>
        </form>
    );
}

function Label({ label, children }: { label: string; children: React.ReactNode }) {
    return (
        <label className="block">
            <span className="block text-xs uppercase tracking-widest text-clay mb-1">{label}</span>
            {children}
        </label>
    );
}
