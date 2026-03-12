import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { ArrowLeft, Mail, Phone, MapPin, Plus } from 'lucide-react'

export default async function CustomersPage() {
  const supabase = await createClient()

  const { data: { user }, error: userError } = await supabase.auth.getUser()

  if (userError || !user || !user.user_metadata?.is_admin) {
    redirect('/auth/login')
  }

  const { data: customers, error } = await supabase
    .from('customers')
    .select('*')
    .order('created_at', { ascending: false })

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
              <h1 className="text-4xl font-bold">Customers</h1>
              <p className="text-muted-foreground">Manage your customer database</p>
            </div>
          </div>
          <Button asChild>
            <Link href="/admin/customers/new">
              <Plus className="h-4 w-4 mr-2" />
              Add Customer
            </Link>
          </Button>
        </div>

        {error && (
          <div className="bg-destructive/10 text-destructive p-4 rounded-lg mb-6">
            Error loading customers: {error.message}
          </div>
        )}

        <div className="grid gap-6">
          {customers && customers.length > 0 ? (
            customers.map((customer) => (
              <Card key={customer.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span>{customer.full_name}</span>
                    <Button asChild variant="outline" size="sm">
                      <Link href={`/admin/customers/${customer.id}`}>View Details</Link>
                    </Button>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="flex items-center gap-2">
                      <Mail className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">{customer.email}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">{customer.phone}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">{customer.suburb}, {customer.city || 'Johannesburg'}</span>
                    </div>
                  </div>
                  {customer.notes && (
                    <p className="mt-3 text-sm text-muted-foreground border-t pt-3">
                      <strong>Notes:</strong> {customer.notes}
                    </p>
                  )}
                  <p className="mt-3 text-xs text-muted-foreground">
                    Added: {new Date(customer.created_at).toLocaleDateString()}
                  </p>
                </CardContent>
              </Card>
            ))
          ) : (
            <Card>
              <CardContent className="py-12 text-center">
                <p className="text-muted-foreground mb-4">No customers yet</p>
                <Button asChild>
                  <Link href="/admin/customers/new">Add Your First Customer</Link>
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
