import React from 'react'

export const Total = ({ totalItems, total }) => {
  return (
    <div className="total">

      <div className='total-cash'>
        <dt>合計金額</dt>
        <dd>{total}円</dd>
      </div>

      <div className='total-items'>
        <dt>合計個数</dt>
        <dd>{totalItems}個</dd>
      </div>

    </div>
  )
}
