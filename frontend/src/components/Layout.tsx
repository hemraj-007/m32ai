import Navbar from './Navbar';

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="px-4 py-6 max-w-5xl mx-auto">{children}</main>
    </div>
  );
};

export default Layout;
