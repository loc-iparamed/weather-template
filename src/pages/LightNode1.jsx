import {motion} from 'framer-motion';
import mqtt from 'mqtt';
import {useEffect, useState} from 'react';

import LightPhotonWidget from '../components/light-photon-widget/LightPhotonWidget';

const BROKER = 'wss://mqtt1.eoh.io:8084';
const TOKEN = '2c916d8d-3e86-4c14-a8a6-ca1762df14ec';

const topics = {
  humid: 'eoh/chip/2c916d8d-3e86-4c14-a8a6-ca1762df14ec/config/120303/value',
  temp: 'eoh/chip/2c916d8d-3e86-4c14-a8a6-ca1762df14ec/config/119620/value',
  co2: 'eoh/chip/2c916d8d-3e86-4c14-a8a6-ca1762df14ec/config/120305/value',
  light: 'eoh/chip/2c916d8d-3e86-4c14-a8a6-ca1762df14ec/config/120304/value',
};
const LightNode1 = () => {
  const [dashboardData, setDashboardData] = useState({
    co2: 10,
    humid: 70,
    temp: 32,
    light: 1,
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
          className="grid grid-cols-2 gap-5 mb-5"
          initial={{opacity: 0, y: 20}}
          animate={{opacity: 1, y: 0}}
          transition={{duration: 0.5}}>
          <LightPhotonWidget lightDetected={dashboardData.light} />
        </motion.div>
      </main>
    </div>
  );
};

export default LightNode1;
