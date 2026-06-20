// Admin gating helper. The admin allowlist is the ADMIN_EMAILS env var
// (comma-separated). Read by middleware + API routes + admin pages.
import { createClient } from '@supabase/supabase-js';

export function getAdminEmails(): string[] {
    const raw = process.env.ADMIN_EMAILS ?? '';
    return raw
        .split(',')
        .map((e) => e.trim().toLowerCase())
        .filter(Boolean);
}

export function isAdminEmail(email: string | null | undefined): boolean {
    if (!email) return false;
    return getAdminEmails().includes(email.toLowerCase());
}

// Service-role Supabase client. NEVER expose to the browser. Use only inside
// API routes that have already verified the caller is an admin.
export function createServiceClient() {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
    if (!url || !key) throw new Error('Missing Supabase URL or service role key');
    return createClient(url, key, { auth: { persistSession: false } });
}
