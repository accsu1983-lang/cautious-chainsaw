'use client'

import React, { useState, useEffect, useRef } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { ChevronLeft, ChevronRight, Sparkles } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

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

export function BeforeAfterGallery() {
  const [activeSlide, setActiveSlide] = useState(0)
  const [comparisonPosition, setComparisonPosition] = useState(50)

  // ⚡ BOLT OPTIMIZATION: Performance-optimized interaction tracking
  const containerRef = useRef<HTMLDivElement | null>(null)
  const isDraggingRef = useRef(false)
  const rafIdRef = useRef<number | null>(null)
  const lastXRef = useRef<number | null>(null)
  const containerRectRef = useRef<DOMRect | null>(null)

  // ⚡ BOLT OPTIMIZATION: Interaction handlers saved in refs to ensure reliable cleanup
  const mouseMoveHandlerRef = useRef<((e: MouseEvent) => void) | null>(null)
  const mouseUpHandlerRef = useRef<(() => void) | null>(null)
  const touchMoveHandlerRef = useRef<((e: TouchEvent) => void) | null>(null)
  const touchEndHandlerRef = useRef<(() => void) | null>(null)

  const cancelActiveFrame = () => {
    if (rafIdRef.current !== null) {
      cancelAnimationFrame(rafIdRef.current)
      rafIdRef.current = null
    }
  }

  const removeMouseListeners = () => {
    if (mouseMoveHandlerRef.current) {
      document.removeEventListener('mousemove', mouseMoveHandlerRef.current)
      mouseMoveHandlerRef.current = null
    }
    if (mouseUpHandlerRef.current) {
      document.removeEventListener('mouseup', mouseUpHandlerRef.current)
      mouseUpHandlerRef.current = null
    }
  }

  const removeTouchListeners = () => {
    if (touchMoveHandlerRef.current) {
      document.removeEventListener('touchmove', touchMoveHandlerRef.current)
      touchMoveHandlerRef.current = null
    }
    if (touchEndHandlerRef.current) {
      document.removeEventListener('touchend', touchEndHandlerRef.current)
      touchEndHandlerRef.current = null
    }
  }

  // ⚡ BOLT OPTIMIZATION: Explicitly remove all document-level event listeners on unmount to prevent leaks
  useEffect(() => {
    return () => {
      cancelActiveFrame()
      removeMouseListeners()
      removeTouchListeners()
    }
  }, [])

  // ⚡ BOLT OPTIMIZATION: Calculate handle position on requestAnimationFrame to avoid blocking the main thread
  const updateSliderPosition = () => {
    if (!isDraggingRef.current || lastXRef.current === null || !containerRectRef.current) {
      rafIdRef.current = null
      return
    }

    const rect = containerRectRef.current
    const x = lastXRef.current - rect.left
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100))
    setComparisonPosition(percentage)

    rafIdRef.current = null
  }

  const scheduleUpdate = (clientX: number) => {
    lastXRef.current = clientX
    if (rafIdRef.current === null) {
      rafIdRef.current = requestAnimationFrame(updateSliderPosition)
    }
  }

  const startDragMouse = (e: React.MouseEvent) => {
    e.preventDefault()
    const container = containerRef.current
    if (!container) return

    // ⚡ BOLT OPTIMIZATION: Cache bounding client rect on start to avoid layout thrashing (forced synchronous layout) during moves
    containerRectRef.current = container.getBoundingClientRect()
    isDraggingRef.current = true

    // Remove any leftover listeners to avoid duplicates
    removeMouseListeners()

    const handleMouseMove = (moveEvent: MouseEvent) => {
      scheduleUpdate(moveEvent.clientX)
    }

    const handleMouseUp = () => {
      isDraggingRef.current = false
      cancelActiveFrame()
      removeMouseListeners()
    }

    mouseMoveHandlerRef.current = handleMouseMove
    mouseUpHandlerRef.current = handleMouseUp

    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseup', handleMouseUp)
  }

  const startDragTouch = (e: React.TouchEvent) => {
    const container = containerRef.current
    if (!container) return

    // ⚡ BOLT OPTIMIZATION: Cache bounding client rect on start to avoid layout thrashing
    containerRectRef.current = container.getBoundingClientRect()
    isDraggingRef.current = true

    // Remove any leftover listeners to avoid duplicates
    removeTouchListeners()

    const handleTouchMove = (moveEvent: TouchEvent) => {
      // ⚡ BOLT OPTIMIZATION: Only call preventDefault if event is cancelable to prevent browser intervention warnings
      if (moveEvent.cancelable) {
        moveEvent.preventDefault()
      }
      const touch = moveEvent.touches[0]
      if (touch) {
        scheduleUpdate(touch.clientX)
      }
    }

    const handleTouchEnd = () => {
      isDraggingRef.current = false
      cancelActiveFrame()
      removeTouchListeners()
    }

    touchMoveHandlerRef.current = handleTouchMove
    touchEndHandlerRef.current = handleTouchEnd

    // ⚡ BOLT OPTIMIZATION: passive: false is used so we can block scrolling while actively sliding
    document.addEventListener('touchmove', handleTouchMove, { passive: false })
    document.addEventListener('touchend', handleTouchEnd)
  }

  const nextSlide = () => {
    setActiveSlide((prev) => (prev + 1) % beforeAfterProjects.length)
    setComparisonPosition(50)
  }

  const prevSlide = () => {
    setActiveSlide((prev) => (prev - 1 + beforeAfterProjects.length) % beforeAfterProjects.length)
    setComparisonPosition(50)
  }

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
              <div ref={containerRef} className="relative h-[400px] md:h-[500px] bg-muted">
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
                  onMouseDown={startDragMouse}
                  onTouchStart={startDragTouch}
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
}
