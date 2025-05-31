import axios from 'axios';

export const baseURL = process.env.NEXT_PUBLIC_API_BACKEND;

export const sydnoServiceJson = axios.create({
    baseURL,
    headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
    },
    withCredentials: true,
    withXSRFToken: true
});

sydnoServiceJson.interceptors.request.use(async (config) => {
  try {
    if(
      config.method === 'post' ||
      config.method === 'put' ||
      config.method === 'delete' ||
      config.method === 'patch'
    ) {
      await axios.get(baseURL + '/sanctum/csrf-cookie', {withCredentials: true, withXSRFToken: true});
    }
  }
  finally {
    return config;
  }
});

export const sydnoServiceFormData = axios.create({
    baseURL,
    headers: {
        'Content-Type': 'multipart/form-data',
        'Access-Control-Allow-Origin': '*'
    },
    withCredentials: true,
    withXSRFToken: true
});

sydnoServiceFormData.interceptors.request.use(async (config) => {
  try {
    if(
      config.method === 'post' ||
      config.method === 'put' ||
      config.method === 'delete' ||
      config.method === 'patch'
    ) {
      await axios.get(baseURL + '/sanctum/csrf-cookie', {withCredentials: true, withXSRFToken: true});
    }
  }
  finally {
    return config;
  }
})
