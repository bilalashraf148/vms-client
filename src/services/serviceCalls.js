import axios from "axios"
import { getJWToken } from "../utils"

// const BASE_URL = "http://localhost:8084/api"
const BASE_URL = "https://api.aliimranassociates.com/api"

export class serviceCalls {
  static async post(path, data, cb) {
    const jwToken = getJWToken();
    const headers = {
      headers: {
        "x-access-token": `${jwToken}`,
        "Content-Type": "application/json",
      }
    }
    const url = `${BASE_URL}${path}`
    try {
      const response = await axios
        .post(url, data, headers);
      cb(null, response.data);
    } 
    catch (error) {
      cb(error.response);
    }
  }

  static postWithFormData(path, formData, cb) {
    const jwToken = getJWToken();
    const headers = {
      headers: {
        "x-access-token": jwToken,
        "Content-Type": "multipart/form-data",
      }
    };

    const url = `${BASE_URL}${path}`;
    return axios
      .post(url, formData, headers)
      .then(response => {
        cb(null, response.data);
      })
      .catch(error => {
        cb(error.response);
      });
  }

  static async get(path, cb) {
    const jwToken = getJWToken();
    const headers = {
      headers: {
        "x-access-token": `${jwToken}`,
        "Content-Type": "multipart/related",
      }
    }
    const url = `${BASE_URL}${path}`
    try {
      const response = await axios
        .get(url, headers);
      cb(null, response.data);
    } catch (error) {
      cb(error.response);
    }
  }

  static async delete(path, data, cb) {
    const jwToken = getJWToken();
    const headers = {
      "x-access-token": `${jwToken}`,
      "Content-Type": "application/json",
    }
    const url = `${BASE_URL}${path}`
    try {
      const response = await axios
        .delete(url, { data, headers });
      cb(null, response.data);
    } 
    catch (error) {
      cb(error.response);
    }
  }
}
