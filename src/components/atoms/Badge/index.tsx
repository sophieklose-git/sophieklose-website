import * as React from 'react';
import classNames from 'classnames';

import { mapStylesToClassNames as mapStyles } from '../../../utils/map-styles-to-class-names';

export default function Badge(props) {
    // Per style guide: Badge renders as an eyebrow — small sans, uppercase,
    // wide tracking, clay color (overridable via `color` prop on the content).
    const { label, color = 'text-clay', styles, className } = props;
    const fieldPath = props['data-sb-field-path'];
    if (!label) {
        return null;
    }

    return (
        <div
            className={classNames(
                'sb-component',
                'sb-component-block',
                'sb-component-badge',
                color,
                className,
                styles?.self ? mapStyles(styles?.self) : undefined
            )}
            data-sb-field-path={fieldPath}
        >
            <span className="font-sans text-xs uppercase tracking-widest" {...(fieldPath && { 'data-sb-field-path': '.label' })}>
                {label}
            </span>
        </div>
    );
}
