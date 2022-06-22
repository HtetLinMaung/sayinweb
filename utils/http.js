import axios from "axios";

export const host = "http://150.95.82.125:4040";
// export const host = "http://localhost:4040";

const getAuthHeader = () => ({
  Authorization: `Bearer ${localStorage.getItem("token")}`,
});

export const http = {
  get: async (url, params) => {
    try {
      const response = await axios.get(`${host}${url}`, {
        params,
        headers: { ...getAuthHeader() },
      });
      return [null, response];
    } catch (err) {
      return [err, null];
    }
  },
  post: async (url, data) => {
    try {
      const response = await axios.post(`${host}${url}`, data, {
        headers: { ...getAuthHeader() },
      });
      return [null, response];
    } catch (err) {
      return [err, null];
    }
  },
  put: async (url, data) => {
    try {
      const response = await axios.put(`${host}${url}`, data, {
        headers: { ...getAuthHeader() },
      });
      return [null, response];
    } catch (err) {
      return [err, null];
    }
  },
  delete: async (url) => {
    try {
      const response = await axios.delete(`${host}${url}`, {
        headers: { ...getAuthHeader() },
      });
      return [null, response];
    } catch (err) {
      return [err, null];
    }
  },
};
