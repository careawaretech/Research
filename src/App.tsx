import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import AcademicValidation from "./pages/AcademicValidation";
import ClinicalValidation from "./pages/ClinicalValidation";
import CaseStudies from "./pages/CaseStudies";
import Technology from "./pages/Technology";
import Privacy from "./pages/Privacy";
import Partners from "./pages/Partners";
import AboutUs from "./pages/AboutUs";
import ROI from "./pages/ROI";
import Contact from "./pages/Contact";
import ResearchHub from "./pages/ResearchHub";
import NotFound from "./pages/NotFound";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/admin/AdminDashboard";
import CustomersManagement from "./pages/admin/CustomersManagement";
import ProductsManagement from "./pages/admin/ProductsManagement";
import OrdersManagement from "./pages/admin/OrdersManagement";
import ContentManagement from "./pages/admin/ContentManagement";
import PageSectionEditor from "./pages/admin/PageSectionEditor";
import SectionEditor from "./pages/admin/SectionEditor";
import MediaLibrary from "./pages/admin/MediaLibrary";
import HeroSectionManager from "./pages/admin/HeroSectionManager";
import HowItWorksManagement from "./pages/admin/HowItWorksManagement";
import PublicationsManagement from "./pages/admin/PublicationsManagement";
import ResearchCredibilityManagement from "./pages/admin/ResearchCredibilityManagement";
import CriticalGapSectionManager from "./pages/admin/CriticalGapSectionManager";
import MassiveMarketOpportunityManager from "./pages/admin/MassiveMarketOpportunityManager";
import RegionalFocusStrategyManager from "./pages/admin/RegionalFocusStrategyManager";
import ResearchHubManagement from "./pages/admin/ResearchHubManagement";
import CoreTechnologyFeaturesManager from "./pages/admin/CoreTechnologyFeaturesManager";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/research/academic-validation" element={<AcademicValidation />} />
          <Route path="/research/clinical-validation" element={<ClinicalValidation />} />
          <Route path="/research/case-studies" element={<CaseStudies />} />
          <Route path="/technology" element={<Technology />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/partners" element={<Partners />} />
          <Route path="/roi" element={<ROI />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/research-hub" element={<ResearchHub />} />
          
          {/* Admin Routes */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/customers" element={<CustomersManagement />} />
          <Route path="/admin/products" element={<ProductsManagement />} />
          <Route path="/admin/orders" element={<OrdersManagement />} />
          <Route path="/admin/content" element={<ContentManagement />} />
          <Route path="/admin/content/sections/:pageId" element={<PageSectionEditor />} />
          <Route path="/admin/content/section/edit/:sectionId" element={<SectionEditor />} />
          <Route path="/admin/media-library" element={<MediaLibrary />} />
          <Route path="/admin/hero-section" element={<HeroSectionManager />} />
          <Route path="/admin/how-it-works" element={<HowItWorksManagement />} />
          <Route path="/admin/publications" element={<PublicationsManagement />} />
          <Route path="/admin/research-credibility" element={<ResearchCredibilityManagement />} />
          <Route path="/admin/critical-gap" element={<CriticalGapSectionManager />} />
          <Route path="/admin/massive-market-opportunity" element={<MassiveMarketOpportunityManager />} />
          <Route path="/admin/regional-focus-strategy" element={<RegionalFocusStrategyManager />} />
          <Route path="/admin/core-technology-features" element={<CoreTechnologyFeaturesManager />} />
          <Route path="/admin/research-hub" element={<ResearchHubManagement />} />
          
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
