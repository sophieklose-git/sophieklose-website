import { Model } from '@stackbit/types';

export const ResourceGroupSection: Model = {
    type: 'object',
    name: 'ResourceGroupSection',
    label: 'Resource group section',
    labelField: 'title',
    fields: [
        {
            type: 'string',
            name: 'eyebrow',
            label: 'Eyebrow',
            description: 'Small label above the title (e.g. "Neurodiversity & ADHD").',
            required: false,
            hidden: false,
            localized: false
        },
        {
            type: 'string',
            name: 'title',
            label: 'Title',
            description: 'Section heading (e.g. "Understanding Your Unique Brain").',
            required: false,
            hidden: false,
            localized: false
        },
        {
            type: 'enum',
            name: 'group',
            label: 'Group',
            description:
                'Which Resource group to render. Resources with a matching `group` field are listed in the order they appear in the content directory.',
            required: true,
            default: 'other-helpful-resources',
            hidden: false,
            localized: false,
            options: [
                { label: 'Caring for Adolescents & Young Adults', value: 'caring-for-adolescents' },
                { label: 'Parenting in a Digital World', value: 'parenting-digital-world' },
                { label: 'Neurodiversity & ADHD', value: 'neurodiversity-adhd' },
                { label: 'Insights from Neuroscience', value: 'insights-neuroscience' },
                { label: 'Other Helpful Resources', value: 'other-helpful-resources' }
            ]
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
                    justifyContent: ['flex-start', 'flex-end', 'center'],
                    textAlign: '*'
                }
            }
        }
    ]
};
