import AdminLayout from '@/components/admin/AdminLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Package, Plus } from 'lucide-react';

const ProductsManagement = () => {
  return (
    <AdminLayout>
      <div className="space-y-8">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Products Management</h2>
          <p className="text-muted-foreground mt-2">
            Manage your product catalog, inventory, and pricing
          </p>
        </div>

        <div className="flex justify-end">
          <Button className="bg-green-600 hover:bg-green-700">
            <Plus className="mr-2 h-4 w-4" />
            Add New Product
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Product Catalog</CardTitle>
            <CardDescription>
              Your products will appear here
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-center py-12">
              <Package className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">No products yet</h3>
              <p className="text-muted-foreground mb-4">
                Start by adding your first product to the catalog
              </p>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Add Your First Product
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default ProductsManagement;
