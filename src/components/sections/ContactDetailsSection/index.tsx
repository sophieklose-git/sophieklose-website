import * as React from 'react';
import classNames from 'classnames';
import Markdown from 'markdown-to-jsx';

import { mapStylesToClassNames as mapStyles } from '../../../utils/map-styles-to-class-names';
import { getComponent } from '../../components-registry';

function renderInlineEmphasis(text: string) {
    const parts = text.split(/(\*[^*]+\*)/g);
    return parts.map((part, i) => {
        if (part.startsWith('*') && part.endsWith('*') && part.length > 2) {
            return <em key={i} className="text-primary">{part.slice(1, -1)}</em>;
        }
        return <React.Fragment key={i}>{part}</React.Fragment>;
    });
}

export default function ContactDetailsSection(props) {
    const {
        elementId,
        eyebrow,
        title,
        details = [],
        formTitle,
        form,
        formFootnote,
        colors = 'bg-light-fg-dark',
        styles = {},
        enableAnnotations
    } = props;
    const fieldPath = props['data-sb-field-path'];
    const FormBlock = form ? getComponent('FormBlock') : null;
    const hasForm = !!(form && FormBlock);

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
            <div className={classNames('mx-auto', hasForm ? 'max-w-6xl' : 'max-w-3xl')}>
                <div className={classNames('grid', 'gap-12', { 'lg:grid-cols-2': hasForm })}>
                    <div>
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
                    {hasForm && (
                        <div>
                            {formTitle && (
                                <h3
                                    className="font-serif text-2xl sm:text-3xl mb-6"
                                    {...(enableAnnotations && fieldPath && { 'data-sb-field-path': '.formTitle' })}
                                >
                                    {renderInlineEmphasis(formTitle)}
                                </h3>
                            )}
                            <FormBlock
                                {...form}
                                {...(enableAnnotations && fieldPath && { 'data-sb-field-path': '.form' })}
                            />
                            {formFootnote && (
                                <Markdown
                                    options={{ forceBlock: true, forceWrapper: true }}
                                    className="sb-markdown text-xs text-midGrey mt-6"
                                    {...(enableAnnotations && fieldPath && { 'data-sb-field-path': '.formFootnote' })}
                                >
                                    {formFootnote}
                                </Markdown>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}
