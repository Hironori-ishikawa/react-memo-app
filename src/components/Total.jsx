import React from 'react'

export const Total = ({ totalItems, total }) => {
  return (
    <div className="total">
      <div className='total-items'>
        <dt>合計アイテム数:</dt>
        <dd>{totalItems}</dd>
      </div>

      <div className='total-cash'>
        <dt className="">合計金額:</dt>
        <dd>¥{total}</dd>
      </div>
    </div>
  )
}
