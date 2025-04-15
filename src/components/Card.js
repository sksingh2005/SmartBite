import React, { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatchCart, useCart } from './ContextReducer'

export default function Card(props) {
  let data = useCart();
  let navigate = useNavigate()
  const [qty, setQty] = useState(1)
  const [size, setSize] = useState("")
  const priceRef = useRef();
  let options = props.options;
  let priceOptions = Object.keys(options);
  let foodItem = props.item;
  const dispatch = useDispatchCart();

  const handleClick = () => {
    if (!localStorage.getItem("token")) {
      navigate("/login")
    }
  }
  const handleQty = (e) => {
    setQty(e.target.value);
  }
  const handleOptions = (e) => {
    setSize(e.target.value);
  }
  const handleAddToCart = async () => {
    let food = []
    for (const item of data) {
      if (item.id === foodItem._id) {
        food = item;
        break;
      }
    }
    if (food.length > 0) {
      if (food.size === size) {
        await dispatch({ type: "UPDATE", id: foodItem._id, price: finalPrice, qty: qty })
        return
      }
      else if (food.size !== size) {
        await dispatch({ type: "ADD", id: foodItem._id, name: foodItem.name, price: finalPrice, qty: qty, size: size, img: props.ImgSrc })
        return
      }
      return
    }

    await dispatch({ type: "ADD", id: foodItem._id, name: foodItem.name, price: finalPrice, qty: qty, size: size })
  }

  useEffect(() => {
    setSize(priceRef.current.value)
  }, [])

  let finalPrice = qty * parseInt(options[size]);

  return (
    <div>
      <div className="card mt-4 shadow-sm border-0" style={{ width: "18rem", maxHeight: "400px", borderRadius: "12px" }}>
      <img
  src={props.ImgSrc}
  className='card-img-top rounded-top'
  alt="..."
  style={{
    height: "180px",
    width: "100%",
    objectFit: "cover",
    borderTopLeftRadius: "12px",
    borderTopRightRadius: "12px"
  }}
/>

        <div className="card-body">
          <h5 className="card-title fw-bold text-success">{props.foodName}</h5>
          <div className='container w-100 px-0 d-flex align-items-center justify-content-between' style={{ height: "40px" }}>
            <select className="form-select form-select-sm w-50 me-2 bg-light text-dark border-success" onClick={handleClick} onChange={handleQty}>
              {Array.from(Array(6), (e, i) => {
                return (
                  <option key={i + 1} value={i + 1}>{i + 1}</option>)
              })}
            </select>
            <select className="form-select form-select-sm w-50 bg-light text-dark border-success" ref={priceRef} onClick={handleClick} onChange={handleOptions}>
              {priceOptions.map((i) => {
                return <option key={i} value={i}>{i}</option>
              })}
            </select>
          </div>
          <div className='mt-3 text-end text-primary fw-semibold fs-6'>
            ₹{finalPrice}/-
          </div>
          <hr />
          <div className='d-grid'>
            <button className="btn btn-outline-success fw-bold" onClick={handleAddToCart}>Add to Cart</button>
          </div>
        </div>
      </div>
    </div>
  )
}
