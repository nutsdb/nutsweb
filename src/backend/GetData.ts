//该方法用于获取所有的string类型数据，其余类型数据结构不支持GetAll
import * as Setting from '../Setting';
import axios from 'axios';

const token = localStorage.getItem('token');
const ip = localStorage.getItem('ip');
const port = localStorage.getItem('port');


export async function GetAllString(bucket: string): Promise<any> {
  const Url = `http://${ip}:${port}`
  const response = await axios.get(
    `${Url}/string/scan/${bucket}/getAll?token=${token}`
  )
  return response
}
