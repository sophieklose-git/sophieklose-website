import { Model } from '@stackbit/types';

export const ContactDetailsSection: Model = {
    type: 'object',
    name: 'ContactDetailsSection',
    label: 'Contact details section',
    labelField: 'title',
    fields: [
        {
            type: 'string',
            name: 'eyebrow',
            label: 'Eyebrow',
            description: 'Small label above the heading (e.g. "Contact Details").',
            required: false,
            hidden: false,
            localized: false
        },
        {
            type: 'string',
            name: 'title',
            label: 'Title',
            description: 'Section heading (e.g. "I\'d Love to Hear from You").',
            required: false,
            hidden: false,
            localized: false
        },
        {
            type: 'list',
            name: 'details',
            label: 'Details',
            description:
                'Stacked detail rows separated by hairlines (e.g. Email / Location / Online / Fees / Languages).',
            required: false,
            hidden: false,
            localized: false,
            items: {
                type: 'model',
                models: ['DetailItem']
            }
        },
        {
            type: 'string',
            name: 'formTitle',
            label: 'Form heading',
            description: 'Optional heading shown above the form (e.g. "Send a Message").',
            required: false,
            hidden: false,
            localized: false
        },
        {
            type: 'model',
            name: 'form',
            label: 'Form',
            description: 'Optional contact form rendered to the right of the details.',
            required: false,
            hidden: false,
            localized: false,
            models: ['FormBlock']
        },
        {
            type: 'markdown',
            name: 'formFootnote',
            label: 'Form footnote',
            description: 'Optional small text displayed below the form (e.g. confidentiality note).',
            required: false,
            hidden: false,
            localized: false
        },
        {
            type: 'string',
            name: 'elementId',
            label: 'Element ID',
            description: 'The unique ID for an HTML element, must not contain whitespace.',
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
            description: 'The styles field is controlled by Netlify Create editor',
            required: false,
            hidden: false,
            localized: false,
            styles: {
                self: {
                    margin: ['tw0:96'],
                    padding: ['tw0:96'],
                    textAlign: '*'
                }
            }
        }
    ]
};
