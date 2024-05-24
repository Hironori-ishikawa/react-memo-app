import React from 'react'
import { BsCashCoin } from "react-icons/bs";

export const Total = ({ totalItems, total }) => {
  return (
    <div className="total">
      <div className="total-items">合計アイテム数: {totalItems}</div>
      <div className="total-cash">合計金額<BsCashCoin />: ¥{total}</div>
    </div>
  )
}
