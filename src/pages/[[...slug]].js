import React from 'react';
import Head from 'next/head';
import { createClient } from '@supabase/supabase-js';
import { allContent } from '../utils/local-content';
import { getComponent } from '../components/components-registry';
import { resolveStaticProps } from '../utils/static-props-resolvers';
import { resolveStaticPaths } from '../utils/static-paths-resolvers';
import { seoGenerateTitle, seoGenerateMetaTags, seoGenerateMetaDescription } from '../utils/seo-utils';

function getSupabaseBuildClient() {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    if (!url || !key) return null;
    return createClient(url, key, { auth: { persistSession: false } });
}

async function fetchResourceObjects() {
    const supabase = getSupabaseBuildClient();
    if (!supabase) return [];
    const { data, error } = await supabase
        .from('resources')
        .select('slug, title, tag, description, link_label, link_url, group_slug, sort_order')
        .order('group_slug')
        .order('sort_order');
    if (error) {
        console.error('Supabase resources fetch failed:', error.message);
        return [];
    }
    return (data ?? []).map((r) => ({
        type: 'Resource',
        title: r.title,
        tag: r.tag,
        description: r.description ?? '',
        linkLabel: r.link_label ?? '',
        linkUrl: r.link_url ?? '',
        group: r.group_slug,
        __metadata: { id: `supabase:resources/${r.slug}`, modelName: 'Resource' }
    }));
}

async function fetchBookClubSelections() {
    const supabase = getSupabaseBuildClient();
    if (!supabase) return [];
    const { data, error } = await supabase
        .from('book_club_selections')
        .select('slug, selection_month, title, author, cover_url, purchase_url, purchase_label, intro_md, reflection_md')
        .order('selection_month', { ascending: false });
    if (error) {
        console.error('Supabase book club fetch failed:', error.message);
        return [];
    }
    return data ?? [];
}

function Page(props) {
    const { page, site } = props;
    const { modelName } = page.__metadata;
    if (!modelName) {
        throw new Error(`page has no type, page '${props.path}'`);
    }
    const PageLayout = getComponent(modelName);
    if (!PageLayout) {
        throw new Error(`no page layout matching the page model: ${modelName}`);
    }
    const title = seoGenerateTitle(page, site);
    const metaTags = seoGenerateMetaTags(page, site);
    const metaDescription = seoGenerateMetaDescription(page, site);
    return (
        <>
            <Head>
                <title>{title}</title>
                {metaDescription && <meta name="description" content={metaDescription} />}
                {metaTags.map((metaTag) => {
                    if (metaTag.format === 'property') {
                        // OpenGraph meta tags (og:*) should be have the format <meta property="og:…" content="…">
                        return <meta key={metaTag.property} property={metaTag.property} content={metaTag.content} />;
                    }
                    return <meta key={metaTag.property} name={metaTag.property} content={metaTag.content} />;
                })}
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                {site.favicon && <link rel="icon" href={site.favicon} />}
            </Head>
            <PageLayout page={page} site={site} />
        </>
    );
}

export function getStaticPaths() {
    const data = allContent();
    const paths = resolveStaticPaths(data);
    return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
    const data = allContent();
    const [resourceObjects, bookClubSelections] = await Promise.all([
        fetchResourceObjects(),
        fetchBookClubSelections()
    ]);
    data.objects = [
        ...data.objects,
        ...resourceObjects,
        ...bookClubSelections.map((s) => ({
            ...s,
            type: 'BookClubSelectionRow',
            __metadata: { id: `supabase:book_club_selections/${s.slug}`, modelName: 'BookClubSelectionRow' }
        }))
    ];
    const urlPath = '/' + (params.slug || []).join('/');
    const props = await resolveStaticProps(urlPath, data);
    return { props, revalidate: 60 };
}

export default Page;
