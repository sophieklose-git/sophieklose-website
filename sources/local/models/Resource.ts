import { Model } from '@stackbit/types';

export const Resource: Model = {
    type: 'data',
    name: 'Resource',
    label: 'Resource',
    labelField: 'title',
    filePath: 'content/resources/{slug}.json',
    fields: [
        {
            type: 'string',
            name: 'title',
            label: 'Title',
            description:
                'Resource title. May include attribution suffix (e.g. "The Anxious Generation — Jonathan Haidt").',
            required: true,
            hidden: false,
            localized: false
        },
        {
            type: 'enum',
            name: 'tag',
            label: 'Tag',
            description: 'Pill label shown above the title. One of Book, Podcast, Research, Resource, Digital Literacy.',
            required: true,
            default: 'book',
            hidden: false,
            localized: false,
            options: [
                { label: 'Book', value: 'book' },
                { label: 'Podcast', value: 'podcast' },
                { label: 'Research', value: 'research' },
                { label: 'Resource', value: 'resource' },
                { label: 'Digital Literacy', value: 'digital-literacy' }
            ]
        },
        {
            type: 'markdown',
            name: 'description',
            label: 'Description',
            required: false,
            hidden: false,
            localized: false
        },
        {
            type: 'string',
            name: 'linkLabel',
            label: 'Link label',
            description: 'Call-to-action text on the card link.',
            required: false,
            default: 'Learn more →',
            hidden: false,
            localized: false
        },
        {
            type: 'string',
            name: 'linkUrl',
            label: 'Link URL',
            description: 'External URL the card links to.',
            required: false,
            hidden: false,
            localized: false
        },
        {
            type: 'enum',
            name: 'group',
            label: 'Group',
            description:
                'Which themed group this resource belongs to. Determines which ResourceGroupSection it appears under.',
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
        }
    ]
};
