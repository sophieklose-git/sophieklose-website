// One-shot import: content/resources/*.json -> Supabase `resources` table.
// Run: node scripts/import-resources.mjs
// Requires SUPABASE_SERVICE_ROLE_KEY + NEXT_PUBLIC_SUPABASE_URL in .env.local.
//
// Idempotent: upserts on `slug`. Rerun safely after edits.

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createClient } from '@supabase/supabase-js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(__dirname, '..');

// Minimal .env.local loader (avoid pulling dotenv as a dep).
const envPath = path.join(repoRoot, '.env.local');
if (fs.existsSync(envPath)) {
    for (const line of fs.readFileSync(envPath, 'utf8').split(/\r?\n/)) {
        const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/);
        if (m && !process.env[m[1]]) process.env[m[1]] = m[2].replace(/^['"]|['"]$/g, '');
    }
}

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!url || !key) {
    console.error('Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in .env.local');
    process.exit(1);
}

const supabase = createClient(url, key, { auth: { persistSession: false } });

const resourcesDir = path.join(repoRoot, 'content', 'resources');
const files = fs.readdirSync(resourcesDir).filter((f) => f.endsWith('.json'));

const rows = files.map((file, i) => {
    const slug = file.replace(/\.json$/, '');
    const json = JSON.parse(fs.readFileSync(path.join(resourcesDir, file), 'utf8'));
    return {
        slug,
        title: json.title,
        tag: json.tag,
        description: json.description ?? null,
        link_label: json.linkLabel ?? null,
        link_url: json.linkUrl ?? null,
        group_slug: json.group,
        sort_order: i
    };
});

console.log(`Upserting ${rows.length} resources…`);
const { error, count } = await supabase
    .from('resources')
    .upsert(rows, { onConflict: 'slug', count: 'exact' });

if (error) {
    console.error('Upsert failed:', error);
    process.exit(1);
}
console.log(`OK — ${count ?? rows.length} rows upserted.`);
