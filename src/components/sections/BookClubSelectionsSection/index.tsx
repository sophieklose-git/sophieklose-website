import * as React from 'react';
import classNames from 'classnames';
import Markdown from 'markdown-to-jsx';

import { mapStylesToClassNames as mapStyles } from '../../../utils/map-styles-to-class-names';

function renderInlineEmphasis(text: string) {
    const parts = text.split(/(\*[^*]+\*)/g);
    return parts.map((part, i) => {
        if (part.startsWith('*') && part.endsWith('*') && part.length > 2) {
            return <em key={i} className="text-primary">{part.slice(1, -1)}</em>;
        }
        return <React.Fragment key={i}>{part}</React.Fragment>;
    });
}

function formatMonth(iso: string) {
    // iso is YYYY-MM-DD (first of month). Render as "May 2026".
    const [y, m] = iso.split('-');
    const date = new Date(Number(y), Number(m) - 1, 1);
    return date.toLocaleString('en-GB', { month: 'long', year: 'numeric' });
}

type Selection = {
    slug: string;
    selection_month: string;
    title: string;
    author: string;
    cover_url?: string;
    purchase_url?: string;
    purchase_label?: string;
    intro_md: string;
    reflection_md?: string | null;
};

export default function BookClubSelectionsSection(props: any) {
    const {
        elementId,
        title,
        selections = [] as Selection[],
        colors = 'bg-light-fg-dark',
        styles = {},
        enableAnnotations
    } = props;
    const fieldPath = props['data-sb-field-path'];

    return (
        <section
            id={elementId}
            className={classNames(
                'sb-component',
                'sb-component-section',
                'sb-component-book-club-selections-section',
                colors,
                styles?.self?.margin ? mapStyles({ margin: styles?.self?.margin }) : undefined,
                styles?.self?.padding ? mapStyles({ padding: styles?.self?.padding }) : 'py-16 px-4 sm:py-20 sm:px-8'
            )}
            {...(enableAnnotations && fieldPath && { 'data-sb-field-path': fieldPath })}
        >
            <div className="mx-auto max-w-6xl">
                {title && (
                    <h2 className="font-serif text-3xl sm:text-4xl mb-12">
                        {renderInlineEmphasis(title)}
                    </h2>
                )}
                {selections.length === 0 ? (
                    <p className="text-sm text-midGrey italic">No selections yet.</p>
                ) : (
                    <ul className="flex flex-col gap-16 sm:gap-20">
                        {selections.map((sel, idx) => (
                            <SelectionBlock key={sel.slug} selection={sel} isCurrent={idx === 0} />
                        ))}
                    </ul>
                )}
            </div>
        </section>
    );
}

function SelectionBlock({ selection, isCurrent }: { selection: Selection; isCurrent: boolean }) {
    const monthLabel = formatMonth(selection.selection_month);
    const eyebrow = isCurrent ? `This Month's Selection · ${monthLabel}` : monthLabel;
    return (
        <li
            className={classNames(
                'flex flex-col lg:flex-row gap-10 lg:gap-16 items-start',
                !isCurrent && 'pt-12 border-t border-neutralAlt'
            )}
        >
            {selection.cover_url && (
                <div className="w-full lg:w-[17rem] lg:shrink-0 flex justify-center lg:justify-start">
                    <img
                        src={selection.cover_url}
                        alt={`${selection.title} by ${selection.author} — book cover`}
                        className="max-w-[14rem] h-auto"
                    />
                </div>
            )}
            <div className="w-full">
                <p className="text-xs uppercase tracking-widest text-clay mb-3">{eyebrow}</p>
                {selection.purchase_url ? (
                    <p className="text-lg sm:text-2xl mt-1">
                        <a
                            href={selection.purchase_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="no-underline hover:no-underline font-serif"
                        >
                            {selection.title}
                        </a>
                    </p>
                ) : (
                    <p className="text-lg sm:text-2xl font-serif">{selection.title}</p>
                )}
                <p className="italic text-midGrey mt-1">by {selection.author}</p>
                <Markdown
                    options={{ forceBlock: true, forceWrapper: true }}
                    className="sb-markdown sm:text-lg mt-6"
                >
                    {selection.intro_md}
                </Markdown>
                {selection.reflection_md && (
                    <div className="mt-8 pt-6 border-t border-neutralAlt">
                        <p className="text-xs uppercase tracking-widest text-sage mb-3">Reflection</p>
                        <Markdown
                            options={{ forceBlock: true, forceWrapper: true }}
                            className="sb-markdown sm:text-lg"
                        >
                            {selection.reflection_md}
                        </Markdown>
                    </div>
                )}
                {selection.purchase_url && selection.purchase_label && (
                    <p className="mt-6">
                        <a
                            href={selection.purchase_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm text-deepSage border-b border-clayLight pb-0.5 hover:border-clay"
                        >
                            {selection.purchase_label}
                        </a>
                    </p>
                )}
            </div>
        </li>
    );
}
