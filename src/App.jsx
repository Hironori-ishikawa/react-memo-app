import React, { useState, useRef } from "react";
import { MemoList } from "./components/MemoList";
import { Header } from "./Header";
import { Total } from "./components/Total";
import { v4 as uuidv4 } from "uuid";
import './App.css';



const App = () => {
  const [memos, setMemos] = useState([
    // { id: "1", title: "Memo1", cash: "1000", completed: false }
  ]);
  const [total, setTotal] = useState(0); // 合計金額のState
  const [totalItems, setTotalItems] = useState(0); // 合計アイテム数のState
  const memoTitleRef = useRef();
  const memoCashRef = useRef();

  // メモを追加
  const handleAddMemo = () => {
    const title = memoTitleRef.current.value;
    // const cash = memoCashRef.current.value;
    const cash = parseFloat(memoCashRef.current.value); // 浮動小数点に変換

    // もしtitleの入力がない場合はリターンで返す。
    // if (title === "") return;
    if (!title || isNaN(cash)) return; // titleとcashに入力がない場合はリターンする

    // 入力した１つのオブジェクト
    setMemos((prevMemos) => {
      return [...prevMemos, {
        id: uuidv4(),
        title: title,
        cash: cash,
        quantity: 1, // 個数
        completed: false // チェックボックス
      }]
    });
    // 追加したらタイトルと金額のリセット
    memoTitleRef.current.value = null;
    memoCashRef.current.value = null;

    setTotal((prevTotal) => prevTotal + cash); // 金額を増加
    setTotalItems((prevTotalItems) => prevTotalItems + 1); // アイテム数を増加
  };

  // チェックボックスのチェックの有無
  const toggleMemo = (id) => {
    const newMemos = [...memos];
    const memo = newMemos.find((memo) => memo.id === id);
    memo.completed = !memo.completed;
    setMemos(newMemos);
    // チェックが入っている場合、金額を合計から減算
    if (memo.completed) {
      setTotal((prevTotal) => prevTotal - memo.cash * memo.quantity);
      setTotalItems((prevTotalItems) => prevTotalItems - memo.quantity); // アイテム数を減少
    } else {
      // チェックが外れている場合、金額を合計に加算
      setTotal((prevTotal) => prevTotal + memo.cash * memo.quantity);
      setTotalItems((prevTotalItems) => prevTotalItems + memo.quantity); // アイテム数を増加);
    }
  };

  // メモを削除
  const handleClear = () => {
    const newMemos = memos.filter((memo) => !memo.completed);
    setMemos(newMemos);
  }

  // アイテムの増加
  const increaseQuantity = (id) => {
    setMemos((prevMemos) => {
      return prevMemos.map((memo) => {
        if (memo.id === id) {
          return {
            ...memo,
            quantity: memo.quantity + 1
          };
        }
        return memo;
      });
    });
    setTotalItems((prevTotalItems) => prevTotalItems + 1); // アイテム数を増加
    const memo = memos.find((memo) => memo.id === id);
    setTotal((prevTotal) => prevTotal + memo.cash);
  };

  // アイテムの減少
  const decreaseQuantity = (id) => {
    setMemos((prevMemos) => {
      return prevMemos.map((memo) => {
        if (memo.id === id && memo.quantity > 1) {
          return {
            ...memo,
            quantity: memo.quantity - 1
          };
        }
        return memo;
      });
    });
    setTotalItems((prevTotalItems) => Math.max(1, prevTotalItems - 1)); // アイテム数を減少
    const memo = memos.find((memo) => memo.id === id);
    setTotal((prevTotal) => Math.max(memo.cash, prevTotal - memo.cash));
  };


  return (
    <div>
      <div className="header">
        <Header />
      </div>

      <div className="add-item">
        <div className="input-form">
          {/* タイトルの入力フォーム */}
          <input
            type="text"
            name="title"
            placeholder="アイテム"
            ref={memoTitleRef}
          />
          {/* 金額の入力フォーム */}
          <input
            type="number"
            name="cash"
            min="0"
            placeholder="金額"
            ref={memoCashRef}
          />
        </div>

        <div className="add-delete-button">
          {/* アイテムの追加ボタン */}
          <button className="add-button" onClick={handleAddMemo}>追加
          </button>
          {/* アイテムの削除ボタン */}
          <button className="delete-button" onClick={handleClear}>削除
          </button>
        </div>

      </div>

      <div className="memo-list">
        <MemoList
          memos={memos}
          toggleMemo={toggleMemo} // チェックボックス
          increaseQuantity={increaseQuantity} // 個数の増加
          decreaseQuantity={decreaseQuantity} // 個数の減少
        />
      </div>
      <div>
        <Total totalItems={totalItems} total={total} />
      </div>
    </div>
  );
};

export default App;
