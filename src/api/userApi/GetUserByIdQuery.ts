import { UserConstructor } from './UserConstructor'

export class GetUserByIdQuery {

  query = (id: string) => `users/${id}`

  transformResponse = (response: any) =>
    new UserConstructor(response).getFields()
}