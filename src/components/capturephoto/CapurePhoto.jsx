import {useState, useEffect, useCallback} from 'react';
import {ref, listAll, getDownloadURL} from 'firebase/storage';
import {motion, AnimatePresence} from 'framer-motion';
import {
  Camera,
  Clock,
  Users,
  ChevronLeft,
  ChevronRight,
  RefreshCw,
  AlertCircle,
} from 'lucide-react';
import {storage} from './firebaseConfig';

const CapturePhoto = ({peoplePresent}) => {
  const [photoUrl, setPhotoUrl] = useState(
    localStorage.getItem('latestPhoto') || '',
  );
  const [allPhotos, setAllPhotos] = useState([]);
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lastUpdated, setLastUpdated] = useState('');
  const [isRefreshing, setIsRefreshing] = useState(false);

  const fetchPhotos = useCallback(async () => {
    setIsRefreshing(true);
    try {
      const photosRef = ref(storage, 'photos/');
      const res = await listAll(photosRef);

      if (res.items.length > 0) {
        // Get URLs for all photos
        const photoUrls = await Promise.all(
          res.items.map(async item => {
            const url = await getDownloadURL(item);
            return {
              url,
              name: item.name,
              date: new Date(item.name.split('_')[0] || Date.now()),
            };
          }),
        );

        // Sort by date, newest first
        photoUrls.sort((a, b) => b.date - a.date);

        setAllPhotos(photoUrls);

        // Set the latest photo
        if (photoUrls.length > 0) {
          const latestUrl = photoUrls[0].url;
          setPhotoUrl(latestUrl);
          localStorage.setItem('latestPhoto', latestUrl);
          setCurrentPhotoIndex(0);

          // Format the last updated time
          const lastUpdateTime = photoUrls[0].date;
          setLastUpdated(formatDate(lastUpdateTime));
        }
      }
      setError(null);
    } catch (error) {
      console.error('Error fetching photos:', error);
      setError('Failed to load photos. Please try again later.');
    } finally {
      setLoading(false);
      setIsRefreshing(false);
    }
  }, []);

  useEffect(() => {
    fetchPhotos();

    // Set up interval for auto-refresh if people are present
    let interval;
    // if (peoplePresent > 0) {
    //   interval = setInterval(fetchPhotos, 2000); // Refresh every 30 seconds
    // }
    interval = setInterval(fetchPhotos, 2000); // Refresh every 30 seconds
    return () => clearInterval(interval);
  }, [fetchPhotos, peoplePresent]);

  const formatDate = date => {
    if (!date) return '';

    const now = new Date();
    const diff = now - date;
    const diffMinutes = Math.floor(diff / 60000);

    if (diffMinutes < 1) {
      return 'Just now';
    } else if (diffMinutes < 60) {
      return `${diffMinutes} minute${diffMinutes === 1 ? '' : 's'} ago`;
    } else {
      const hours = Math.floor(diffMinutes / 60);
      if (hours < 24) {
        return `${hours} hour${hours === 1 ? '' : 's'} ago`;
      } else {
        const days = Math.floor(hours / 24);
        return `${days} day${days === 1 ? '' : 's'} ago`;
      }
    }
  };

  const navigatePhotos = direction => {
    if (allPhotos.length <= 1) return;

    let newIndex;
    if (direction === 'next') {
      newIndex = (currentPhotoIndex + 1) % allPhotos.length;
    } else {
      newIndex = (currentPhotoIndex - 1 + allPhotos.length) % allPhotos.length;
    }

    setCurrentPhotoIndex(newIndex);
    setPhotoUrl(allPhotos[newIndex].url);
    setLastUpdated(formatDate(allPhotos[newIndex].date));
  };

  return (
    <motion.div
      className="bg-gray-800/70 backdrop-blur-md shadow-xl rounded-xl border border-gray-700/50 relative overflow-hidden h-full scale-90"
      initial={{opacity: 0, y: 20}}
      animate={{opacity: 1, y: 0}}
      transition={{duration: 0.3}}
      whileHover={{
        y: -5,
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
        transition: {duration: 0.2},
      }}>
      {/* Decorative elements */}
      <div className="absolute -top-20 -right-20 w-40 h-40 bg-purple-500/10 rounded-full blur-3xl"></div>
      <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-pink-500/10 rounded-full blur-3xl"></div>

      <div className="p-5 h-full flex flex-col">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center">
            <div className="h-10 w-10 rounded-lg bg-purple-500/20 flex items-center justify-center mr-3">
              <Camera className="h-6 w-6 text-purple-400" />
            </div>
            <div>
              <h2 className="text-2xl font-medium text-gray-200">
                Capture Photo
              </h2>
              {lastUpdated && (
                <div className="flex items-center mt-1 text-xs text-gray-400">
                  <Clock className="h-3 w-3 mr-1" />
                  <span>{lastUpdated}</span>
                </div>
              )}
            </div>
          </div>

          <div className="absolute top-5 right-5 flex space-x-2 z-[9999]">
            <motion.button
              whileHover={{
                scale: 1.05,
                backgroundColor: 'rgba(139, 92, 246, 0.3)',
              }}
              whileTap={{scale: 0.95}}
              onClick={fetchPhotos}
              disabled={isRefreshing}
              className={`${
                isRefreshing
                  ? 'bg-gray-700/30 text-gray-500'
                  : 'bg-purple-500/20 text-purple-400'
              } h-9 w-9 flex items-center justify-center rounded-lg transition-colors`}
              title="Refresh photos">
              <RefreshCw
                size={18}
                className={isRefreshing ? 'animate-spin' : ''}
              />
            </motion.button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
          <div className="bg-gray-700/30 rounded-lg p-3 flex items-center justify-between">
            <div className="flex items-center">
              <Users className="h-5 w-5 mr-2 text-pink-400" />
              <span className="text-sm text-gray-400">People Present</span>
            </div>
            <div
              className={`text-base font-medium px-2 py-0.5 rounded-full ${
                peoplePresent > 0
                  ? 'bg-green-900/30 text-green-400'
                  : 'bg-gray-700/50 text-gray-400'
              }`}>
              {peoplePresent}
            </div>
          </div>

          <div className="bg-gray-700/30 rounded-lg p-3 flex items-center justify-between">
            <div className="flex items-center">
              <Camera className="h-5 w-5 mr-2 text-purple-400" />
              <span className="text-sm text-gray-400">Photos Available</span>
            </div>
            <div className="text-base font-medium text-white">
              {allPhotos.length > 0 ? (
                <span>
                  {currentPhotoIndex + 1} of {allPhotos.length}
                </span>
              ) : (
                <span>0</span>
              )}
            </div>
          </div>
        </div>

        <div className="relative flex-grow rounded-lg overflow-hidden border border-gray-700/50 bg-gray-900/50">
          {loading ? (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="flex flex-col items-center">
                <div className="h-10 w-10 border-4 border-t-purple-500 border-gray-700 rounded-full animate-spin mb-3"></div>
                <p className="text-gray-400">Loading photos...</p>
              </div>
            </div>
          ) : error ? (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="flex flex-col items-center text-center px-4">
                <AlertCircle className="h-10 w-10 text-red-400 mb-3" />
                <p className="text-gray-300 mb-2">Error Loading Photos</p>
                <p className="text-gray-400 text-sm">{error}</p>
                <motion.button
                  whileHover={{scale: 1.05}}
                  whileTap={{scale: 0.95}}
                  onClick={fetchPhotos}
                  className="mt-4 px-4 py-2 bg-purple-500/20 text-purple-400 rounded-lg hover:bg-purple-500/30 transition-colors">
                  Try Again
                </motion.button>
              </div>
            </div>
          ) : !photoUrl ? (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="flex flex-col items-center text-center px-4">
                <Camera className="h-10 w-10 text-gray-500 mb-3" />
                <p className="text-gray-300">No Photos Available</p>
                <p className="text-gray-400 text-sm mt-2">
                  {peoplePresent > 0
                    ? 'Waiting for new photos...'
                    : 'Photos will be captured when people are detected'}
                </p>
              </div>
            </div>
          ) : (
            <AnimatePresence mode="wait">
              <motion.div
                key={photoUrl}
                initial={{opacity: 0}}
                animate={{opacity: 1}}
                exit={{opacity: 0}}
                transition={{duration: 0.3}}
                className="w-full h-80 max-h-80 flex items-center justify-center">
                <img
                  src={photoUrl || '/placeholder.svg'}
                  alt="Captured"
                  className="w-full h-full object-contain"
                />
              </motion.div>
            </AnimatePresence>
          )}

          {allPhotos.length > 1 && photoUrl && (
            <>
              <motion.button
                whileHover={{scale: 1.1, backgroundColor: 'rgba(0, 0, 0, 0.5)'}}
                whileTap={{scale: 0.9}}
                onClick={() => navigatePhotos('prev')}
                className="absolute left-2 top-1/2 transform -translate-y-1/2 h-8 w-8 rounded-full bg-black/30 flex items-center justify-center text-white">
                <ChevronLeft size={20} />
              </motion.button>

              <motion.button
                whileHover={{scale: 1.1, backgroundColor: 'rgba(0, 0, 0, 0.5)'}}
                whileTap={{scale: 0.9}}
                onClick={() => navigatePhotos('next')}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 h-8 w-8 rounded-full bg-black/30 flex items-center justify-center text-white">
                <ChevronRight size={20} />
              </motion.button>
            </>
          )}
        </div>

        {/* Status indicator */}
        <div className="mt-3 flex items-center justify-between">
          <div className="flex items-center">
            <div
              className={`h-2 w-2 rounded-full ${
                peoplePresent > 0 ? 'bg-green-400 animate-pulse' : 'bg-gray-500'
              } mr-2`}></div>
            <span className="text-sm text-gray-400">
              {peoplePresent > 0
                ? 'Live monitoring active'
                : 'Waiting for detection'}
            </span>
          </div>

          {/* {allPhotos.length > 0 && (
            <div className="text-xs text-gray-400">
              {allPhotos[currentPhotoIndex]?.date?.toLocaleTimeString() || ''}
            </div>
          )} */}
        </div>
      </div>
    </motion.div>
  );
};

export default CapturePhoto;
