import React, { useState, useRef } from "react";
import { MemoList } from "./components/MemoList";
import { v4 as uuidv4 } from "uuid";
import styles from "./App.css"

const App = () => {
  const [memos, setMemos] = useState([
    // { id: "1", title: "Memo1", cash: "1000", completed: false }
  ]);
  const [total, setTotal] = useState(0);
  const memoTitleRef = useRef();
  const memoCashRef = useRef();

  // メモを追加
  const handleAddMemo = () => {

    const title = memoTitleRef.current.value;
    // const cash = memoCashRef.current.value;
    const cash = parseFloat(memoCashRef.current.value);

    // もしtitleの入力がない場合はリターンで返す。
    // if (title === "") return;
    if (!title || isNaN(cash)) return;

    // 入力した１つのオブジェクト
    setMemos((prevMemos) => {
      return [...prevMemos, {
        id: uuidv4(),
        title: title,
        cash: cash,
        completed: false
      }]
    });
    // タイトルと金額のリセット
    memoTitleRef.current.value = null;
    memoCashRef.current.value = null;

    setTotal((prevTotal) => prevTotal + cash);
  };

  // チェックボックスのチェックの有無
  const toggleMemo = (id) => {
    const newMemos = [...memos];
    const memo = newMemos.find((memo) => memo.id === id);
    memo.completed = !memo.completed;
    setMemos(newMemos);

    // チェックが入っている場合、金額を合計から減算
    if (memo.completed) {
      setTotal((prevTotal) => prevTotal - memo.cash);
    } else {
      // チェックが外れている場合、金額を合計に加算
      setTotal((prevTotal) => prevTotal + memo.cash);
    }
  };

  // 削除
  const handleClear = () => {
    const newMemos = memos.filter((memo) => !memo.completed);
    setMemos(newMemos);
  }


  return (
    <div>
      <MemoList memos={memos} toggleMemo={toggleMemo} />
      <input
        type="text"
        name="title"
        placeholder="アイテムを入力してください"
        ref={memoTitleRef}
      />
      <input
        type="number"
        name="cash"
        placeholder="金額を入力してください"
        ref={memoCashRef}
      />

      <button onClick={handleAddMemo}>追加</button>

      <button onClick={handleClear}>削除</button>

      <div>合計アイテム:{memos.filter((memo) => !memo.completed).length}</div>

      <div>合計金額: {total}</div>


    </div>


  );
};

export default App;
