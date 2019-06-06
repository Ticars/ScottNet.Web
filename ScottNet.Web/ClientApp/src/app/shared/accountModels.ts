export interface UserRegistration {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  location: string;
}

export interface Credentials {
  email: string;
  password: string;
}

export interface Authorization {
  identityId: string;
  token: string
  expiresIn: number
  firstName: string
  lastName: string
  userName: string
  email: string
}
