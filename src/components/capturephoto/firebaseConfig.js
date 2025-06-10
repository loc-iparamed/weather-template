import {initializeApp} from 'firebase/app';
import {getStorage} from 'firebase/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyDT2KodMSj9SPScJ5j_g6n4Q4sosF19GqM',
  authDomain: 'intelschoolbus-s0203.firebaseapp.com',
  projectId: 'intelschoolbus-s0203',
  storageBucket: 'intelschoolbus-s0203.firebasestorage.app',
  messagingSenderId: '727687172905',
  appId: '1:727687172905:web:586a3efa370fe359d41d38',
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

export {storage};
