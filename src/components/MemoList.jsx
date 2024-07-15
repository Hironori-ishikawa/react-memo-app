import React from "react";
import { FaTrash } from "react-icons/fa";

export const MemoList = ({ memos, toggleMemo, increaseQuantity, decreaseQuantity, handleClear }) => {

  return (
    <div className="item-list">
      <div className="item-list-title">
        <div className="list-span-title">
          <span>タイトル</span>
        </div>

        <div className="list-span-cash">
          <span>金額</span>
        </div>

        <div className="list-span-quantity">
          <span>個数</span>
        </div>

      </div>

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

          <div className="plus-minus-delete-button">
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

        </div>
      ))}
    </div>
  );
};
