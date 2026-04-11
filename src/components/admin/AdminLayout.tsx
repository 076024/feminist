import { useState } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";
import {
  LayoutDashboard,
  FileText,
  MessageSquare,
  Heart,
  Megaphone,
  Mail,
  CalendarDays,
  Users,
  ClipboardList,
  LogOut,
  ArrowLeft,
  Menu,
} from "lucide-react";

const adminNav = [
  { to: "/admin", label: "Dashboard", icon: LayoutDashboard, end: true },
  { to: "/admin/blog", label: "Blog Posts", icon: FileText },
  { to: "/admin/help-requests", label: "Help Requests", icon: MessageSquare },
  { to: "/admin/testimonials", label: "Testimonials", icon: Heart },
  { to: "/admin/campaigns", label: "Campaigns", icon: Megaphone },
  { to: "/admin/contacts", label: "Contact Messages", icon: Mail },
  { to: "/admin/events", label: "Events", icon: CalendarDays },
  { to: "/admin/volunteers", label: "Volunteers", icon: Users },
  { to: "/admin/petitions", label: "Petitions", icon: ClipboardList },
];

const SidebarContent = ({ signOut, isActive }: { signOut: () => void; isActive: (path: string, end?: boolean) => boolean }) => (
  <>
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
  </>
);

const AdminLayout = () => {
  const { signOut } = useAuth();
  const location = useLocation();
  const [open, setOpen] = useState(false);

  const isActive = (path: string, end?: boolean) =>
    end ? location.pathname === path : location.pathname.startsWith(path);

  return (
    <div className="min-h-screen flex bg-muted/30">
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex w-64 bg-background border-r flex-col shrink-0">
        <SidebarContent signOut={signOut} isActive={isActive} />
      </aside>

      {/* Mobile Header + Sheet */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-40 bg-background border-b px-4 py-3 flex items-center gap-3">
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon">
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="p-0 w-64 flex flex-col">
            <SheetTitle className="sr-only">Navigation</SheetTitle>
            <div onClick={() => setOpen(false)}>
              <SidebarContent signOut={signOut} isActive={isActive} />
            </div>
          </SheetContent>
        </Sheet>
        <h2 className="font-heading text-lg font-bold">Admin</h2>
      </div>

      {/* Content */}
      <main className="flex-1 p-6 overflow-auto md:pt-6 pt-20">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
