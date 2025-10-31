import { useEffect, useState } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import {
  Users,
  ShoppingBag,
  UserPlus,
  Star,
  Search,
  Filter,
  FileDown,
  Plus,
  Eye,
  Edit,
  Mail,
  MoreVertical,
  TrendingUp,
  UserCheck,
  AlertCircle,
  RefreshCcw,
} from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

interface Customer {
  id: string;
  email: string;
  full_name: string | null;
  customer_type: string | null;
  total_orders: number;
  lifetime_value: number;
  last_order_date: string | null;
  created_at: string;
  acquisition_channel: string | null;
}

interface CustomerStats {
  total: number;
  active: number;
  newThisMonth: number;
  vip: number;
}

interface CustomerSegment {
  type: string;
  count: number;
  avgOrderValue: number;
  conversionRate: number;
}

const CustomersManagement = () => {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [stats, setStats] = useState<CustomerStats>({
    total: 0,
    active: 0,
    newThisMonth: 0,
    vip: 0,
  });
  const [segments, setSegments] = useState<CustomerSegment[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const { toast } = useToast();

  useEffect(() => {
    fetchCustomers();
    fetchStats();
    fetchSegments();
  }, []);

  const fetchCustomers = async () => {
    try {
      const { data, error } = await supabase
        .from('customers')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setCustomers(data || []);
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message,
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const fetchStats = async () => {
    try {
      const { data: allCustomers } = await supabase
        .from('customers')
        .select('*');

      if (allCustomers) {
        const now = new Date();
        const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
        const oneMonthAgo = new Date(now.getFullYear(), now.getMonth() - 1, 1);

        setStats({
          total: allCustomers.length,
          active: allCustomers.filter(c => 
            c.last_order_date && new Date(c.last_order_date) > thirtyDaysAgo
          ).length,
          newThisMonth: allCustomers.filter(c => 
            new Date(c.created_at) > oneMonthAgo
          ).length,
          vip: allCustomers.filter(c => c.lifetime_value > 1000).length,
        });
      }
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  const fetchSegments = async () => {
    // Mock segment data - would calculate from real data
    setSegments([
      {
        type: 'First-Time Buyers',
        count: 0,
        avgOrderValue: 0,
        conversionRate: 0,
      },
      {
        type: 'Repeat Customers',
        count: 0,
        avgOrderValue: 0,
        conversionRate: 0,
      },
      {
        type: 'VIP Customers',
        count: 0,
        avgOrderValue: 0,
        conversionRate: 0,
      },
      {
        type: 'At-Risk Customers',
        count: 0,
        avgOrderValue: 0,
        conversionRate: 0,
      },
    ]);
  };

  const getCustomerStatus = (customer: Customer) => {
    if (customer.lifetime_value > 1000) return 'VIP';
    if (customer.total_orders === 1) return 'First-time';
    if (customer.total_orders > 1) return 'Active';
    return 'Inactive';
  };

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case 'VIP': return 'default';
      case 'Active': return 'secondary';
      case 'First-time': return 'outline';
      default: return 'outline';
    }
  };

  const filteredCustomers = customers.filter(customer => {
    const matchesSearch = customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.full_name?.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (statusFilter === 'all') return matchesSearch;
    return matchesSearch && getCustomerStatus(customer) === statusFilter;
  });

  return (
    <AdminLayout>
      <div className="space-y-8">
        {/* Header */}
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Customers Management</h2>
          <p className="text-muted-foreground mt-2">
            Manage customer accounts, orders history, and customer service interactions
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3">
          <Button variant="outline">
            <Filter className="mr-2 h-4 w-4" />
            Advanced Filters
          </Button>
          <Button className="bg-green-600 hover:bg-green-700">
            <Plus className="mr-2 h-4 w-4" />
            Add New Customer
          </Button>
          <Button variant="outline">
            <FileDown className="mr-2 h-4 w-4" />
            Export Customers
          </Button>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Total Customers
              </CardTitle>
              <div className="h-8 w-8 rounded-full bg-blue-100 dark:bg-blue-900/20 flex items-center justify-center">
                <Users className="h-4 w-4 text-blue-600 dark:text-blue-400" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.total}</div>
              <p className="text-xs text-muted-foreground mt-1">All registered customers</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Active Customers
              </CardTitle>
              <div className="h-8 w-8 rounded-full bg-green-100 dark:bg-green-900/20 flex items-center justify-center">
                <ShoppingBag className="h-4 w-4 text-green-600 dark:text-green-400" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.active}</div>
              <p className="text-xs text-muted-foreground mt-1">Purchased in last 30 days</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                New This Month
              </CardTitle>
              <div className="h-8 w-8 rounded-full bg-purple-100 dark:bg-purple-900/20 flex items-center justify-center">
                <UserPlus className="h-4 w-4 text-purple-600 dark:text-purple-400" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.newThisMonth}</div>
              <p className="text-xs text-muted-foreground mt-1">First-time buyers</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                VIP Customers
              </CardTitle>
              <div className="h-8 w-8 rounded-full bg-amber-100 dark:bg-amber-900/20 flex items-center justify-center">
                <Star className="h-4 w-4 text-amber-600 dark:text-amber-400" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.vip}</div>
              <p className="text-xs text-muted-foreground mt-1">Premium buyers</p>
            </CardContent>
          </Card>
        </div>

        {/* Customer Directory */}
        <Card>
          <CardHeader>
            <CardTitle>Customer Directory</CardTitle>
            <CardDescription>
              Browse, search, and manage all customer accounts and purchase history
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Filters */}
            <div className="flex gap-4">
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[200px]">
                  <SelectValue placeholder="Customer Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Customers</SelectItem>
                  <SelectItem value="Active">Active</SelectItem>
                  <SelectItem value="Inactive">Inactive</SelectItem>
                  <SelectItem value="VIP">VIP</SelectItem>
                  <SelectItem value="First-time">First-time Buyer</SelectItem>
                </SelectContent>
              </Select>

              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search by name, email, or order #..."
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>

            {/* Customer Table */}
            {loading ? (
              <div className="text-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
                <p className="text-muted-foreground">Loading customers...</p>
              </div>
            ) : filteredCustomers.length === 0 ? (
              <div className="text-center py-12">
                <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">No customers yet</h3>
                <p className="text-muted-foreground mb-4">
                  Your customer list will appear here as you get orders.
                </p>
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  Add Test Customer
                </Button>
              </div>
            ) : (
              <div className="border rounded-lg">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Customer</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Total Orders</TableHead>
                      <TableHead>Lifetime Value</TableHead>
                      <TableHead>Last Order</TableHead>
                      <TableHead>Registration</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredCustomers.map((customer) => (
                      <TableRow key={customer.id}>
                        <TableCell>
                          <div>
                            <div className="font-medium">{customer.full_name || 'N/A'}</div>
                            <div className="text-sm text-muted-foreground">{customer.email}</div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant={getStatusBadgeVariant(getCustomerStatus(customer))}>
                            {getCustomerStatus(customer)}
                          </Badge>
                        </TableCell>
                        <TableCell>{customer.total_orders}</TableCell>
                        <TableCell>${customer.lifetime_value.toFixed(2)}</TableCell>
                        <TableCell>
                          {customer.last_order_date
                            ? formatDistanceToNow(new Date(customer.last_order_date), { addSuffix: true })
                            : 'Never'}
                        </TableCell>
                        <TableCell>
                          {new Date(customer.created_at).toLocaleDateString()}
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex items-center justify-end gap-2">
                            <Button variant="ghost" size="icon">
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon">
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon">
                              <Mail className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Customer Segmentation */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-xl font-semibold">Customer Segmentation</h3>
              <p className="text-sm text-muted-foreground mt-1">
                View customer segments and purchase behavior analytics
              </p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline">Create Segment</Button>
              <Button variant="outline">Export Report</Button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Segment Cards */}
            {segments.map((segment) => (
              <Card key={segment.type} className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="flex items-center gap-3 mb-2">
                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                      {segment.type === 'First-Time Buyers' && <UserPlus className="h-5 w-5 text-primary" />}
                      {segment.type === 'Repeat Customers' && <RefreshCcw className="h-5 w-5 text-primary" />}
                      {segment.type === 'VIP Customers' && <Star className="h-5 w-5 text-primary" />}
                      {segment.type === 'At-Risk Customers' && <AlertCircle className="h-5 w-5 text-primary" />}
                    </div>
                  </div>
                  <CardTitle className="text-lg">{segment.type}</CardTitle>
                  <div className="text-3xl font-bold mt-2">{segment.count}</div>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Average order:</span>
                    <span className="font-medium">${segment.avgOrderValue}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Conversion rate:</span>
                    <span className="font-medium">{segment.conversionRate}%</span>
                  </div>
                  <div className="pt-2 space-y-2">
                    <Button variant="outline" className="w-full" size="sm">
                      View Segment
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default CustomersManagement;
