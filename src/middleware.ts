// Edge middleware: gates /account/* and /admin/* behind a Supabase session.
// /admin/* additionally requires the user's email to be in ADMIN_EMAILS.
import { type NextRequest, NextResponse } from 'next/server';
import { createServerClient } from '@supabase/ssr';

function isAdmin(email: string | null | undefined) {
    if (!email) return false;
    const allow = (process.env.ADMIN_EMAILS ?? '')
        .split(',')
        .map((e) => e.trim().toLowerCase())
        .filter(Boolean);
    return allow.includes(email.toLowerCase());
}

export async function middleware(request: NextRequest) {
    let response = NextResponse.next({ request });

    const supabase = createServerClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!, {
        cookies: {
            getAll() {
                return request.cookies.getAll();
            },
            setAll(cookiesToSet) {
                cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
                response = NextResponse.next({ request });
                cookiesToSet.forEach(({ name, value, options }) => response.cookies.set(name, value, options));
            }
        }
    });

    const {
        data: { user }
    } = await supabase.auth.getUser();

    const path = request.nextUrl.pathname;
    const needsAuth = path.startsWith('/account') || path.startsWith('/admin');
    if (needsAuth && !user) {
        const url = request.nextUrl.clone();
        url.pathname = '/login';
        return NextResponse.redirect(url);
    }
    if (path.startsWith('/admin') && !isAdmin(user?.email)) {
        const url = request.nextUrl.clone();
        url.pathname = '/account';
        return NextResponse.redirect(url);
    }

    return response;
}

export const config = {
    matcher: ['/account/:path*', '/admin/:path*']
};
