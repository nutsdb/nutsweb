//该方法用于获取所有的string类型数据，其余类型数据结构不支持GetAll
import axios from 'axios';

let token = localStorage.getItem('token');
let ip = localStorage.getItem('ip');
let port = localStorage.getItem('port');

function loadData() {
  token = localStorage.getItem('token');
  ip = localStorage.getItem('ip');
  port = localStorage.getItem('port');
}

// Get all KVS
export async function GetAllString(bucket: string): Promise<any> {
  loadData();
  const Url = `http://${ip}:${port}`;
  return await axios.get(
    `${Url}/string/scan/${bucket}/getAll?token=${token}`,
  );
}

// Get a specific kV
export async function GetValueString(bucket: string, key: string): Promise<any> {
  loadData();
  const Url = `http://${ip}:${port}`;
  return await axios.get(
    `${Url}/string/get/${bucket}/${key}?token=${token}`,
  );
}

// Get a range kV
export async function GetRangeValueString(bucket: string, start: string, end: string): Promise<any> {
  loadData();
  const Url = `http://${ip}:${port}`;
  return await axios.get(
    `${Url}/string/scan/${bucket}/rangeScan?start=${start}&end=${end}&token=${token}`,
  );
}

