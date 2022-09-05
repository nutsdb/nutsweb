export let ServerUrl: string = '';
export let IP: string = '';
export let Port: string = '';

export function setServerUrl(ip: string, port: string): void {
  IP = ip;
  Port = port;
  ServerUrl = `${window.location.protocol}//${ip}:${port}`;
}

export function get(url: string): Promise<Response> {
  const token = localStorage.getItem('token');
  return fetch(url, {
    method: 'GET',
    headers: token ? {
      'token': token,
    } : {},
  });
}

export function postWithJSON(url: string, data: Record<string, any>): Promise<Response> {
  const token = localStorage.getItem('token');
  return fetch(url, {
    method: 'POST',
    headers: token ? {
      'token': token,
    } : {},
    body: JSON.stringify(data)
  });
}

export function isLoggedIn() {
  return localStorage.getItem('token') != null;
}
