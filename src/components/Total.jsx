import React from 'react'

export const Total = ({ totalItems, total }) => {
  return (
    <div className="total">

      <div className='total-cash'>
        <dt>合計金額</dt>
        <div>{total}円</div>
      </div>

      <div className='total-items'>
        <dt>合計個数</dt>
        <div>{totalItems}個</div>
      </div>

    </div>
  )
}
