import {useRoutes, useLocation, Navigate} from 'react-router-dom';
import Sidebar from './components/common/Sidebar';
import 'leaflet/dist/leaflet.css';
import DashboardNode1 from './pages/DashboardNode1';
import ListNode from './pages/ListNode';
import LoginPage from './pages/LoginPage';
import ControlPage from './pages/ControlPage';
import TemperatureNode1 from './pages/TemperatureNode1';
import HumidityNode1 from './pages/HumidityNode1';
import CO2Node1 from './pages/CO2Node1';
import LightNode1 from './pages/LightNode1';
import TemperatureNode2 from './pages/TemperatureNode2';
import HumidityNode2 from './pages/HumidityNode2';
import BatteryNode2 from './pages/BatteryNode2';
import SettingsPage from './pages/SettingsPage';
import Header from './components/common/Header';
import DashboardNode2 from './pages/DashboardNode2';

const AppRoutes = () => {
  return useRoutes([
    {
      path: '/weather-template/login',
      element: <LoginPage />,
    },
    {
      path: '/weather-template/',
      element: <ListNode />,
    },
    {
      path: '/weather-template/node1/dashboard',
      element: <DashboardNode1 />,
    },
    {
      path: '/weather-template/node2/dashboard',
      element: <DashboardNode2 />,
    },
    {
      path: '/weather-template/node1/temperature',
      element: <TemperatureNode1 />,
    },
    {
      path: '/weather-template/node1/humidity',
      element: <HumidityNode1 />,
    },
    {
      path: '/weather-template/node1/light',
      element: <LightNode1 />,
    },
    {
      path: '/weather-template/node1/co2',
      element: <CO2Node1 />,
    },
    {
      path: '/weather-template/node1/controller',
      element: <ControlPage />,
    },
    {
      path: '/weather-template/node2/temperature',
      element: <TemperatureNode2 />,
    },
    {
      path: '/weather-template/node2/humidity',
      element: <HumidityNode2 />,
    },
    {
      path: '/weather-template/node2/battery',
      element: <BatteryNode2 />,
    },
    {
      path: '/weather-template/settings',
      element: <SettingsPage />,
    },
    {
      path: '*',
      element: <Navigate to="/weather-template/" />,
    },
  ]);
};

function App() {
  const location = useLocation();
  const isListNode = location.pathname === '/weather-template/';
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
        {<Header title="Farm Monitoring & Control" />}
        {routing}
      </div>
    </div>
  );
}

export default App;
