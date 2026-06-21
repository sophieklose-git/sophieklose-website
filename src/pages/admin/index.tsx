// Admin overview page. Gated by middleware.ts.
import Link from 'next/link';
import AdminLayout from '../../components/admin/AdminLayout';

export default function AdminHome() {
    return (
        <AdminLayout title="Overview">
            <div className="grid sm:grid-cols-2 gap-6">
                <Link href="/admin/resources" className="bg-light p-8 hover:bg-neutralAlt transition">
                    <h2 className="font-serif text-xl mb-2">Resources</h2>
                    <p className="text-sm text-midGrey">Curated articles, podcasts, books and tools shown on /resources.</p>
                </Link>
                <Link href="/admin/book-club" className="bg-light p-8 hover:bg-neutralAlt transition">
                    <h2 className="font-serif text-xl mb-2">Book club</h2>
                    <p className="text-sm text-midGrey">Monthly selections shown on /book-club. Add a new month or edit the reflection.</p>
                </Link>
                <Link href="/admin/users" className="bg-light p-8 hover:bg-neutralAlt transition">
                    <h2 className="font-serif text-xl mb-2">Users</h2>
                    <p className="text-sm text-midGrey">Registered accounts with profile details and address.</p>
                </Link>
                <Link href="/admin/style-guide" className="bg-light p-8 hover:bg-neutralAlt transition">
                    <h2 className="font-serif text-xl mb-2">Style guide</h2>
                    <p className="text-sm text-midGrey">Live design system: colors, type scale, button styles, component patterns.</p>
                </Link>
            </div>
            <p className="text-xs text-midGrey mt-10">
                Changes appear on the public site within ~60 seconds (ISR cache).
            </p>
        </AdminLayout>
    );
}
