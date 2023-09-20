import React, {useEffect} from 'react'
import {ConnectedProps, connect} from 'react-redux'
import {Link, useNavigate} from 'react-router-dom'
import {CartItem, checkout, setCart} from '../../../api/requests/customer/books'
import {RootState} from '../../../api/store/reducers'
import CustomerPanel from '../CustomerPanel'
import {toast} from 'react-toastify'
import {isNull} from '../../../api/helpers'
import {toMoney} from '../../../helper'

const mapStateToProps = (state: RootState) => ({
  getBookState: state.customer.books.getBook,
  checkoutState: state.customer.books.checkout,
})

const mapDispatchToProps = {
  dispatchSetCart: setCart,
  dispatchCheckout: checkout,
}

const connector = connect(mapStateToProps, mapDispatchToProps)
type ReduxProps = ConnectedProps<typeof connector>
type Props = ReduxProps

function Checkout({checkoutState, dispatchSetCart, dispatchCheckout}: Props) {
  const navigate = useNavigate()
  const [cart, setCart] = React.useState<CartItem[]>([])

  const handleQtyChange = (cartItem: CartItem, quantity: number) => {
    const updatedCart = cart.map((item: CartItem) => {
      if (item.book.id === cartItem.book.id) {
        item.quantity = quantity
        if (item.book.stock && item.quantity > item.book.stock) {
          item.quantity = item.book.stock
        } else if (item.quantity < 0) {
          item.quantity = 0
        }
      }
      return item
    })

    setCart(updatedCart)
    dispatchSetCart(updatedCart)
    localStorage.setItem('cart', JSON.stringify(updatedCart))
  }

  const handleDeleteCartItem = (cartItem: CartItem) => {
    const updatedCart = cart.filter((item: CartItem) => item.book.id !== cartItem.book.id)

    setCart(updatedCart)
    dispatchSetCart(updatedCart)
    localStorage.setItem('cart', JSON.stringify(updatedCart))

    toast.info('Item removed from cart')
  }

  const handleCheckout = () => {
    cart.length > 0 && (checkoutState.unstarted || checkoutState.error) && dispatchCheckout(cart)
    if (cart.length === 0) {
      toast.warning('You cannot checkout. Your cart is empty')
    }
  }

  useEffect(() => {
    if (checkoutState.succeeded) {
      toast.success('Thank you for the purchase. The checkout was successful', {autoClose: 10000})
      toast.warning('This is a demo website. The checkout was successful but no payment was made.', {autoClose: 15000})
      toast.info('Your purchase info will be used in the admin dashboard reports', {autoClose: 20000})

      setCart([])
      dispatchSetCart([])
      localStorage.setItem('cart', '[]')
      dispatchCheckout({reset: true})

      navigate('/books') // TODO: Redirect to order history page instead of books page
    } else if (checkoutState.error) {
      toast.error('Checkout failed')
    }
  }, [checkoutState.status])

  useEffect(() => {
    // Get cart from local storage and set it to state
    const jsonCart = localStorage.getItem('cart')
    let cart = jsonCart ? JSON.parse(jsonCart) : []
    let isAboveStock = false

    cart = cart.map((item: CartItem) => {
      if (item.book.stock && item.quantity > item.book.stock) {
        item.quantity = item.book.stock
        isAboveStock = true
      }
      return item
    })

    setCart(cart)
    dispatchSetCart(cart)
    localStorage.setItem('cart', JSON.stringify(cart))

    if (isAboveStock) {
      toast.warning('Some items in your cart were above the stock limit and was adjusted to the maximum stock limit', {autoClose: 10000})
    }
  }, [])

  return (
    <CustomerPanel
      title="Checkout"
      breadcrumb={[
        {
          name: 'Books',
          link: '/books',
        },
        {
          name: 'Checkout',
          link: '/checkout',
        },
      ]}
    >
      <div className="row">
        <div className="col-12">
          <div className="card mb-4">
            <div className="card-header pb-0">
              <h6>Book List</h6>
            </div>
            <div className="card-body px-0 pt-0 pb-2">
              <div className="table-responsive p-0">
                <table className="table align-items-center mb-0">
                  <thead>
                    <tr>
                      <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Book</th>
                      <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Qty</th>
                      <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Price</th>
                      <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Total</th>
                      <th className="text-secondary opacity-7"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {cart.map((cartItem: CartItem, index: number) => (
                      <tr key={`book-checkout-${index}-${cartItem.book.id}`}>
                        <td>
                          <div className="d-flex px-2 py-1">
                            <div>
                              <img
                                src="/assets/img/book_placeholder_cover.jpeg"
                                alt="..."
                                className="cart-item-img me-3"
                              />
                            </div>
                            <div className="d-flex flex-column justify-content-start">
                              <Link to={`/books/${cartItem.book.id}`}>
                                <h6 className="mb-0 text-sm">{cartItem.book.title}</h6>
                              </Link>
                              <p className="text-xs text-secondary mb-0">{cartItem.book.author}</p>
                            </div>
                          </div>
                        </td>
                        <td className="align-baseline text-center text-sm">
                          <input
                            type="number"
                            className="form-control text-center m-auto"
                            defaultValue={cartItem.quantity}
                            onChange={e => {
                              if (e.target.value) {
                                const value = parseInt(e.target.value)

                                handleQtyChange(cartItem, value)
                                if (cartItem.book.stock && value > cartItem.book.stock) {
                                  e.target.value = cartItem.book.stock.toString()
                                } else if (value < 0) {
                                  e.target.value = '0'
                                }
                              }
                            }}
                            onBlur={e => {
                              if (isNull(e.target.value)) {
                                if (confirm(`Are you sure you want to remove the book "${cartItem.book.title}" from your cart?`)) {
                                  handleDeleteCartItem(cartItem)
                                } else {
                                  handleQtyChange(cartItem, 1)
                                  e.target.value = '1'
                                }
                              }
                            }}
                            max={cartItem.book.stock}
                            min={0}
                            style={{width: '100px'}}
                          />
                        </td>
                        <td className="align-baseline text-center">
                          <span className="text-secondary text-xs font-weight-bold">{toMoney(cartItem.book.price || 0)}</span>
                        </td>
                        <td className="align-baseline text-center">
                          <span className="text-secondary text-xs font-weight-bold">{cartItem.book.price && toMoney(cartItem.book.price * cartItem.quantity)}</span>
                        </td>
                        <td className="align-baseline">
                          <i
                            className="fas fa-trash-alt text-secondary"
                            onClick={() => {
                              if (confirm(`Are you sure you want to remove the book "${cartItem.book.title}" from your cart?`)) {
                                handleDeleteCartItem(cartItem)
                              }
                            }}
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              {/* Total */}
              <div className="d-flex justify-content-end align-items-center mt-3 px-3">
                <h4 className="me-3">Total</h4>
                <h4 className="">{toMoney(cart.reduce((total: number, item: CartItem) => item.book.price ? total + item.book.price * item.quantity : 0, 0))}</h4>
              </div>

              {/* Checkout button */}
              <div className="d-flex justify-content-end mt-3 px-3">
                <button
                  className={`btn btn-primary btn-round btn-lg d-flex align-items-center justify-content-center w-100 ${cart.length === 0 ? 'cursor-not-allowed' : ''}`}
                  onClick={handleCheckout}
                  title={cart.length === 0 ? 'You cannot checkout. Your cart is empty' : undefined}
                >
                  <i className="fas fa-shopping-cart pe-2"></i> Checkout
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </CustomerPanel>
  )
}

export default connector(Checkout)
