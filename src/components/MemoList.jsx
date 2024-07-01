import React from "react";

export const MemoList = ({ memos, toggleMemo, increaseQuantity, decreaseQuantity }) => {

  return (
    <div className="item-list">
      {memos.map((memo) => (
        <div key={memo.id} className="item-memo">
          <input
            type="checkbox"
            checked={memo.completed}
            onChange={() => toggleMemo(memo.id)}
          />
          <span>{memo.title}</span>

          <span>¥{memo.cash}</span>

          <span>{memo.quantity}個</span>

          <button
            className="plus-button"
            onClick={() => increaseQuantity(memo.id)}>+
          </button>
          <button className="minus-button"
            onClick={() => decreaseQuantity(memo.id)}>-
          </button>
        </div>
      ))}
    </div>
  );
};
