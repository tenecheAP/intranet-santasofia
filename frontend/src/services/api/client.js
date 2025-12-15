// Usar variable de entorno si está disponible, sino usar proxy (para desarrollo local)
const baseUrl = process.env.REACT_APP_API_URL || '';

const request = async (method, path, body = null) => {
  const isFormData = body instanceof FormData;

  const options = {
    method,
    headers: {}, // Do not default Content-Type globally yet
  };

  if (!isFormData) {
    options.headers['Content-Type'] = 'application/json';
  }

  if (body) {
    options.body = isFormData ? body : JSON.stringify(body);
  }

  // Construir la URL completa: baseUrl + path
  const url = baseUrl ? `${baseUrl}${path}` : path;
  const response = await fetch(url, options);

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
