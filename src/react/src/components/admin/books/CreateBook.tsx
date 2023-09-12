import React, { useEffect } from 'react'
import { ConnectedProps, connect } from 'react-redux'
import { RootState } from '../../../api/store/type';
import { useNavigate } from 'react-router-dom';
import AdminPanel from '../AdminPanel';
import { Book, getBooks, storeBook } from '../../../api/requests/admin/books';
import { InputValidation } from '../../helpers';
import { isNull } from '../../../api/helpers';

function mapStateToProps(state: RootState) {
  return {
    storeBookState: state.admin.books.storeBook,
  }
}

const mapDispatchToProps = {dispatchStoreBook: storeBook, dispatchGetBooks: getBooks}
const connector = connect(mapStateToProps, mapDispatchToProps)
type ReduxProps = ConnectedProps<typeof connector>
type Props = ReduxProps

function CreateBook({storeBookState, dispatchStoreBook, dispatchGetBooks}: Props) {
  const navigate = useNavigate()

  const [title, setTitle] = React.useState('')
  const [description, setDescription] = React.useState('')
  const [author, setAuthor] = React.useState('')
  const [publisher, setPublisher] = React.useState('')
  const [publishDate, setPublishDate] = React.useState('')
  const [isbn, setIsbn] = React.useState('')
  const [genre, setGenre] = React.useState('')
  const [language, setLanguage] = React.useState('')
  const [format, setFormat] = React.useState('')
  const [pages, setPages] = React.useState(0)
  const [price, setPrice] = React.useState(0.0)
  const [stock, setStock] = React.useState(0)

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!storeBookState.started && !storeBookState.succeeded) {
      const data: Book = {
        title,
        description,
        author,
        publisher,
        published_at: publishDate,
        isbn,
        genre,
        language,
        format,
        pages,
        price,
        stock,
      }

      dispatchStoreBook(data)
    }
  }

  useEffect(() => {
    if (storeBookState.succeeded) {
      dispatchStoreBook({reset: true})
      dispatchGetBooks({reset: true})

      navigate('/books')
    }
  }, [storeBookState.status])

  return (
    <AdminPanel
      title="Add new book"
      breadcrumb={[
        {name: 'Books', link: '/books'},
        {name: 'New book', link: '/books/new'},
      ]}
    >
      <div className="row">
        <div className="col-12">
          <div className="card">
            <div className="card-header pb-3 pt-3 border-bottom d-flex justify-content-between">
              <h6 className="mb-0">Book details</h6>
              <button className="btn btn-primary btn-sm mb-0">
                <span className="pt-1">Save</span>
              </button>
            </div>
            <div className="card-body pb-2">
              {/* Create a book form */}
              <form onSubmit={handleFormSubmit}>
                <div className="row">
                  {/* Title */}
                  <div className="col-12">
                    <div className="form-group">
                      <label className="form-label">Title</label>
                      <InputValidation
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTitle(e.target.value)}
                        reduxState={storeBookState}
                        field="title"
                        type="text"
                        className="form-control"
                        placeholder="Ex. The Lord of the Rings"
                      />
                    </div>
                  </div>

                  {/* Description */}
                  <div className="col-12">
                    <div className="form-group">
                      <label className="form-label">Description</label>
                      <InputValidation
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setDescription(e.target.value)}
                        reduxState={storeBookState}
                        field="description"
                        isTextarea={true}
                        className="form-control"
                        placeholder="Ex. Frodo, a Christlike figure, learns that the ring has the power to control the entire world and, he discovers, to corrupt its owner. A fellowship of hobbits, elves, dwarfs, and men is formed to destroy the ring by casting it into the volcanic fires of the Crack of Doom, where it was forged..."
                        rows={4} 
                      />
                    </div>
                  </div>

                  {/* Author */}
                  <div className="col-12 col-sm-6 col-lg-4">
                    <div className="form-group">
                      <label className="form-label">Author</label>
                      <InputValidation
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setAuthor(e.target.value)}
                        reduxState={storeBookState}
                        field="author"
                        type="text"
                        className="form-control"
                        placeholder="Ex. J. R. R. Tolkien"
                      />
                    </div>
                  </div>

                  {/* Publisher */}
                  <div className="col-12 col-sm-6 col-lg-4">
                    <div className="form-group">
                      <label className="form-label">Publisher</label>
                      <InputValidation
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPublisher(e.target.value)}
                        reduxState={storeBookState}
                        field="publisher"
                        type="text"
                        className="form-control"
                        placeholder="Ex. Del Rey Books"
                      />
                    </div>
                  </div>

                  {/* Publish date */}
                  <div className="col-12 col-sm-6 col-lg-4">
                    <div className="form-group">
                      <label className="form-label">Publish date</label>
                      <InputValidation
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPublishDate(e.target.value)}
                        reduxState={storeBookState}
                        field="publish_at"
                        type="date"
                        className="form-control"
                        placeholder="Ex. 1986-08-12"
                      />
                    </div>
                  </div>

                  {/* ISBN */}
                  <div className="col-12 col-sm-6 col-lg-4">
                    <div className="form-group">
                      <label className="form-label">ISBN</label>
                      <InputValidation
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setIsbn(e.target.value)}
                        reduxState={storeBookState}
                        field="isbn"
                        type="text"
                        className="form-control"
                        placeholder="xxxxxxxxxxxxx"
                      />
                    </div>
                  </div>

                  {/* Genre */}
                  <div className="col-12 col-sm-6 col-lg-8">
                    <div className="form-group">
                      <label className="form-label">Genre</label>
                      <InputValidation
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setGenre(e.target.value)}
                        reduxState={storeBookState}
                        field="genre"
                        type="text"
                        className="form-control"
                        placeholder="Ex. Fantasy, Adventure..."
                      />
                    </div>
                  </div>

                  {/* Language */}
                  <div className="col-12 col-sm-6 col-lg-4">
                    <div className="form-group">
                      <label className="form-label">Language</label>
                      <InputValidation
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setLanguage(e.target.value)}
                        reduxState={storeBookState}
                        field="language"
                        type="text"
                        className="form-control"
                        placeholder="Ex. English"
                      />
                    </div>
                  </div>

                  {/* Format */}
                  <div className="col-12 col-sm-6 col-lg-4">
                    <div className="form-group">
                      <label className="form-label">Format</label>
                      <InputValidation
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormat(e.target.value)}
                        reduxState={storeBookState}
                        field="format"
                        type="text"
                        className="form-control"
                        placeholder="Ex. Hardcover"
                      />
                    </div>
                  </div>

                  {/* Pages */}
                  <div className="col-12 col-sm-6 col-lg-4">
                    <div className="form-group">
                      <label className="form-label">Pages</label>
                      <InputValidation
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPages(parseInt(e.target.value))}
                        reduxState={storeBookState}
                        field="pages"
                        type="number"
                        className="form-control"
                        placeholder="Ex. 480"
                      />
                    </div>
                  </div>

                  {/* Price */}
                  <div className="col-12 col-sm-6 col-md-4">
                    <div className="form-group">
                      <label className="form-label">Price</label>
                        <InputValidation
                          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPrice(parseFloat(e.target.value))}
                          reduxState={storeBookState}
                          field="price"
                          type="number"
                          className="form-control"
                          placeholder="Ex. $10.99" 
                          min={0.1}
                          max={999999.99}
                          step={0.01}
                        />
                    </div>
                  </div>

                  {/* Stock */}
                  <div className="col-12 col-sm-6 col-md-4">
                    <div className="form-group">
                      <label className="form-label">Stock</label>
                      <InputValidation
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setStock(parseInt(e.target.value))}
                        reduxState={storeBookState}
                        field="stock"
                        type="number"
                        className="form-control"
                        placeholder="Ex. 35"
                      />
                    </div>
                  </div>

                  <div className="col-12 mb-2 mt-2">
                    <button type="submit" className="btn btn-primary btn-md w-100 mb-0">
                      <span className="pt-1">Save</span>
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </AdminPanel>
  )
}

export default connector(CreateBook)
