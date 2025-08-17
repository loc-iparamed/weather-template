import mqtt from 'mqtt';
import {useEffect, useState} from 'react';
import ToggleSwitch from '../components/settings/ToggleSwitch';
import {Lightbulb, Fan, Cog, Settings} from 'lucide-react';
import axios from 'axios';

const BROKER = 'wss://mqtt1.eoh.io:8084';
const TOKEN = '2c916d8d-3e86-4c14-a8a6-ca1762df14ec';

const API_TRIGGER = 'https://backend.eoh.io/api/chip_manager/trigger_action/';
const AUTH_TOKEN = 'Token f8e6e1e6e9a75ef207f3bd6252c779969750d1ed';

const topics = {
  fan: 'eoh/chip/2c916d8d-3e86-4c14-a8a6-ca1762df14ec/config/124937/value',
  light_control:
    'eoh/chip/2c916d8d-3e86-4c14-a8a6-ca1762df14ec/config/124936/value',
  manual_mode:
    'eoh/chip/2c916d8d-3e86-4c14-a8a6-ca1762df14ec/config/120306/value',
  motor: 'eoh/chip/2c916d8d-3e86-4c14-a8a6-ca1762df14ec/config/124938/value',
};

const actionKeys = {
  light: {
    on: '83df2a52-3b6a-4317-9852-5b27e342b53d',
    off: '52970501-1e9c-4bc2-bd3e-442f42caf71d',
  },
  fan: {
    on: 'd64cd2a1-580d-4804-8b22-e064124ee9b3',
    off: '63560e5b-db05-4a69-af7f-f539cb907ce6',
  },
  motor: {
    on: 'cc5ac094-7d3a-49df-be94-69e363be7c5e',
    off: '961cb293-b682-4ac1-a919-92d88e6a1880',
  },
  manual_mode: {
    on: '6647b7ad-179b-40d4-91c4-723b95357182',
    off: 'e987e092-5d5a-4fef-9e27-019d6ac5de84',
  },
};

const triggerDeviceAction = async key => {
  try {
    await axios.post(
      API_TRIGGER,
      {
        key,
        source: 'internet',
      },
      {
        headers: {
          Authorization: AUTH_TOKEN,
          'Content-Type': 'application/json',
        },
      },
    );
  } catch (err) {
    console.error('Trigger error:', err);
  }
};

const ControlPage = () => {
  const [dashboardData, setDashboardData] = useState({
    fan: 0,
    light_control: 0,
    manual_mode: 0,
    motor: 0,
  });

  const isAutoMode = dashboardData.manual_mode === 1;

  const features = [
    {
      key: 'light',
      label: 'Fan',
      icon: <Fan className="w-5 h-5 text-cyan-400" />,

      value: dashboardData.light_control,
    },
    {
      key: 'fan',
      label: 'Light',
      icon: <Lightbulb className="w-5 h-5 text-yellow-400" />,
      value: dashboardData.fan,
    },
    {
      key: 'motor',
      label: 'Motor',
      icon: <Cog className="w-5 h-5 text-rose-400" />,
      value: dashboardData.motor,
    },
  ];

  const handleToggle = (deviceKey, currentValue) => {
    const action = currentValue === 1 ? 'off' : 'on';
    const key = actionKeys[deviceKey][action];
    triggerDeviceAction(key);
  };

  const handleModeToggle = () => {
    const action = dashboardData.manual_mode === 1 ? 'off' : 'on';
    const key = actionKeys.manual_mode[action];
    triggerDeviceAction(key);
  };

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
      const matchedKey = Object.keys(topics).find(key => topics[key] === topic);
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
    <div className="bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 min-h-screen py-10 px-6 text-white font-sans">
      <div className="max-w-xl mx-auto bg-gray-900/80 backdrop-blur-md border border-gray-700 rounded-3xl shadow-2xl p-8">
        <div className="flex items-center gap-3 mb-6">
          <Settings className="text-indigo-400 w-6 h-6" />
          <h2 className="text-3xl font-bold text-indigo-300">
            Device Control Center
          </h2>
        </div>

        <div className="mb-5">
          <ToggleSwitch
            label="Control Mode"
            isOn={dashboardData.manual_mode}
            onToggle={handleModeToggle}
          />
          <div className="text-sm text-gray-400 pl-1 mt-1">
            Current mode:{' '}
            <span className="text-indigo-300 font-medium">
              {isAutoMode ? 'Automatic' : 'Manual'}
            </span>
          </div>
        </div>

        <div className="space-y-4 divide-y divide-gray-700 pt-4">
          {features.map((feature, index) => (
            <div key={index} className="flex justify-between items-center pt-4">
              <div className="flex items-center gap-3">
                {feature.icon}
                <span className="text-lg text-gray-200 font-medium">
                  {feature.label}
                </span>
              </div>
              <ToggleSwitch
                label=""
                isOn={feature.value}
                onToggle={() => handleToggle(feature.key, feature.value)}
                disabled={isAutoMode}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ControlPage;
