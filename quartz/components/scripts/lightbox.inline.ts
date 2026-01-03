const lightboxId = "image-lightbox"

function setupLightbox() {
  // モーダル要素を取得（なければ作成）
  let lightbox = document.getElementById(lightboxId) as HTMLDivElement | null
  if (!lightbox) {
    lightbox = document.createElement("div")
    lightbox.id = lightboxId
    lightbox.innerHTML = `<img src="" alt="" />`
    document.body.appendChild(lightbox)
  }

  const lightboxImg = lightbox.querySelector("img")!

  // 全画像にクリックイベント追加
  const images = document.querySelectorAll("article img") as NodeListOf<HTMLImageElement>
  for (const img of images) {
    img.style.cursor = "zoom-in"
    const handler = () => {
      lightboxImg.src = img.src
      lightboxImg.alt = img.alt
      lightbox!.classList.add("active")
    }
    img.addEventListener("click", handler)
    window.addCleanup(() => img.removeEventListener("click", handler))
  }

  // モーダルクリックで閉じる
  const closeHandler = () => lightbox!.classList.remove("active")
  lightbox.addEventListener("click", closeHandler)
  window.addCleanup(() => lightbox!.removeEventListener("click", closeHandler))

  // ESCキーで閉じる
  const keyHandler = (e: KeyboardEvent) => {
    if (e.key === "Escape") lightbox!.classList.remove("active")
  }
  document.addEventListener("keydown", keyHandler)
  window.addCleanup(() => document.removeEventListener("keydown", keyHandler))
}

document.addEventListener("nav", setupLightbox)
