import axios from 'axios';

const instance = axios.create({
   baseURL: 'https://react-my-burger-efee7.firebaseio.com/' 
});

export default instance;