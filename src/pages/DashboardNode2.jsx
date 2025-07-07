import {motion} from 'framer-motion';
import mqtt from 'mqtt';
import {useEffect, useState} from 'react';

import TemperatureWidget from '../components/temperature-widget/TemperatureWidget';
import TemperatureHumidityChart from '../components/temperature-humidity-chart/TemperatureHumidityChart';
import HumidityWidget from '../components/humidity-widget/HumidityWidget';
import BatteryLevelWidget from '../components/battery_chart/BatteryLevelWidget';
import ClinicNode2Chart from '../components/clinic_node2_chart/ClinicNode2Chart';

const BROKER = 'wss://mqtt1.eoh.io:8084';
const TOKEN = '2c916d8d-3e86-4c14-a8a6-ca1762df14ec';

const topics = {
  humid: 'eoh/chip/2c916d8d-3e86-4c14-a8a6-ca1762df14ec/config/124940/value',
  temp: 'eoh/chip/2c916d8d-3e86-4c14-a8a6-ca1762df14ec/config/124939/value',
  battery: 'eoh/chip/2c916d8d-3e86-4c14-a8a6-ca1762df14ec/config/124941/value',
};

const DashboardNode2 = () => {
  const [dashboardData, setDashboardData] = useState({
    humid: 70,
    temp: 32,
    battery: 50,
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
      let value = parsedMessage?.v || 0;

      const matchedKey = Object.keys(topics).find(key => topics[key] === topic);

      if (matchedKey === 'temp') {
        value = Math.round(value * 10) / 10;
      }

      if (matchedKey) {
        setDashboardData(prev => ({
          ...prev,
          [matchedKey]: value,
        }));
      }
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
          <TemperatureWidget temperature={dashboardData.temp} />
          <HumidityWidget humidity={dashboardData.humid} />
          <BatteryLevelWidget level={dashboardData.battery} />
        </motion.div>
        <motion.div
          className="grid grid-cols-2 gap-5 mb-5"
          initial={{opacity: 0, y: 20}}
          animate={{opacity: 1, y: 0}}
          transition={{duration: 0.5}}>
          <ClinicNode2Chart
            temperature={dashboardData.temp}
            humidity={dashboardData.humid}
          />
          <TemperatureHumidityChart
            temperature={dashboardData.temp}
            humidity={dashboardData.humid}
          />
        </motion.div>
      </main>
    </div>
  );
};

export default DashboardNode2;
