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
  // Use a more reliable placeholder image service
  const cacheBuster = useRef(Date.now()).current
  
  // Using picsum.photos which is more reliable than LoremFlickr
  const src = `https://picsum.photos/${width}/${height}?random=${cacheBuster}`

  return (
    <img
      src={src}
      alt={alt}
      className={className}
      loading="lazy"
      onError={(e) => {
        const target = e.target as HTMLImageElement
        // Fallback to a simple gradient placeholder
        if (target.src.includes('picsum.photos')) {
          target.style.background = `linear-gradient(135deg, #667eea 0%, #764ba2 100%)`
          target.style.display = 'block'
          target.style.width = `${width}px`
          target.style.height = `${height}px`
          target.alt = alt
        }
      }}
    />
  )
}
