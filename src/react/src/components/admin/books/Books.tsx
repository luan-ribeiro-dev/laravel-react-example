import React, { useEffect } from 'react'
import { ConnectedProps, connect } from 'react-redux'
import { RootState } from '../../../api/store/type';
import { Link } from 'react-router-dom';
import AdminPanel from '../AdminPanel';
import { Book, deleteBook, getBooks } from '../../../api/requests/admin/books';

const mapStateToProps = (state: RootState) => ({
  getBooksState: state.admin.books.getBooks,
  deleteBookState: state.admin.books.deleteBook,
})

const mapDispatchToProps = {
  dispatchGetBooks: getBooks,
  dispatchDeleteBook: deleteBook,
  // dispatchUpdateBook: updateBook
}
const connector = connect(mapStateToProps, mapDispatchToProps)
type ReduxProps = ConnectedProps<typeof connector>
type Props = ReduxProps

function Books({getBooksState, deleteBookState, dispatchGetBooks, dispatchDeleteBook}: Props) {
  const [books, setBooks] = React.useState<Book[]>()

  const handleDeleteBook = (book: Book) => {
    if (
      book.id 
      && !deleteBookState.started
      && window.confirm(`Are you sure you want to delete the book '${book.title}'?`)
    ) {
      dispatchDeleteBook(book.id)
    }
  }

  useEffect(() => {
    if (getBooksState.unstarted) {
      dispatchGetBooks()
    } else if (getBooksState.succeeded) {
      setBooks(getBooksState.data?.list || [])
    }
  }, [getBooksState.status])

  useEffect(() => {
    if (deleteBookState.succeeded) {
      dispatchGetBooks()
    }
  }, [deleteBookState.status])

  return (
    <AdminPanel
      breadcrumb={[
        {name: "Books", link: "books"}
      ]}
      title="Book list"
    >
      <div className="row">
        <div className="col-12 mb-md-0">
          <div className="card">
            <div className="card-header pb-0 pt-3">
              <div className="row">
                <div className="col-lg-6 col-7">
                  <h6>Books</h6>
                </div>
                <div className="col-6 text-end">
                  <Link to="/books/new">
                    <button className="btn btn-primary btn-sm mb-0">
                      <i className="fa fa-plus me-2"></i> 
                      <span className="pt-1">Add new book</span>
                    </button>
                  </Link>
                </div>
              </div>
            </div>
            <div className="card-body px-0 pb-2">
              <div className="table-responsive">
                <table className="table align-items-center mb-0">
                  <thead>
                    <tr>
                      <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">Name</th>
                      <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">Author</th>
                      <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">ISBN</th>
                      <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">Genre</th>
                      <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Stock</th>
                      <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Action</th>
                    </tr>
                  </thead>
                  <tbody className="ps-4">
                    {books?.map((book, index) => (
                      <tr key={`admin-book-tr-${index}`}>
                        <td className="py-3" style={{maxWidth: "150px"}}>
                          <h6 className="mb-0 text-sm text-truncate">{book.title}</h6>
                        </td>
                        <td className="py-3">
                          <h6 className="mb-0 text-sm text-truncate">{book.author}</h6>
                        </td>
                        <td className="py-3">
                          <h6 className="mb-0 text-sm">{book.isbn}</h6>
                        </td>
                        <td className="py-3">
                          <h6 className="mb-0 text-sm text-truncate">{book.genre}</h6>
                        </td>
                        <td className="text-center">
                          <h6 className="mb-0 text-sm">{book.stock}</h6>
                        </td>
                        <td>
                          <div className="d-flex justify-content-center">
                            {/* add bootstrap box-shadow for each icon */}
                            <Link to={`/books/${book.id}`}>
                              <button className="btn btn-info btn-sm m-0 me-2">
                                Edit
                              </button>
                            </Link>
                            <button className="btn btn-danger btn-sm m-0" onClick={() => handleDeleteBook(book)}>
                              Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminPanel>
  )
}

export default connector(Books)
