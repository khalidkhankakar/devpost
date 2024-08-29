import DesktopNav from "@/components/navbar/navbar";
import LeftSidebar from "@/components/shared/left-sidebar";
import { Toaster } from "@/components/ui/toaster";

const SiteLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <section>
      <DesktopNav />
      <div className="grid md:fixed  md:h-screen w-full md:grid-cols-[270px_1fr] bg-background">
        <LeftSidebar />
        <main className="overflow-y-auto h-full main-page">{children}</main>
      </div>
      <Toaster />
    </section>
  );
};

export default SiteLayout;
