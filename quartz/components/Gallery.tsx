import { QuartzComponent, QuartzComponentConstructor } from "./types"
// @ts-ignore
import script from "./scripts/gallery.inline"
import style from "./styles/gallery.scss"

export default (() => {
  const Gallery: QuartzComponent = () => {
    return null
  }

  Gallery.css = style
  Gallery.afterDOMLoaded = script
  return Gallery
}) satisfies QuartzComponentConstructor
