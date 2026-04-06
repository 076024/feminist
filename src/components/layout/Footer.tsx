import { Link } from "react-router-dom";
import { Heart, Mail, Phone } from "lucide-react";

const Footer = () => {
  return (
    <footer className="border-t bg-muted/50">
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center">
                <span className="text-primary-foreground font-heading font-bold text-sm">F</span>
              </div>
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
            </nav>
          </div>

          {/* Get Involved */}
          <div className="space-y-4">
            <h4 className="font-heading font-semibold">Get Involved</h4>
            <nav className="flex flex-col gap-2 text-sm">
              <Link to="/community" className="text-muted-foreground hover:text-primary transition-colors">Community</Link>
              <Link to="/community#volunteer" className="text-muted-foreground hover:text-primary transition-colors">Volunteer</Link>
              <Link to="/campaigns" className="text-muted-foreground hover:text-primary transition-colors">Sign a Petition</Link>
              <Link to="/contact" className="text-muted-foreground hover:text-primary transition-colors">Contact Us</Link>
            </nav>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h4 className="font-heading font-semibold">Contact</h4>
            <div className="flex flex-col gap-2 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                <span>hello@feminist.org</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4" />
                <span>+1 (800) 799-7233</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t text-center text-sm text-muted-foreground">
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
