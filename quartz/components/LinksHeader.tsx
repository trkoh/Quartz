import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import { resolveRelative } from "../util/path"
import { classNames } from "../util/lang"

interface Options {
  links: { text: string; slug: string }[]
}

const defaultOptions: Options = {
  links: [],
}

export default ((userOpts?: Partial<Options>) => {
  const opts = { ...defaultOptions, ...userOpts }

  const LinksHeader: QuartzComponent = ({ fileData, displayClass }: QuartzComponentProps) => {
    return (
      <nav class={classNames(displayClass, "links-header")}>
        <ul>
          {opts.links.map(({ text, slug }) => (
            <li>
              <a href={resolveRelative(fileData.slug!, slug)} class="internal">
                {text}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    )
  }

  LinksHeader.css = `
.links-header {
  margin-top: 0.5rem;
}
.links-header ul {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
}
.links-header li a {
  display: block;
  padding: 0.2rem 0;
  font-size: 0.95rem;
}
`

  return LinksHeader
}) satisfies QuartzComponentConstructor
