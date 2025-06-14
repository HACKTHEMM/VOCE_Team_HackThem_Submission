"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Info } from "lucide-react"
import Image from "next/image"

interface Product {
  id?: string
  name?: string
  title?: string  // Alternative name field
  price?: string | number
  cost?: string | number   // Alternative price field
  image?: string
  thumbnail?: string  // Alternative image field
  features?: string[]
  url?: string // Product link URL
  link?: string // Alternative link field
  product_link?: string // Another alternative link field
  product_id?: string
  source?: string
  rating?: number
  reviews?: number
  delivery?: string
  serpapi_product_api?: string
}

interface ProductCardProps {
  product: Product
  onProductClick?: (product: Product) => void
}

export function ProductCard({ product, onProductClick }: ProductCardProps) {
  // Debug logging
  console.log("ProductCard received product:", product)
  console.log("Product keys:", Object.keys(product || {}))
  
  // Format price to INR
  const formatPrice = (price: string | number | undefined) => {
    if (!price) return "Price not available";
    
    const numericPrice = typeof price === 'string' ? parseFloat(price.replace(/[^\d.-]/g, '')) : price;
    if (isNaN(numericPrice)) return "Price not available";
    
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    }).format(numericPrice);
  };
  const handleCardClick = () => {
    // Try different possible link fields in order of preference
    const productUrl = product.product_link || product.link || product.url;
    
    if (productUrl) {
      window.open(productUrl, '_blank', 'noopener,noreferrer');
    } else if (onProductClick) {
      onProductClick(product);
    }
  };

  const displayPrice = formatPrice(product.price || product.cost);

  return (
    <Card 
      className="group relative bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm border border-slate-200/60 dark:border-slate-700/60 hover:border-slate-300/80 dark:hover:border-slate-600/80 transition-all duration-300 shadow-sm hover:shadow-lg overflow-hidden cursor-pointer"
      onClick={handleCardClick}
    >
      <CardContent className="p-4 sm:p-5 md:p-6">
        {/* Mobile Layout - Stacked */}
        <div className="flex flex-col sm:hidden space-y-4">
          <div className="flex items-start justify-between">
            <div className="flex-1 min-w-0 pr-4">
              <h3 className="text-base font-semibold text-slate-900 dark:text-white mb-1 line-clamp-2 leading-tight">
                {product.name || product.title || "Product"}
              </h3>              <p className="text-lg font-bold text-slate-900 dark:text-white">
                {displayPrice}
              </p>
            </div>
            <div className="flex-shrink-0">              <div className="relative overflow-hidden rounded-lg">
                <Image
                  src={product.thumbnail || product.image || "/placeholder.svg"}
                  alt={product.name || product.title || "Product"}
                  width={64}
                  height={64}
                  className="object-cover transition-transform duration-200 group-hover:scale-105"
                />
              </div>
            </div>
          </div>
          
          {product.features && Array.isArray(product.features) && product.features.length > 0 && (
            <div className="flex flex-wrap gap-1.5">
              {product.features.slice(0, 3).map((feature, index) => (
                <Badge 
                  key={index} 
                  variant="secondary" 
                  className="text-xs px-2 py-0.5 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border-none"
                >
                  {feature}
                </Badge>
              ))}
              {product.features.length > 3 && (
                <Badge 
                  variant="secondary" 
                  className="text-xs px-2 py-0.5 bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-500 border-none"
                >
                  +{product.features.length - 3}
                </Badge>
              )}
            </div>
          )}          <div className="flex justify-end">
            <Button size="sm" variant="outline" className="border border-slate-300 dark:border-slate-600 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors duration-200 shadow-none">
              <Info className="h-3.5 w-3.5" />
            </Button>
          </div>
        </div>

        {/* Desktop Layout - Horizontal */}
        <div className="hidden sm:flex gap-4 md:gap-5 lg:gap-6">
          <div className="flex-shrink-0">            <div className="relative overflow-hidden rounded-xl">
              <Image
                src={product.thumbnail || product.image || "/placeholder.svg"}
                alt={product.name || product.title || "Product"}
                width={80}
                height={80}
                className="object-cover transition-transform duration-200 group-hover:scale-105 sm:w-20 sm:h-20 md:w-24 md:h-24"
              />
            </div>
          </div>

          <div className="flex-1 min-w-0 flex flex-col justify-between">
            <div className="space-y-2">
              <div className="flex items-start justify-between gap-4">
                <h3 className="text-base md:text-lg font-semibold text-slate-900 dark:text-white line-clamp-2 leading-tight">
                  {product.name || product.title || "Product"}
                </h3>                <p className="text-lg md:text-xl font-bold text-slate-900 dark:text-white whitespace-nowrap">
                  {displayPrice}
                </p>
              </div>
              
              {product.features && Array.isArray(product.features) && product.features.length > 0 && (
                <div className="flex flex-wrap gap-1.5">
                  {product.features.slice(0, 3).map((feature, index) => (
                    <Badge 
                      key={index} 
                      variant="secondary" 
                      className="text-xs px-2 py-0.5 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border-none"
                    >
                      {feature}
                    </Badge>
                  ))}
                  {product.features.length > 3 && (
                    <Badge 
                      variant="secondary" 
                      className="text-xs px-2 py-0.5 bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-500 border-none"
                    >
                      +{product.features.length - 3}
                    </Badge>
                  )}
                </div>
              )}
            </div>            <div className="flex justify-end mt-3">
              <Button size="sm" variant="outline" className="border border-slate-300 dark:border-slate-600 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors duration-200 shadow-none">
                <Info className="h-3.5 w-3.5" />
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
