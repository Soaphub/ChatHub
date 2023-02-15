# Frontend Mentor - Interactive comments section solution

This is a solution to the [Interactive comments section challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/interactive-comments-section-iG1RugEG9). Frontend Mentor challenges help you improve your coding skills by building realistic projects. 

## Table of contents

- [Overview](#overview)
  - [The challenge](#the-challenge)
  - [Links](#links)
- [My process](#my-process)
  - [Built with](#built-with)
  - [What I learned](#what-i-learned)
  - [Useful resources](#useful-resources)
- [Author](#author)
- [Acknowledgments](#acknowledgments)


## Overview

### The challenge

Users should be able to:

- View the optimal layout for the app depending on their device's screen size
- See hover states for all interactive elements on the page
- Create, Read, Update, and Delete comments and replies
- Upvote and downvote comments
- Purely front-end project, use `localStorage` to save the current state in the browser that persists when the browser is refreshed.
- Instead of using the `createdAt` strings from the `data.json` file, used timestamps for dynamically track the time since the comment or reply was posted.


### Links

- Solution URL: [https://github.com/Soaphub/ChatHub]
- Live Site URL: [https://chat-hub-34ab.vercel.app]

## My process

### Built with

- Semantic HTML5 markup
- CSS custom properties
- Flexbox
- CSS Grid
- Mobile-first workflow
- [React](https://reactjs.org/) - JS library
- [Redux]- React toolkit

### What I learned

Learned to use redux to fetch and store data
```js
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
   }
```

### Useful resources

- [AnthonySistilli](https://www.youtube.com/c/AnthonySistilli) - This helped me for Redux toolkit.

## Author

- Website - [Ambadi](https://soaphub.github.io/Mysite/)
- Frontend Mentor - [@Soaphub](https://www.frontendmentor.io/profile/Soaphub)


## Acknowledgments

The udemdy coarse by Angela helped a lot in completing the project.
