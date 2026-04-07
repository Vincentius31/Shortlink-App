export const BASE_URL = import.meta.env.VITE_BASE_URL || "http://localhost:8888";

async function http(url, opts = {}) {
  const token = localStorage.getItem('token');
  const headers = {
    'Content-Type': 'application/json',
    ...opts.headers
  };

  if (token) {
    headers.Authorization = "Bearer " + token;
  } else if (opts.token) {
    headers.Authorization = "Bearer " + opts.token;
  }

  const response = await fetch(BASE_URL + url, {
    method: opts.method || "GET",
    headers: headers,
    body: opts.body ? JSON.stringify(opts.body) : undefined
  });

  if (response.status === 401 && !url.includes('/api/login')) {
    localStorage.clear();
    alert("Your session has expired. Please log in again");
    window.location.href = "/login";
  }

  const text = await response.text();
  try {
    return JSON.parse(text);
  } catch {
    console.error("Server returned non-JSON response:", text);
    return {
      success: false,
      message: "Server Error: Invalid JSON response"
    };
  }
}

export default http;