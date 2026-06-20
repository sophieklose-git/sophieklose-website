// /admin/resources — list, create, edit, delete. Calls /api/admin/resources*.
import * as React from 'react';
import AdminLayout from '../../components/admin/AdminLayout';

type Resource = {
    id: string;
    slug: string;
    title: string;
    tag: string;
    description: string | null;
    link_label: string | null;
    link_url: string | null;
    group_slug: string;
    sort_order: number;
};

const TAGS = [
    { value: 'book', label: 'Book' },
    { value: 'podcast', label: 'Podcast' },
    { value: 'research', label: 'Research' },
    { value: 'resource', label: 'Resource' },
    { value: 'digital-literacy', label: 'Digital Literacy' }
];

const GROUPS = [
    { value: 'caring-for-adolescents', label: 'Caring for Adolescents & Young Adults' },
    { value: 'parenting-digital-world', label: 'Parenting in a Digital World' },
    { value: 'neurodiversity-adhd', label: 'Neurodiversity & ADHD' },
    { value: 'insights-neuroscience', label: 'Insights from Neuroscience' },
    { value: 'other-helpful-resources', label: 'Other Helpful Resources' }
];

const EMPTY: Resource = {
    id: '',
    slug: '',
    title: '',
    tag: 'book',
    description: '',
    link_label: 'Visit website →',
    link_url: '',
    group_slug: 'other-helpful-resources',
    sort_order: 0
};

export default function ResourcesAdmin() {
    const [resources, setResources] = React.useState<Resource[]>([]);
    const [loading, setLoading] = React.useState(true);
    const [editing, setEditing] = React.useState<Resource | null>(null);
    const [creating, setCreating] = React.useState(false);
    const [error, setError] = React.useState<string | null>(null);

    async function load() {
        setLoading(true);
        const res = await fetch('/api/admin/resources');
        const json = await res.json();
        setResources(json.resources ?? []);
        setLoading(false);
    }
    React.useEffect(() => {
        load();
    }, []);

    async function save(payload: Resource, isNew: boolean) {
        setError(null);
        const url = isNew ? '/api/admin/resources' : `/api/admin/resources/${encodeURIComponent(payload.slug)}`;
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
        if (!confirm(`Delete resource "${slug}"?`)) return;
        const res = await fetch(`/api/admin/resources/${encodeURIComponent(slug)}`, { method: 'DELETE' });
        if (!res.ok) {
            const j = await res.json().catch(() => ({}));
            setError(j.error ?? `Delete failed (${res.status})`);
            return;
        }
        load();
    }

    const grouped = React.useMemo(() => {
        const m = new Map<string, Resource[]>();
        for (const r of resources) {
            const arr = m.get(r.group_slug) ?? [];
            arr.push(r);
            m.set(r.group_slug, arr);
        }
        return m;
    }, [resources]);

    return (
        <AdminLayout title="Resources">
            {error && (
                <div className="bg-red-50 border border-red-200 text-red-800 text-sm p-4 mb-6">{error}</div>
            )}
            <div className="mb-8">
                {creating ? (
                    <ResourceForm
                        initial={EMPTY}
                        isNew
                        onCancel={() => setCreating(false)}
                        onSave={(r) => save(r, true)}
                    />
                ) : (
                    <button
                        onClick={() => setCreating(true)}
                        className="bg-primary text-light px-5 py-2 text-sm hover:bg-deepSage transition"
                    >
                        + New resource
                    </button>
                )}
            </div>
            {loading ? (
                <p className="text-sm text-midGrey">Loading…</p>
            ) : (
                <div className="space-y-10">
                    {GROUPS.map((g) => {
                        const items = grouped.get(g.value) ?? [];
                        return (
                            <section key={g.value}>
                                <h2 className="font-serif text-xl mb-3">
                                    {g.label} <span className="text-midGrey text-sm">({items.length})</span>
                                </h2>
                                <ul className="divide-y divide-neutralAlt bg-light">
                                    {items.map((r) =>
                                        editing?.id === r.id ? (
                                            <li key={r.id} className="p-4">
                                                <ResourceForm
                                                    initial={r}
                                                    isNew={false}
                                                    onCancel={() => setEditing(null)}
                                                    onSave={(updated) => save(updated, false)}
                                                />
                                            </li>
                                        ) : (
                                            <li key={r.id} className="flex items-center justify-between p-4">
                                                <div className="min-w-0">
                                                    <p className="font-serif text-base truncate">{r.title}</p>
                                                    <p className="text-xs text-midGrey">
                                                        {r.tag} · /{r.slug}
                                                    </p>
                                                </div>
                                                <div className="flex gap-3 shrink-0 ml-4">
                                                    <button
                                                        onClick={() => setEditing(r)}
                                                        className="text-sm text-deepSage border-b border-clayLight hover:border-clay"
                                                    >
                                                        Edit
                                                    </button>
                                                    <button
                                                        onClick={() => remove(r.slug)}
                                                        className="text-sm text-red-700 border-b border-red-200 hover:border-red-400"
                                                    >
                                                        Delete
                                                    </button>
                                                </div>
                                            </li>
                                        )
                                    )}
                                    {items.length === 0 && (
                                        <li className="p-4 text-sm text-midGrey italic">No resources in this group.</li>
                                    )}
                                </ul>
                            </section>
                        );
                    })}
                </div>
            )}
        </AdminLayout>
    );
}

function ResourceForm({
    initial,
    isNew,
    onSave,
    onCancel
}: {
    initial: Resource;
    isNew: boolean;
    onSave: (r: Resource) => void;
    onCancel: () => void;
}) {
    const [r, setR] = React.useState<Resource>(initial);
    function field<K extends keyof Resource>(k: K, v: Resource[K]) {
        setR((prev) => ({ ...prev, [k]: v }));
    }
    return (
        <form
            onSubmit={(e) => {
                e.preventDefault();
                onSave(r);
            }}
            className="bg-light p-6 space-y-4"
        >
            <div className="grid sm:grid-cols-2 gap-4">
                <Label label="Slug (URL-safe, unique)">
                    <input
                        required
                        disabled={!isNew}
                        value={r.slug}
                        onChange={(e) => field('slug', e.target.value)}
                        className="w-full border border-neutralAlt p-2 text-sm disabled:bg-neutral"
                        placeholder="e.g. the-anxious-generation"
                    />
                </Label>
                <Label label="Group">
                    <select
                        value={r.group_slug}
                        onChange={(e) => field('group_slug', e.target.value)}
                        className="w-full border border-neutralAlt p-2 text-sm"
                    >
                        {GROUPS.map((g) => (
                            <option key={g.value} value={g.value}>
                                {g.label}
                            </option>
                        ))}
                    </select>
                </Label>
                <Label label="Title">
                    <input
                        required
                        value={r.title}
                        onChange={(e) => field('title', e.target.value)}
                        className="w-full border border-neutralAlt p-2 text-sm"
                    />
                </Label>
                <Label label="Tag">
                    <select
                        value={r.tag}
                        onChange={(e) => field('tag', e.target.value)}
                        className="w-full border border-neutralAlt p-2 text-sm"
                    >
                        {TAGS.map((t) => (
                            <option key={t.value} value={t.value}>
                                {t.label}
                            </option>
                        ))}
                    </select>
                </Label>
                <Label label="Link label">
                    <input
                        value={r.link_label ?? ''}
                        onChange={(e) => field('link_label', e.target.value)}
                        className="w-full border border-neutralAlt p-2 text-sm"
                    />
                </Label>
                <Label label="Link URL">
                    <input
                        type="url"
                        value={r.link_url ?? ''}
                        onChange={(e) => field('link_url', e.target.value)}
                        className="w-full border border-neutralAlt p-2 text-sm"
                    />
                </Label>
                <Label label="Sort order (within group)">
                    <input
                        type="number"
                        value={r.sort_order}
                        onChange={(e) => field('sort_order', Number(e.target.value))}
                        className="w-full border border-neutralAlt p-2 text-sm"
                    />
                </Label>
            </div>
            <Label label="Description (markdown)">
                <textarea
                    rows={3}
                    value={r.description ?? ''}
                    onChange={(e) => field('description', e.target.value)}
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
