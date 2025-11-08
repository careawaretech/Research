import React, { useState, useRef, useLayoutEffect, useEffect } from 'react';
import { User, Menu } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from './ui/button';
import { useAdmin } from '@/hooks/useAdmin';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from './ui/sheet';
import { supabase } from '@/integrations/supabase/client';
import logo from '@/assets/logo.png';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const [currentLogo, setCurrentLogo] = useState<string>(logo);
  const location = useLocation();
  const { isAdmin } = useAdmin();
  const navItemRefs = useRef<(HTMLAnchorElement | null)[]>([]);
  const limelightRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const fetchLogo = async () => {
      try {
        const { data, error } = await supabase
          .from('site_settings')
          .select('setting_value')
          .eq('setting_key', 'active_logo_url')
          .single();

        if (!error && data?.setting_value) {
          setCurrentLogo(data.setting_value);
        }
      } catch (error) {
        console.error('Error fetching logo:', error);
      }
    };

    fetchLogo();
  }, []);

  const getActiveIndex = () => {
    const path = location.pathname;
    if (path === '/') return 0;
    if (path === '/technology') return 1;
    if (path === '/privacy') return 2;
    if (path === '/research-hub') return 3;
    if (path === '/partners') return 4;
    if (path === '/roi') return 5;
    if (path === '/about-us') return 6;
    if (path === '/contact') return 7;
    return 0;
  };

  const activeIndex = getActiveIndex();

  useLayoutEffect(() => {
    const limelight = limelightRef.current;
    const activeItem = navItemRefs.current[activeIndex];
    
    if (limelight && activeItem) {
      const newLeft = activeItem.offsetLeft + activeItem.offsetWidth / 2 - limelight.offsetWidth / 2;
      limelight.style.left = `${newLeft}px`;

      if (!isReady) {
        setTimeout(() => setIsReady(true), 50);
      }
    }
  }, [activeIndex, isReady]);


  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-slate-900/95 backdrop-blur supports-[backdrop-filter]:bg-slate-900/90">
      <div className="container mx-auto px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <img
              src={currentLogo}
              alt="Care Aware Tech Logo"
              className="h-10 w-10 rounded-lg object-contain"
            />
            <span className="text-xl font-semibold text-white">Care Aware Tech</span>
          </div>
          
          {/* Desktop Navigation */}
          <nav aria-label="Main" className="hidden lg:flex items-center gap-8 relative z-0">
            <Link 
              ref={el => (navItemRefs.current[0] = el)}
              to="/" 
              className={`text-sm font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-slate-900 rounded px-1 py-1 ${location.pathname === '/' ? 'text-primary' : 'text-white/70 hover:text-white'}`}
            >
              Home
            </Link>
            
            <Link 
              ref={el => (navItemRefs.current[1] = el)}
              to="/technology" 
              className={`text-sm font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-slate-900 rounded px-1 py-1 ${location.pathname === '/technology' ? 'text-primary' : 'text-white/70 hover:text-white'}`}
            >
              Technology
            </Link>
            
            <Link 
              ref={el => (navItemRefs.current[2] = el)}
              to="/privacy" 
              className={`text-sm font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-slate-900 rounded px-1 py-1 ${location.pathname === '/privacy' ? 'text-primary' : 'text-white/70 hover:text-white'}`}
            >
              Privacy
            </Link>
            
            <Link 
              ref={el => (navItemRefs.current[3] = el)}
              to="/research-hub" 
              className={`text-sm font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-slate-900 rounded px-1 py-1 ${location.pathname === '/research-hub' ? 'text-primary' : 'text-white/70 hover:text-white'}`}
            >
              Research Hub
            </Link>
            
            <Link 
              ref={el => (navItemRefs.current[4] = el)}
              to="/partners"
              className={`text-sm font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-slate-900 rounded px-1 py-1 ${location.pathname === '/partners' ? 'text-primary' : 'text-white/70 hover:text-white'}`}
            >
              Partners
            </Link>
            
            <Link 
              ref={el => (navItemRefs.current[5] = el)}
              to="/roi" 
              className={`text-sm font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-slate-900 rounded px-1 py-1 ${location.pathname === '/roi' ? 'text-primary' : 'text-white/70 hover:text-white'}`}
            >
              ROI
            </Link>
            
            <Link 
              ref={el => (navItemRefs.current[6] = el)}
              to="/about-us" 
              className={`text-sm font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-slate-900 rounded px-1 py-1 ${location.pathname === '/about-us' ? 'text-primary' : 'text-white/70 hover:text-white'}`}
            >
              About
            </Link>
            
            <Link 
              ref={el => (navItemRefs.current[7] = el)}
              to="/contact" 
              className={`text-sm font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-slate-900 rounded px-1 py-1 ${location.pathname === '/contact' ? 'text-primary' : 'text-white/70 hover:text-white'}`}
            >
              Contact
            </Link>

            <Link 
              to={isAdmin ? "/admin/dashboard" : "/admin/login"}
              className="ml-4 text-sm font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-slate-900 rounded"
            >
              <Button variant="outline" size="sm" className="focus:ring-0">
                <User className="h-4 w-4 mr-2" />
                {isAdmin ? "Admin Dashboard" : "Admin Login"}
              </Button>
            </Link>

            {/* Limelight Effect */}
            <div 
              ref={limelightRef}
              className={`absolute -top-2 z-20 w-11 h-[5px] rounded-full bg-primary shadow-[0_0_30px_hsl(var(--primary))] ${
                isReady ? 'transition-[left] duration-400 ease-in-out' : ''
              }`}
              style={{ left: '-999px' }}
            >
              <div className="absolute left-[-30%] top-[5px] w-[160%] h-14 [clip-path:polygon(5%_100%,25%_0,75%_0,95%_100%)] bg-gradient-to-b from-primary/30 to-transparent pointer-events-none" />
            </div>
          </nav>

          {/* Mobile/Tablet Hamburger Menu */}
          <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
            <SheetTrigger asChild className="lg:hidden">
              <Button 
                variant="ghost" 
                size="icon"
                aria-label="Open menu"
                aria-expanded={isMenuOpen}
              >
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[280px] sm:w-[320px]">
              <SheetHeader>
                <SheetTitle className="text-left">Navigation Menu</SheetTitle>
              </SheetHeader>
              <nav aria-label="Mobile navigation" className="flex flex-col gap-4 mt-8">
                <Link 
                  to="/" 
                  className={`text-base font-medium transition-colors py-2 px-2 rounded focus:outline-none focus:ring-2 focus:ring-primary ${location.pathname === '/' ? 'text-primary' : 'text-muted-foreground hover:text-foreground'}`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  Home
                </Link>
                
                <Link 
                  to="/technology" 
                  className={`text-base font-medium transition-colors py-2 px-2 rounded focus:outline-none focus:ring-2 focus:ring-primary ${location.pathname === '/technology' ? 'text-primary' : 'text-muted-foreground hover:text-foreground'}`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  Technology
                </Link>
                
                <Link 
                  to="/privacy" 
                  className={`text-base font-medium transition-colors py-2 px-2 rounded focus:outline-none focus:ring-2 focus:ring-primary ${location.pathname === '/privacy' ? 'text-primary' : 'text-muted-foreground hover:text-foreground'}`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  Privacy
                </Link>
                
                <Link 
                  to="/research-hub" 
                  className={`text-base font-medium transition-colors py-2 px-2 rounded focus:outline-none focus:ring-2 focus:ring-primary ${location.pathname === '/research-hub' ? 'text-primary' : 'text-muted-foreground hover:text-foreground'}`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  Research Hub
                </Link>
                
                <Link 
                  to="/partners" 
                  className={`text-base font-medium transition-colors py-2 px-2 rounded focus:outline-none focus:ring-2 focus:ring-primary ${location.pathname === '/partners' ? 'text-primary' : 'text-muted-foreground hover:text-foreground'}`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  Partners
                </Link>
                
                <Link 
                  to="/roi" 
                  className={`text-base font-medium transition-colors py-2 px-2 rounded focus:outline-none focus:ring-2 focus:ring-primary ${location.pathname === '/roi' ? 'text-primary' : 'text-muted-foreground hover:text-foreground'}`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  ROI
                </Link>
                
                <Link 
                  to="/about-us" 
                  className={`text-base font-medium transition-colors py-2 px-2 rounded focus:outline-none focus:ring-2 focus:ring-primary ${location.pathname === '/about-us' ? 'text-primary' : 'text-muted-foreground hover:text-foreground'}`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  About
                </Link>
                
                <Link 
                  to="/contact" 
                  className={`text-base font-medium transition-colors py-2 px-2 rounded focus:outline-none focus:ring-2 focus:ring-primary ${location.pathname === '/contact' ? 'text-primary' : 'text-muted-foreground hover:text-foreground'}`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  Contact
                </Link>
                
                <Link 
                  to={isAdmin ? "/admin/dashboard" : "/admin/login"} 
                  onClick={() => setIsMenuOpen(false)}
                  className="mt-4"
                >
                  <Button variant="outline" size="lg" className="w-full justify-start">
                    <User className="h-4 w-4 mr-2" />
                    {isAdmin ? "Admin Dashboard" : "Admin Login"}
                  </Button>
                </Link>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};

export default Header;
