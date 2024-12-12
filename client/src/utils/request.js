import axios from "axios";
import cookies from "js-cookie";

const request = async (configObj) => {
  // const token = Cookies.get("token");
  // if (token) {
  //   configObj.headers["authorization"] = `Bearer ${token}`;
  // }
  configObj.withCredentials = true;

  try {
    const { data } = await axios.request(configObj);
    return { success: true, data };
  } catch (error) {
    if (process.env.NODE_ENV === "development") {
      console.log({ error });
    }
    const errorData = error.response
      ? error.response.data
      : { message: "An unknown error occurred" };
    return { success: false, data: errorData };
  }
};

export default request;
