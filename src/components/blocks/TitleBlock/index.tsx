import * as React from 'react';
import classNames from 'classnames';

import { mapStylesToClassNames as mapStyles } from '../../../utils/map-styles-to-class-names';

function renderInlineEmphasis(text: string, emClassName: string) {
    const parts = text.split(/(\*[^*]+\*)/g);
    return parts.map((part, i) => {
        if (part.startsWith('*') && part.endsWith('*') && part.length > 2) {
            return <em key={i} className={emClassName}>{part.slice(1, -1)}</em>;
        }
        return <React.Fragment key={i}>{part}</React.Fragment>;
    });
}

export default function TitleBlock(props) {
    const { className, text = '', color = 'text-dark', styles = {} } = props;
    const emClassName = color === 'text-light' ? 'text-sage' : 'text-primary';
    const fieldPath = props['data-sb-field-path'];
    if (!text) {
        return null;
    }

    return (
        <h2
            className={classNames(
                'sb-component',
                'sb-component-block',
                'sb-component-title',
                color,
                className,
                styles?.self ? mapStyles(styles?.self) : undefined
            )}
            data-sb-field-path={fieldPath}
        >
            <span {...(fieldPath && { 'data-sb-field-path': '.text' })}>{renderInlineEmphasis(text, emClassName)}</span>
        </h2>
    );
}
