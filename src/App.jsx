import React, { useState, useEffect } from "react";
import { MemoList } from "./components/MemoList";
import { Header } from "./Header";
import { Total } from "./components/Total";
import { v4 as uuidv4 } from "uuid";
import './App.css';

const App = () => {
  const [memos, setMemos] = useState(() => {
    const storedMemos = localStorage.getItem("memos");
    return storedMemos ? JSON.parse(storedMemos) : [];
  });
  const [total, setTotal] = useState(() => {
    const storedTotal = parseFloat(localStorage.getItem("total")) || 0;
    return storedTotal;
  });
  const [totalItems, setTotalItems] = useState(() => {
    const storedTotalItems = parseInt(localStorage.getItem("totalItems")) || 0;
    return storedTotalItems;
  });
  const [memoTitle, setMemoTitle] = useState("");
  const [memoCash, setMemoCash] = useState("");
  const [memoQuantity, setMemoQuantity] = useState(1);


  // 個別のメモを追加
  const handleAddMemo = () => {
    const title = memoTitle.trim();
    const cash = parseFloat(memoCash);
    const quantity = parseInt(memoQuantity);

    if (!title || isNaN(cash) || isNaN(quantity)) return;

    const newMemo = {
      id: uuidv4(),
      title: title,
      cash: cash,
      quantity: quantity,
      completed: false
    };

    setMemos((prevMemos) => [...prevMemos, newMemo]);
    setTotal((prevTotal) => prevTotal + cash * quantity);
    setTotalItems((prevTotalItems) => prevTotalItems + quantity);

    // フォームの値をクリアする
    setMemoTitle("");
    setMemoCash("");
    setMemoQuantity(1);
  };

  // メモの削除
  const handleClear = () => {
    const newMemos = memos.filter((memo) => !memo.completed);
    setMemos(newMemos);
  };

  // 個数の増加
  const increaseQuantity = (id) => {
    setMemos((prevMemos) =>
      prevMemos.map((memo) =>
        memo.id === id ? { ...memo, quantity: memo.quantity + 1 } : memo
      )
    );
    setTotalItems((prevTotalItems) => prevTotalItems + 1);
    const memo = memos.find((memo) => memo.id === id);
    setTotal((prevTotal) => prevTotal + memo.cash);
  };

  // 個数の減少
  const decreaseQuantity = (id) => {
    setMemos((prevMemos) =>
      prevMemos.map((memo) =>
        memo.id === id && memo.quantity > 1
          ? { ...memo, quantity: memo.quantity - 1 }
          : memo
      )
    );
    setTotalItems((prevTotalItems) => Math.max(1, prevTotalItems - 1));
    const memo = memos.find((memo) => memo.id === id);
    setTotal((prevTotal) => Math.max(memo.cash, prevTotal - memo.cash));
  };

  // チェックボックスのトグル
  const toggleMemo = (id) => {
    const newMemos = [...memos];
    const memo = newMemos.find((memo) => memo.id === id);
    memo.completed = !memo.completed;
    setMemos(newMemos);

    if (memo.completed) {
      setTotal((prevTotal) => prevTotal - memo.cash * memo.quantity);
      setTotalItems((prevTotalItems) => prevTotalItems - memo.quantity);
    } else {
      setTotal((prevTotal) => prevTotal + memo.cash * memo.quantity);
      setTotalItems((prevTotalItems) => prevTotalItems + memo.quantity);
    }
  };

  // ローカルストレージにデータを保存
  useEffect(() => {
    localStorage.setItem("memos", JSON.stringify(memos));
    localStorage.setItem("total", total.toString());
    localStorage.setItem("totalItems", totalItems.toString());
  }, [memos, total, totalItems]);

  return (
    <div className="App">
      <div className="header">
        <Header />
      </div>

      <div className="add-item-box">
        <div className="add-item">
          <div className="input-form">
            <div className="input-title">
              <label>名前</label>
              <input
                type="text"
                name="title"
                placeholder="りんご"
                value={memoTitle}
                onChange={(e) => setMemoTitle(e.target.value)}
              />
            </div>

            <div className="input-cash-quantity">
              <div className="input-cash">
                <label>金額</label>
                <div className="input-cash-inner">
                  <input
                    type="number"
                    name="cash"
                    min="0"
                    placeholder="100"
                    value={memoCash}
                    onChange={(e) => setMemoCash(e.target.value)}
                  />
                  <p>円</p>
                </div>
              </div>

              <div className="input-quantity">
                <label>個数</label>
                <div className="input-quantity-inner">
                  <input
                    type="number"
                    name="quantity"
                    min="1"
                    placeholder="1"
                    value={memoQuantity}
                    onChange={(e) => setMemoQuantity(parseInt(e.target.value))}
                  />
                  <p>個</p>
                </div>
              </div>
              <div className="add-delete-button">
                <button className="add-button" onClick={handleAddMemo}>
                  追加
                </button>
              </div>
            </div>
          </div>


        </div>
      </div>

      <div className="memo-list">
        <MemoList
          memos={memos}
          toggleMemo={toggleMemo}
          increaseQuantity={increaseQuantity}
          decreaseQuantity={decreaseQuantity}
          handleClear={handleClear}
        />
      </div>

      <div>
        <Total totalItems={totalItems} total={total} />
      </div>
    </div>
  );
};

export default App;
