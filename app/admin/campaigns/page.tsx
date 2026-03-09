'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Mail, Send, Users, CheckCircle2, AlertCircle } from 'lucide-react'
import { sendNewsletterCampaign } from '@/lib/actions/emails'
import useSWR from 'swr'

export default function CampaignsPage() {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [message, setMessage] = useState('')

  const fetcher = async () => {
    const response = await fetch('/api/admin/newsletter-stats')
    if (!response.ok) throw new Error('Failed to fetch stats')
    return response.json()
  }

  const { data: stats, isLoading: statsLoading } = useSWR('/api/admin/newsletter-stats', fetcher, {
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  })

  const handleSendCampaign = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!title.trim() || !content.trim()) {
      setMessage('Please fill in both title and content')
      setStatus('error')
      return
    }

    setIsLoading(true)
    setStatus('idle')

    try {
      const result = await sendNewsletterCampaign(title, content)
      
      if (result.success) {
        setStatus('success')
        setMessage(`Campaign sent successfully to ${result.count} subscribers!`)
        setTitle('')
        setContent('')
      } else {
        setStatus('error')
        setMessage(result.error || 'Failed to send campaign')
      }
    } catch (error) {
      console.error('[v0] Campaign send error:', error)
      setStatus('error')
      setMessage('An error occurred while sending the campaign')
    } finally {
      setIsLoading(false)
    }
  }

  const campaignTemplates = [
    {
      name: 'Monthly Tips',
      preview: '<h3>This Month\'s Cleaning Tips</h3><p>Discover our expert tips for maintaining your curtains...'
    },
    {
      name: 'Special Offer',
      preview: '<h3>Limited Time: 15% Off All Services!</h3><p>Book this week and save on premium cleaning services...'
    },
    {
      name: 'New Service',
      preview: '<h3>Introducing Our New Blind Cleaning Service!</h3><p>We\'ve just launched professional blind cleaning...'
    },
    {
      name: 'Seasonal',
      preview: '<h3>Spring Cleaning Special</h3><p>Refresh your home for the new season with our comprehensive...'
    }
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">Email Campaigns</h1>
        <p className="text-muted-foreground">Send newsletter campaigns to your subscribers</p>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Users className="h-4 w-4 text-primary" />
              Active Subscribers
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats?.activeSubscribers || 0}</div>
            <p className="text-xs text-muted-foreground mt-1">People receiving campaigns</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Mail className="h-4 w-4 text-accent" />
              Total Subscribers
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats?.totalSubscribers || 0}</div>
            <p className="text-xs text-muted-foreground mt-1">All time signups</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Send className="h-4 w-4 text-green-500" />
              Campaigns Sent
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">0</div>
            <p className="text-xs text-muted-foreground mt-1">This month</p>
          </CardContent>
        </Card>
      </div>

      {/* Campaign Composer */}
      <Card>
        <CardHeader>
          <CardTitle>Create New Campaign</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSendCampaign} className="space-y-4">
            <div>
              <label className="text-sm font-medium">Campaign Title</label>
              <Input
                placeholder="e.g., Spring Cleaning Special"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                disabled={isLoading}
              />
            </div>

            <div>
              <label className="text-sm font-medium">Content (HTML)</label>
              <textarea
                placeholder="Enter your campaign content in HTML format..."
                value={content}
                onChange={(e) => setContent(e.target.value)}
                disabled={isLoading}
                className="w-full min-h-[300px] p-3 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary font-mono text-sm"
              />
              <p className="text-xs text-muted-foreground mt-2">
                Use HTML tags like &lt;h3&gt;, &lt;p&gt;, &lt;strong&gt;, etc. for formatting
              </p>
            </div>

            {/* Status Message */}
            {status === 'success' && (
              <div className="bg-accent/10 border border-accent text-accent rounded-lg p-4 flex items-center gap-3 animate-fadeInUp">
                <CheckCircle2 className="h-5 w-5" />
                <p>{message}</p>
              </div>
            )}

            {status === 'error' && (
              <div className="bg-destructive/10 border border-destructive text-destructive rounded-lg p-4 flex items-center gap-3 animate-fadeInUp">
                <AlertCircle className="h-5 w-5" />
                <p>{message}</p>
              </div>
            )}

            <Button
              type="submit"
              disabled={isLoading || !stats?.activeSubscribers}
              className="w-full bg-primary hover:bg-primary/90"
            >
              {isLoading ? 'Sending...' : `Send to ${stats?.activeSubscribers || 0} Subscribers`}
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Template Suggestions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Templates</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {campaignTemplates.map((template) => (
              <button
                key={template.name}
                onClick={() => {
                  setTitle(template.name)
                  setContent(template.preview)
                }}
                className="p-4 border border-border rounded-lg text-left hover:bg-muted transition-colors"
              >
                <h4 className="font-medium mb-1">{template.name}</h4>
                <p className="text-sm text-muted-foreground line-clamp-2">{template.preview}</p>
              </button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Tips */}
      <Card>
        <CardHeader>
          <CardTitle>Campaign Tips</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2 text-sm">
            <li className="flex gap-2">
              <span className="text-primary">•</span>
              <span>Keep subject lines short and compelling</span>
            </li>
            <li className="flex gap-2">
              <span className="text-primary">•</span>
              <span>Include a clear call-to-action button</span>
            </li>
            <li className="flex gap-2">
              <span className="text-primary">•</span>
              <span>Send campaigns on Tuesday-Thursday for best engagement</span>
            </li>
            <li className="flex gap-2">
              <span className="text-primary">•</span>
              <span>Always include contact info and unsubscribe link</span>
            </li>
            <li className="flex gap-2">
              <span className="text-primary">•</span>
              <span>Test on mobile devices before sending</span>
            </li>
          </ul>
        </CardContent>
      </Card>
    </div>
  )
}
