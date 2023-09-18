import React, { useEffect } from 'react'
import { ConnectedProps, connect } from 'react-redux'
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Book, CartItem, getBook, getBooks, setCart } from '../../../api/requests/customer/books';
import { RootState } from '../../../api/store/reducers';
import CustomerPanel from '../CustomerPanel';
import { toast } from 'react-toastify';
import { toMoney } from '../../../helper';

const mapStateToProps = (state: RootState) => ({
  getBookState: state.customer.books.getBook,
})

const mapDispatchToProps = {
  dispatchGetBook: getBook,
  dispatchSetCart: setCart,
}

const connector = connect(mapStateToProps, mapDispatchToProps)
type ReduxProps = ConnectedProps<typeof connector>
type Props = ReduxProps

function ViewBook({getBookState, dispatchGetBook, dispatchSetCart}: Props) {
  const book = getBookState.data
  const bookId = useParams().id
  const navigate = useNavigate()

  const [cart, setCart] = React.useState<CartItem[]>([])

  const addToCart = (book: Book, redirect: string) => {
    // Check if book is already in cart
    const bookInCart = cart.find((cartItem: CartItem) => cartItem.book.id === book.id)
    if (bookInCart) {
      // If book is already in cart, increase quantity
      bookInCart.quantity++
    } else {
      // If book is not in cart, add it
      cart.push({book, quantity: 1})
    }
    // Set cart to local storage
    localStorage.setItem('cart', JSON.stringify(cart))
    // Set cart to state
    setCart(cart)
    dispatchSetCart(cart)
    toast.success('Book added to cart')

    if (redirect) {
      navigate(redirect)
    }
  }

  useEffect(() => {
    dispatchGetBook({id: bookId ? parseInt(bookId) : 0})
  }, [])
  
  useEffect(() => {
    // Get cart from local storage and set it to state
    const cart = localStorage.getItem('cart')
    setCart(cart ? JSON.parse(cart) : [])
  }, [])

  return (
    <CustomerPanel
      title="Book info"
      breadcrumb={[
        {
          name: 'Books',
          link: '/books'
        },
        {
          name: book?.title || 'Book info',
          link: `/books/${book?.id}`
        }
      ]}
    >
      <div className="row">
        {/* Book image */}
        <div className="col-12 col-sm-4 col-lg-3">
          <img src="/assets/img/book_placeholder_cover.jpeg" className="img-fluid w-100" alt="Book image"/>
        </div>

        <div className="col-12 col-sm-8 col-lg-9">
          {/* Book info (title, description, author, publisher, published_at, isbn, genre, language, format, pages, price, stock) */}
          <div className="row">
              <h1>{book?.title}</h1>
              <p>{book?.description}</p>
              <span><strong>Author:</strong> {book?.author}</span>
              <span><strong>Publisher:</strong> {book?.publisher}</span>
              <span><strong>Published at:</strong> {book?.published_at}</span>
              <span><strong>ISBN:</strong> {book?.isbn}</span>
              <span><strong>Genre:</strong> {book?.genre}</span>
              <span><strong>Language:</strong> {book?.language}</span>
              <span><strong>Format:</strong> {book?.format}</span>
              <span><strong>Pages:</strong> {book?.pages}</span>
              <span><strong>Price:</strong> {toMoney(book?.price || 0)}</span>
              <span><strong>Stock:</strong> {book?.stock}</span>
          </div>
          {/* Book actions (add to cart, add to wishlist) */}
          <div className="row">
            <div className="col-12 col-lg-6">
              <button className="btn btn-primary w-100" onClick={() => book && addToCart(book, '/books')}>Add to cart</button>
            </div>
            <div className="col-12 col-lg-6">
              <button className="btn btn-primary w-100" onClick={() => book && addToCart(book, '/checkout')}>Buy now</button>
            </div>
          </div>
        </div>
      </div>
    </CustomerPanel>
  )
}

export default connector(ViewBook)
