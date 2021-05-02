import axios from "axios";

const urlPrefix = process.env.VUE_APP_API_URL

export async function setHeader(response) {
  axios.defaults.headers.common['Authorization'] = 'JWT ' + response.access
}

export async function get(subURL) {
  return axios
    .get(urlPrefix + subURL)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.log("Error " + error);
      return error;
    });
}

export async function post(subURL, data) {
  return axios
    .post(urlPrefix + subURL, data)
    .then((response) => {
      return response.data
    })
    .catch((error) => {
      console.log("error" + error);
      return error;
    });
}

export async function put(subURL, data) {
  return axios
    .put(urlPrefix + subURL, data)
    .then((response) => {
      return response.data
    })
    .catch((error) => {
      console.log("error" + error);
      return error;
    });
}

export async function deleteAPI(subURL) {
  return axios
    .delete(urlPrefix + subURL)
    .then((response) => {
      return response.data
    })
    .catch((error) => {
      console.log("error" + error);
      return error;
    });
}