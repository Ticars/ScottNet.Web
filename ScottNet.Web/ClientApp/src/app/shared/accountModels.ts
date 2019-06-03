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
  id: string;
  auth_token: string
  expires_in: number

}
