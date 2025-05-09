import { createSlice } from "@reduxjs/toolkit";

const INITIAL_STATE = {
  mode: 'light',
  user: null,
  token: null,
  posts: []
};

const authSlice = createSlice({
  name: "auth",
  initialState: INITIAL_STATE,
  reducers: {
    setMode: (state) => {
      state.mode = state.mode === 'light' ? 'dark' : 'light';
    },
    setLogin: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    setLogout: (state) => {
      state.user = null;
      state.token = null;
    },
    setFriends: (state, action) => {
      if(state.user) {
        state.user.friends = action.payload.friends
      } else {
        console.error('у пользователя нет друзей')
      }
      },
    setPosts: (state, action) => {
      state.posts = action.payload.posts;
    },
    updatePost: (state, action) => {
        state.posts = state.posts.map((post) =>
          post._id === action.payload._id ? action.payload.post : post
        );
      }
  },
});

export const {
  setMode,
  setLogin,
  setLogout,
  setFriends,
  setPosts,
  updatePost,
} = authSlice.actions;

export const authReducer = authSlice.reducer;
