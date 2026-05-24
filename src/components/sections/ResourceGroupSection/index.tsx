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

const TAG_LABELS: Record<string, string> = {
    book: 'Book',
    podcast: 'Podcast',
    research: 'Research',
    resource: 'Resource',
    'digital-literacy': 'Digital Literacy'
};

export default function ResourceGroupSection(props) {
    const {
        elementId,
        eyebrow,
        title,
        resources = [],
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
                'sb-component-resource-group-section',
                colors,
                styles?.self?.margin ? mapStyles({ margin: styles?.self?.margin }) : undefined,
                styles?.self?.padding ? mapStyles({ padding: styles?.self?.padding }) : 'py-16 px-4 sm:py-20 sm:px-6'
            )}
            {...(enableAnnotations && fieldPath && { 'data-sb-field-path': fieldPath })}
        >
            <div className="mx-auto max-w-7xl">
                {eyebrow && (
                    <p
                        className="text-xs uppercase tracking-widest text-clay mb-3"
                        {...(enableAnnotations && fieldPath && { 'data-sb-field-path': '.eyebrow' })}
                    >
                        {eyebrow}
                    </p>
                )}
                {title && (
                    <h2
                        className="font-serif text-3xl sm:text-4xl mb-12"
                        {...(enableAnnotations && fieldPath && { 'data-sb-field-path': '.title' })}
                    >
                        {renderInlineEmphasis(title)}
                    </h2>
                )}
                {resources.length > 0 ? (
                    <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {resources.map((resource, index) => (
                            <ResourceCard
                                key={resource.__metadata?.id ?? index}
                                resource={resource}
                                sectionColors={colors}
                                enableAnnotations={enableAnnotations}
                            />
                        ))}
                    </ul>
                ) : (
                    <p className="text-sm text-midGrey italic">No resources in this group yet.</p>
                )}
            </div>
        </section>
    );
}

function ResourceCard({ resource, sectionColors, enableAnnotations }) {
    const { title, description, tag, linkLabel, linkUrl } = resource;
    const tagLabel = TAG_LABELS[tag] ?? tag;
    const objectId = resource.__metadata?.id;
    const cardBg = sectionColors === 'bg-neutral-fg-dark' ? 'bg-light' : 'bg-neutral';
    return (
        <li
            className={classNames(cardBg, 'fade-in border-l-[3px] border-neutralAlt hover:border-clay transition-colors p-8 flex flex-col h-full')}
            {...(enableAnnotations && objectId && { 'data-sb-object-id': objectId })}
        >
            {tagLabel && (
                <p
                    className="text-[0.65rem] uppercase tracking-widest text-sage mb-3"
                    {...(enableAnnotations && { 'data-sb-field-path': 'tag' })}
                >
                    {tagLabel}
                </p>
            )}
            {title && (
                <h3
                    className="font-serif text-xl mb-2 leading-snug"
                    {...(enableAnnotations && { 'data-sb-field-path': 'title' })}
                >
                    {title}
                </h3>
            )}
            {description && (
                <Markdown
                    options={{ forceBlock: true, forceWrapper: true }}
                    className="sb-markdown text-sm text-midGrey mb-4"
                    {...(enableAnnotations && { 'data-sb-field-path': 'description' })}
                >
                    {description}
                </Markdown>
            )}
            {linkUrl && (
                <a
                    href={linkUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-auto self-start inline-block text-sm text-deepSage border-b border-clayLight pb-0.5 hover:border-clay"
                    {...(enableAnnotations && { 'data-sb-field-path': 'linkUrl' })}
                >
                    <span {...(enableAnnotations && { 'data-sb-field-path': 'linkLabel' })}>{linkLabel ?? 'Learn more →'}</span>
                </a>
            )}
        </li>
    );
}
