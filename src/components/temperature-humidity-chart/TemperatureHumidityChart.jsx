import {useState, useEffect} from 'react';
import ReactApexChart from 'react-apexcharts';
import {motion} from 'framer-motion';
import {ThermometerSun, Droplet} from 'lucide-react';

const TemperatureHumidityChart = ({temperature, humidity}) => {
  const [series, setSeries] = useState([
    {name: 'Temperature (°C)', data: []},
    {name: 'Humidity (%)', data: []},
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date(
        new Date().toLocaleString('en-US', {timeZone: 'Asia/Ho_Chi_Minh'}),
      );

      setSeries(prevSeries => {
        const tempData = [
          ...prevSeries[0].data.slice(-19),
          {x: now, y: temperature},
        ];
        const humidData = [
          ...prevSeries[1].data.slice(-19),
          {x: now, y: humidity},
        ];
        return [
          {...prevSeries[0], data: tempData},
          {...prevSeries[1], data: humidData},
        ];
      });
    }, 2000);

    return () => clearInterval(interval);
  }, [temperature, humidity]);

  const options = {
    chart: {
      id: 'temp-humid-realtime',
      type: 'line',
      animations: {
        enabled: true,
        easing: 'linear',
        dynamicAnimation: {speed: 1000},
      },
      toolbar: {show: false},
      zoom: {enabled: false},
      background: 'transparent',
      fontFamily: 'Inter, sans-serif',
    },
    colors: ['#facc15', '#38bdf8'],
    stroke: {
      curve: 'smooth',
      width: 3,
    },
    dataLabels: {
      enabled: false,
    },
    xaxis: {
      type: 'datetime',
      labels: {
        style: {colors: '#d1d5db', fontSize: '12px'},
        format: 'HH:mm:ss',
      },
      axisBorder: {show: false},
      axisTicks: {show: false},
    },
    yaxis: [
      {
        title: {text: '°C', style: {color: '#facc15', fontSize: '24px'}},
        labels: {
          style: {colors: '#facc15'},
          formatter: val => `${Math.round(val)}°`,
        },
        min: 0,
        max: 50,
      },
      {
        opposite: true,
        title: {text: '%', style: {color: '#38bdf8', fontSize: '24px'}},
        labels: {
          style: {colors: '#38bdf8'},
          formatter: val => `${Math.round(val)}%`,
        },
        min: 0,
        max: 100,
      },
    ],
    legend: {
      show: true,
      labels: {colors: '#d1d5db'},
      position: 'top',
    },
    tooltip: {
      theme: 'dark',
      x: {
        format: 'HH:mm:ss',
      },
    },
    grid: {
      borderColor: 'rgba(107, 114, 128, 0.2)',
      strokeDashArray: 4,
      xaxis: {lines: {show: true}},
      yaxis: {lines: {show: true}},
    },
  };

  return (
    <motion.div
      className="bg-gray-800/80 backdrop-blur-md rounded-xl p-5 shadow-lg border border-gray-700/50 relative overflow-hidden"
      initial={{opacity: 0, y: 20}}
      animate={{opacity: 1, y: 0}}
      whileHover={{y: -5, transition: {duration: 0.2}}}>
      <div className="absolute -top-20 -left-20 w-40 h-40 bg-yellow-500/10 rounded-full blur-3xl" />
      <div className="absolute -bottom-20 -right-20 w-40 h-40 bg-sky-500/10 rounded-full blur-3xl" />

      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <ThermometerSun className="text-yellow-400 w-5 h-5" />
          <Droplet className="text-sky-400 w-5 h-5" />
          <h2 className="text-xl text-white font-semibold">
            Temperature & Humidity
          </h2>
        </div>
      </div>

      <div className="h-80 w-full">
        <ReactApexChart
          options={options}
          series={series}
          type="line"
          height="100%"
          width="100%"
        />
      </div>
    </motion.div>
  );
};

export default TemperatureHumidityChart;
