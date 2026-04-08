import { Link, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import {
  LayoutDashboard,
  FileText,
  MessageSquare,
  Heart,
  Megaphone,
  Mail,
  CalendarDays,
  LogOut,
  ArrowLeft,
} from "lucide-react";

const adminNav = [
  { to: "/admin", label: "Dashboard", icon: LayoutDashboard, end: true },
  { to: "/admin/blog", label: "Blog Posts", icon: FileText },
  { to: "/admin/help-requests", label: "Help Requests", icon: MessageSquare },
  { to: "/admin/testimonials", label: "Testimonials", icon: Heart },
  { to: "/admin/campaigns", label: "Campaigns", icon: Megaphone },
  { to: "/admin/contacts", label: "Contact Messages", icon: Mail },
  { to: "/admin/events", label: "Events", icon: CalendarDays },
];

const AdminLayout = () => {
  const { signOut } = useAuth();
  const location = useLocation();

  const isActive = (path: string, end?: boolean) =>
    end ? location.pathname === path : location.pathname.startsWith(path);

  return (
    <div className="min-h-screen flex bg-muted/30">
      {/* Sidebar */}
      <aside className="w-64 bg-background border-r flex flex-col shrink-0">
        <div className="p-4 border-b">
          <Link to="/" className="flex items-center gap-2 text-muted-foreground hover:text-foreground text-sm mb-3">
            <ArrowLeft className="h-4 w-4" /> Back to site
          </Link>
          <h2 className="font-heading text-lg font-bold text-foreground">Admin Panel</h2>
        </div>
        <nav className="flex-1 p-3 space-y-1">
          {adminNav.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className={`flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                isActive(item.to, item.end)
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted"
              }`}
            >
              <item.icon className="h-4 w-4" />
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="p-3 border-t">
          <Button variant="ghost" size="sm" onClick={signOut} className="w-full justify-start gap-2">
            <LogOut className="h-4 w-4" /> Sign Out
          </Button>
        </div>
      </aside>

      {/* Content */}
      <main className="flex-1 p-6 overflow-auto">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
