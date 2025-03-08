import { Navbar } from "./navbar";
import { Footer } from "./footer";

interface MainLayoutProps {
  children: React.ReactNode;
}

export function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1 w-full max-w-screen-2xl mx-auto">{children}</main>
      <Footer />
    </div>
  );
} 