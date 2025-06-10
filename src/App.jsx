import {useRoutes, useLocation, Navigate} from 'react-router-dom';
import Sidebar from './components/common/Sidebar';
import 'leaflet/dist/leaflet.css';
import DashBoardPage from './pages/DashboardPage';
import PresentsPage from './pages/PresentsPage';
import LoginPage from './pages/LoginPage';
import TrackingPage from './pages/TrackingPage';
import DeviceInfoPage from './pages/DeviceInfoPage';
import PeoplePresentChart from './components/people_present_chart/PeoplePresentChart';
import SettingsPage from './pages/SettingsPage';

const PrivateRoute = ({element}) => {
  const token = localStorage.getItem('access_token');
  return token ? element : <Navigate to="/template_intelschoolbus/login" />;
};

const AppRoutes = () => {
  return useRoutes([
    {
      path: '/template_intelschoolbus/login',
      element: <LoginPage />,
    },
    {
      path: '/template_intelschoolbus/',
      element: <PrivateRoute element={<DashBoardPage />} />,
    },
    {
      path: '/template_intelschoolbus/presents',
      element: <PrivateRoute element={<PresentsPage />} />,
    },
    {
      path: '/template_intelschoolbus/tracking',
      element: <PrivateRoute element={<TrackingPage />} />,
    },
    {
      path: '/template_intelschoolbus/deviceinfo',
      element: <PrivateRoute element={<DeviceInfoPage />} />,
    },
    {
      path: '/template_intelschoolbus/view',
      element: <PrivateRoute element={<PeoplePresentChart />} />,
    },
    {
      path: '/template_intelschoolbus/settings',
      element: <PrivateRoute element={<SettingsPage />} />,
    },
    {
      path: '*',
      element: <Navigate to="/template_intelschoolbus/" />,
    },
  ]);
};

function App() {
  const location = useLocation();
  const isLoginPage = location.pathname === '/template_intelschoolbus/login';
  const routing = AppRoutes();
  return (
    <div className="flex h-screen bg-gray-900 text-gray-100 overflow-hidden">
      {!isLoginPage && (
        <>
          <div className="fixed inset-0 z-0">
            <div className="absolute inset-0 bg-gradient-to-br from-[#0F172A] via-[#1E293B] to-[#0F172A] opacity-95" />
            <div className="absolute inset-0 backdrop-blur-lg bg-[radial-gradient(circle_at_top_left,#38BDF8_0%,#1E293B_70%)] opacity-80" />
          </div>
          <Sidebar />
        </>
      )}
      {routing}
    </div>
  );
}

export default App;
