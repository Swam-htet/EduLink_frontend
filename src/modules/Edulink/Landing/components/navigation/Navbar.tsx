import { Button } from '@/components/ui/button';
import { Menu } from 'lucide-react';

export const Navbar = () => {
  return (
    <nav className="bg-background/95 supports-[backdrop-filter]:bg-background/60 fixed top-0 right-0 left-0 z-50 border-b backdrop-blur">
      <div className="container mx-auto flex h-16 items-center px-4">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <img
            src="https://img.icons8.com/fluency/96/graduation-cap.png"
            alt="Edulink Logo"
            className="h-8 w-8"
          />
          <span className="text-xl font-bold">Edulink</span>
        </div>

        {/* Desktop Menu */}
        <div className="ml-auto hidden items-center gap-6 md:flex">
          <a href="#features" className="hover:text-primary text-sm font-medium">
            Features
          </a>
          <a href="#statistics" className="hover:text-primary text-sm font-medium">
            Statistics
          </a>
          <a href="#testimonials" className="hover:text-primary text-sm font-medium">
            Testimonials
          </a>
          <a href="#contact" className="hover:text-primary text-sm font-medium">
            Contact
          </a>
          <Button>Get Started</Button>
        </div>

        {/* Mobile Menu Button */}
        <div className="ml-auto md:hidden">
          <Button variant="ghost" size="icon">
            <Menu className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </nav>
  );
};
