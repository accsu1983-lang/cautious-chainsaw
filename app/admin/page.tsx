import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { Users, FileText, Calendar, Package, Mail, TrendingUp } from 'lucide-react'

export default async function AdminDashboard() {
  const supabase = await createClient()

  const { data: { user }, error: userError } = await supabase.auth.getUser()

  if (userError || !user) {
    redirect('/auth/login')
  }

  // Check if user is admin
  const isAdmin = user.user_metadata?.is_admin === true

  if (!isAdmin) {
    redirect('/')
  }

  // Fetch dashboard stats
  const [customersResult, quotesResult, bookingsResult, newsletterResult] = await Promise.all([
    supabase.from('customers').select('*', { count: 'exact', head: true }),
    supabase.from('quotes').select('*', { count: 'exact', head: true }),
    supabase.from('bookings').select('*', { count: 'exact', head: true }),
    supabase.from('newsletter_subscribers').select('*', { count: 'exact', head: true })
  ])

  // Fetch recent bookings
  const { data: recentBookings } = await supabase
    .from('bookings')
    .select('*, customers(full_name, email)')
    .order('created_at', { ascending: false })
    .limit(5)

  // Fetch pending quotes
  const { data: pendingQuotes } = await supabase
    .from('quotes')
    .select('*, customers(full_name, email)')
    .eq('status', 'pending')
    .order('created_at', { ascending: false })
    .limit(5)

  const stats = [
    {
      title: 'Total Customers',
      value: customersResult.count || 0,
      icon: Users,
      href: '/admin/customers',
      color: 'text-blue-600'
    },
    {
      title: 'Active Quotes',
      value: quotesResult.count || 0,
      icon: FileText,
      href: '/admin/quotes',
      color: 'text-green-600'
    },
    {
      title: 'Bookings',
      value: bookingsResult.count || 0,
      icon: Calendar,
      href: '/admin/bookings',
      color: 'text-purple-600'
    },
    {
      title: 'Newsletter Subscribers',
      value: newsletterResult.count || 0,
      icon: Mail,
      href: '/admin/newsletter',
      color: 'text-orange-600'
    }
  ]

  return (
    <div className="min-h-screen bg-secondary/30">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-foreground">Admin Dashboard</h1>
            <p className="text-muted-foreground mt-2">Welcome back, {user.email}</p>
          </div>
          <div className="flex gap-3">
            <Button asChild variant="outline">
              <Link href="/">View Website</Link>
            </Button>
            <form action="/auth/sign-out" method="post">
              <Button variant="outline" type="submit">Sign Out</Button>
            </form>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat) => {
            const Icon = stat.icon
            return (
              <Link key={stat.title} href={stat.href}>
                <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium text-muted-foreground">
                      {stat.title}
                    </CardTitle>
                    <Icon className={`h-5 w-5 ${stat.color}`} />
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold text-foreground">{stat.value}</div>
                  </CardContent>
                </Card>
              </Link>
            )
          })}
        </div>

        {/* Quick Actions */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                Manage Customers
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                View and manage customer information and contact details
              </p>
              <Button asChild className="w-full">
                <Link href="/admin/customers">View Customers</Link>
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Manage Quotes
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                Create, edit, and send quotes to customers
              </p>
              <Button asChild className="w-full">
                <Link href="/admin/quotes">View Quotes</Link>
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                Manage Bookings
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                Schedule and track cleaning appointments
              </p>
              <Button asChild className="w-full">
                <Link href="/admin/bookings">View Bookings</Link>
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Package className="h-5 w-5" />
                Manage Services
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                Update service pricing and descriptions
              </p>
              <Button asChild className="w-full">
                <Link href="/admin/services">View Services</Link>
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Mail className="h-5 w-5" />
                Newsletter Subscribers
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                View and export newsletter subscriber list
              </p>
              <Button asChild className="w-full">
                <Link href="/admin/newsletter">View Subscribers</Link>
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Mail className="h-5 w-5" />
                Email Campaigns
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                Send newsletter campaigns to your subscribers
              </p>
              <Button asChild className="w-full">
                <Link href="/admin/campaigns">Create Campaign</Link>
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                Analytics
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                View business metrics and performance data
              </p>
              <Button asChild className="w-full bg-transparent" variant="outline">
                <Link href="/admin/analytics">Coming Soon</Link>
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Recent Activity */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Recent Bookings */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Bookings</CardTitle>
            </CardHeader>
            <CardContent>
              {recentBookings && recentBookings.length > 0 ? (
                <div className="space-y-4">
                  {recentBookings.map((booking: any) => (
                    <div key={booking.id} className="flex justify-between items-center border-b pb-3">
                      <div>
                        <p className="font-medium">{booking.customers?.full_name || 'Unknown'}</p>
                        <p className="text-sm text-muted-foreground">{booking.service_type}</p>
                        <p className="text-xs text-muted-foreground">{new Date(booking.scheduled_date).toLocaleDateString()}</p>
                      </div>
                      <span className={`px-2 py-1 rounded text-xs ${
                        booking.status === 'completed' ? 'bg-green-100 text-green-800' :
                        booking.status === 'confirmed' ? 'bg-blue-100 text-blue-800' :
                        'bg-yellow-100 text-yellow-800'
                      }`}>
                        {booking.status}
                      </span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-muted-foreground">No bookings yet</p>
              )}
            </CardContent>
          </Card>

          {/* Pending Quotes */}
          <Card>
            <CardHeader>
              <CardTitle>Pending Quotes</CardTitle>
            </CardHeader>
            <CardContent>
              {pendingQuotes && pendingQuotes.length > 0 ? (
                <div className="space-y-4">
                  {pendingQuotes.map((quote: any) => (
                    <div key={quote.id} className="flex justify-between items-center border-b pb-3">
                      <div>
                        <p className="font-medium">{quote.customers?.full_name || 'Unknown'}</p>
                        <p className="text-sm text-muted-foreground">{quote.service_type}</p>
                        <p className="text-xs text-muted-foreground">
                          R {quote.estimated_price?.toFixed(2) || '0.00'}
                        </p>
                      </div>
                      <span className="px-2 py-1 rounded text-xs bg-yellow-100 text-yellow-800">
                        Pending
                      </span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-muted-foreground">No pending quotes</p>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
