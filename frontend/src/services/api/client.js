const baseUrl = ''; // Removed process.env.REACT_APP_API_URL usage to rely on proxy

const request = async (method, path, body = null) => {
  const options = {
    method,
    headers: {
      'Content-Type': 'application/json',
    },
  };

  if (body) {
    options.body = JSON.stringify(body);
  }

  const response = await fetch(path, options);

  if (!response.ok) {
    const errorBody = await response.text();
    throw new Error(errorBody || 'Request failed');
  }

  // Handle 204 No Content
  if (response.status === 204) {
    return { data: null };
  }

  const data = await response.json();
  return { data };
};

const client = {
  get: (path) => request('GET', path),
  post: (path, body) => request('POST', path, body),
  put: (path, body) => request('PUT', path, body),
  delete: (path) => request('DELETE', path),
};

export default client;
