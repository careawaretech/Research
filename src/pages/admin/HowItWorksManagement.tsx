import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAdmin } from '@/hooks/useAdmin';
import AdminLayout from '@/components/admin/AdminLayout';
import HowItWorksManager from '@/components/admin/HowItWorksManager';

const HowItWorksManagement = () => {
  const { isAdmin, loading } = useAdmin();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !isAdmin) {
      navigate('/admin/login');
    }
  }, [isAdmin, loading, navigate]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg">Loading...</div>
      </div>
    );
  }

  if (!isAdmin) {
    return null;
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">How It Works Cards Management</h1>
          <p className="text-muted-foreground mt-2">
            Manage the auto-scrolling cards section on the homepage
          </p>
        </div>
        <HowItWorksManager />
      </div>
    </AdminLayout>
  );
};

export default HowItWorksManagement;
