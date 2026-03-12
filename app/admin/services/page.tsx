import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import Link from 'next/link'
import { ArrowLeft, Package, DollarSign } from 'lucide-react'

export default async function ServicesPage() {
  const supabase = await createClient()

  const { data: { user }, error: userError } = await supabase.auth.getUser()

  if (userError || !user || !user.user_metadata?.is_admin) {
    redirect('/auth/login')
  }

  const { data: services, error } = await supabase
    .from('services')
    .select('*')
    .order('type', { ascending: true })

  const groupedServices = services?.reduce((acc: any, service: any) => {
    if (!acc[service.type]) {
      acc[service.type] = []
    }
    acc[service.type].push(service)
    return acc
  }, {})

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
              <h1 className="text-4xl font-bold">Services & Pricing</h1>
              <p className="text-muted-foreground">Manage service offerings and prices</p>
            </div>
          </div>
        </div>

        {error && (
          <div className="bg-destructive/10 text-destructive p-4 rounded-lg mb-6">
            Error loading services: {error.message}
          </div>
        )}

        <div className="space-y-8">
          {groupedServices && Object.keys(groupedServices).map((type) => (
            <div key={type}>
              <h2 className="text-2xl font-bold capitalize mb-4">{type} Cleaning</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {groupedServices[type].map((service: any) => (
                  <Card key={service.id} className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <Package className="h-5 w-5 text-primary" />
                        {service.is_active ? (
                          <Badge className="bg-green-100 text-green-800">Active</Badge>
                        ) : (
                          <Badge className="bg-gray-100 text-gray-800">Inactive</Badge>
                        )}
                      </div>
                      <CardTitle className="mt-4">{service.name}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center gap-2 mb-4">
                        <DollarSign className="h-5 w-5 text-primary" />
                        <span className="text-2xl font-bold">R {service.base_price}</span>
                      </div>
                      <p className="text-sm text-muted-foreground mb-4">
                        {service.description}
                      </p>
                      <div className="flex gap-2">
                        <Button asChild size="sm" variant="outline" className="flex-1 bg-transparent">
                          <Link href={`/admin/services/${service.id}`}>Edit</Link>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          ))}
        </div>

        {(!services || services.length === 0) && (
          <Card>
            <CardContent className="py-12 text-center">
              <p className="text-muted-foreground">No services configured</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
