export const baseUrl = "https://dummyjson.com";

export const FireAPI = async (endPoint, method, body = null, Headers = null) => {
  const headers = {
    "content-type": "application/json",
  };
  const options = {
    method,
    headers: Headers ? Headers : headers,
    body: body ? JSON.stringify(body) : null,
  };
  const response = await fetch(`${baseUrl}/${endPoint}`, options);
  if (response.ok && response.status >= 200 && response.status <= 301) {
    const data = await response.json()
    return data
  } else {
    const json = response.json;
    return json;
  }
};
