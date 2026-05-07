---
title: Contact & Book
slug: /contact
sections:
  - type: GenericSection
    title:
      text: Let's Start the *Conversation*
      color: text-dark
      styles:
        self:
          textAlign: left
      type: TitleBlock
    subtitle: Get in Touch
    text: Reaching out is often the hardest part. I offer a free 15-minute introductory call so we can explore whether we're a good fit — with no obligation to continue.
    colors: bg-neutral-fg-dark
    styles:
      self:
        flexDirection: col
        justifyContent: flex-start
        alignItems: flex-start
        padding:
          - pt-20
          - pb-12
          - pl-8
          - pr-8
        textAlign: left
      subtitle:
        textAlign: left
  - type: ContactDetailsSection
    eyebrow: Contact Details
    title: I'd Love to *Hear from You*
    details:
      - type: DetailItem
        heading: Email
        body: |-
          The best way to reach me. I aim to respond within 24 hours on working days.

          [contact@sophieklose.com](mailto:contact@sophieklose.com)
      - type: DetailItem
        heading: Location
        body: |-
          In-person sessions are available in

          Lavaterstrasse 75, 8002 Zurich, Switzerland
      - type: DetailItem
        heading: Online Sessions
        body: Online counselling is available worldwide via secure video call, in English or French.
      - type: DetailItem
        heading: Session Fees
        body: Please get in touch to enquire about current fees and session availability. I aim to make counselling as accessible as possible and am happy to discuss your circumstances.
      - type: DetailItem
        heading: Languages
        body: |-
          Sessions available in **English** and **French**.

          Séances disponibles en anglais et en français.
    formTitle: Send a Message
    form:
      type: FormBlock
      elementId: contact-form
      fields:
        - type: TextFormControl
          name: name
          label: Your Name
          placeholder: First and Lastname
          isRequired: true
          width: full
        - type: EmailFormControl
          name: email
          label: Email Address
          placeholder: your@email.com
          isRequired: true
          width: full
        - type: SelectFormControl
          name: language
          label: Preferred Language
          defaultValue: Select a language
          options:
            - English
            - French / Français
          width: full
        - type: SelectFormControl
          name: format
          label: Session Format
          defaultValue: Select a format
          options:
            - In-person (Zurich)
            - Online (video call)
            - I'm not sure yet
          width: full
        - type: TextareaFormControl
          name: message
          label: What brings you here?
          placeholder: A brief description of what you're hoping to explore in counselling — or simply let me know you'd like to chat.
          width: full
      submitButton:
        type: SubmitButtonFormControl
        label: Send Message
        style: primary
    formFootnote: All enquiries are treated with complete confidentiality. By sending this message, you consent to your details being used to respond to your enquiry.
    colors: bg-light-fg-dark
    styles:
      self:
        padding:
          - pt-12
          - pb-16
          - pl-16
          - pr-16
  - type: FeaturedItemsSection
    title:
      text: Questions You *Might Have*
      color: text-dark
      type: TitleBlock
    subtitle: Frequently Asked
    variant: two-col-grid
    items:
      - type: FeaturedItem
        title: How long are sessions?
        text: Standard sessions are 50 minutes. Longer sessions can sometimes be arranged — please get in touch to discuss.
        colors: bg-light-fg-dark
        styles:
          self:
            padding:
              - pt-6
              - pb-6
              - pl-6
              - pr-6
            textAlign: left
      - type: FeaturedItem
        title: Is counselling confidential?
        text: Yes, fully. Everything discussed in sessions is confidential, except in very limited circumstances where I have a legal or ethical duty of care. I will always explain these limits clearly at the outset.
        colors: bg-light-fg-dark
        styles:
          self:
            padding:
              - pt-6
              - pb-6
              - pl-6
              - pr-6
            textAlign: left
      - type: FeaturedItem
        title: How often will we meet?
        text: Most clients begin with weekly sessions, which helps build momentum and continuity. As you progress, we may move to fortnightly sessions. The frequency is always determined by your needs and we review it together regularly.
        colors: bg-light-fg-dark
        styles:
          self:
            padding:
              - pt-6
              - pb-6
              - pl-6
              - pr-6
            textAlign: left
      - type: FeaturedItem
        title: Do you offer a free consultation?
        text: Yes. I offer a free 15-minute introductory call so we can get a sense of each other and you can ask any questions you have before committing to sessions.
        colors: bg-light-fg-dark
        styles:
          self:
            padding:
              - pt-6
              - pb-6
              - pl-6
              - pr-6
            textAlign: left
      - type: FeaturedItem
        title: How many sessions will I need?
        text: This varies enormously from person to person and depends on what you're bringing to counselling. Some people benefit from a focused short-term engagement (6–12 sessions); others prefer longer-term support. There's no pressure — we go at your pace.
        colors: bg-light-fg-dark
        styles:
          self:
            padding:
              - pt-6
              - pb-6
              - pl-6
              - pr-6
            textAlign: left
      - type: FeaturedItem
        title: Can I switch between French and English?
        text: Absolutely. Many of my clients find it natural to move between languages depending on the topic. You're welcome to use whichever language feels most authentic in any given moment.
        colors: bg-light-fg-dark
        styles:
          self:
            padding:
              - pt-6
              - pb-6
              - pl-6
              - pr-6
            textAlign: left
    colors: bg-neutral-fg-dark
    styles:
      self:
        padding:
          - pt-16
          - pb-16
          - pl-8
          - pr-8
        justifyContent: center
seo:
  metaTitle: Contact & Book — Sophie Klose
  metaDescription: Book a counselling session or free introductory call with Sophie Klose in Zurich or online. Bilingual sessions in English and French.
  type: Seo
type: PageLayout
---
