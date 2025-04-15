import React, { useState } from 'react'
import { Link, useNavigate } from "react-router-dom";
import Badge from "@material-ui/core/Badge";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import { useCart } from './ContextReducer';
import Modal from '../Modal';
import Cart from '../screens/Cart';

const logo ="https://images.crunchbase.com/image/upload/c_pad,h_170,w_170,f_auto,b_white,q_auto:eco,dpr_2/rmcyqtmuvb5dcxqbhusj"

export default function Navbar() {
  const [cartView, setCartView] = useState(false)
  localStorage.setItem('temp', "first")
  let navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token')
    navigate("/login")
  }

  const loadCart = () => {
    setCartView(true)
  }

  const items = useCart();

  return (
    <div>
      <nav
        className="navbar navbar-expand-lg navbar-dark"
        style={{
          background: "linear-gradient(90deg, #0d0d0d 0%, #1a1a1a 100%)",
          backdropFilter: "blur(10px)",
          position: "fixed",
          top: 0,
          width: "100%",
          zIndex: "1000",
          padding: "0.8rem 1.5rem",
          boxShadow: "0 4px 12px rgba(0,0,0,0.6)",
          borderBottom: "1px solid #333"
        }}
      >
        <div className="container-fluid d-flex justify-content-between align-items-center">
          <Link className="navbar-brand d-flex align-items-center fs-3 fw-bold text-white" to="/">
            <img src={logo} alt="Logo" style={{ width: "40px", marginRight: "10px" }} />
            SmartBite
          </Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarContent">
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse justify-content-end" id="navbarContent">
            <ul className="navbar-nav align-items-center me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link fs-5 text-white mx-2" to="/">Home</Link>
              </li>
              {localStorage.getItem("token") && (
                <li className="nav-item">
                  <Link className="nav-link fs-5 text-white mx-2" to="/myorder">My Orders</Link>
                </li>
              )}
            </ul>
            {!localStorage.getItem("token") ? (
              <div className="d-flex align-items-center">
                <Link className="btn btn-outline-light mx-1 rounded-pill px-3" to="/login">Login</Link>
                <Link className="btn btn-outline-light mx-1 rounded-pill px-3" to="/signup">Signup</Link>
              </div>
            ) : (
              <div className="d-flex align-items-center">
                <button
                  className="btn btn-outline-light mx-2 rounded-pill px-3 d-flex align-items-center"
                  onClick={loadCart}
                  style={{ gap: "6px" }}
                >
                  <Badge color="secondary" badgeContent={items.length}>
                    <ShoppingCartIcon style={{ color: "#00FF88" }} />
                  </Badge>
                  <span className="text-white">Cart</span>
                </button>
                {cartView && <Modal onClose={() => setCartView(false)}><Cart /></Modal>}
                <button
                  onClick={handleLogout}
                  className="btn btn-danger rounded-pill px-3 mx-1"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
}
