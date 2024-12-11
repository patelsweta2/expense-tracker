import request from "../../network/request";
import cookies from "js-cookie";

const apiMiddleware = (store) => (next) => async (action) => {
  if (action.type !== "api/Requested") {
    return next(action);
  }

  const {
    url,
    method = "GET",
    body,
    params,
    showToast = false,
  } = action.payload;
  const { onSuccess, onError, onLoading } = action.payload;

  // Construct request config
  const requestConfig = { url, method };
  if (body) requestConfig.data = body;
  if (params) requestConfig.params = params;

  // Show loading toast if required
  if (onLoading) store.dispatch({ type: onLoading, payload: true });
  if (showToast) store.dispatch({ type: "toast/loading" });

  try {
    // Make the request
    const { success, data } = await request(requestConfig);

    // Handle successful response
    if (success === true) {
      const message = data.message || "Success";
      if (showToast)
        store.dispatch({ type: "toast/success", payload: message });

      // Dispatch success action
      if (onSuccess) {
        store.dispatch({ type: onSuccess, payload: data.data });
      }

      // Example for token storage
      if (data.token) {
        cookies.set("token", data.token, { expires: 7 });
      }
    }

    // Handle error response
    if (success !== true) {
      const message = data?.message || "Something went wrong";
      if (onError) store.dispatch({ type: onError, payload: message });
      if (showToast) store.dispatch({ type: "toast/error", payload: message });
    }
  } catch (error) {
    // Catch any unexpected errors
    const errorMessage = error.message || "Something went wrong";
    if (onError) store.dispatch({ type: onError, payload: errorMessage });
    if (showToast)
      store.dispatch({ type: "toast/error", payload: errorMessage });
  }
};

export default apiMiddleware;
