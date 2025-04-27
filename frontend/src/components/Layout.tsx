import Navbar from './Navbar';

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen">
      <Navbar /><br />
      <main className="flex items-center justify-center min-h-[calc(100vh-64px)] px-4">
        <div className="w-full max-w-3xl bg-gray-800 rounded-2xl p-8 shadow-lg">
          {children}
        </div>
      </main>

    </div>
  );
};

export default Layout;
