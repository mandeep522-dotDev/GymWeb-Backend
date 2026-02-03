import axios from "axios";
import { createBrowserHistory } from "history";

const api = axios.create({
  baseURL: "http://localhost:5000/api/v1",
  withCredentials: true,
});

const history = createBrowserHistory();

api.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response?.status === 401) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      // optional: remove default auth header
      delete axios.defaults.headers.common["Authorization"];
      // navigate to login (works if you import/use history or window.location)
      window.location.href = "/login";
      history.push("/login");
    }
    return Promise.reject(err);
  }
);

export default api;