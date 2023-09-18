import React, { useEffect } from 'react'
import { ConnectedProps, connect } from 'react-redux'
import { Link } from 'react-router-dom';
import { Book, CartItem, getBooks, setCart } from '../../../api/requests/customer/books';
import { RootState } from '../../../api/store/reducers';
import Navbar from '../../shared/Navbar';
import CustomerPanel from '../CustomerPanel';
import { toast } from 'react-toastify';
import { toMoney } from '../../../helper';

const mapStateToProps = (state: RootState) => ({
  getBooksState: state.customer.books.getBooks,
  setCartState: state.customer.books.setCart,
})

const mapDispatchToProps = {
  dispatchGetBooks: getBooks,
  dispatchSetCart: setCart,
}
const connector = connect(mapStateToProps, mapDispatchToProps)
type ReduxProps = ConnectedProps<typeof connector>
type Props = ReduxProps

function Books({getBooksState, setCartState, dispatchGetBooks, dispatchSetCart}: Props) {
  const [books, setBooks] = React.useState<Book[]>()
  const cart = setCartState.data || []

  const addToCart = (book: Book) => {
    // Check if book is already in cart
    const bookInCart = cart.find((cartItem: CartItem) => cartItem.book.id === book.id)
    if (bookInCart) {
      // If book is already in cart, increase quantity
      bookInCart.quantity++
    } else {
      // If book is not in cart, add it
      cart.push({book, quantity: 1})
    }

    localStorage.setItem('cart', JSON.stringify(cart))
    dispatchSetCart(cart)

    toast.success('Book added to cart')
  }

  useEffect(() => {
    if (getBooksState.unstarted) {
      dispatchGetBooks()
    } else if (getBooksState.succeeded) {
      setBooks(getBooksState.data?.list || [])
    }
  }, [getBooksState.status])


  return (
    <CustomerPanel
      title="Books"
      breadcrumb={[
        {
          name: 'Books',
          link: '/books'
        }
      ]}
    >
      <div className="row justify-content-around">
        {books?.map((book, index) => (
          <div className="col-6 col-sm-4 col-md-3 col-lg-2 customer-book-container mb-5" key={`customer-book-list-${index}`}>
            <div className="card card-blog card-plain">
              <div className="position-relative">
                <Link to={`/books/${book.id}`}>
                  <img
                    src="/assets/img/book_placeholder_cover.jpeg"
                    alt="..."
                    className="card-img-top"
                  />
                </Link>
              </div>
              <div className="card-body px-1 py-0">
                <h6 className="font-weight-bolder title">
                  <Link to={`/books/${book.id}`}>
                    {book.title}
                  </Link>
                </h6>
                <h6 className="text-uppercase text-primary text-xs font-weight-bolder mb-2 title">
                  {book.author}
                </h6>
                <div className="d-flex align-items-center">
                  <span className="text-md font-weight-bold">
                    {toMoney(book.price || 0)}
                  </span>
                </div>

                {/* Add to the cart button */}
                <div className="d-flex align-items-center">
                  <button 
                    className="btn btn-primary btn-round btn-sm d-flex align-items-center justify-content-center w-100" 
                    onClick={() => addToCart(book)}
                  >
                    <i className="fas fa-shopping-cart pe-2"></i> Add to Cart
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </CustomerPanel>
  )
}

export default connector(Books)
