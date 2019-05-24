import React from 'react';
import './styles.css';

const OrderDetailed = ({ orderInfo, handleClick, handleShowPopup }) => {
  const createOrder = () => {
    handleClick(orderInfo);
    handleShowPopup();
  }

  return (
    <div className="container-order-detailed">
      <span className="title">Заказ</span>
      <div className="order-desc">
        <span>{new Date(orderInfo.order_date).toString()}</span>
        <span>{new Date(+orderInfo.delivery_time).toString()}</span>
        <span>{orderInfo.address}</span>
        <span>{orderInfo.phone}</span>
        <span>{orderInfo.summ.toFixed(2)} р.</span>
        <button type="button" onClick={createOrder}>Повторить заказ</button>
      </div>
    </div>
  )
};

export default OrderDetailed;