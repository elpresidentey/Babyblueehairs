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
  className = ''
}: StockImageProps) {
  // Use 'woman,face' or 'female,portrait' for clear female faces
  const keywordToUse = 'woman,face'
  
  // Add a cache-busting parameter to force refresh
  const cacheBuster = Date.now()
  
  // Use LoremFlickr API format: https://loremflickr.com/{width}/{height}/{keyword}
  const src = `https://loremflickr.com/${width}/${height}/${keywordToUse}?lock=${cacheBuster}`
  
  return (
    <img 
      src={src} 
      alt={alt} 
      className={className}
      loading="lazy"
      onError={(e) => {
        // Fallback to 'female,portrait' if image fails to load
        const target = e.target as HTMLImageElement
        const fallbackSrc = `https://loremflickr.com/${width}/${height}/female,portrait?lock=${cacheBuster}`
        if (target.src !== fallbackSrc) {
          target.src = fallbackSrc
        }
      }}
    />
  )
}
