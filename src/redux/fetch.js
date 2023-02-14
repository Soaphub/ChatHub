import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

export const fetchPosts = createAsyncThunk('./fetch/fetchPosts', async () => {
    const response1= await fetch("https://json-server-vercel-ruby.vercel.app/comments?_embed=replies");
    const response2= await fetch("https://json-server-vercel-ruby.vercel.app/currentUser");
    const jasonData1= await response1.json();
    const jasonData2= await response2.json();
    saveToLocalStorage(jasonData1);
    return {jasonData1, jasonData2};
});

const saveToLocalStorage = (items) => {
    localStorage.setItem('chat-app', JSON.stringify(items));
}

export const counterSlice = createSlice({
  name: 'counter',
  initialState : {
    data: null,
    user: null,
  },
  reducers: {
    create: (state, action)=>{
        const posts = JSON.parse(localStorage.getItem("chat-app"));
        posts.push(action.payload);
        state.data.push(action.payload);
        saveToLocalStorage(posts);
    },
    createReply: (state, action)=>{
        const posts = JSON.parse(localStorage.getItem("chat-app"));
        const id= action.payload.id;
        const replyData= action.payload.replyData;
        const post= posts[id-1].replies;
        const reply=  state.data[id-1].replies;
        post.push(replyData);
        reply.push(replyData);
        saveToLocalStorage(posts);
    },
    update: (state, action) => {
        const posts = JSON.parse(localStorage.getItem("chat-app"));
        const id= action.payload.id;
        const updateData= action.payload.comment;
        posts[id - 1].content = updateData;
        state.data[id-1].content= updateData;
        saveToLocalStorage(posts);
    },
    updateReply:(state, action) => {
        const posts = JSON.parse(localStorage.getItem("chat-app"));
        const main = action.payload.main;
        const id= action.payload.id;
        const updateData= action.payload.comment;
        posts[main-1].replies[id-1].content = updateData;
        state.data[main-1].replies[id-1].content= updateData;
        saveToLocalStorage(posts);
    },
    remove: (state, action) => {
        const posts = JSON.parse(localStorage.getItem("chat-app"));
        const id = action.payload;
        const filter= posts.filter( post=> Number(post.id)!==id);
        state.data = filter;
        saveToLocalStorage(filter);
    },
    removeReply:(state, action) => {
        const posts = JSON.parse(localStorage.getItem("chat-app"));
        const main = action.payload.commentID;
        const id = action.payload.calc;
        const replies = posts[main-1].replies;
        const filter= replies.filter( reply=> Number(reply.id)!==id);
        console.log(filter);
        posts[main-1].replies = filter;
        state.data[main-1].replies = filter;
        saveToLocalStorage(posts);
    },
},extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.data = action.payload.jasonData1;
        state.user =  action.payload.jasonData2;
      });
  },
});

// Action creators are generated for each case reducer function
export const { create, createReply, update, updateReply, remove, removeReply} = counterSlice.actions

export default counterSlice.reducer