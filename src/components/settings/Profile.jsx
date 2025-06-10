import {User} from 'lucide-react';
import {useState, useEffect} from 'react';
import SettingSection from './SettingSection';
import axios from 'axios';

const Profile = () => {
  const [profile, setProfile] = useState();
  useEffect(() => {
    const fetchProfileData = async () => {
      const token = localStorage.getItem('access_token');

      const response = await axios.get('http://127.0.0.1:8001/users/me/', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const {data} = response;
      setProfile(data);
    };

    fetchProfileData();
  }, []);

  return (
    <SettingSection icon={User} title={'Profile'}>
      <div className="flex flex-col sm:flex-row items-center mb-6">
        <img
          src="user.jpg"
          alt="Profile"
          className="rounded-full w-20 h-20 object-cover mr-4"
        />
        <div>
          <h3 className="text-lg font-semibold text-gray-100">
            {profile?.first_name}
          </h3>
          <p className="text-gray-400">{profile?.email}</p>
        </div>
      </div>
      <button className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded transition duration-200 w-full sm:w-auto">
        Edit Profile
      </button>
    </SettingSection>
  );
};
export default Profile;
