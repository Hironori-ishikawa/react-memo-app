import React from "react";

export const MemoList = ({ memos, toggleMemo, increaseQuantity, decreaseQuantity }) => {

  return (
    <div className="item-list">
      {memos.map((memo) => (
        <div key={memo.id}>
          <div>
            <input
              type="checkbox"
              checked={memo.completed}
              onChange={() => toggleMemo(memo.id)}
            />
          </div>
          <div>
            <span>アイテム名:{memo.title}</span>
          </div>
          <div>
            <span>金額:{memo.cash}</span>
          </div>
          <div>
            <span>個数:{memo.quantity}</span>
          </div>
          <button onClick={() => increaseQuantity(memo.id)}>+</button>
          <button onClick={() => decreaseQuantity(memo.id)}>-</button>
        </div>
      ))}
    </div>
  );
};
