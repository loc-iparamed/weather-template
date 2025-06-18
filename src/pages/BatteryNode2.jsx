import {motion} from 'framer-motion';
import mqtt from 'mqtt';
import {useEffect, useState} from 'react';

import BatteryLevelWidget from '../components/battery_chart/BatteryLevelWidget';

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

const BatteryNode2 = () => {
  const [dashboardData, setDashboardData] = useState({
    peopleGetOn: 25,
    peopleGetOff: 16,
    peoplePresent: 300,
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
      <main className="max-w-8xl mx-auto py-8 px-4 lg:px-8">
        <motion.div
          className="grid grid-cols-3 gap-5 mb-5"
          initial={{opacity: 0, y: 20}}
          animate={{opacity: 1, y: 0}}
          transition={{duration: 0.5}}>
          <BatteryLevelWidget level={dashboardData.cpuTemp} />
        </motion.div>
      </main>
    </div>
  );
};

export default BatteryNode2;
