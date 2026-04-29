import { Link } from "react-router-dom";
import { Heart, Mail, Phone } from "lucide-react";
import logo from "@/assets/logo.jpg";
import Newsletter from "@/components/common/Newsletter";

const Footer = () => {
  return (
    <footer className="border-t bg-muted/50">
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <img src={logo} alt="Feminist logo" className="h-10 w-10 rounded-md object-cover" />
              <span className="font-heading text-lg font-bold">Feminist</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Fighting for gender equality, protecting women from violence, and challenging all forms of oppression.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="font-heading font-semibold">Quick Links</h4>
            <nav className="flex flex-col gap-2 text-sm">
              <Link to="/about" className="text-muted-foreground hover:text-primary transition-colors">About Us</Link>
              <Link to="/awareness" className="text-muted-foreground hover:text-primary transition-colors">Awareness</Link>
              <Link to="/support" className="text-muted-foreground hover:text-primary transition-colors">Get Help</Link>
              <Link to="/campaigns" className="text-muted-foreground hover:text-primary transition-colors">Campaigns</Link>
              <Link to="/events" className="text-muted-foreground hover:text-primary transition-colors">Events</Link>
              <Link to="/faq" className="text-muted-foreground hover:text-primary transition-colors">FAQ</Link>
            </nav>
          </div>

          {/* Get Involved */}
          <div className="space-y-4">
            <h4 className="font-heading font-semibold">Stay Updated</h4>
            <p className="text-sm text-muted-foreground">Get news, events and campaign updates.</p>
            <Newsletter />
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h4 className="font-heading font-semibold">Contact</h4>
            <div className="flex flex-col gap-2 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                <span>Suwilanjinachilindi033@gmail.com</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4" />
                <span>+260 977 572 269</span>
              </div>
              <div className="pt-2 text-xs">
                <strong className="text-destructive">Emergency:</strong> 933 (GBV) · 991 (Police)
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t text-center text-sm text-muted-foreground">
          <nav className="flex flex-wrap justify-center gap-x-4 gap-y-1 mb-3">
            <Link to="/privacy" className="hover:text-primary transition-colors">Privacy</Link>
            <Link to="/terms" className="hover:text-primary transition-colors">Terms</Link>
            <Link to="/accessibility" className="hover:text-primary transition-colors">Accessibility</Link>
            <Link to="/faq" className="hover:text-primary transition-colors">FAQ</Link>
            <Link to="/contact" className="hover:text-primary transition-colors">Contact</Link>
          </nav>
          <p className="flex items-center justify-center gap-1">
            Made with <Heart className="h-4 w-4 text-primary fill-primary" /> for equality
          </p>
          <p className="mt-1">© {new Date().getFullYear()} Feminist. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
