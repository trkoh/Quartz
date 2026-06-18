import { PageLayout, SharedLayout } from "./quartz/cfg"
import * as Component from "./quartz/components"

const linksHeader = Component.LinksHeader({
  links: [
    { text: "About", slug: "about" },
    { text: "Blog", slug: "tags/blog" },
    { text: "Oekaki", slug: "oekaki" },
    { text: "Tags", slug: "tags" },
  ],
})

// components shared across all pages
export const sharedPageComponents: SharedLayout = {
  head: Component.Head(),
  header: [],
  afterBody: [
    Component.ImageLightbox(),
    Component.Gallery(),
    Component.ConditionalRender({
      component: Component.RecentNotes({
        title: "Recent Notes",
        showTags: false,
        limit: 10,
        filter: (f) => {
          const tags = f.frontmatter?.tags ?? []
          return !tags.includes("blog") && !tags.includes("index") && !tags.includes("oekaki/drawing")
        },
      }),
      condition: (page) => page.fileData.slug === "index",
    }),
  ],
  footer: Component.Footer({
    links: {
      GitHub: "https://github.com/trkoh",
      X: "https://x.com/teraka_",
      LinkedIn: "https://www.linkedin.com/in/kohei-terakawa-086465240",
    },
  }),
}

// components for pages that display a single page (e.g. a single note)
export const defaultContentPageLayout: PageLayout = {
  beforeBody: [
    Component.ConditionalRender({
      component: Component.Breadcrumbs(),
      condition: (page) => page.fileData.slug !== "index",
    }),
    Component.ArticleTitle(),
    Component.ContentMeta(),
    Component.TagList(),
  ],
  left: [
    Component.PageTitle(),
    Component.MobileOnly(Component.Spacer()),
    Component.Flex({
      components: [
        {
          Component: Component.Search(),
          grow: true,
        },
        { Component: Component.Darkmode() },
        { Component: Component.ReaderMode() },
      ],
    }),
    linksHeader,
  ],
  right: [
    Component.DesktopOnly(Component.TableOfContents()),
  ],
}

// components for pages that display lists of pages  (e.g. tags or folders)
export const defaultListPageLayout: PageLayout = {
  beforeBody: [Component.Breadcrumbs(), Component.ArticleTitle(), Component.ContentMeta()],
  left: [
    Component.PageTitle(),
    Component.MobileOnly(Component.Spacer()),
    Component.Flex({
      components: [
        {
          Component: Component.Search(),
          grow: true,
        },
        { Component: Component.Darkmode() },
      ],
    }),
    linksHeader,
  ],
  right: [],
}
