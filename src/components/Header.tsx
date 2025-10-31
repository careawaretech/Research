import React, { useState, useRef, useLayoutEffect } from 'react';
import { ChevronDown, User, Menu, X } from 'lucide-react';
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
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from './ui/navigation-menu';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const location = useLocation();
  const { isAdmin } = useAdmin();
  const navItemRefs = useRef<(HTMLAnchorElement | null)[]>([]);
  const limelightRef = useRef<HTMLDivElement | null>(null);

  const getActiveIndex = () => {
    const path = location.pathname;
    if (path === '/') return 0;
    if (path === '/technology') return 1;
    if (path === '/privacy') return 2;
    if (path.startsWith('/research')) return 3;
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
              src="https://api.builder.io/api/v1/image/assets/3f6a2b60b28243d68955555d238a6519/94af80d874be6497fc235c380dbeb6c894005e77?placeholderIfAbsent=true"
              alt="Care Aware Tech Logo"
              className="h-10 w-10 rounded-lg object-contain"
            />
            <span className="text-xl font-semibold text-white">Care Aware Tech</span>
          </div>
          
          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8 relative z-0">
            <Link 
              ref={el => (navItemRefs.current[0] = el)}
              to="/" 
              className={`text-sm font-medium transition-all duration-200 ${location.pathname === '/' ? 'text-primary' : 'text-white/70 hover:text-white'}`}
            >
              Home
            </Link>
            
            <Link 
              ref={el => (navItemRefs.current[1] = el)}
              to="/technology" 
              className={`text-sm font-medium transition-all duration-200 ${location.pathname === '/technology' ? 'text-primary' : 'text-white/70 hover:text-white'}`}
            >
              Technology
            </Link>
            
            <Link 
              ref={el => (navItemRefs.current[2] = el)}
              to="/privacy" 
              className={`text-sm font-medium transition-all duration-200 ${location.pathname === '/privacy' ? 'text-primary' : 'text-white/70 hover:text-white'}`}
            >
              Privacy
            </Link>
            
            <div ref={el => (navItemRefs.current[3] = el as any)}>
              <NavigationMenu>
                <NavigationMenuList>
                  <NavigationMenuItem>
                    <NavigationMenuTrigger className={`text-sm font-medium ${location.pathname.startsWith('/research') ? 'text-primary' : 'text-white/70 hover:text-white'}`}>
                      Research
                    </NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <ul className="grid w-[200px] gap-3 p-4">
                        <li>
                          <NavigationMenuLink asChild>
                            <Link
                              to="/research/academic-validation"
                              className="block select-none rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                            >
                              <div className="text-sm font-medium leading-none">Academic Validation</div>
                            </Link>
                          </NavigationMenuLink>
                        </li>
                        <li>
                          <NavigationMenuLink asChild>
                            <Link
                              to="/research/clinical-validation"
                              className="block select-none rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                            >
                              <div className="text-sm font-medium leading-none">Clinical Validation</div>
                            </Link>
                          </NavigationMenuLink>
                        </li>
                        <li>
                          <NavigationMenuLink asChild>
                            <Link
                              to="/research/case-studies"
                              className="block select-none rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                            >
                              <div className="text-sm font-medium leading-none">Case Studies</div>
                            </Link>
                          </NavigationMenuLink>
                        </li>
                      </ul>
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                </NavigationMenuList>
              </NavigationMenu>
            </div>
            
            <Link 
              ref={el => (navItemRefs.current[4] = el)}
              to="/partners" 
              className={`text-sm font-medium transition-all duration-200 ${location.pathname === '/partners' ? 'text-primary' : 'text-white/70 hover:text-white'}`}
            >
              Partners
            </Link>
            
            <Link 
              ref={el => (navItemRefs.current[5] = el)}
              to="/roi" 
              className={`text-sm font-medium transition-all duration-200 ${location.pathname === '/roi' ? 'text-primary' : 'text-white/70 hover:text-white'}`}
            >
              ROI
            </Link>
            
            <Link 
              ref={el => (navItemRefs.current[6] = el)}
              to="/about-us" 
              className={`text-sm font-medium transition-all duration-200 ${location.pathname === '/about-us' ? 'text-primary' : 'text-white/70 hover:text-white'}`}
            >
              About
            </Link>
            
            <Link 
              ref={el => (navItemRefs.current[7] = el)}
              to="/contact" 
              className={`text-sm font-medium transition-all duration-200 ${location.pathname === '/contact' ? 'text-primary' : 'text-white/70 hover:text-white'}`}
            >
              Contact
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
            
            <Link to={isAdmin ? "/admin/dashboard" : "/admin/login"}>
              <Button variant="outline" size="sm" className="ml-4">
                <User className="h-4 w-4 mr-2" />
                {isAdmin ? "Admin Dashboard" : "Admin Login"}
              </Button>
            </Link>
          </nav>

          {/* Mobile/Tablet Hamburger Menu */}
          <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
            <SheetTrigger asChild className="lg:hidden">
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[280px] sm:w-[320px]">
              <SheetHeader>
                <SheetTitle className="text-left">Menu</SheetTitle>
              </SheetHeader>
              <nav className="flex flex-col gap-6 mt-8">
                <Link 
                  to="/" 
                  className={`text-base font-medium transition-colors py-2 ${location.pathname === '/' ? 'text-primary' : 'text-muted-foreground hover:text-foreground'}`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  Home
                </Link>
                
                <Link 
                  to="/technology" 
                  className={`text-base font-medium transition-colors py-2 ${location.pathname === '/technology' ? 'text-primary' : 'text-muted-foreground hover:text-foreground'}`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  Technology
                </Link>
                
                <Link 
                  to="/privacy" 
                  className={`text-base font-medium transition-colors py-2 ${location.pathname === '/privacy' ? 'text-primary' : 'text-muted-foreground hover:text-foreground'}`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  Privacy
                </Link>
                
                <div className="text-base font-semibold text-gray-900 py-2">Research</div>
                <Link 
                  to="/research/academic-validation" 
                  className={`text-base font-medium transition-colors py-2 pl-4 ${location.pathname === '/research/academic-validation' ? 'text-primary' : 'text-muted-foreground hover:text-foreground'}`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  Academic Validation
                </Link>
                <Link 
                  to="/research/clinical-validation" 
                  className={`text-base font-medium transition-colors py-2 pl-4 ${location.pathname === '/research/clinical-validation' ? 'text-primary' : 'text-muted-foreground hover:text-foreground'}`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  Clinical Validation
                </Link>
                <Link 
                  to="/research/case-studies" 
                  className={`text-base font-medium transition-colors py-2 pl-4 ${location.pathname === '/research/case-studies' ? 'text-primary' : 'text-muted-foreground hover:text-foreground'}`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  Case Studies
                </Link>
                <Link 
                  to="/partners" 
                  className={`text-base font-medium transition-colors py-2 ${location.pathname === '/partners' ? 'text-primary' : 'text-muted-foreground hover:text-foreground'}`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  Partners
                </Link>
                <Link 
                  to="/roi" 
                  className={`text-base font-medium transition-colors py-2 ${location.pathname === '/roi' ? 'text-primary' : 'text-muted-foreground hover:text-foreground'}`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  ROI
                </Link>
                <Link 
                  to="/about-us" 
                  className={`text-base font-medium transition-colors py-2 ${location.pathname === '/about-us' ? 'text-primary' : 'text-muted-foreground hover:text-foreground'}`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  About
                </Link>
                <Link 
                  to="/contact" 
                  className={`text-base font-medium transition-colors py-2 ${location.pathname === '/contact' ? 'text-primary' : 'text-muted-foreground hover:text-foreground'}`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  Contact
                </Link>
                
                <Link to={isAdmin ? "/admin/dashboard" : "/admin/login"} onClick={() => setIsMenuOpen(false)}>
                  <Button variant="outline" size="lg" className="mt-4 w-full justify-start">
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
