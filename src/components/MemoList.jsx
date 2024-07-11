import React from "react";
import { FaTrash } from "react-icons/fa";

export const MemoList = ({ memos, toggleMemo, increaseQuantity, decreaseQuantity, handleClear }) => {

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
          {/* アイテムの削除ボタン */}
          <button className="delete-button" onClick={handleClear}><FaTrash />
          </button>
        </div>
      ))}
    </div>
  );
};
