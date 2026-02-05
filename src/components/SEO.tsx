import { Helmet } from 'react-helmet'

interface SEOProps {
  title: string
  description: string
  keywords?: string
  image?: string
  url?: string
}

export default function SEO({ 
  title, 
  description, 
  keywords = 'luxury hair, human hair, Nigerian hair, baby blue, bundles, wigs, closures',
  image = '/og-image.jpg',
  url = window.location.href 
}: SEOProps) {
  return (
    <Helmet>
      <title>{title} | Baby Blue - Premium Nigerian Hair</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      
      {/* Open Graph / Facebook */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="Baby Blue" />
      
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      
      {/* Additional SEO */}
      <meta name="author" content="Baby Blue" />
      <meta name="robots" content="index, follow" />
      <link rel="canonical" href={url} />
      
      {/* Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          "name": "Baby Blue",
          "url": "https://baby-blue.com",
          "logo": "https://baby-blue.com/logo.png",
          "description": "Premium Nigerian human hair products",
          "sameAs": [
            "https://instagram.com/babyblue",
            "https://facebook.com/babyblue"
          ]
        })}
      </script>
    </Helmet>
  )
}
