import axios from 'axios';

let token = localStorage.getItem('token');
let ip = localStorage.getItem('ip');
let port = localStorage.getItem('port');

function loadData(){
  token = localStorage.getItem('token');
  ip = localStorage.getItem('ip');
  port = localStorage.getItem('port');
}

// Delete a specific kV
export async function DeleteSingleValue(bucket: string, key: string): Promise<any> {
  loadData()
  const Url = `http://${ip}:${port}`;
  return await axios.delete(
    `${Url}/string/delete/${bucket}/${key}?token=${token}`,
  );
}

// Update a specific kV
export async function UpdateSingleValue(bucket: string, key: string, value: string,ttl:number): Promise<any> {
  loadData()
  const Url = `http://${ip}:${port}`;
  return await axios.post(
    `${Url}/string/update/${bucket}/${key}?token=${token}`,
    {
      value: value,
      ttl: ttl
    }
  );
}

// Add  a specific kV
export async function AddSingleValue(bucket: string, key: string, value: string,ttl:number): Promise<any> {
  loadData()
  const Url = `http://${ip}:${port}`;
  return await axios.post(
    `${Url}/string/update/${bucket}/${key}?token=${token}`,
    {
      value: value,
      ttl: ttl
    }
  );
}
