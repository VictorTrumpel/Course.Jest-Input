import { UserConstructor, IUser } from './UserConstructor'
import QueryString from 'query-string'
import snakedKeys from 'snakecase-keys'

type UserListQueryParams = {
  page: number
  perPage: number
  searchText?: string
}

type ListResponse = {
  listOptions: IUser[]
  meta: {
    page: number
    totalPages: number
    totalResults: number
  }
}

export class GetUserListQuery {
  query = ({ searchText, page, perPage }: UserListQueryParams) => {
    const queryString = QueryString.stringify(snakedKeys({
      searchText,
      page,
      perPage
    }), { skipNull: true })

    return `users?${queryString}`
  }

  transformResponse = (response: any) => {
    try {
      const { results, meta } = response

      const listOptions = results.map((userData: unknown) =>
        new UserConstructor(userData).getFields()
      )

      return { listOptions, meta } as ListResponse
    } catch (e) {
      console.error('server error ', e)
    }
  }
  
}