import { ReactNode, useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useAdmin } from '@/hooks/useAdmin';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
  import {
    LayoutDashboard,
    Package,
    ShoppingCart,
    Users,
    BarChart3,
    Image,
    FileText,
    Settings,
    Building2,
    Shield,
    CreditCard,
    Truck,
    Bell,
    Search,
    ChevronRight,
    LogOut,
    Home,
    GraduationCap,
    AlertTriangle,
    TrendingUp,
    MapPin,
    Zap,
    Handshake,
    Table,
  } from 'lucide-react';

interface AdminLayoutProps {
  children: ReactNode;
}

const AdminLayout = ({ children }: AdminLayoutProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, isAdmin, loading } = useAdmin();
  const [notifications] = useState(3); // Mock notification count

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading admin panel...</p>
        </div>
      </div>
    );
  }

  if (!user || !isAdmin) {
    navigate('/admin/login');
    return null;
  }

  const menuItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/admin/dashboard' },
    { icon: Home, label: 'Home Page Sections', path: '/admin/home-sections' },
    { icon: Package, label: 'Products Management', path: '/admin/products' },
    { icon: ShoppingCart, label: 'Orders Management', path: '/admin/orders' },
    { icon: Users, label: 'Customers Management', path: '/admin/customers' },
    { icon: BarChart3, label: 'Analytics & Reports', path: '/admin/analytics' },
    { icon: Image, label: 'Media Library', path: '/admin/media-library' },
    { icon: Home, label: 'Hero Section', path: '/admin/hero-section' },
    { icon: FileText, label: 'How It Works Cards', path: '/admin/how-it-works' },
    { icon: Table, label: 'Diverse Technology Applications', path: '/admin/diverse-technology-applications' },
    { icon: AlertTriangle, label: 'Critical Gap Section', path: '/admin/critical-gap' },
    { icon: TrendingUp, label: 'Massive Market Opportunity', path: '/admin/massive-market-opportunity' },
    { icon: MapPin, label: 'Regional Focus Strategy', path: '/admin/regional-focus-strategy' },
    { icon: Zap, label: 'Core Technology Features', path: '/admin/core-technology-features' },
    { icon: Shield, label: 'No Cameras. Ever.', path: '/admin/no-cameras-ever' },
    { icon: Shield, label: 'Universal Security & Compliance', path: '/admin/universal-security-compliance' },
    { icon: FileText, label: 'Security Compliance Article', path: '/admin/security-compliance-article' },
    { icon: Table, label: 'Technology Comparison', path: '/admin/technology-comparison' },
    { icon: Building2, label: 'Technology Deployments', path: '/admin/technology-deployments' },
    { icon: Handshake, label: 'Partnership Opportunities', path: '/admin/partnership-opportunities' },
    { icon: FileText, label: 'Content Pages', path: '/admin/content' },
    { icon: FileText, label: 'Publications', path: '/admin/publications' },
    { icon: GraduationCap, label: 'Research Credibility', path: '/admin/research-credibility' },
    { icon: GraduationCap, label: 'Research In Progress', path: '/admin/research-in-progress' },
    { icon: GraduationCap, label: 'Research Hub', path: '/admin/research-hub' },
    { icon: Image, label: 'Care Solutions Showcase', path: '/admin/care-solutions-showcase' },
  ];

  const settingsItems = [
    { icon: Image, label: 'Logo Management', path: '/admin/logo' },
    { icon: Settings, label: 'Header Style', path: '/admin/header-style' },
    { icon: Settings, label: 'Footer Style', path: '/admin/footer-style' },
    { icon: Settings, label: 'System Settings', path: '/admin/settings' },
    { icon: Building2, label: 'Store Configuration', path: '/admin/store-config' },
    { icon: Shield, label: 'Staff & Permissions', path: '/admin/staff' },
    { icon: CreditCard, label: 'Payment Settings', path: '/admin/payments' },
    { icon: Truck, label: 'Shipping Settings', path: '/admin/shipping' },
  ];

  const isActive = (path: string) => location.pathname === path;

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/admin/login');
  };

  const getInitials = (email: string) => {
    return email.substring(0, 2).toUpperCase();
  };

  return (
    <div className="min-h-screen bg-background flex">
      {/* Fixed Sidebar */}
      <aside className="fixed left-0 top-0 h-screen w-60 bg-card border-r border-border flex flex-col">
        {/* Logo Section */}
        <div className="p-6 border-b border-border">
          <Link to="/admin/dashboard" className="flex items-center gap-2">
            <Shield className="h-6 w-6 text-primary" />
            <div>
              <div className="font-bold text-lg">CareAware Tech</div>
              <div className="text-xs text-muted-foreground">Admin Panel</div>
            </div>
          </Link>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto">
          {/* Main Menu */}
          <div className="p-4">
            <div className="text-xs font-semibold text-muted-foreground mb-3 px-3 tracking-wider">
              MAIN MENU
            </div>
            <div className="space-y-1">
              {menuItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all ${
                    isActive(item.path)
                      ? 'bg-primary/10 text-primary font-medium border-l-3 border-primary'
                      : 'text-muted-foreground hover:bg-secondary/80 hover:text-foreground'
                  }`}
                >
                  <item.icon className="h-4 w-4" />
                  <span className="flex-1">{item.label}</span>
                  {isActive(item.path) && <ChevronRight className="h-4 w-4" />}
                </Link>
              ))}
            </div>
          </div>

          {/* Settings Section */}
          <div className="p-4 border-t border-border">
            <div className="text-xs font-semibold text-muted-foreground mb-3 px-3 tracking-wider">
              SETTINGS
            </div>
            <div className="space-y-1">
              {settingsItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all ${
                    isActive(item.path)
                      ? 'bg-primary/10 text-primary font-medium border-l-3 border-primary'
                      : 'text-muted-foreground hover:bg-secondary/80 hover:text-foreground'
                  }`}
                >
                  <item.icon className="h-4 w-4" />
                  <span>{item.label}</span>
                </Link>
              ))}
            </div>
          </div>
        </nav>
      </aside>

      {/* Main Content Area */}
      <div className="ml-60 flex-1 flex flex-col">
        {/* Fixed Top Header */}
        <header className="fixed top-0 right-0 left-60 h-16 bg-card border-b border-border z-50 flex items-center justify-between px-8 shadow-sm">
          <div className="flex items-center gap-4">
            <h1 className="text-xl font-semibold">
              {menuItems.find(item => isActive(item.path))?.label || 
               settingsItems.find(item => isActive(item.path))?.label || 
               'Dashboard'}
            </h1>
          </div>

          <div className="flex items-center gap-4">
            {/* Search */}
            <Button variant="ghost" size="icon">
              <Search className="h-5 w-5" />
            </Button>

            {/* Notifications */}
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              {notifications > 0 && (
                <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs">
                  {notifications}
                </Badge>
              )}
            </Button>

            {/* User Menu */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="flex items-center gap-3 h-auto px-3 py-2">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback className="bg-primary text-primary-foreground text-sm">
                      {getInitials(user?.email || '')}
                    </AvatarFallback>
                  </Avatar>
                  <div className="text-left">
                    <div className="text-sm font-medium">{user?.email?.split('@')[0]}</div>
                    <div className="text-xs text-muted-foreground">Admin</div>
                  </div>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuItem onClick={() => navigate('/')}>
                  <Home className="mr-2 h-4 w-4" />
                  Back to Store
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleLogout}>
                  <LogOut className="mr-2 h-4 w-4" />
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>

        {/* Page Content */}
        <main className="mt-16 p-8 min-h-[calc(100vh-64px)]">
          {children}
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
