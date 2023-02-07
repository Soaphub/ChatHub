import React, {useEffect, useState} from "react";
import "./App.css"
import Comment from "./Components/Comment";
import ChatBox from "./Components/ChatBox";

function App() {
  
  const [data, setData]= useState(null);
  const [user, setUser]= useState(null);

  const getData= async()=>{
      const response1= await fetch("https://json-server-vercel-ruby.vercel.app/comments?_embed=replies");
      const response2= await fetch("https://json-server-vercel-ruby.vercel.app/currentUser");
      const jasonData1= await response1.json();
      const jasonData2= await response2.json();
      setData(jasonData1);
      setUser(jasonData2);
  }
  
  useEffect(()=> {
    getData();
  },[])

  return (
    <div className="body">
      { data && 
      <>
        <Comment data={data} userData={user}/>
	      <ChatBox data={data} userData={user}/>
      </>}
    </div>
  );
}

export default App;
