import {useRoutes, useLocation, Navigate} from 'react-router-dom';
import Sidebar from './components/common/Sidebar';
import 'leaflet/dist/leaflet.css';
import DashboardNode1 from './pages/DashboardNode1';
import ListNode from './pages/ListNode';
import PresentsPage from './pages/PresentsPage';
import LoginPage from './pages/LoginPage';
import TrackingPage from './pages/TrackingPage';
import DeviceInfoPage from './pages/DeviceInfoPage';
import PeoplePresentChart from './components/people_present_chart/PeoplePresentChart';
import SettingsPage from './pages/SettingsPage';
import Header from './components/common/Header';
import DashboardNode2 from './pages/DashboardNode2';

const AppRoutes = () => {
  return useRoutes([
    {
      path: '/weather-station/login',
      element: <LoginPage />,
    },
    {
      path: '/weather-station/',
      element: <ListNode />,
    },
    {
      path: '/weather-station/node1/dashboard',
      element: <DashboardNode1 />,
    },
    {
      path: '/weather-station/node2/dashboard',
      element: <DashboardNode1 />,
    },
    {
      path: '/weather-station/node1/temperature',
      element: <DashboardNode1 />,
    },
    {
      path: '/weather-station/presents',
      element: <PresentsPage />,
    },
    {
      path: '/weather-station/tracking',
      element: <TrackingPage />,
    },
    {
      path: '/weather-station/deviceinfo',
      element: <DeviceInfoPage />,
    },
    {
      path: '/weather-station/view',
      element: <PeoplePresentChart />,
    },
    {
      path: '/weather-station/settings',
      element: <SettingsPage />,
    },
    {
      path: '*',
      element: <Navigate to="/weather-station/" />,
    },
  ]);
};

function App() {
  const location = useLocation();
  const isListNode = location.pathname === '/weather-station/';
  const routing = AppRoutes();
  return (
    <div className="flex h-screen bg-gray-900 text-gray-100 overflow-hidden">
      <>
        <div className="fixed inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-br from-[#78b3bb] via-[#50787e] to-[#2d4c51] opacity-95" />
          <div className="absolute inset-0 backdrop-blur-lg bg-[radial-gradient(circle_at_top_left,#78b3bb_0%,#2d4c51_70%)] opacity-80" />
        </div>
        {!isListNode && <Sidebar />}
      </>
      <div className="flex flex-col flex-1 overflow-auto">
        {<Header title="Weather Station" />}
        {routing}
      </div>
    </div>
  );
}

export default App;
