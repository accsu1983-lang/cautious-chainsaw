import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import Link from 'next/link'
import { ArrowLeft, FileText, DollarSign, User, Calendar, Plus } from 'lucide-react'

export default async function QuotesPage() {
  const supabase = await createClient()
  
  const { data: { user }, error: userError } = await supabase.auth.getUser()
  
  if (userError || !user || !user.user_metadata?.is_admin) {
    redirect('/auth/login')
  }

  const { data: quotes, error } = await supabase
    .from('quotes')
    .select('*, customers(full_name, email, phone)')
    .order('created_at', { ascending: false })

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'accepted': return 'bg-green-100 text-green-800'
      case 'sent': return 'bg-blue-100 text-blue-800'
      case 'declined': return 'bg-red-100 text-red-800'
      case 'expired': return 'bg-gray-100 text-gray-800'
      default: return 'bg-yellow-100 text-yellow-800'
    }
  }

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
              <h1 className="text-4xl font-bold">Quotes</h1>
              <p className="text-muted-foreground">Manage customer quotes and estimates</p>
            </div>
          </div>
          <Button asChild>
            <Link href="/admin/quotes/new">
              <Plus className="h-4 w-4 mr-2" />
              New Quote
            </Link>
          </Button>
        </div>

        {error && (
          <div className="bg-destructive/10 text-destructive p-4 rounded-lg mb-6">
            Error loading quotes: {error.message}
          </div>
        )}

        <div className="grid gap-6">
          {quotes && quotes.length > 0 ? (
            quotes.map((quote: any) => (
              <Card key={quote.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-3">
                      <FileText className="h-5 w-5 text-primary" />
                      {quote.customers?.full_name || 'Unknown Customer'}
                    </CardTitle>
                    <Badge className={getStatusColor(quote.status)}>
                      {quote.status}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-3 gap-4 mb-4">
                    <div className="flex items-center gap-2">
                      <User className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">{quote.customers?.email}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <FileText className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm capitalize">{quote.service_type} Cleaning</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <DollarSign className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm font-bold">
                        R {quote.estimated_price?.toFixed(2) || '0.00'}
                      </span>
                    </div>
                  </div>

                  <div className="border-t pt-4">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm"><strong>Quantity:</strong> {quote.quantity}</p>
                        <p className="text-sm mt-1">
                          <strong>Created:</strong> {new Date(quote.created_at).toLocaleDateString()}
                        </p>
                      </div>
                      {quote.valid_until && (
                        <div>
                          <p className="text-sm">
                            <strong>Valid Until:</strong> {new Date(quote.valid_until).toLocaleDateString()}
                          </p>
                        </div>
                      )}
                    </div>
                    {quote.notes && (
                      <p className="text-sm text-muted-foreground mt-3">
                        <strong>Notes:</strong> {quote.notes}
                      </p>
                    )}
                  </div>

                  <div className="flex gap-2 mt-4">
                    <Button asChild size="sm" variant="outline">
                      <Link href={`/admin/quotes/${quote.id}`}>View Details</Link>
                    </Button>
                    {quote.customers?.email && (
                      <Button asChild size="sm" variant="outline">
                        <a href={`mailto:${quote.customers.email}`}>Email Quote</a>
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            <Card>
              <CardContent className="py-12 text-center">
                <p className="text-muted-foreground mb-4">No quotes yet</p>
                <Button asChild>
                  <Link href="/admin/quotes/new">Create First Quote</Link>
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
