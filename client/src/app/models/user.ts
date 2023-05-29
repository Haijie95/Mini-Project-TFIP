export interface User {
  email: string;
  password: string;
  displayname: string;
  region: string;
}

export interface UserCreatedResponse {
  uniqueId: content;
}

export interface content {
  chars: string;
  string: string;
  valuetype: string;
}

export interface loginDetails {
  email: string;
  password: string;
}


