'use client'

import { CheckCircle2 } from 'lucide-react'
import { cn } from '@/lib/utils'

interface SuccessCheckmarkProps {
  className?: string
  size?: 'sm' | 'md' | 'lg'
}

export function SuccessCheckmark({ className, size = 'md' }: SuccessCheckmarkProps) {
  const sizeClasses = {
    sm: 'h-8 w-8',
    md: 'h-16 w-16',
    lg: 'h-24 w-24'
  }

  return (
    <div className="flex items-center justify-center">
      <div className="relative">
        {/* Animated circle background */}
        <div className={cn(
          'absolute inset-0 rounded-full bg-accent/20 animate-ping',
          sizeClasses[size]
        )} />

        {/* Checkmark icon */}
        <CheckCircle2
          className={cn(
            'relative text-accent animate-in zoom-in-50 duration-500',
            sizeClasses[size],
            className
          )}
        />
      </div>
    </div>
  )
}
