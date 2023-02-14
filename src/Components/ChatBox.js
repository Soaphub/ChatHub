import React, {useState} from 'react';
import "./Layout.css"
import UseChat from '../Hooks/useChat';

const ChatBox = ({userData, id, replied, replyID, data, total}) => {

    const {screenSize , postComment, postReply} = UseChat();

    const [comment, setComment]= useState();//saves the commment or rely text

    const username= userData.username;
    const userImage= userData.image.png;

    const handleSubmit=(e)=>{
        e.preventDefault();
        if(replied){
            const chatBox= document.getElementById("chat-box-"+replyID);
            chatBox.classList.add("chat-box-edit");
            handleReply();
        }else {
            handleComment();
        }
    }

    const handleComment=()=>{
        let total= data.length;
        postComment(total, comment, userImage, username);
    }

    const handleReply=()=>{
        const replyTo= data.user.username;
        postReply(replyID, total, comment, replyTo, userImage, username);
    }

    return (
    <div className='chat-box'>
        { screenSize ?   //smaller screen
        <>  
            <form onSubmit={handleSubmit}>
                <textarea name="reply" rows="10" cols="30" onChange={(e)=> setComment(e.target.value)}
                placeholder='Add a comment....'
                value={comment}>
                </textarea>
                { (replied && id === replyID) ? 
                    <input type="submit" value="REPLY"></input> : <input type="submit" value="SEND"></input>
                }
            </form>
            <img className="avatar" src="./images/avatars/image-juliusomo.png" alt="avatar"></img>
        </>:    //Larger screen
        <>
            <img className="avatar" src="./images/avatars/image-juliusomo.png" alt="avatar"></img>
            <form onSubmit={handleSubmit}>
                <textarea name="reply" rows="10" cols="30" onChange={(e)=> setComment(e.target.value)}
                placeholder='Add a comment....' 
                value={comment}>
                </textarea>
                { (replied && id === replyID) ? 
                    <input type="submit" value="REPLY"></input> : <input type="submit" value="SEND"></input>
                }
            </form>
        </>}    
    </div>);
}

export default ChatBox;
