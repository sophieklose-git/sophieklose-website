import * as React from 'react';
import classNames from 'classnames';
import Markdown from 'markdown-to-jsx';

import { mapStylesToClassNames as mapStyles } from '../../../utils/map-styles-to-class-names';

export default function ContactDetailsSection(props) {
    const {
        elementId,
        eyebrow,
        title,
        details = [],
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
                'sb-component-contact-details-section',
                colors,
                styles?.self?.margin ? mapStyles({ margin: styles?.self?.margin }) : undefined,
                styles?.self?.padding ? mapStyles({ padding: styles?.self?.padding }) : 'py-16 px-4 sm:py-20 sm:px-6'
            )}
            {...(enableAnnotations && fieldPath && { 'data-sb-field-path': fieldPath })}
        >
            <div className="mx-auto max-w-3xl">
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
                        {title}
                    </h2>
                )}
                {details.length > 0 && (
                    <ul {...(enableAnnotations && fieldPath && { 'data-sb-field-path': '.details' })}>
                        {details.map((detail, index) => (
                            <li
                                key={index}
                                className={classNames('py-6', 'border-t', 'border-neutralAlt', {
                                    'border-b': index === details.length - 1
                                })}
                                {...(enableAnnotations && { 'data-sb-field-path': `.${index}` })}
                            >
                                {detail.heading && (
                                    <h3
                                        className="font-serif text-lg mb-2"
                                        {...(enableAnnotations && { 'data-sb-field-path': '.heading' })}
                                    >
                                        {detail.heading}
                                    </h3>
                                )}
                                {detail.body && (
                                    <Markdown
                                        options={{ forceBlock: true, forceWrapper: true }}
                                        className="sb-markdown text-sm text-midGrey"
                                        {...(enableAnnotations && { 'data-sb-field-path': '.body' })}
                                    >
                                        {detail.body}
                                    </Markdown>
                                )}
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </section>
    );
}
