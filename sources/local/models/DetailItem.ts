import { Model } from '@stackbit/types';

export const DetailItem: Model = {
    type: 'object',
    name: 'DetailItem',
    label: 'Detail item',
    labelField: 'heading',
    fields: [
        {
            type: 'string',
            name: 'heading',
            label: 'Heading',
            description: 'Short heading for the detail (e.g. "Email", "Location").',
            required: true,
            hidden: false,
            localized: false
        },
        {
            type: 'markdown',
            name: 'body',
            label: 'Body',
            description: 'Markdown body — supports links (e.g. mailto:) and emphasis.',
            required: false,
            hidden: false,
            localized: false
        }
    ]
};
