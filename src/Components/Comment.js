import React, {useState} from 'react';
import "./Layout.css";
import Reply from './Reply';
import UseChat from '../Hooks/useChat';
import ChatBox from './ChatBox';

const Comment = ({data, userData}) => {
    const {screenSize, replied, replyID, total, edit, editID, 
        editData, deleteData, replyData, postUpdate, voteAdd, voteMinus} = UseChat();
    const [content, setContent]= useState();

    const handleDelete=(e)=>{
        const id= e.target.id;
        deleteData(id);
    }

    const handleReply=(e)=>{
        const id= e.target.id;
        const totalRplies= data[id - 1].replies.length;
        replyData(id, totalRplies);
    }

    const handleEdit=(e)=>{
        const id= e.target.id;
        editData(id);
    }

    const handleSubmit=(e)=>{
        e.preventDefault();
        postUpdate(content);
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
        { data.map((comment)=>(
            <>
            { screenSize ?
            <>
                <div key={comment.id} className='dailog-panel-sm'>
                    <div>
                        <div className='chat-title'>
                                <img className="avatar" src={comment.user.image.png} alt="profile"></img>
                                <h1>{comment.user.username}</h1>
                                <h2>{comment.createdAt}</h2>
                        </div>
                        <div className='update-panel'>
                        { (edit && comment.id === editID) ? 
                            <form onSubmit={handleSubmit}>
                                <textarea name="reply" rows="10" cols="30" onChange={(e)=> setContent(e.target.value)}
                                defaultValue={ comment.content && comment.content}
                                value={content}>
                                </textarea>
                                <input type="submit" value="UPDATE"></input>
                            </form>:
                            <>
                                <p>{comment.content}</p>
                            </>}
                        </div>
                    </div>
                    <div>
                        <div className='voting-panel'>
                            <div id={comment.id} onClick={handleAdd}>+</div>
                            <div id={'no-of-vote'+comment.id} className="no-of-vote">{comment.score}</div>
                            <div id={comment.id}  onClick={handleMinus}>-</div>
                        </div>
                        <div className='action-panel'>
                            {   comment.user.username === userData.username ?
                                <>
                                    <div id={comment.id} onClick={handleDelete}>
                                        <img id={comment.id} className="reply-icon" src="./images/icon-delete.svg" alt="delete"></img>
                                        <h3 id={comment.id} style={{"color":"hsl(358, 79%, 66%)"}}>Delete</h3>
                                    </div>
                                    <div id={comment.id} onClick={handleEdit}>
                                        <img id={comment.id} className="reply-icon" src="./images/icon-edit.svg" alt="edit"></img>
                                        <h3 id={comment.id}>Edit</h3>
                                    </div>
                                </>:
                                <div id={comment.id} onClick={handleReply}>
                                    <img id={comment.id} className="reply-icon" src="./images/icon-reply.svg" alt="reply"></img>
                                    <h3 id={comment.id}>Reply</h3>  
                                </div>
                            }
                        </div>
                    </div>
                </div>
                
                <div id={"chat-box-"+comment.id} className="">
                { (replied && comment.id === replyID) && 
                    <ChatBox data={comment} total={total} id={comment.id} replied={replied} replyID={replyID} userData={userData}/>
                }
                </div>
                
                <div className='reply-panel'>
                { comment.replies && <Reply data={data} userData={userData} replies={comment.replies}/> }
                </div>
            </>: 
            <>
                <div key={comment.id} className='dailog-panel-lg'>
                    <div className='voting-panel'>
                            <div id={comment.id} onClick={handleAdd}>+</div>
                            <div id={'no-of-vote'+comment.id} className="no-of-vote">{comment.score}</div>
                            <div id={comment.id} onClick={handleMinus}>-</div>
                    </div>
                    <div>
                        <div className='chat-title'>
                            <div>
                                <img className="avatar" src={comment.user.image.png} alt="profile"></img>
                                <h1>{comment.user.username}</h1>
                                <h2>{comment.createdAt}</h2>
                            </div>
                            <div className='action-panel'>
                                {   comment.user.username === userData.username ?
                                    <>
                                    <div id={comment.id} onClick={handleDelete}>
                                        <img id={comment.id} className="reply-icon" src="./images/icon-delete.svg" alt="delete"></img>
                                        <h3 id={comment.id} style={{"color":"hsl(358, 79%, 66%)"}}>Delete</h3>
                                    </div>
                                    <div id={comment.id} onClick={handleEdit}>
                                        <img id={comment.id} className="reply-icon" src="./images/icon-edit.svg" alt="edit"></img>
                                        <h3 id={comment.id}>Edit</h3>
                                    </div>
                                    </>:
                                    <div id={comment.id} onClick={handleReply}>
                                        <img id={comment.id} className="reply-icon" src="./images/icon-reply.svg" alt="reply"></img>
                                        <h3 id={comment.id}>Reply</h3>  
                                    </div>
                                }
                            </div>
                        </div>
                        <div className='update-panel'>
                        { (edit && comment.id === editID) ? 
                            <form onSubmit={handleSubmit}>
                                <textarea name="reply" rows="10" cols="30" onChange={(e)=> setContent(e.target.value)}
                                defaultValue={ comment.content && comment.content}
                                value={content}>
                                </textarea>
                                <input type="submit" value="UPDATE"></input>
                            </form>:
                            <>
                                <p>{comment.content}</p>
                            </>}
                        </div>
                    </div>
                </div>

                <div id={"chat-box-"+comment.id} className="">
                    { (replied && comment.id === replyID) && 
                        <ChatBox data={comment} total={total} id={comment.id} replied={replied} replyID={replyID} userData={userData}/>
                    }
                </div>

                <div className='reply-panel'>
                { comment.replies && <Reply data={comment} userData={userData} replies={comment.replies}/> }
                </div>
            </>} 
        </>))}
    </>);
}

export default Comment;

