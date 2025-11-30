import { QuartzComponentConstructor } from "./types"
// @ts-ignore
import script from "./scripts/lightbox.inline"

export default (() => {
  function ImageLightbox() {
    return null
  }

  ImageLightbox.css = `
    #image-lightbox {
      display: none;
      position: fixed;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      background: rgba(0, 0, 0, 0.9);
      z-index: 9999;
      cursor: zoom-out;
      justify-content: center;
      align-items: center;
    }
    #image-lightbox.active {
      display: flex;
    }
    #image-lightbox img {
      max-width: 90vw;
      max-height: 90vh;
      object-fit: contain;
    }
  `

  ImageLightbox.afterDOMLoaded = script
  return ImageLightbox
}) satisfies QuartzComponentConstructor
