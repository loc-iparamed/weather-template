import {Users, ArrowBigUp, ArrowBigDown, MapPinned} from 'lucide-react';
import {motion} from 'framer-motion';
import mqtt from 'mqtt';
import {useEffect, useState} from 'react';
// import Header from '../components/common/Header';
import SpeedometerComponent from '../components/speedometer/SpeedometerComponent';
import StatCard from '../components/common/StatCard';
import StatCardCustom from '../components/common/StatCardCustom';
import StorageChart from '../components/storagechart/StorageChart';
import ThermalCpu from '../components/thermalcpu/ThermalCpu';
import UsageCpu from '../components/usagecpu/UsageCpu';
import PeoplePresentChart from '../components/people_present_chart/PeoplePresentChart';
import MapComponent from '../components/map/MapComponent';
import GetOnOffChart from '../components/overview/GetOnOffChart';
import LocationDisplay from '../components/locationdisplay/LocationDisplay';
import CapturePhoto from '../components/capturephoto/CapurePhoto';
import NetworkSpeed from '../components/networkspeed/NetworkSpeed';

const BROKER = 'wss://mqtt1.eoh.io:8084';
const TOKEN = '37383e7d-6c71-453d-8996-389c19673b4e';

const topics = {
  latitude: 'eoh/chip/37383e7d-6c71-453d-8996-389c19673b4e/config/89602/value',
  longitude: 'eoh/chip/37383e7d-6c71-453d-8996-389c19673b4e/config/89603/value',
  speed: 'eoh/chip/37383e7d-6c71-453d-8996-389c19673b4e/config/89604/value',
  peopleGetOn:
    'eoh/chip/37383e7d-6c71-453d-8996-389c19673b4e/config/89605/value',
  peopleGetOff:
    'eoh/chip/37383e7d-6c71-453d-8996-389c19673b4e/config/89606/value',
  totalGb: 'eoh/chip/37383e7d-6c71-453d-8996-389c19673b4e/config/89607/value',
  usedGb: 'eoh/chip/37383e7d-6c71-453d-8996-389c19673b4e/config/89608/value',
  freeGb: 'eoh/chip/37383e7d-6c71-453d-8996-389c19673b4e/config/89609/value',
  cpuUsage: 'eoh/chip/37383e7d-6c71-453d-8996-389c19673b4e/config/89610/value',
  isStorageFull:
    'eoh/chip/37383e7d-6c71-453d-8996-389c19673b4e/config/89611/value',
  cpuTemp: 'eoh/chip/37383e7d-6c71-453d-8996-389c19673b4e/config/89612/value',
  gpsStatus: 'eoh/chip/37383e7d-6c71-453d-8996-389c19673b4e/config/89613/value',
  peoplePresent:
    'eoh/chip/37383e7d-6c71-453d-8996-389c19673b4e/config/90122/value',
  uploadSpeed:
    'eoh/chip/37383e7d-6c71-453d-8996-389c19673b4e/config/92134/value',
};

const DashBoardPage = () => {
  const [dashboardData, setDashboardData] = useState({
    peopleGetOn: 25,
    peopleGetOff: 16,
    peoplePresent: 9,
    latitude: 10.784239,
    longitude: 106.6403606,
    speed: 45,
    totalGb: 238.68,
    usedGb: 38.68,
    freeGb: 200,
    cpuUsage: 20,
    isStorageFull: false,
    cpuTemp: 36,
    gpsStatus: null,
    uploadSpeed: 20,
  });

  useEffect(() => {
    const client = mqtt.connect(BROKER, {
      username: TOKEN,
      password: TOKEN,
    });

    client.on('connect', () => {
      Object.values(topics).forEach(topic => {
        client.subscribe(topic, err => {
          if (err) console.error(`Subscribe error for ${topic}:`, err);
        });
      });
    });

    client.on('message', (topic, message) => {
      const parsedMessage = JSON.parse(message.toString());
      const value = parsedMessage?.v || 0;
      setDashboardData(prev => ({
        ...prev,
        [Object.keys(topics).find(key => topics[key] === topic)]: value,
      }));
    });

    return () => {
      client.end();
    };
  }, []);

  return (
    <div className="flex-1 overflow-auto relative z-10">
      {/* <Header title="MaixCam Dashboard" /> */}
      <main className="max-w-8xl mx-auto py-8 px-4 lg:px-8">
        <motion.div
          className="grid grid-cols-3 gap-5 mb-5"
          initial={{opacity: 0, y: 20}}
          animate={{opacity: 1, y: 0}}
          transition={{duration: 0.5}}>
          <div className="grid gap-5">
            <div className="grid grid-cols-2 gap-5">
              <StatCard
                name="Get On"
                icon={ArrowBigUp}
                value={dashboardData.peopleGetOn}
                color="#6EE7B7"
              />
              <StatCard
                name="Get Off"
                icon={ArrowBigDown}
                value={dashboardData.peopleGetOff}
                color="#FACC15"
              />
            </div>
            <StatCardCustom
              name="Student Presence Count"
              icon={Users}
              value={dashboardData.peoplePresent}
              color="#EC4899"
            />
          </div>
          <div className="grid grid-rows-[1fr_0.8fr] gap-5">
            <GetOnOffChart
              peopleGetOn={dashboardData.peopleGetOn}
              peopleGetOff={dashboardData.peopleGetOff}
            />
            <PeoplePresentChart peoplePresent={dashboardData.peoplePresent} />
          </div>
          <CapturePhoto peoplePresent={dashboardData.peoplePresent} />
        </motion.div>

        <motion.div
          initial={{opacity: 0, y: 20}}
          animate={{opacity: 1, y: 0}}
          transition={{duration: 0.5}}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 ">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
              <LocationDisplay
                name="GPS Location"
                icon={MapPinned}
                value={{
                  latitude: dashboardData.latitude,
                  longitude: dashboardData.longitude,
                  gpsStatus: dashboardData.gpsStatus,
                  speed: dashboardData.speed,
                }}
                color="#60a5fa"
              />
              <SpeedometerComponent speed={dashboardData.speed} />
            </div>
            <MapComponent
              latitude={dashboardData.latitude}
              longitude={dashboardData.longitude}
              speed={dashboardData.speed}
            />
          </div>
        </motion.div>

        <motion.div
          className="mt-5"
          initial={{opacity: 0, y: 20}}
          animate={{opacity: 1, y: 0}}
          transition={{duration: 0.5}}>
          <div className="grid grid-cols-3 gap-5">
            <StorageChart
              totalGb={dashboardData.totalGb}
              usedGb={dashboardData.usedGb}
              freeGb={dashboardData.freeGb}
            />
            <div className="grid grid-rows-2 gap-3">
              <ThermalCpu cpuTemp={dashboardData.cpuTemp} />
              <UsageCpu cpuUsage={dashboardData.cpuUsage} />
            </div>
            <NetworkSpeed speed={dashboardData.uploadSpeed} />
          </div>
        </motion.div>
      </main>
    </div>
  );
};

export default DashBoardPage;
