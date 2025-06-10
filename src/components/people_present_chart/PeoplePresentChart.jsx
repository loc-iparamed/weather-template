import {useState, useEffect} from 'react';
import ReactApexChart from 'react-apexcharts';
import {motion} from 'framer-motion';
import {Users, Activity} from 'lucide-react';

const PeoplePresentChart = ({peoplePresent}) => {
  const [series, setSeries] = useState([{data: []}]);
  const [maxPeople, setMaxPeople] = useState(1);

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      setSeries(prevSeries => {
        const newData = [
          ...prevSeries[0].data.slice(-19),
          {x: now, y: peoplePresent},
        ];

        // Update max people for y-axis scaling
        const currentMax = Math.max(...newData.map(point => point.y), 1);
        if (currentMax > maxPeople) {
          setMaxPeople(currentMax);
        }

        return [{data: newData}];
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [peoplePresent, maxPeople]);

  const options = {
    chart: {
      id: 'realtime',
      type: 'line',
      animations: {
        enabled: true,
        easing: 'linear',
        dynamicAnimation: {speed: 800},
      },
      toolbar: {show: false},
      zoom: {enabled: false},
      background: 'transparent',
      fontFamily: 'Inter, sans-serif',
    },
    colors: ['#5dd0fd'],
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
        style: {colors: 'white', fontSize: '12px'},
        formatter: value => {
          return new Date(value).toLocaleTimeString('vi-VN', {
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
          });
        },
      },
      axisBorder: {show: false},
      axisTicks: {show: false},
    },
    yaxis: {
      labels: {
        style: {
          colors: 'white',
          fontSize: '12px',
        },
        formatter: value => `${Math.round(value)}`,
      },
      min: 0,
      max: Math.max(maxPeople + 1, 3), // Ensure we have some headroom
      tickAmount: 3,
    },
    grid: {
      borderColor: 'rgba(107, 114, 128, 0.2)',
      strokeDashArray: 5,
      xaxis: {
        lines: {show: true},
      },
      yaxis: {
        lines: {show: true},
      },
      padding: {
        top: 0,
        right: 0,
        bottom: 0,
        left: 10,
      },
    },
    tooltip: {
      theme: 'dark',
      x: {
        format: 'HH:mm:ss',
      },
    },
    markers: {
      size: 3,
      colors: ['#5dd0fd'],
      strokeColors: '#111827',
      strokeWidth: 2,
      hover: {
        size: 5,
      },
    },
    fill: {
      type: 'gradient',
      gradient: {
        shade: 'dark',
        type: 'vertical',
        shadeIntensity: 0.5,
        gradientToColors: ['rgba(93, 208, 253, 0.1)'],
        inverseColors: false,
        opacityFrom: 0.6,
        opacityTo: 0.1,
        stops: [0, 100],
      },
    },
  };

  return (
    <motion.div
      className="bg-gray-800/70 backdrop-blur-md shadow-xl rounded-xl p-4 border border-gray-700/50 relative overflow-hidden"
      initial={{opacity: 0, y: 20}}
      animate={{opacity: 1, y: 0}}
      transition={{delay: 0.1, duration: 0.1}}
      whileHover={{
        y: -5,
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
        transition: {duration: 0.1},
      }}>
      <div className="absolute -top-20 -right-20 w-40 h-40 bg-blue-500/10 rounded-full blur-3xl"></div>
      <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-cyan-500/10 rounded-full blur-3xl"></div>

      <div className="flex items-center justify-between w-full h-1 mb-2">
        <div className="flex items-center">
          <Users className="h-5 w-5 mr-2 text-blue-400" />
          <h2 className="text-2xl font-medium text-gray-200">People Present</h2>
        </div>
        <div className="flex items-center px-2 py-1 bg-gray-700/50 rounded-md text-xs text-gray-400">
          <Activity className="h-3 w-3 mr-1 text-green-400" />
          Live
        </div>
      </div>

      {/* <div className="flex items-center justify-between mt-2 mb-1">
        <div className="text-3xl font-bold text-white">{peoplePresent}</div>
        <div className="text-xs text-gray-400">Last 20 seconds</div>
      </div> */}

      <div className="h-40">
        <ReactApexChart
          options={options}
          series={series}
          type="area"
          height="110%"
          width="100%"
        />
      </div>

      {/* <div className="flex justify-between items-center mt-4 text-xs text-gray-100">
        <div>Max: {maxPeople}</div>
        <div>
          Avg:{' '}
          {series[0].data.length > 0
            ? (
                series[0].data.reduce((sum, point) => sum + point.y, 0) /
                series[0].data.length
              ).toFixed(1)
            : 0}
        </div>
        <div>
          Min:{' '}
          {series[0].data.length > 0
            ? Math.min(...series[0].data.map(point => point.y))
            : 0}
        </div>
      </div> */}
    </motion.div>
  );
};

export default PeoplePresentChart;
