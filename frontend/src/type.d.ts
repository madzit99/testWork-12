export interface RegisterMutation {
  username: string;
  password: string;
  confirmPassword: string;
  displayName: string;
  avatar: File | null;
}

export interface User {
  _id: string;
  username: string;
  token: string;
  role: string;
  avatar: string;
  displayName?: string;
}

export interface ValidationError {
  errors: {
    [key: string]: {
      name: string;
      message: string;
    };
  };
  message: string;
  name: string;
  _message: string;
}

export interface LoginMutation {
  username: string;
  password: string;
}

export interface GlobalError {
  error: string;
}

export interface RegisterResponse {
  message: string;
  user: User;
}

export interface Photo {
  _id: string;
  user: {
    _id: string;
    displayName: string;
  };
  title: string;
  photo: string;
}
 
export interface PhotoMutation {
    title: string,
    photo: File | null
}