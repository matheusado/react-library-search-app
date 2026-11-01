
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Books from "./pages/Books";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { books } from "./data";
import BookInfo from "./pages/BookInfo";
import Cart from "./pages/Cart";
import React, { useEffect, useState } from "react";

function App() {
  const [cart, setCart] = useState([]);

  function addToCart(book) {
    setCart((prevCart) => {
      const existingBook = prevCart.find((item) => item.id === book.id);

      if (existingBook) {
        return prevCart;
      }

      return [...prevCart, { ...book, quantity: 1 }];
    });
  }

  function changeQuantity(book, quantity) {
    setCart((prevCart) =>
      prevCart.map((item) => {
        if (item.id === book.id) {
          return {
            ...item,
            quantity: Math.max(0, Math.min(99, Number(quantity) || 0)),
          };
        } else {
          return item;
        }
      })
    );
  }

  function removeFromCart(book) {
    setCart((prevCart) =>
      prevCart.filter((item) => item.id !== book.id)
    );
  }

  useEffect(() => {
    console.log(cart);
  }, [cart]);

  return (
    <Router>
      <div className="App">
        <Nav cart={cart} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/books" element={<Books books={books} />} />
          <Route
            path="/books/:id"
            element={
              <BookInfo
                books={books}
                addToCart={addToCart}
                cart={cart}
              />
            }
          />
          <Route
            path="/cart"
            element={
              <Cart
                cart={cart}
                changeQuantity={changeQuantity}
                removeFromCart={removeFromCart}
              />
            }
          />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
