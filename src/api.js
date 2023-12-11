import axios from "axios";

const request = axios.create({
  baseURL: "https://flipkart-email-mock.now.sh/",
});

export default request;