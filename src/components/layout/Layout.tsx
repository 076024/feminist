import { forwardRef, ReactNode } from "react";
import Header from "./Header";
import Footer from "./Footer";
import QuickExit from "@/components/safety/QuickExit";
import CrisisBanner from "@/components/safety/CrisisBanner";
import BackToTop from "@/components/common/BackToTop";

const Layout = forwardRef<HTMLDivElement, { children: ReactNode }>(({ children }, ref) => {
  return (
    <div ref={ref} className="min-h-screen flex flex-col">
      <CrisisBanner />
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
      <QuickExit />
      <BackToTop />
    </div>
  );
});
Layout.displayName = "Layout";

export default Layout;
