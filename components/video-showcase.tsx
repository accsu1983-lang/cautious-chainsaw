'use client'

import React from "react"

import { useState, useRef } from 'react'
import { Play, Pause, Volume2, VolumeX } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function VideoShowcase() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(true)
  const [showControls, setShowControls] = useState(true)
  const videoRef = useRef<HTMLVideoElement>(null)

  const togglePlay = async () => {
    if (videoRef.current) {
      try {
        if (isPlaying) {
          videoRef.current.pause()
          setIsPlaying(false)
        } else {
          await videoRef.current.play()
          setIsPlaying(true)
        }
      } catch (error) {
        console.error('[v0] Video playback error:', error)
        setIsPlaying(false)
      }
    }
  }

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted
      setIsMuted(!isMuted)
    }
  }

  const handleVideoClick = (e: React.MouseEvent) => {
    e.preventDefault()
    togglePlay()
  }

  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12 max-w-3xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4 text-balance">
            See Our Team in Action
          </h2>
          <p className="text-lg text-muted-foreground text-pretty">
            Watch how our professional team delivers exceptional curtain cleaning services across Johannesburg. From setup to spotless results - we handle everything on-site.
          </p>
        </div>

        {/* Video Container */}
        <div className="max-w-5xl mx-auto">
          <div 
            className="relative rounded-2xl overflow-hidden shadow-2xl bg-secondary/30 group cursor-pointer"
            onMouseEnter={() => setShowControls(true)}
            onMouseLeave={() => setShowControls(isPlaying ? false : true)}
          >
            {/* Video Element */}
            <video
              ref={videoRef}
              className="w-full h-auto aspect-video object-cover"
              muted={isMuted}
              playsInline
              preload="metadata"
              onClick={handleVideoClick}
              onPlay={() => setIsPlaying(true)}
              onPause={() => setIsPlaying(false)}
              onEnded={() => {
                setIsPlaying(false)
                setShowControls(true)
              }}
              onLoadedData={() => console.log('[v0] Video loaded successfully')}
              onError={(e) => console.error('[v0] Video load error:', e)}
            >
              <source src="/videos/team-cleaning-corporate.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>

            {/* Play/Pause Overlay */}
            {!isPlaying && (
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center transition-opacity duration-300">
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    togglePlay()
                  }}
                  className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-primary/90 hover:bg-primary flex items-center justify-center transition-all hover:scale-110 shadow-2xl"
                  aria-label="Play video"
                  type="button"
                >
                  <Play className="h-10 w-10 md:h-12 md:w-12 text-primary-foreground ml-1" fill="currentColor" />
                </button>
              </div>
            )}

            {/* Video Controls */}
            {showControls && (
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6 transition-opacity duration-300">
                <div className="flex items-center justify-between">
                  <Button
                    onClick={(e) => {
                      e.stopPropagation()
                      togglePlay()
                    }}
                    variant="ghost"
                    size="icon"
                    className="text-white hover:text-white hover:bg-white/20"
                    type="button"
                  >
                    {isPlaying ? (
                      <Pause className="h-6 w-6" />
                    ) : (
                      <Play className="h-6 w-6" fill="currentColor" />
                    )}
                  </Button>

                  <Button
                    onClick={(e) => {
                      e.stopPropagation()
                      toggleMute()
                    }}
                    variant="ghost"
                    size="icon"
                    className="text-white hover:text-white hover:bg-white/20"
                    type="button"
                  >
                    {isMuted ? (
                      <VolumeX className="h-6 w-6" />
                    ) : (
                      <Volume2 className="h-6 w-6" />
                    )}
                  </Button>
                </div>
              </div>
            )}
          </div>

          {/* Video Description */}
          <div className="mt-8 grid md:grid-cols-3 gap-6">
            <div className="bg-secondary/30 rounded-lg p-6 text-center">
              <div className="text-3xl font-bold text-primary mb-2">15+</div>
              <p className="text-sm text-muted-foreground">Years of Experience</p>
            </div>
            <div className="bg-secondary/30 rounded-lg p-6 text-center">
              <div className="text-3xl font-bold text-primary mb-2">5000+</div>
              <p className="text-sm text-muted-foreground">Happy Customers</p>
            </div>
            <div className="bg-secondary/30 rounded-lg p-6 text-center">
              <div className="text-3xl font-bold text-primary mb-2">100%</div>
              <p className="text-sm text-muted-foreground">On-Site Service</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
