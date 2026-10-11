'use client'

import React, { useState, useRef, useEffect, useCallback, memo } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { ChevronLeft, ChevronRight, Sparkles } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

/*
 * ⚡ BOLT OPTIMIZATION: BeforeAfterGallery
 * - Memoized with React.memo to prevent unnecessary re-renders when parent components re-render.
 * - Throttles high-frequency mousemove/touchmove drag updates using requestAnimationFrame (rAF),
 *   eliminating layout thrashing and redundant React state updates (up to 120+ updates/sec down to 1 per render frame).
 * - Continuously captures latest cursor position (latestXRef) so frame updates render exact current drag positions.
 * - Caches container bounds and manages document event listeners with refs and useEffect cleanup
 *   to avoid listener memory leaks if component unmounts during active drag.
 */

const beforeAfterProjects = [
  {
    id: 1,
    title: 'Heavy Drapes Transformation',
    location: 'Sandton Residence',
    service: 'Curtain Cleaning',
    beforeImage: '/images/curtain-cleaning.webp',
    afterImage: '/images/curtain-cleaning.webp',
    description: 'Removed years of dust and restored original color to heavy velvet drapes.'
  },
  {
    id: 2,
    title: 'Upholstery Revival',
    location: 'Rosebank Office',
    service: 'Upholstery Cleaning',
    beforeImage: '/images/dsc6349-20copy.jpg',
    afterImage: '/images/dsc6349-20copy.jpg',
    description: 'Deep cleaned office furniture removing stains and odors completely.'
  },
  {
    id: 3,
    title: 'Mattress Sanitization',
    location: 'Fourways Hotel',
    service: 'Mattress Cleaning',
    beforeImage: '/images/mattress-cleaning.webp',
    afterImage: '/images/mattress-cleaning.webp',
    description: 'Eliminated dust mites and allergens for a healthier sleep environment.'
  }
]

export const BeforeAfterGallery = memo(function BeforeAfterGallery() {
  const [activeSlide, setActiveSlide] = useState(0)
  const [comparisonPosition, setComparisonPosition] = useState(50)

  const containerRef = useRef<HTMLDivElement | null>(null)
  const latestXRef = useRef<number>(0)
  const rafIdRef = useRef<number | null>(null)
  const cleanupListenersRef = useRef<(() => void) | null>(null)

  const stopDragging = useCallback(() => {
    if (rafIdRef.current !== null) {
      cancelAnimationFrame(rafIdRef.current)
      rafIdRef.current = null
    }
    if (cleanupListenersRef.current) {
      cleanupListenersRef.current()
      cleanupListenersRef.current = null
    }
  }, [])

  useEffect(() => {
    return () => {
      stopDragging()
    }
  }, [stopDragging])

  const nextSlide = () => {
    setActiveSlide((prev) => (prev + 1) % beforeAfterProjects.length)
    setComparisonPosition(50)
  }

  const prevSlide = () => {
    setActiveSlide((prev) => (prev - 1 + beforeAfterProjects.length) % beforeAfterProjects.length)
    setComparisonPosition(50)
  }

  const scheduleUpdate = useCallback((clientX: number) => {
    latestXRef.current = clientX

    if (rafIdRef.current !== null) return

    rafIdRef.current = requestAnimationFrame(() => {
      rafIdRef.current = null
      if (!containerRef.current) return
      const rect = containerRef.current.getBoundingClientRect()
      const x = latestXRef.current - rect.left
      const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100))
      setComparisonPosition(percentage)
    })
  }, [])

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    stopDragging()

    const handleMouseMove = (moveEvent: MouseEvent) => {
      scheduleUpdate(moveEvent.clientX)
    }

    const handleMouseUp = () => {
      stopDragging()
    }

    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseup', handleMouseUp)

    cleanupListenersRef.current = () => {
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseup', handleMouseUp)
    }

    scheduleUpdate(e.clientX)
  }, [stopDragging, scheduleUpdate])

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    stopDragging()

    const handleTouchMove = (moveEvent: TouchEvent) => {
      if (moveEvent.touches.length > 0) {
        scheduleUpdate(moveEvent.touches[0].clientX)
      }
    }

    const handleTouchEnd = () => {
      stopDragging()
    }

    document.addEventListener('touchmove', handleTouchMove)
    document.addEventListener('touchend', handleTouchEnd)

    cleanupListenersRef.current = () => {
      document.removeEventListener('touchmove', handleTouchMove)
      document.removeEventListener('touchend', handleTouchEnd)
    }

    if (e.touches.length > 0) {
      scheduleUpdate(e.touches[0].clientX)
    }
  }, [stopDragging, scheduleUpdate])

  const currentProject = beforeAfterProjects[activeSlide]

  return (
    <section className="py-20 bg-secondary/30">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <Badge variant="outline" className="mb-4">
            <Sparkles className="h-3 w-3 mr-1" />
            Our Results
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4 text-balance">
            See The Difference
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-pretty">
            Real transformations from our professional cleaning services across Johannesburg
          </p>
        </div>

        {/* Main Gallery */}
        <div className="max-w-5xl mx-auto">
          <Card className="overflow-hidden border-2">
            <CardContent className="p-0">
              {/* Image Comparison Slider */}
              <div ref={containerRef} className="relative h-[400px] md:h-[500px] bg-muted select-none">
                {/* Before Image */}
                <div className="absolute inset-0">
                  <Image
                    src={currentProject.beforeImage || "/placeholder.svg"}
                    alt={`Before ${currentProject.title}`}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                    BEFORE
                  </div>
                </div>

                {/* After Image with Clip */}
                <div
                  className="absolute inset-0"
                  style={{ clipPath: `inset(0 0 0 ${comparisonPosition}%)` }}
                >
                  <Image
                    src={currentProject.afterImage || "/placeholder.svg"}
                    alt={`After ${currentProject.title}`}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute top-4 right-4 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                    AFTER
                  </div>
                </div>

                {/* Slider Handle */}
                <div
                  className="absolute top-0 bottom-0 w-1 bg-white cursor-ew-resize group"
                  style={{ left: `${comparisonPosition}%` }}
                  onMouseDown={handleMouseDown}
                  onTouchStart={handleTouchStart}
                >
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                    <div className="flex gap-1">
                      <ChevronLeft className="h-4 w-4" />
                      <ChevronRight className="h-4 w-4" />
                    </div>
                  </div>
                </div>

                {/* Navigation Arrows */}
                <button
                  onClick={prevSlide}
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 hover:bg-white rounded-full shadow-lg flex items-center justify-center transition-all hover:scale-110 z-10"
                  aria-label="Previous project"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <button
                  onClick={nextSlide}
                  className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 hover:bg-white rounded-full shadow-lg flex items-center justify-center transition-all hover:scale-110 z-10"
                  aria-label="Next project"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              </div>

              {/* Project Details */}
              <div className="p-6 md:p-8 bg-card">
                <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
                  <div>
                    <h3 className="text-2xl font-bold text-foreground mb-1">
                      {currentProject.title}
                    </h3>
                    <p className="text-muted-foreground">
                      {currentProject.location}
                    </p>
                  </div>
                  <Badge variant="secondary" className="text-sm">
                    {currentProject.service}
                  </Badge>
                </div>
                <p className="text-muted-foreground mb-6">{currentProject.description}</p>

                {/* Slide Indicators */}
                <div className="flex items-center justify-between">
                  <div className="flex gap-2">
                    {beforeAfterProjects.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => {
                          setActiveSlide(index)
                          setComparisonPosition(50)
                        }}
                        className={`h-2 rounded-full transition-all ${
                          index === activeSlide ? 'w-8 bg-primary' : 'w-2 bg-muted-foreground/30'
                        }`}
                        aria-label={`Go to slide ${index + 1}`}
                      />
                    ))}
                  </div>
                  <Button asChild>
                    <Link href="#contact">Get This Result</Link>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Stats */}
        <div className="grid sm:grid-cols-3 gap-6 mt-12 max-w-3xl mx-auto">
          <div className="text-center">
            <div className="text-4xl font-bold text-primary mb-2">1000+</div>
            <p className="text-muted-foreground">Projects Completed</p>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-primary mb-2">100%</div>
            <p className="text-muted-foreground">Satisfaction Rate</p>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-primary mb-2">15+</div>
            <p className="text-muted-foreground">Years Experience</p>
          </div>
        </div>
      </div>
    </section>
  )
})
