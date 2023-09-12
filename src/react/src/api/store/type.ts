import { BookState } from "../requests/admin/books"
import { UsersState } from "../requests/users"

export type RootState = {
  users: UsersState
  admin: {
    books: BookState
  }
}