import React from "react";
import { CiCircleMinus } from "react-icons/ci";
import { CiCirclePlus } from "react-icons/ci";
import { BsCashCoin } from "react-icons/bs";

export const MemoList = ({ memos, toggleMemo, increaseQuantity, decreaseQuantity }) => {

  return (
    <div className="item-list">
      {memos.map((memo) => (
        <div key={memo.id} className="item-memo">
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
            <span>金額<BsCashCoin />:{memo.cash}</span>
          </div>
          <div>
            <span>個数:{memo.quantity}</span>
          </div>
          <button
            className="plus-button"
            onClick={() => increaseQuantity(memo.id)}><CiCirclePlus /></button>
          <button className="minus-button"
            onClick={() => decreaseQuantity(memo.id)}><CiCircleMinus /></button>
        </div>
      ))}
    </div>
  );
};
