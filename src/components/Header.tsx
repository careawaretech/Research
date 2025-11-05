import React, { useState, useRef, useLayoutEffect, useEffect } from 'react';
import { ChevronDown, User, Menu } from 'lucide-react';
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

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isResearchOpen, setIsResearchOpen] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const location = useLocation();
  const { isAdmin } = useAdmin();
  const navItemRefs = useRef<(HTMLAnchorElement | null)[]>([]);
  const limelightRef = useRef<HTMLDivElement | null>(null);
  const researchDropdownRef = useRef<HTMLDivElement | null>(null);

  const getActiveIndex = () => {
    const path = location.pathname;
    if (path === '/') return 0;
    if (path === '/technology') return 1;
    if (path === '/privacy') return 2;
    if (path.startsWith('/research')) return 3;
    if (path === '/research-hub') return 4;
    if (path === '/partners') return 5;
    if (path === '/roi') return 6;
    if (path === '/about-us') return 7;
    if (path === '/contact') return 8;
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

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (researchDropdownRef.current && !researchDropdownRef.current.contains(event.target as Node)) {
        setIsResearchOpen(false);
      }
    };

    if (isResearchOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isResearchOpen]);

  // Close dropdown on escape key
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsResearchOpen(false);
      }
    };

    if (isResearchOpen) {
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isResearchOpen]);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-slate-900/95 backdrop-blur supports-[backdrop-filter]:bg-slate-900/90">
      <div className="container mx-auto px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <img
              src="https://api.builder.io/api/v1/image/assets/3f6a2b60b28243d68955555d238a6519/94af80d874be6497fc235c380dbeb6c894005e77?placeholderIfAbsent=true"
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
            
            {/* Research Dropdown */}
            <div ref={researchDropdownRef} className="relative" style={{ position: 'relative' }}>
              <button
                ref={el => (navItemRefs.current[3] = el as any)}
                onClick={() => setIsResearchOpen(!isResearchOpen)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    setIsResearchOpen(!isResearchOpen);
                  }
                }}
                aria-expanded={isResearchOpen}
                aria-haspopup="true"
                aria-controls="research-dropdown"
                className={`text-sm font-medium transition-all duration-200 flex items-center gap-1 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-slate-900 rounded px-1 py-1 ${location.pathname.startsWith('/research') ? 'text-primary' : 'text-white/70 hover:text-white'}`}
              >
                Research
                <ChevronDown className={`h-3 w-3 transition-transform duration-200 ${isResearchOpen ? 'rotate-180' : ''}`} />
              </button>
              
              {isResearchOpen && (
                <div
                  id="research-dropdown"
                  role="menu"
                  className="absolute top-full left-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50"
                  style={{ minWidth: '200px' }}
                >
                  <Link
                    to="/research/academic-validation"
                    role="menuitem"
                    onClick={() => setIsResearchOpen(false)}
                    className="block px-4 py-3 text-sm font-medium text-slate-800 hover:bg-slate-100 transition-colors focus:outline-none focus:bg-slate-100 focus:ring-2 focus:ring-inset focus:ring-primary"
                  >
                    Academic Validation
                  </Link>
                  <Link
                    to="/research/clinical-validation"
                    role="menuitem"
                    onClick={() => setIsResearchOpen(false)}
                    className="block px-4 py-3 text-sm font-medium text-slate-800 hover:bg-slate-100 transition-colors focus:outline-none focus:bg-slate-100 focus:ring-2 focus:ring-inset focus:ring-primary"
                  >
                    Clinical Validation
                  </Link>
                  <Link
                    to="/research/case-studies"
                    role="menuitem"
                    onClick={() => setIsResearchOpen(false)}
                    className="block px-4 py-3 text-sm font-medium text-slate-800 hover:bg-slate-100 transition-colors focus:outline-none focus:bg-slate-100 focus:ring-2 focus:ring-inset focus:ring-primary"
                  >
                    Case Studies
                  </Link>
                </div>
              )}
            </div>
            
            <Link 
              ref={el => (navItemRefs.current[4] = el)}
              to="/research-hub" 
              className={`text-sm font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-slate-900 rounded px-1 py-1 ${location.pathname === '/research-hub' ? 'text-primary' : 'text-white/70 hover:text-white'}`}
            >
              Research Hub
            </Link>
            
            <Link 
              ref={el => (navItemRefs.current[5] = el)}
              to="/partners"
              className={`text-sm font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-slate-900 rounded px-1 py-1 ${location.pathname === '/partners' ? 'text-primary' : 'text-white/70 hover:text-white'}`}
            >
              Partners
            </Link>
            
            <Link 
              ref={el => (navItemRefs.current[6] = el)}
              to="/roi" 
              className={`text-sm font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-slate-900 rounded px-1 py-1 ${location.pathname === '/roi' ? 'text-primary' : 'text-white/70 hover:text-white'}`}
            >
              ROI
            </Link>
            
            <Link 
              ref={el => (navItemRefs.current[7] = el)}
              to="/about-us" 
              className={`text-sm font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-slate-900 rounded px-1 py-1 ${location.pathname === '/about-us' ? 'text-primary' : 'text-white/70 hover:text-white'}`}
            >
              About
            </Link>
            
            <Link 
              ref={el => (navItemRefs.current[8] = el)}
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
                
                <div className="border-t pt-2 mt-2">
                  <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3 px-2">Research</div>
                  <Link 
                    to="/research/academic-validation" 
                    className={`text-base font-medium transition-colors py-2 px-2 rounded block focus:outline-none focus:ring-2 focus:ring-primary ${location.pathname === '/research/academic-validation' ? 'text-primary' : 'text-muted-foreground hover:text-foreground'}`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Academic Validation
                  </Link>
                  <Link 
                    to="/research/clinical-validation" 
                    className={`text-base font-medium transition-colors py-2 px-2 rounded block focus:outline-none focus:ring-2 focus:ring-primary ${location.pathname === '/research/clinical-validation' ? 'text-primary' : 'text-muted-foreground hover:text-foreground'}`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Clinical Validation
                  </Link>
                  <Link 
                    to="/research/case-studies" 
                    className={`text-base font-medium transition-colors py-2 px-2 rounded block focus:outline-none focus:ring-2 focus:ring-primary ${location.pathname === '/research/case-studies' ? 'text-primary' : 'text-muted-foreground hover:text-foreground'}`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Case Studies
                  </Link>
                </div>
                
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
