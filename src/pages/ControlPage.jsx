import {useState} from 'react';
import ToggleSwitch from '../components/settings/ToggleSwitch';
import {Lightbulb, Fan, Cog, Settings} from 'lucide-react';

const ControlPage = () => {
  const [isLightOn, setIsLightOn] = useState(false);
  const [isFanOn, setIsFanOn] = useState(false);
  const [isMotorOn, setIsMotorOn] = useState(false);
  const [isManualMode, setIsManualMode] = useState(true);

  const features = [
    {
      label: 'Light',
      icon: <Lightbulb className="w-5 h-5 text-yellow-400" />,
      value: isLightOn,
      toggle: () => setIsLightOn(prev => !prev),
    },
    {
      label: 'Fan',
      icon: <Fan className="w-5 h-5 text-cyan-400" />,
      value: isFanOn,
      toggle: () => setIsFanOn(prev => !prev),
    },
    {
      label: 'Motor',
      icon: <Cog className="w-5 h-5 text-rose-400" />,
      value: isMotorOn,
      toggle: () => setIsMotorOn(prev => !prev),
    },
  ];

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
            isOn={isManualMode}
            onToggle={() => setIsManualMode(prev => !prev)}
          />
          <div className="text-sm text-gray-400 pl-1 mt-1">
            Current mode:{' '}
            <span className="text-indigo-300 font-medium">
              {isManualMode ? 'Automatic' : 'Manual'}
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
                onToggle={feature.toggle}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ControlPage;
