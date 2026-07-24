import { useContext } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ScrollToTop from '../components/ScrollToTop';
import { Outlet } from 'react-router-dom';
import { AppStatusContext } from '../store/contexts';
import { CircleLoader } from 'react-spinners';

function Layout() {
  const appStatus = useContext(AppStatusContext);
  const { isLoading, error } = appStatus;

  return (
    <div className="flex flex-col min-h-screen ">
      <ScrollToTop />
      <Navbar />
      {isLoading ? (
        <div className="flex flex-1 flex-col items-center justify-center gap-4">
          <CircleLoader color="#134a8e" size={64} />
          <p className="text-sm font-medium text-muted uppercase tracking-widest">
            Loading Blue Jays data
          </p>
        </div>
      ) : error ? (
        <div className="flex flex-1 items-center justify-center">
          <p>Something went wrong. Please refresh.</p>
        </div>
      ) : (
        <Outlet />
      )}
      <Footer />
    </div>
  );
}

export default Layout;
