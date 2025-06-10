import {useState, useEffect} from 'react';
import SettingSection from './SettingSection';
import {Bell, AlarmClock} from 'lucide-react';
import ToggleSwitch from './ToggleSwitch';
import {AnimatePresence, motion} from 'framer-motion';
import api from '../../api';
const Notifications = () => {
  const [isAlert, setIsAlert] = useState(true);
  const [isEmergency, setIsEmergency] = useState(false);
  const [alertMsg, setAlertMsg] = useState('');
  const [timing, setTiming] = useState('');
  const [counter, setCounter] = useState('');

  const triggerEmergency = async () => {
    try {
      await api.post('/busdata/test-alert/');

      setAlertMsg('Success!');
    } catch (err) {
      console.error('Timing API Error:', err);
      setAlertMsg('Không thể gửi thời gian đến máy chủ.');
    }
  };

  // For reuse testing
  // const handleSetCounter = async () => {
  //   if (!counter) return;

  //   try {
  //     await api.post('/busdata/start-timing-alert/', {
  //       timing: parseInt(counter),
  //     });

  //     setAlertMsg('⏱ Đã bắt đầu hẹn giờ cảnh báo!');
  //   } catch (err) {
  //     console.error('Timing API Error:', err);
  //     setAlertMsg('Không thể gửi thời gian đến máy chủ.');
  //   }
  // };

  const updateCounter = async () => {
    if (!timing) {
      setAlertMsg('⚠️ Vui lòng nhập số giây hợp lệ.');
      return;
    }

    try {
      await api.patch('/users/me/', {
        counter: parseInt(timing) * 60,
      });

      setAlertMsg('✅ Cập nhật thời gian cảnh báo thành công!');
    } catch (error) {
      console.error('Lỗi cập nhật counter:', error);
      setAlertMsg('❌ Không thể cập nhật thời gian. Vui lòng thử lại.');
    }
  };

  useEffect(() => {
    const fetchProfileData = async () => {
      const response = await api.get('/users/me/', {});
      const {data} = response;

      setTiming(data.counter ? Math.floor(data.counter / 60) : '');
    };

    fetchProfileData();
  }, []);

  useEffect(() => {
    const ws = new WebSocket('ws://127.0.0.1:8001/ws/alert/');

    ws.onmessage = e => {
      const data = JSON.parse(e.data);
      if (data.message === 'ALERT') {
        setAlertMsg('🛑 CẢNH BÁO: Có người bị bỏ quên trên xe!');
      }
    };

    ws.onerror = e => {
      console.error('WebSocket error:', e);
    };

    return () => ws.close();
  }, []);

  // Auto-hide alert after 5 seconds
  useEffect(() => {
    if (alertMsg) {
      const timer = setTimeout(() => setAlertMsg(''), 5000);
      return () => clearTimeout(timer);
    }
  }, [alertMsg]);

  return (
    <>
      <SettingSection icon={Bell} title={'Notifications'}>
        <ToggleSwitch
          label={'Push Notifications'}
          isOn={isAlert}
          onToggle={() => setIsAlert(!isAlert)}
        />

        {isAlert && (
          <div className="mb-5 space-y-3">
            <label className="block text-gray-400 text-sm font-semibold mb-2">
              Config alert time (Minute)
            </label>
            <div className="relative flex items-center space-x-3 mt-6">
              <div className="relative flex-grow">
                <AlarmClock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="number"
                  value={timing}
                  onChange={e => setTiming(e.target.value)}
                  className="w-full py-2 px-5 pl-10 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-yellow-500 transition text-base"
                  placeholder="Type the minutes"
                  min={0}
                />
              </div>

              <button
                onClick={updateCounter}
                className="bg-indigo-800 hover:bg-indigo-600 text-white font-medium py-2 px-6 rounded-md transition focus:outline-none text-base whitespace-nowrap">
                Confirm
              </button>
            </div>
          </div>
        )}
        <ToggleSwitch
          label={'Push Notifications'}
          isOn={isEmergency}
          onToggle={() => setIsEmergency(!isEmergency)}
        />

        {isEmergency && (
          <button
            onClick={triggerEmergency}
            className="bg-orange-800 w-full hover:bg-yellow-600 text-white font-medium py-4  rounded-md transition focus:outline-none text-base whitespace-nowrap">
            Trigger Emergency
          </button>
        )}
      </SettingSection>

      {/* ✅ Popup Alert */}
      <AnimatePresence>
        {alertMsg && (
          <motion.div
            initial={{opacity: 0, y: 30}}
            animate={{opacity: 1, y: 0}}
            exit={{opacity: 0, y: 30}}
            transition={{duration: 0.3}}
            className="fixed bottom-5 right-5 bg-gray-800 text-white text-sm px-4 py-3 rounded-lg shadow-lg z-50">
            {alertMsg}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Notifications;
