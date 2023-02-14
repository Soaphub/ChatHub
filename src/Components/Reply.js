import React, {useState} from 'react';
import UseChat from '../Hooks/useChat';
import ChatBox from './ChatBox';
import Delete from './Delete';

const Replay = ({userData, replies}) => {
    const {screenSize, replied, replyID, edit, editID, dlt, deleteID,
        editData, deletePopup, replyData, postUpdate, voteAdd, voteMinus} = UseChat();
    const [comment, setComment]= useState();
    
    let totalReplies= replies.length;

    const handleDelete=(e)=>{
        const id= e.target.id;
        deletePopup(id);
    }

    const handleReply=(e)=>{
        const id= e.target.id;
        replyData(id);
    }

    const handleEdit=(e)=>{
        const id= e.target.id;
        editData(id);
    }

    const handleSubmit=(e)=>{
        e.preventDefault();
        postUpdate(comment);
    }

    const handleAdd=(e)=>{
        const id= e.target.id;
        voteAdd(id);
    }

    const handleMinus=(e)=>{
        const id= e.target.id
        voteMinus(id);
    }

    return (
    <>
        {   replies.map((reply, index)=>(
        <>  
            { screenSize ?
            <div key={index}>      
                <div className='dailog-panel-sm'>
                   <div>
                       <div className='chat-title'>
                            <img className="avatar" src={reply.user.image.png} alt="profile"></img>
                            <h1>{reply.user.username}</h1>
                            <h2>{reply.createdAt}</h2>
                       </div>
                       <div className='update-panel'>
                            { (edit && reply.id === editID) ? 
                            <form onSubmit={handleSubmit}>
                                <textarea name="reply" rows="10" cols="30" onChange={(e)=> setComment(e.target.value)}
                                defaultValue={ reply.content && reply.content}
                                value={comment}>
                                </textarea>
                                <input type="submit" value="UPDATE"></input>
                            </form>:
                            <>
                                <h4>@{reply.replyingTo}, </h4>
                                <p>{reply.content}</p>
                            </>}
                       </div>
                   </div>
                    <div>
                        <div className="voting-panel">
                            <div id={reply.id} onClick={handleAdd}>+</div>
                            <div id={'no-of-vote'+reply.id} className="no-of-vote">{reply.score}</div>
                            <div id={reply.id}  onClick={handleMinus}>-</div>
                        </div>
                        <div className='action-panel'>
                            {   reply.user.username === "juliusomo" ?
                                <>
                                    <div id={reply.id} onClick={handleDelete}>
                                        <img id={reply.id} className="reply-icon" src="./images/icon-delete.svg" alt="delete"></img>
                                        <h3 id={reply.id} style={{"color":"hsl(358, 79%, 66%)"}}>Delete</h3>
                                    </div>
                                    <div id={reply.id} onClick={handleEdit}>
                                        <img id={reply.id} className="reply-icon" src="./images/icon-edit.svg" alt="edit"></img>
                                        <h3 id={reply.id}>Edit</h3>
                                    </div>
                                </>:
                                <div id={reply.id} onClick={handleReply}>
                                    <img id={reply.id} className="reply-icon" src="./images/icon-reply.svg" alt="reply"></img>
                                    <h3 id={reply.id}>Reply</h3>  
                                </div>
                            }
                        </div>
                    </div>    
                </div>
                
                <div id={"chat-box-"+reply.id} className="">
                    { (replied && reply.id === replyID) && 
                        <ChatBox data={reply} total={totalReplies} id={reply.id} replied={replied} replyID={replyID}  userData={userData}/>
                    }
                </div>

                <div id={"delete-box-"+reply.id} className='delete-box-edit-2'>
                { (dlt && deleteID===reply.id) && <Delete id={deleteID} ></Delete>}
                </div>

            </div>:
            <div key={index}>
                <div className='dailog-panel-lg'>
                   <div className='voting-panel'>
                            <div id={reply.id} onClick={handleAdd}>+</div>
                            <div id={'no-of-vote'+reply.id} className="no-of-vote">{reply.score}</div>
                            <div id={reply.id}  onClick={handleMinus}>-</div>
                   </div>
                   <div>
                       <div className='chat-title'>
                           <div>
                               <img className="avatar" src={reply.user.image.png} alt="profile"></img>
                               <h1>{reply.user.username}</h1>
                               <h2>{reply.createdAt}</h2>
                           </div>
                           <div className='action-panel'>
                                {   reply.user.username === "juliusomo" ?
                                    <>
                                        <div id={reply.id} onClick={handleDelete}>
                                            <img id={reply.id} className="reply-icon" src="./images/icon-delete.svg" alt="delete"></img>
                                            <h3 id={reply.id} style={{"color":"hsl(358, 79%, 66%)"}}>Delete</h3>
                                        </div>
                                        <div id={reply.id} onClick={handleEdit}>
                                            <img id={reply.id} className="reply-icon" src="./images/icon-edit.svg" alt="edit"></img>
                                            <h3 id={reply.id}>Edit</h3>
                                        </div>
                                    </>:
                                    <div id={reply.id} onClick={handleReply}>
                                        <img id={reply.id} className="reply-icon" src="./images/icon-reply.svg" alt="reply"></img>
                                        <h3 id={reply.id}>Reply</h3>  
                                    </div>
                                }
                           </div>
                       </div>
                       <div className='update-panel'>
                            { (edit && reply.id === editID) ? 
                            <form onSubmit={handleSubmit}>
                                <textarea name="reply" rows="10" cols="30" onChange={(e)=> setComment(e.target.value)}
                                defaultValue={ reply.content && reply.content}
                                value={comment}>
                                </textarea>
                                <input type="submit" value="UPDATE"></input>
                            </form>:
                            <>
                                <h4>@{reply.replyingTo}, </h4>
                                <p>{reply.content}</p>
                            </>}
                       </div>
                   </div>    
                </div>
                
                <div id={"chat-box-"+reply.id} className="">
                    { (replied && reply.id === replyID) && 
                        <ChatBox data={reply} total={totalReplies} id={reply.id} replied={replied} replyID={replyID}  userData={userData}/>
                    }
                </div>

                <div id={"delete-box-"+reply.id} className='delete-box-edit-2'>
                { (dlt && deleteID===reply.id) && <Delete id={deleteID} ></Delete>}
                </div>

            </div>}
        </>))}
    </>);
}

export default Replay;
