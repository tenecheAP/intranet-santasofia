const baseUrl = process.env.REACT_APP_API_URL || '';

export async function apiGet(path) {
  const res = await fetch(baseUrl + path);
  if (!res.ok) throw new Error('Request failed');
  return res.json();
}
