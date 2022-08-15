import "./App.css";
import React, { useState, useEffect } from "react";
import Nav from "./navPage";
import HomePage from "../src/components/HomePage/HomePage";
import ShopPage from "../src/components/ShopPage/shopPage";
import CartPage from "../src/components/CartPage/cartPage";
import ContactPage from "../src/components/ContactPage/ContactPage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

const App = () => {
  const [cartScore, setCartScore] = useState(0);
  const [products, setProduct] = useState([]);
  const [cartProduct, setCartProduct] = useState([]);

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    const data = await fetch("https://fakestoreapi.com/products/");
    const items = await data.json();
    setProduct(items);
  };

  const handleChange = (id, num) => {
    //if each cart amount is decremented or incremented, it decreases/add the amount by 1
    setCartProduct((products) =>
      products.map((eachProduct) =>
        eachProduct.id === id && num === -1 
          ? { ...eachProduct, amount: eachProduct.amount - 1 }
          : eachProduct.id === id && num === 1
          ? { ...eachProduct, amount: eachProduct.amount + 1 }
          // : eachProduct.id === id && eachProduct.amount < 1
          // ? handleClick(eachProduct)
          
          : eachProduct
      ));
    return;

    //gets specific cartItem
    //if the num is -1, subtract the cart item by -1
    //if the num is 1, add the cart item amount by 1
    // if amount < 1, remove the cart item
  };

  console.log(cartProduct);
  const handleDelete = (id) => {
    const nonSelectedCart = cartProduct.filter((cart) => cart.id !== id);
    setCartProduct(nonSelectedCart);
    setCartScore(cartScore - 1);
  };

  const handleClick = (cartItem) => {
    //if cart has been added before it returns a boolean true and sets each cart amount to +1
    if (cartProduct.some((product) => product.id === cartItem.id)) {
      setCartProduct((products) =>
        products.map((eachProduct) =>
          eachProduct.id === cartItem.id
            ? { ...eachProduct, amount: eachProduct.amount + 1 }
            : eachProduct
        )
      );
      return;
    }

    //increase cart score when item is added into the cart store
    setCartScore(cartScore + 1);
    //add amount property to cartItem object
    setCartProduct((products) => [...products, { ...cartItem, amount: 1 }]);
  };

  return (
    <Router>
      <Nav cartScore={cartScore} />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/Home" element={<HomePage />} />
        <Route
          path="/Shop"
          element={<ShopPage items={products} handleClick={handleClick} />}
        />
        <Route
          path="/Cart"
          element={
            <CartPage
              cartProduct={cartProduct}
              handleDelete={handleDelete}
              handleChange={handleChange}
            />
          }
        />
        <Route path="/Contact" element={<ContactPage />} />
      </Routes>
    </Router>
  );
};

export default App;
