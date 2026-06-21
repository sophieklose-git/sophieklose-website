// /admin/style-guide — live design-system reference. Pulls tokens from
// content/data/style.json so it stays accurate as the brand evolves.
// Gated by middleware (admin only). The brand-constant colors below
// (sage, deepSage, clay, ...) mirror what's hardcoded in tailwind.config.js.
import * as React from 'react';
import AdminLayout from '../../components/admin/AdminLayout';
import style from '../../../content/data/style.json';

type Swatch = { name: string; hex: string; usage: string; textOn?: 'light' | 'dark' };

const VISUAL_EDITOR_COLORS: Swatch[] = [
    { name: 'light', hex: style.light, usage: 'Page background on light sections; resource card bg on neutral sections.', textOn: 'dark' },
    { name: 'dark', hex: style.dark, usage: 'Body text; default heading colour on light backgrounds.', textOn: 'light' },
    { name: 'neutral', hex: style.neutral, usage: 'Alternating section background to break up scrolling.', textOn: 'dark' },
    { name: 'neutralAlt', hex: style.neutralAlt, usage: 'Card hover state, dividers, accent borders.', textOn: 'dark' },
    { name: 'primary', hex: style.primary, usage: 'Main CTA buttons; italic emphasis on light backgrounds; logo wordmark accent.', textOn: 'light' }
];

const BRAND_CONSTANT_COLORS: Swatch[] = [
    { name: 'sage', hex: '#8A9E8C', usage: 'Italic emphasis on DARK backgrounds (where primary would clash).', textOn: 'dark' },
    { name: 'deepSage', hex: '#4A6B4D', usage: 'Hover state for primary buttons; admin "Back to site" / "Log out" links. Same as primary by design — keep them in sync.', textOn: 'light' },
    { name: 'clay', hex: '#C4956A', usage: 'Eyebrow labels above headings; hover border on resource cards and featured items.', textOn: 'light' },
    { name: 'clayLight', hex: '#E8D5C0', usage: 'Resting border on subtle interactive elements (e.g. underline links).', textOn: 'dark' },
    { name: 'midGrey', hex: '#6B6B6B', usage: 'Secondary text (taglines, meta info, "Loading…", italic author bylines).', textOn: 'light' }
];

export default function StyleGuide() {
    return (
        <AdminLayout title="Style guide">
            <p className="text-sm text-midGrey mb-10 max-w-2xl">
                Living reference for the brand. Values come from <code className="text-xs bg-neutralAlt px-1.5 py-0.5">content/data/style.json</code> and{' '}
                <code className="text-xs bg-neutralAlt px-1.5 py-0.5">tailwind.config.js</code> — what you see here is what the site actually uses.
            </p>

            <Section id="colors" title="Colors">
                <Subsection title="Editable in Visual Editor (style.json)">
                    <ColorGrid swatches={VISUAL_EDITOR_COLORS} />
                </Subsection>
                <Subsection title="Brand constants (tailwind.config.js)">
                    <ColorGrid swatches={BRAND_CONSTANT_COLORS} />
                    <p className="text-xs text-midGrey mt-4">
                        These are NOT in the Visual Editor on purpose — they pin the brand feel. Changing one means editing <code className="text-xs bg-neutralAlt px-1.5 py-0.5">tailwind.config.js</code> and rebuilding.
                    </p>
                </Subsection>
            </Section>

            <Section id="typography" title="Typography">
                <Subsection title="Font families">
                    <div className="grid sm:grid-cols-2 gap-6">
                        <div className="bg-light p-6">
                            <p className="text-xs uppercase tracking-widest text-clay mb-2">Headlines</p>
                            <p className="font-serif text-3xl mb-2">Cormorant Garamond</p>
                            <p className="text-xs text-midGrey">Loaded via next/font/google as <code className="bg-neutralAlt px-1">--font-serif</code>. Used for all h1–h6 + blockquotes.</p>
                        </div>
                        <div className="bg-light p-6">
                            <p className="text-xs uppercase tracking-widest text-clay mb-2">Body</p>
                            <p className="font-sans text-2xl mb-2">Jost</p>
                            <p className="text-xs text-midGrey">Loaded as <code className="bg-neutralAlt px-1">--font-sans</code>. Used for body text, buttons, UI.</p>
                        </div>
                    </div>
                </Subsection>
                <Subsection title="Type scale (from style.json)">
                    <div className="bg-light p-6 space-y-4">
                        <Sample tag="h1" cls="text-6xl font-serif">The quick brown fox</Sample>
                        <Sample tag="h2" cls="text-5xl font-serif">The quick brown fox</Sample>
                        <Sample tag="h3" cls="text-3xl font-serif">The quick brown fox</Sample>
                        <Sample tag="h4" cls="text-2xl font-serif">The quick brown fox</Sample>
                        <Sample tag="h5" cls="text-xl font-serif">The quick brown fox</Sample>
                        <Sample tag="h6" cls="text-lg font-serif">The quick brown fox</Sample>
                        <hr className="border-neutralAlt" />
                        <Sample tag="body" cls="text-base font-sans">The quick brown fox jumps over the lazy dog.</Sample>
                        <Sample tag="small" cls="text-sm font-sans">The quick brown fox jumps over the lazy dog.</Sample>
                        <Sample tag="xs" cls="text-xs font-sans uppercase tracking-widest">Eyebrow / meta label</Sample>
                    </div>
                </Subsection>
            </Section>

            <Section id="emphasis" title="Italic emphasis pattern">
                <p className="text-sm text-midGrey mb-6 max-w-2xl">
                    Wrap a phrase in <code className="text-xs bg-neutralAlt px-1.5 py-0.5">*asterisks*</code> inside a TitleBlock's <code className="text-xs bg-neutralAlt px-1.5 py-0.5">text</code> field. The custom inline parser renders the wrapped portion as an italic
                    <code className="text-xs bg-neutralAlt px-1.5 py-0.5 mx-1">&lt;em&gt;</code>
                    in primary on light backgrounds and sage on dark backgrounds, so the accent reads naturally either way.
                </p>
                <div className="grid sm:grid-cols-2 gap-6">
                    <div className="bg-light p-8">
                        <p className="text-xs uppercase tracking-widest text-clay mb-2">On light bg</p>
                        <p className="font-serif text-3xl">
                            Curated for Your <em className="text-primary not-italic-fallback italic">Wellbeing Journey</em>
                        </p>
                    </div>
                    <div className="bg-dark p-8">
                        <p className="text-xs uppercase tracking-widest text-clay mb-2">On dark bg</p>
                        <p className="font-serif text-3xl text-light">
                            Curated for Your <em className="text-sage italic">Wellbeing Journey</em>
                        </p>
                    </div>
                </div>
            </Section>

            <Section id="buttons" title="Buttons">
                <Subsection title="Primary (CTA)">
                    <div className="bg-light p-8 flex gap-4 flex-wrap items-center">
                        <button className="bg-primary text-light px-8 py-3 font-sans uppercase tracking-widest text-sm hover:bg-deepSage transition">Resting state</button>
                        <button className="bg-deepSage text-light px-8 py-3 font-sans uppercase tracking-widest text-sm">Hover state (locked)</button>
                    </div>
                    <p className="text-xs text-midGrey mt-2">Resting: <code className="bg-neutralAlt px-1">bg-primary</code> → Hover: <code className="bg-neutralAlt px-1">bg-deepSage</code>. 30px horizontal / 12px vertical padding (from style.json). Type: <code className="bg-neutralAlt px-1">font-sans uppercase tracking-widest text-sm</code> — applied globally in <code className="bg-neutralAlt px-1">main.css :: .sb-component-button</code>.</p>
                </Subsection>
                <Subsection title="Underline link (secondary action)">
                    <div className="bg-light p-8 flex gap-4 flex-wrap">
                        <a className="text-sm text-deepSage border-b border-clayLight hover:border-clay">Resting</a>
                        <a className="text-sm text-deepSage border-b border-clay">Hovered (locked)</a>
                    </div>
                    <p className="text-xs text-midGrey mt-2">Used in admin nav, resource cards, "Back to site" link, footer credits.</p>
                </Subsection>
            </Section>

            <Section id="header-nav" title="Header navigation">
                <p className="text-sm text-midGrey mb-4 max-w-2xl">
                    All header nav links render in sans-serif, uppercase, with wide tracking. Pairs with the button treatment for a consistent "ui chrome" feel that contrasts the serif headlines.
                </p>
                <div className="bg-light p-6">
                    <nav className="flex gap-x-10 items-center">
                        <a className="font-sans uppercase tracking-widest text-xs">Home</a>
                        <a className="font-sans uppercase tracking-widest text-xs">About</a>
                        <a className="font-sans uppercase tracking-widest text-xs">Why Counselling</a>
                        <a className="font-sans uppercase tracking-widest text-xs">Resources</a>
                        <a className="font-sans uppercase tracking-widest text-xs">Book Club</a>
                        <a className="font-sans uppercase tracking-widest text-xs">Contact</a>
                        <button className="bg-primary text-light px-6 py-2 font-sans uppercase tracking-widest text-xs hover:bg-deepSage transition">Book Now</button>
                    </nav>
                </div>
                <p className="text-xs text-midGrey mt-2">Desktop: <code className="bg-neutralAlt px-1">text-xs</code>. Mobile menu: <code className="bg-neutralAlt px-1">text-base</code> for tap-target readability.</p>
            </Section>

            <Section id="patterns" title="Component patterns">
                <Subsection title="Eyebrow + heading (NOT subtitle below)">
                    <div className="grid sm:grid-cols-2 gap-6">
                        <div>
                            <p className="text-xs uppercase tracking-widest text-deepSage mb-2">✓ Do — eyebrow above</p>
                            <div className="bg-light p-8 border-l-[3px] border-deepSage">
                                <p className="text-xs uppercase tracking-widest text-clay mb-3">Resources</p>
                                <h2 className="font-serif text-3xl">Curated for Your <em className="text-primary italic">Wellbeing Journey</em></h2>
                            </div>
                        </div>
                        <div>
                            <p className="text-xs uppercase tracking-widest text-red-700 mb-2">✗ Don&apos;t — subtitle below</p>
                            <div className="bg-light p-8 border-l-[3px] border-red-300">
                                <h2 className="font-serif text-3xl">Curated for Your <em className="text-primary italic">Wellbeing Journey</em></h2>
                                <p className="text-lg sm:text-2xl mt-2">Resources</p>
                            </div>
                        </div>
                    </div>
                    <p className="text-xs text-midGrey mt-4 max-w-2xl">
                        Pages use the section model&apos;s <code className="bg-neutralAlt px-1">subtitle</code> field for the small contextual label, and the eye reads that label first. So it belongs <strong>above</strong> the headline as an eyebrow — not as a 2nd-line subtitle that competes with the heading for attention.
                    </p>
                    <p className="text-xs text-midGrey mt-2 max-w-2xl">
                        In <code className="bg-neutralAlt px-1">GenericSection</code> / <code className="bg-neutralAlt px-1">FeaturedItemsSection</code>, achieve the eyebrow look by setting the section&apos;s <code className="bg-neutralAlt px-1">subtitle</code> field to the eyebrow text and using the section&apos;s built-in eyebrow rendering (small, uppercase, clay). Don&apos;t put the eyebrow text into the <code className="bg-neutralAlt px-1">title</code> field; don&apos;t leave the subtitle to render below as a 2nd line.
                    </p>
                </Subsection>
                <Subsection title="Resource card">
                    <div className="bg-neutral p-8">
                        <div className="bg-light border-l-[3px] border-neutralAlt hover:border-clay transition-colors p-8 flex flex-col max-w-sm">
                            <p className="text-[0.65rem] uppercase tracking-widest text-sage mb-3">Book</p>
                            <h3 className="font-serif text-xl mb-2 leading-snug">Resource Title — Author Name</h3>
                            <p className="text-sm text-midGrey mb-4">Short description of the resource and what it offers.</p>
                            <a className="mt-auto self-start text-sm text-deepSage border-b border-clayLight hover:border-clay">Visit website →</a>
                        </div>
                    </div>
                    <p className="text-xs text-midGrey mt-2">3px left accent border in neutralAlt; hover-flips to clay. Card bg is light on neutral sections, neutral on light sections — always one notch off the surrounding bg for contrast.</p>
                </Subsection>
                <Subsection title="Page hero convention">
                    <div className="bg-neutral pt-20 pb-12 px-8">
                        <p className="text-base mb-2 text-left">Subtitle</p>
                        <h1 className="font-serif text-5xl text-left">Page Title with <em className="text-primary italic">Emphasis</em></h1>
                        <p className="text-base mt-4 max-w-2xl text-left">Lead paragraph for the page goes here. Left-aligned, soft cream background, generous top padding.</p>
                    </div>
                    <p className="text-xs text-midGrey mt-2">Pattern shared by all chunk-2 pages + why-counselling. Colors: <code className="bg-neutralAlt px-1">bg-neutral-fg-dark</code>. Padding: <code className="bg-neutralAlt px-1">pt-20 pb-12</code>. Alignment: <code className="bg-neutralAlt px-1">flex-start + textAlign: left</code>.</p>
                </Subsection>
            </Section>

            <Section id="spacing" title="Spacing & sizing">
                <ul className="bg-light p-6 text-sm space-y-2">
                    <li><code className="bg-neutralAlt px-1.5 py-0.5">max-w-sectionBody</code> = 846px — main content column width for prose sections.</li>
                    <li>Section vertical padding: typically <code className="bg-neutralAlt px-1.5 py-0.5">pt-16 pb-16</code> (mid) or <code className="bg-neutralAlt px-1.5 py-0.5">pt-20 pb-12</code> (hero).</li>
                    <li>Card grids: <code className="bg-neutralAlt px-1.5 py-0.5">gap-6</code> (1.5rem) at all breakpoints.</li>
                    <li>Breakpoints: <code className="bg-neutralAlt px-1.5 py-0.5">xs</code> 480 / <code className="bg-neutralAlt px-1.5 py-0.5">sm</code> 640 / <code className="bg-neutralAlt px-1.5 py-0.5">md</code> 768 / <code className="bg-neutralAlt px-1.5 py-0.5">lg</code> 1024.</li>
                </ul>
            </Section>

            <Section id="rules" title="Rules of thumb">
                <ul className="bg-light p-6 text-sm space-y-3 list-disc list-inside">
                    <li>Headlines always serif (Cormorant Garamond). Body always sans (Jost). Don't mix within a paragraph.</li>
                    <li><strong>UI chrome — buttons + header nav links — always sans-serif, uppercase, wide tracking</strong> (<code className="bg-neutralAlt px-1">font-sans uppercase tracking-widest</code>). This contrasts the serif headlines and signals "this is interactive". Body text stays normal-case sans.</li>
                    <li>Primary CTA = filled button in <code className="bg-neutralAlt px-1">bg-primary</code>. One per section, max.</li>
                    <li>Secondary actions = underline links in <code className="bg-neutralAlt px-1">text-deepSage</code> with <code className="bg-neutralAlt px-1">border-b border-clayLight</code>.</li>
                    <li>Eyebrows = <code className="bg-neutralAlt px-1">text-xs uppercase tracking-widest text-clay</code>. Used above section titles, above card tags, in admin nav labels.</li>
                    <li><strong>Subtitles render as eyebrows ABOVE the heading</strong>, not as a second line below it. Don&apos;t let a subtitle sit under the title competing with it; the small label is context-setting and should lead. See &quot;Eyebrow + heading&quot; pattern above.</li>
                    <li>Card hover = colour shift on the accent (border-neutralAlt → border-clay), never a shadow.</li>
                    <li>Italic emphasis in TitleBlock = <code className="bg-neutralAlt px-1">*wrapped phrase*</code>; renders primary on light, sage on dark. Do not put markdown emphasis elsewhere expecting the same treatment.</li>
                    <li>Section backgrounds alternate light / neutral to create rhythm. Two adjacent sections shouldn't share a background unless intentional.</li>
                </ul>
            </Section>
        </AdminLayout>
    );
}

function Section({ id, title, children }: { id: string; title: string; children: React.ReactNode }) {
    return (
        <section id={id} className="mb-16">
            <h2 className="font-serif text-2xl mb-6 border-b border-neutralAlt pb-2">{title}</h2>
            <div className="space-y-8">{children}</div>
        </section>
    );
}

function Subsection({ title, children }: { title: string; children: React.ReactNode }) {
    return (
        <div>
            <h3 className="text-xs uppercase tracking-widest text-clay mb-3">{title}</h3>
            {children}
        </div>
    );
}

function ColorGrid({ swatches }: { swatches: Swatch[] }) {
    return (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {swatches.map((s) => (
                <div key={s.name} className="bg-light overflow-hidden">
                    <div
                        className={'h-24 flex items-end p-3 ' + (s.textOn === 'light' ? 'text-light' : 'text-dark')}
                        style={{ backgroundColor: s.hex }}
                    >
                        <span className="font-mono text-xs">{s.hex.toUpperCase()}</span>
                    </div>
                    <div className="p-4">
                        <p className="font-mono text-sm font-medium">{s.name}</p>
                        <p className="text-xs text-midGrey mt-1">{s.usage}</p>
                    </div>
                </div>
            ))}
        </div>
    );
}

function Sample({ tag, cls, children }: { tag: string; cls: string; children: React.ReactNode }) {
    return (
        <div className="flex items-baseline gap-6">
            <code className="text-xs text-midGrey w-12 shrink-0">{tag}</code>
            <p className={cls}>{children}</p>
        </div>
    );
}
