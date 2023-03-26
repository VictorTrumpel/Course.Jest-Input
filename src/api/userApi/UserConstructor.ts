export interface IUser {
  id: string
  email: string
  userName: string
  fullName: string
  address: string
}

export class UserConstructor {
  public user: IUser = {
    id: '',
    email: '',
    userName: '',
    fullName: '',
    address: ''
  }

  constructor(data: any) {
    try {
      this.user.id = String(data.id)
      this.user.email = String(data.email)
      this.user.userName = String(data.userName)
      this.user.fullName = String(data.profile.name)
      this.user.address = String(data.profile.address)
    } catch (e) {
      console.error(e)
    }
  }

  getFields() {
    return this.user
  }
}