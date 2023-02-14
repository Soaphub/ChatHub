import React, {useEffect} from "react";
import "./App.css"
import Comment from "./Components/Comment";
import ChatBox from "./Components/ChatBox";
import { useSelector, useDispatch } from 'react-redux'
import { fetchPosts} from './redux/fetch'


function App() {
  const {data, user}= useSelector((state) => state.counter);
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  return (
    <div className="body">
      { (data && user) &&
      <>
        <Comment data={data} userData={user}/>
	      <ChatBox data={data} userData={user}/>
      </>}
    </div>
  );
}

export default App;
