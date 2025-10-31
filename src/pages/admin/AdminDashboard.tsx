import AdminLayout from '@/components/admin/AdminLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, ShoppingCart, Package, DollarSign, TrendingUp, TrendingDown } from 'lucide-react';

const AdminDashboard = () => {
  // Mock data - will be replaced with real data
  const stats = [
    {
      title: 'Total Revenue',
      value: '$0',
      change: '+0%',
      trend: 'up',
      icon: DollarSign,
      description: 'from last month',
    },
    {
      title: 'Total Orders',
      value: '0',
      change: '+0%',
      trend: 'up',
      icon: ShoppingCart,
      description: 'from last month',
    },
    {
      title: 'Total Customers',
      value: '0',
      change: '+0%',
      trend: 'up',
      icon: Users,
      description: 'from last month',
    },
    {
      title: 'Total Products',
      value: '0',
      change: '0',
      trend: 'neutral',
      icon: Package,
      description: 'active products',
    },
  ];

  return (
    <AdminLayout>
      <div className="space-y-8">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
          <p className="text-muted-foreground mt-2">
            Welcome to your e-commerce admin panel. Manage your store efficiently.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat) => (
            <Card key={stat.title}>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {stat.title}
                </CardTitle>
                <stat.icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <div className="flex items-center gap-2 mt-2">
                  {stat.trend === 'up' && (
                    <TrendingUp className="h-4 w-4 text-green-600" />
                  )}
                  {stat.trend === 'down' && (
                    <TrendingDown className="h-4 w-4 text-red-600" />
                  )}
                  <span
                    className={`text-xs font-medium ${
                      stat.trend === 'up'
                        ? 'text-green-600'
                        : stat.trend === 'down'
                        ? 'text-red-600'
                        : 'text-muted-foreground'
                    }`}
                  >
                    {stat.change}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {stat.description}
                  </span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Getting Started</CardTitle>
              <CardDescription>
                Set up your store and start selling
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm">Add your first product</span>
                <span className="text-xs text-muted-foreground">0 / 1</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Configure payment settings</span>
                <span className="text-xs text-muted-foreground">Pending</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Set up shipping options</span>
                <span className="text-xs text-muted-foreground">Pending</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>
                Latest updates from your store
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-sm text-muted-foreground text-center py-8">
                No activity yet. Your store activities will appear here.
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;
