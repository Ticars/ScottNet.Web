export interface IUserRegistration {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  location: string;
}

export interface ICredentials {
  email: string;
  password: string;
}

export interface IAuth {
  identityId: string;
  token: string
  duration: number
  firstName: string
  lastName: string
  userName: string
  email: string
  createDate: number
}

export class Auth implements IAuth {

  constructor(other: IAuth) {
    this.identityId = other.identityId
    this.token = other.token
    this.duration = other.duration
    this.firstName = other.firstName
    this.lastName = other.lastName
    this.userName = other.userName
    this.email = other.email
    if (!other.createDate) {
      this.createDate = Date.now()
    } else {
      this.createDate = other.createDate
    }
  }

  identityId: string;
  token: string;
  duration: number;
  firstName: string;
  lastName: string;
  userName: string;
  email: string;
  createDate: number

  public expiresIn(): number {
    return (this.createDate + this.duration) - Date.now()
  }
}
