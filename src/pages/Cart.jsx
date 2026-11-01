import React from "react";
import { Link } from "react-router-dom";
import EmptyCart from "../assets/empty_cart.svg";

const Cart = ({ cart, changeQuantity, removeFromCart }) => {
  const subtotal = cart.reduce((total, book) => {
    const price = book.salePrice ?? book.originalPrice;
    return total + price * book.quantity;
  }, 0);

  const tax = subtotal * 0.1;
  const total = subtotal + tax;

  return (
    <div id="books__body">
      <main id="books__main">
        <div className="books__container">
          <div className="row">
            <div className="book__selected--top">
              <h2 className="cart__title">Cart</h2>
            </div>

            {cart.length === 0 ? (
              <div className="cart__empty">
                <img
                  src={EmptyCart}
                  alt="Empty shopping cart"
                  className="cart__empty--img"
                />

                <h2>You don't have any books in your cart!</h2>

                <Link to="/books" className="btn">
                  Browse Books
                </Link>
              </div>
            ) : (
              <>
                <div className="cart">
                  <div className="cart__header">
                    <span className="cart__book">Book</span>
                    <span className="cart__quantity">Quantity</span>
                    <span className="cart__total">Price</span>
                  </div>

                  <div className="cart__body">
                    {cart.map((book) => {
                      const price = book.salePrice ?? book.originalPrice;

                      return (
                        <div className="cart__item" key={book.id}>
                          <div className="cart__book">
                            <img
                              src={book.url}
                              className="cart__book--img"
                              alt={book.title}
                            />

                            <div className="cart__book--info">
                              <span className="cart__book--title">
                                {book.title}
                              </span>

                              <span className="cart__book--price">
                                ${price.toFixed(2)}
                              </span>

                              <button
                                className="cart__book--remove"
                                onClick={() => removeFromCart(book)}
                              >
                                Remove
                              </button>
                            </div>
                          </div>

                          <div className="cart__quantity">
                            <input
                              type="number"
                              min={0}
                              max={99}
                              className="cart__input"
                              value={book.quantity}
                              onChange={(event) =>
                                changeQuantity(book, event.target.value)
                              }
                            />
                          </div>

                          <div className="cart__total">
                            ${(price * book.quantity).toFixed(2)}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="total">
                  <div className="total__item total__sub-total">
                    <span>Subtotal</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>

                  <div className="total__item total__tax">
                    <span>Tax (10%)</span>
                    <span>${tax.toFixed(2)}</span>
                  </div>

                  <div className="total__item total__price">
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                  </div>

                  <button
                    className="btn__checkout no-cursor"
                    onClick={() => alert("Haven't got around doing this :)")}
                  >
                    Proceed to checkout
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Cart;
