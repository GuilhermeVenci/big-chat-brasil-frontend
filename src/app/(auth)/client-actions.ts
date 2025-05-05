import axios from 'axios';

const logoutClient = async () => {
  try {
    const response = await axios.post('/logout');

    if (response.status === 200) {
      window.location.href = '/login';
    } else {
      console.error('Failed to logout');
    }
  } catch (error) {
    console.error('Error logout:', error);
  }
};

export default logoutClient;
