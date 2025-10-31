import AdminLayout from '@/components/admin/AdminLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ShoppingCart } from 'lucide-react';

const OrdersManagement = () => {
  return (
    <AdminLayout>
      <div className="space-y-8">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Orders Management</h2>
          <p className="text-muted-foreground mt-2">
            Track and manage customer orders
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Orders</CardTitle>
            <CardDescription>
              Your orders will appear here
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-center py-12">
              <ShoppingCart className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">No orders yet</h3>
              <p className="text-muted-foreground">
                Orders from customers will appear here
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default OrdersManagement;
