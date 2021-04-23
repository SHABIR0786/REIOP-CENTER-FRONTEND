import axios from "axios";
// const urlPrefix = "http://localhost:8000/api";
const urlPrefix = "http://54.273.0.200/api";

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