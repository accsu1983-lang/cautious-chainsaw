'use client'

import React, { useState, useRef, useEffect } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { ChevronLeft, ChevronRight, Sparkles } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

// ⚡ BOLT OPTIMIZATION:
// This component has been optimized to handle high-frequency mouse and touch dragging efficiently.
// - Layout thrashing is eliminated by caching container dimensions in DOMRect on interaction start.
// - Main thread updates are throttled using requestAnimationFrame (rAF) to match display refresh rates.
// - Interaction handlers are stored in React refs and cleaned up in useEffect to prevent memory leaks if unmounted mid-drag.
// - Touch dragging behavior is optimized with passive: false context only when cancelable to avoid browser intervention console warnings.

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

  // Refs for tracking interaction state and dimensions
  const rafIdRef = useRef<number | null>(null)
  const lastXRef = useRef<number>(0)
  const containerRectRef = useRef<DOMRect | null>(null)

  // Interaction handlers stored in refs to allow cleanups if component unmounts mid-interaction
  const activeMouseMoveRef = useRef<((e: MouseEvent) => void) | null>(null)
  const activeMouseUpRef = useRef<(() => void) | null>(null)
  const activeTouchMoveRef = useRef<((e: TouchEvent) => void) | null>(null)
  const activeTouchEndRef = useRef<(() => void) | null>(null)

  useEffect(() => {
    return () => {
      // Cleanup any pending animation frame
      if (rafIdRef.current !== null) {
        cancelAnimationFrame(rafIdRef.current)
        rafIdRef.current = null
      }
      // Remove any lingering interactive document listeners
      if (activeMouseMoveRef.current && activeMouseUpRef.current) {
        document.removeEventListener('mousemove', activeMouseMoveRef.current)
        document.removeEventListener('mouseup', activeMouseUpRef.current)
      }
      if (activeTouchMoveRef.current && activeTouchEndRef.current) {
        document.removeEventListener('touchmove', activeTouchMoveRef.current, { passive: false } as any)
        document.removeEventListener('touchend', activeTouchEndRef.current)
      }
    }
  }, [])

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
              <div className="relative h-[400px] md:h-[500px] bg-muted">
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
                  onMouseDown={(e) => {
                    const parentElement = e.currentTarget.parentElement
                    if (!parentElement) return
                    
                    // ⚡ Cache container layout to prevent repeated forced synchronous layouts (layout thrashing)
                    containerRectRef.current = parentElement.getBoundingClientRect()
                    lastXRef.current = e.clientX

                    const updatePosition = () => {
                      if (!containerRectRef.current) return
                      const x = lastXRef.current - containerRectRef.current.left
                      const percentage = Math.max(0, Math.min(100, (x / containerRectRef.current.width) * 100))
                      setComparisonPosition(percentage)
                      rafIdRef.current = null
                    }

                    const handleMove = (moveEvent: MouseEvent) => {
                      lastXRef.current = moveEvent.clientX
                      if (rafIdRef.current === null) {
                        rafIdRef.current = requestAnimationFrame(updatePosition)
                      }
                    }

                    const handleUp = () => {
                      document.removeEventListener('mousemove', handleMove)
                      document.removeEventListener('mouseup', handleUp)
                      activeMouseMoveRef.current = null
                      activeMouseUpRef.current = null
                      if (rafIdRef.current !== null) {
                        cancelAnimationFrame(rafIdRef.current)
                        rafIdRef.current = null
                      }
                    }

                    activeMouseMoveRef.current = handleMove
                    activeMouseUpRef.current = handleUp

                    document.addEventListener('mousemove', handleMove)
                    document.addEventListener('mouseup', handleUp)
                  }}
                  onTouchStart={(e) => {
                    const parentElement = e.currentTarget.parentElement
                    if (!parentElement) return
                    
                    // ⚡ Cache container layout to prevent repeated forced synchronous layouts (layout thrashing)
                    containerRectRef.current = parentElement.getBoundingClientRect()
                    lastXRef.current = e.touches[0].clientX

                    const updatePosition = () => {
                      if (!containerRectRef.current) return
                      const x = lastXRef.current - containerRectRef.current.left
                      const percentage = Math.max(0, Math.min(100, (x / containerRectRef.current.width) * 100))
                      setComparisonPosition(percentage)
                      rafIdRef.current = null
                    }

                    const handleMove = (moveEvent: TouchEvent) => {
                      if (moveEvent.cancelable) {
                        moveEvent.preventDefault()
                      }
                      const touch = moveEvent.touches[0]
                      lastXRef.current = touch.clientX
                      if (rafIdRef.current === null) {
                        rafIdRef.current = requestAnimationFrame(updatePosition)
                      }
                    }

                    const handleUp = () => {
                      document.removeEventListener('touchmove', handleMove, { passive: false } as any)
                      document.removeEventListener('touchend', handleUp)
                      activeTouchMoveRef.current = null
                      activeTouchEndRef.current = null
                      if (rafIdRef.current !== null) {
                        cancelAnimationFrame(rafIdRef.current)
                        rafIdRef.current = null
                      }
                    }

                    activeTouchMoveRef.current = handleMove
                    activeTouchEndRef.current = handleUp

                    document.addEventListener('touchmove', handleMove, { passive: false })
                    document.addEventListener('touchend', handleUp)
                  }}
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
