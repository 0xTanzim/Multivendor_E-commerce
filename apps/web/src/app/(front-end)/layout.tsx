import Footer from '@/components/frontend/layout/Footer';
import Navbar from '@/components/frontend/layout/Navbar';

export default function FrontEndLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <Navbar />

      <div className="max-w-6xl mx-auto py-6  px-8 lg:px-0">
        {children}
      </div>
        <Footer />
    </div>
  );
}
