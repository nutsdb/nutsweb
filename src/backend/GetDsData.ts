// Get a range list
import axios from 'axios';

let token = localStorage.getItem('token');
let ip = localStorage.getItem('ip');
let port = localStorage.getItem('port');

export async function GetRangeListValue(bucket: string, key: string, start: any, end: any): Promise<any> {
  const Url = `http://${ip}:${port}`;
  return await axios.get(
    `${Url}/list/lrange/${bucket}/${key}?start=${start}&end=${end}&token=${token}`,
  );
}

export async function GetRangeSetValue(bucket: string, key: string, keyword: string): Promise<any> {
  const Url = `http://${ip}:${port}`;
  return await axios.get(
    `${Url}/set/smembers/${bucket}/${key}?token=${token}&keyword=${keyword}`,
  );
}

export async function GetSingleZSetValue(bucket: string, key: string): Promise<any> {
  const Url = `http://${ip}:${port}`;
  return await axios.get(
    `${Url}/zset/zgetbykey/${bucket}/${key}?token=${token}`,
  );
}

export async function GetRangeZSetByScore(bucket: string, key: string, start: string, end: string): Promise<any> {
  const Url = `http://${ip}:${port}`;
  if (key == '') {
    key = 'key';
  }
  return await axios.get(
    `${Url}/zset/zrangebyscore/${bucket}/${key}?token=${token}&start=${start}&end=${end}`,
  );
}

export async function GetRangeZSetByRank(bucket: string, key: string, start: string, end: string): Promise<any> {
  const Url = `http://${ip}:${port}`;
  if (key == '') {
    key = 'key';
  }
  return await axios.get(
    `${Url}/zset/zrangebyrank/${bucket}/${key}?token=${token}&start=${start}&end=${end}`,
  );
}

interface Node {
  key: string;
  value: string;
}

export function PackZSetData(data: Node): any {
  let tmp = {};
  //@ts-ignore
  tmp[data.key] = data.value;
  return tmp;
}

export function PackZSetDataList(data: Node[]): any {
  let tmp = {};
  for (let i = 0; i < data.length; i++) {
    //@ts-ignore
    tmp[data[i].key] = data[i].value;
  }
  return tmp;
}

export function PackListData(data: string[]): any {
  let tmp = {};
  for (let i = 0; i < data.length; i++) {
    //@ts-ignore
    tmp[data[i]] = data[i];
  }
  return tmp;
}

export function PackSetData(data: string[]): any {
  let tmp = {};
  for (let i = 0; i < data.length; i++) {
    //@ts-ignore
    tmp[data[i]] = data[i];
  }
  return tmp;
}

export function clear() {
  token = null;
  ip = null;
  port = null;
}

