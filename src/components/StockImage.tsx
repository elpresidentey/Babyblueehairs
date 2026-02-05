import { useRef, useEffect, useState } from "react"

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
  const [imageSrc, setImageSrc] = useState('')
  const cacheBuster = useRef(Date.now() + Math.random()).current
  
  useEffect(() => {
    // Use multiple fallback services for reliability
    const services = [
      `https://picsum.photos/${width}/${height}?random=${cacheBuster}`,
      `https://source.unsplash.com/${width}x${height}/?hair,beauty`,
      `https://placehold.co/${width}x${height}/667eea/white?text=Baby+Blue`
    ]
    
    // Try the first service
    setImageSrc(services[0])
  }, [width, height, cacheBuster])

  return (
    <img
      src={imageSrc}
      alt={alt}
      className={className}
      loading="lazy"
      onError={(e) => {
        const target = e.target as HTMLImageElement
        // Fallback services
        const fallbackServices = [
          `https://source.unsplash.com/${width}x${height}/?hair,beauty`,
          `https://placehold.co/${width}x${height}/667eea/white?text=Baby+Blue`
        ]
        
        if (!target.src.includes('unsplash') && !target.src.includes('placehold')) {
          target.src = fallbackServices[0]
        } else if (!target.src.includes('placehold')) {
          target.src = fallbackServices[1]
        } else {
          // Final fallback - gradient
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
