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
          <div className="item-memo-title">
            <span>{memo.title}</span>
          </div>

          <div className="item-memo-cash">
            <span>{memo.cash}円</span>
          </div>

          <div className="item-memo-quantity">
            <span>{memo.quantity}個</span>
          </div>

          <div className="plus-minus-button">
            <button
              className="plus-button"
              onClick={() => increaseQuantity(memo.id)}>+
            </button>

            {/* disabled(無効) memo.quantityが1以下の時非活性化する */}
            <button className="minus-button"
              onClick={() => decreaseQuantity(memo.id)} disabled={memo.quantity <= 1}>-
            </button>
          </div>

          {/* アイテムの削除ボタン */}
          <button className="delete-button" onClick={handleClear}><FaTrash />
          </button>

        </div>
      ))}
    </div>
  );
};
