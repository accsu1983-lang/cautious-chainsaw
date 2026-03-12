import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import Link from 'next/link'
import { ArrowLeft, Calendar, Clock, MapPin, User, Plus } from 'lucide-react'

export default async function BookingsPage() {
  const supabase = await createClient()

  const { data: { user }, error: userError } = await supabase.auth.getUser()

  if (userError || !user || !user.user_metadata?.is_admin) {
    redirect('/auth/login')
  }

  const { data: bookings, error } = await supabase
    .from('bookings')
    .select('*, customers(full_name, email, phone)')
    .order('scheduled_date', { ascending: false })

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800'
      case 'confirmed': return 'bg-blue-100 text-blue-800'
      case 'in_progress': return 'bg-purple-100 text-purple-800'
      case 'cancelled': return 'bg-red-100 text-red-800'
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
              <h1 className="text-4xl font-bold">Bookings</h1>
              <p className="text-muted-foreground">Manage cleaning appointments</p>
            </div>
          </div>
          <Button asChild>
            <Link href="/admin/bookings/new">
              <Plus className="h-4 w-4 mr-2" />
              New Booking
            </Link>
          </Button>
        </div>

        {error && (
          <div className="bg-destructive/10 text-destructive p-4 rounded-lg mb-6">
            Error loading bookings: {error.message}
          </div>
        )}

        <div className="grid gap-6">
          {bookings && bookings.length > 0 ? (
            bookings.map((booking: any) => (
              <Card key={booking.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-3">
                      <User className="h-5 w-5 text-primary" />
                      {booking.customers?.full_name || 'Unknown Customer'}
                    </CardTitle>
                    <Badge className={getStatusColor(booking.status)}>
                      {booking.status}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">
                        {new Date(booking.scheduled_date).toLocaleDateString()}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">{booking.scheduled_time}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">{booking.suburb}</span>
                    </div>
                    <div>
                      <span className="text-sm font-medium">Service: </span>
                      <span className="text-sm capitalize">{booking.service_type}</span>
                    </div>
                  </div>

                  <div className="border-t pt-4">
                    <p className="text-sm mb-2"><strong>Address:</strong> {booking.address}</p>
                    {booking.technician_notes && (
                      <p className="text-sm text-muted-foreground">
                        <strong>Notes:</strong> {booking.technician_notes}
                      </p>
                    )}
                    {booking.rating && (
                      <p className="text-sm mt-2">
                        <strong>Rating:</strong> {'⭐'.repeat(booking.rating)}
                      </p>
                    )}
                  </div>

                  <div className="flex gap-2 mt-4">
                    <Button asChild size="sm" variant="outline">
                      <Link href={`/admin/bookings/${booking.id}`}>View Details</Link>
                    </Button>
                    {booking.customers?.phone && (
                      <Button asChild size="sm" variant="outline">
                        <a href={`tel:${booking.customers.phone}`}>Call Customer</a>
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            <Card>
              <CardContent className="py-12 text-center">
                <p className="text-muted-foreground mb-4">No bookings yet</p>
                <Button asChild>
                  <Link href="/admin/bookings/new">Create First Booking</Link>
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
