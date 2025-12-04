export interface BaseFormState {
  [key: string]: string; // Cho phép truy cập bằng key string
}

export interface LoginRequest {
  username: string;
  password: string;
}

export interface LoginResponse {
  token: string;
}

export interface SignUpRequest {
  name: string;
  mail: string;
  username: string;
  password: string;
}