import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { lazy, Suspense } from "react";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider } from "@/contexts/AuthContext";
import ProtectedRoute from "@/components/admin/ProtectedRoute";
import Index from "./pages/Index";
const About = lazy(() => import("./pages/About"));
const Awareness = lazy(() => import("./pages/Awareness"));
const BlogPostPage = lazy(() => import("./pages/BlogPost"));
const Support = lazy(() => import("./pages/Support"));
const Community = lazy(() => import("./pages/Community"));
const Campaigns = lazy(() => import("./pages/Campaigns"));
const Contact = lazy(() => import("./pages/Contact"));
const NotFound = lazy(() => import("./pages/NotFound"));
const AdminLogin = lazy(() => import("./pages/admin/AdminLogin"));
const AdminLayout = lazy(() => import("./components/admin/AdminLayout"));
const AdminDashboard = lazy(() => import("./pages/admin/AdminDashboard"));
const AdminBlog = lazy(() => import("./pages/admin/AdminBlog"));
const AdminHelpRequests = lazy(() => import("./pages/admin/AdminHelpRequests"));
const AdminTestimonials = lazy(() => import("./pages/admin/AdminTestimonials"));
const AdminCampaigns = lazy(() => import("./pages/admin/AdminCampaigns"));
const AdminContacts = lazy(() => import("./pages/admin/AdminContacts"));
const AdminEvents = lazy(() => import("./pages/admin/AdminEvents"));
const AdminVolunteers = lazy(() => import("./pages/admin/AdminVolunteers"));
const AdminPetitions = lazy(() => import("./pages/admin/AdminPetitions"));

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <Suspense fallback={<div className="min-h-screen" />}>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/about" element={<About />} />
            <Route path="/awareness" element={<Awareness />} />
            <Route path="/awareness/:id" element={<BlogPostPage />} />
            <Route path="/support" element={<Support />} />
            <Route path="/community" element={<Community />} />
            <Route path="/campaigns" element={<Campaigns />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin" element={<ProtectedRoute><AdminLayout /></ProtectedRoute>}>
              <Route index element={<AdminDashboard />} />
              <Route path="blog" element={<AdminBlog />} />
              <Route path="help-requests" element={<AdminHelpRequests />} />
              <Route path="testimonials" element={<AdminTestimonials />} />
              <Route path="campaigns" element={<AdminCampaigns />} />
              <Route path="contacts" element={<AdminContacts />} />
              <Route path="events" element={<AdminEvents />} />
              <Route path="volunteers" element={<AdminVolunteers />} />
              <Route path="petitions" element={<AdminPetitions />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
          </Suspense>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
