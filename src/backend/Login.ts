import * as Setting from '../Setting';
import type { Response } from "./Response";

export interface LoginForm {
  userName: string;
  password: string;
}

export function login(values: LoginForm): Promise<Response> {
  return Setting.postWithJSON(`${Setting.ServerUrl}/login`, values)
    .then(res => res.json());
}
