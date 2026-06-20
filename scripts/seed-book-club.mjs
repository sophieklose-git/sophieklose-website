// Seed the existing "The Stoic Challenge" selection (formerly in
// content/pages/book-club.md). Idempotent: upserts on slug.
//
// Run: node scripts/seed-book-club.mjs

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createClient } from '@supabase/supabase-js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(__dirname, '..');

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

const stoicChallengeIntro = `To begin, I have selected a book rooted in Stoicism, a philosophy that has endured for thousands of years, and whose thinkers like Seneca and Marcus Aurelius continue to offer surprisingly practical guidance for modern life.

I came across this book through Jonathan Haidt, professor at NYU Stern and author of The Anxious Generation, as part of the reading list for his 2023 positive psychology course Work, Wisdom and Happiness. As one of the leading researchers documenting the decline in youth wellbeing in the age of technology, his reading choices felt important to explore.

In The Stoic Challenge, Irvine builds on his earlier work and focuses on how Stoic principles can help us navigate everyday setbacks. The book brings together ancient philosophy and modern psychology, offering practical strategies for becoming more resilient in the face of every day setbacks.

> *A philosopher's guide to becoming tougher, calmer, and more resilient.*`;

const rows = [
    {
        slug: 'the-stoic-challenge',
        selection_month: '2026-05-01',
        title: 'The Stoic Challenge',
        author: 'William B. Irvine',
        cover_url: '/images/the-stoic-challenge.png',
        purchase_url: 'https://www.amazon.de/-/en/Stoic-Challenge-Philosophers-Becoming-Resilient/dp/0393541495',
        purchase_label: 'amazon.de →',
        intro_md: stoicChallengeIntro,
        reflection_md: null,
        is_published: true
    }
];

console.log(`Upserting ${rows.length} book club selection(s)…`);
const { error, count } = await supabase
    .from('book_club_selections')
    .upsert(rows, { onConflict: 'slug', count: 'exact' });

if (error) {
    console.error('Upsert failed:', error);
    process.exit(1);
}
console.log(`OK — ${count ?? rows.length} rows upserted.`);
