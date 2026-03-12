import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { ArrowLeft, Mail, Download } from 'lucide-react'

export default async function NewsletterPage() {
  const supabase = await createClient()

  const { data: { user }, error: userError } = await supabase.auth.getUser()

  if (userError || !user || !user.user_metadata?.is_admin) {
    redirect('/auth/login')
  }

  const { data: subscribers, error } = await supabase
    .from('newsletter_subscribers')
    .select('*')
    .eq('is_active', true)
    .order('subscribed_at', { ascending: false })

  return (
    <div className="min-h-screen bg-secondary/30">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Button asChild variant="outline" size="icon">
              <Link href="/admin">
                <ArrowLeft className="h-4 w-4" />
              </Link>
            </Button>
            <div>
              <h1 className="text-4xl font-bold">Newsletter Subscribers</h1>
              <p className="text-muted-foreground">
                {subscribers?.length || 0} active subscribers
              </p>
            </div>
          </div>
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export CSV
          </Button>
        </div>

        {error && (
          <div className="bg-destructive/10 text-destructive p-4 rounded-lg mb-6">
            Error loading subscribers: {error.message}
          </div>
        )}

        <Card>
          <CardHeader>
            <CardTitle>Active Subscribers</CardTitle>
          </CardHeader>
          <CardContent>
            {subscribers && subscribers.length > 0 ? (
              <div className="space-y-3">
                {subscribers.map((subscriber: any) => (
                  <div key={subscriber.id} className="flex items-center justify-between py-3 border-b last:border-0">
                    <div className="flex items-center gap-3">
                      <Mail className="h-4 w-4 text-muted-foreground" />
                      <span>{subscriber.email}</span>
                    </div>
                    <span className="text-xs text-muted-foreground">
                      {new Date(subscriber.subscribed_at).toLocaleDateString()}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-center text-muted-foreground py-8">
                No newsletter subscribers yet
              </p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
