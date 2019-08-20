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
  firstName: string
  lastName: string
  userName: string
  email: string
  createDate: number
  refreshToken: string
}

export class obAuth implements IAuth {

  constructor(other: IAuth) {
    this.identityId = other.identityId
    this.token = other.token
    this.firstName = other.firstName
    this.lastName = other.lastName
    this.userName = other.userName
    this.email = other.email
    this.refreshToken = other.refreshToken
    if (!other.createDate) {
      this.createDate = Date.now()
    } else {
      this.createDate = other.createDate
    }
  }

  identityId: string;
  token: string;
  firstName: string;
  lastName: string;
  userName: string;
  email: string;
  createDate: number
  refreshToken: string

}
