import { useRef } from "react"

interface StockImageProps {
  width: number
  height: number
  keyword: string
  alt?: string
  className?: string
}

export default function StockImage({
  width,
  height,
  keyword,
  alt = keyword,
  className = '',
}: StockImageProps) {
  // Premium UX: keep images stable per mount (avoid Date.now() per render -> constant refetch).
  // Force clear female faces (and hair) across the UI.
  const keywordToUse = 'woman,face,hair'
  const cacheBuster = useRef(Date.now()).current

  const src = `https://loremflickr.com/${width}/${height}/${keywordToUse}?lock=${cacheBuster}`

  return (
    <img
      src={src}
      alt={alt}
      className={className}
      loading="lazy"
      onError={(e) => {
        const target = e.target as HTMLImageElement
        const fallbackSrc = `https://loremflickr.com/${width}/${height}/woman,face?lock=${cacheBuster}`
        if (target.src !== fallbackSrc) {
          target.src = fallbackSrc
        }
      }}
    />
  )
}
