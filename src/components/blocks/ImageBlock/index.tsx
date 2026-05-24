import * as React from 'react';
import classNames from 'classnames';

import { mapStylesToClassNames as mapStyles } from '../../../utils/map-styles-to-class-names';

export default function ImageBlock(props) {
    const { elementId, className, imageClassName, url, altText = '', styles = {} } = props;
    if (!url) {
        return null;
    }
    const fieldPath = props['data-sb-field-path'];
    const annotations = fieldPath
        ? { 'data-sb-field-path': [fieldPath, `${fieldPath}.url#@src`, `${fieldPath}.altText#@alt`, `${fieldPath}.elementId#@id`].join(' ').trim() }
        : {};

    // If a sibling WebP exists alongside the .jpg/.jpeg/.png in /public/images/,
    // serve it via <picture> for browsers that support it. Falls back to the original.
    // Sibling WebPs are produced by scripts/compress-hero-images.mjs.
    const webpUrl = /\.(jpe?g|png)$/i.test(url) ? url.replace(/\.(jpe?g|png)$/i, '.webp') : null;

    const imgClasses = classNames(
        imageClassName,
        styles?.self?.padding ? mapStyles({ padding: styles?.self?.padding }) : undefined,
        styles?.self?.borderWidth && styles?.self?.borderWidth !== 0 && styles?.self?.borderStyle !== 'none'
            ? mapStyles({
                  borderWidth: styles?.self?.borderWidth,
                  borderStyle: styles?.self?.borderStyle,
                  borderColor: styles?.self?.borderColor ?? 'border-primary'
              })
            : undefined,
        styles?.self?.borderRadius ? mapStyles({ borderRadius: styles?.self?.borderRadius }) : undefined
    );

    return (
        <div
            className={classNames(
                'sb-component',
                'sb-component-block',
                'sb-component-image-block',
                className,
                styles?.self?.margin ? mapStyles({ margin: styles?.self?.margin }) : undefined
            )}
            {...annotations}
        >
            <picture>
                {webpUrl && <source srcSet={webpUrl} type="image/webp" />}
                <img id={elementId} className={imgClasses} src={url} alt={altText} loading="lazy" decoding="async" />
            </picture>
        </div>
    );
}
