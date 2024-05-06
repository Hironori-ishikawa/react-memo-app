import React from 'react'

export const Memo = ({ memo, toggleMemo }) => {

  const handleMemoClick = () => {
    toggleMemo(memo.id);
  };

  return (
    <div>
      <label>
        <input type="checkbox"
          checked={memo.completed}
          readOnly
          onChange={handleMemoClick} />
      </label>
      <div>{memo.title}</div>
      <div>{memo.cash}円</div>
    </div>
  )
}
