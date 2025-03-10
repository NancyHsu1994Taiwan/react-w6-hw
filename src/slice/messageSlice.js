// src/slice/messageSlice.js
import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const messageSlice = createSlice({
  name: "message",
  // {
  //   id: new Date().getTime(),
  //   type: "success",
  //   title: "update",
  //   text: "更新成功",
  // },
  initialState: [],
  reducers: {
    createMessage(state, action) {
      if (action.payload.success) {
        const id = new Date().getTime();
        const item = {
          id,
          type: "success",
          title: "成功",
          text: action.payload.message,
        };
        state.push(item); // 加入state
      } else {
        const id = new Date().getTime();
        const item = {
          id,
          type: "danger",
          title: "錯誤",
          text: Array.isArray(action.payload.message)
            ? action.payload.message.join("、")
            : action.payload.message,
        };
        state.push(item); // 加入state
      }
    },
    removeMessage(state, action) {
      const index = state.findIndex((item) => item === action.payload);
      state.splice(index, 1);
    },
  },
});
export const createAsyncMessage = createAsyncThunk(
  "message/createAsyncMessage",
  async (payload, { dispatch, requestId }) => {
    // 參數：自定義名稱、async function
    dispatch(
      messageSlice.actions.createMessage({
        ...payload,
        id: requestId,
      })
    );
    setTimeout(() => {
      dispatch(messageSlice.actions.removeMessage(requestId));
    }, 2000);
  }
);
export const { createMessage, removeMessage } = messageSlice.actions;
export default messageSlice.reducer;
