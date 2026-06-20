import { Model } from '@stackbit/types';

export const BookClubSelectionsSection: Model = {
    type: 'object',
    name: 'BookClubSelectionsSection',
    label: 'Book club selections section',
    labelField: 'title',
    fields: [
        {
            type: 'string',
            name: 'title',
            label: 'Section title (optional)',
            description: 'Heading shown above the current selection. Leave blank for none.',
            required: false,
            hidden: false,
            localized: false
        },
        {
            type: 'string',
            name: 'elementId',
            label: 'Element ID',
            required: false,
            hidden: false,
            localized: false
        },
        {
            type: 'enum',
            name: 'colors',
            label: 'Colors',
            required: false,
            default: 'bg-light-fg-dark',
            hidden: false,
            localized: false,
            controlType: 'palette',
            options: [
                {
                    label: 'Light background, dark foreground',
                    value: 'bg-light-fg-dark',
                    textColor: '$dark',
                    backgroundColor: '$light',
                    borderColor: '#ececec'
                },
                {
                    label: 'Neutral background, dark foreground',
                    value: 'bg-neutral-fg-dark',
                    textColor: '$dark',
                    backgroundColor: '$neutral',
                    borderColor: '#ececec'
                }
            ]
        },
        {
            type: 'style',
            name: 'styles',
            label: 'Styles',
            description: 'Controlled by Netlify Create editor',
            required: false,
            hidden: false,
            localized: false,
            styles: {
                self: {
                    margin: ['tw0:96'],
                    padding: ['tw0:96']
                }
            }
        }
    ]
};
