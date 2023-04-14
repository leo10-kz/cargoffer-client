import axios from 'axios';

export default axios.create({
  baseURL: 'http://localhost:3000',// la URL base se completará con los endpoints de nuestra aplicación backend
  responseType: 'json',
  timeout: 80000,
  headers: {
    'Access-Control-Allow-Origin':'*',
    'Access-Control-Allow-Methods': ['GET', 'POST', 'PUT', 'DELETE'],
    'Access-Control-Allow-Headers':'*',
    'cache-control': 'no-cache'
  }
});
