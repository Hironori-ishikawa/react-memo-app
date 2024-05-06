import React from 'react'
import { Memo } from './Memo';

export const MemoList = ({ memos, toggleMemo }) => {
  return memos.map((memo) => (
    <Memo memo={memo} key={memo.id} toggleMemo={toggleMemo} />
  ));
};
