import {useState, useEffect} from 'react';
import { useDispatch } from 'react-redux';
import { create, createReply, update, updateReply, remove, removeReply} from '../redux/fetch'

const UseChat = () => {
    
    const dispatch = useDispatch()

    const [screenSize, setScreenSize]= useState(false); //Responsive Website

    const [replied, setReply]= useState(false); //handle reply popup content
    const [replyID, setreplyID]= useState(0); //saves id of the reply content

    const [edit, setEdit]= useState(false); //handle edit popup content
    const [editID, setEditID]= useState(0); //saves id of edit content

    const [dlt, setDelete]= useState(false); //handle delete popup content
    const [deleteID, setDelteID]= useState(0); //saves id of delete content

    const [total, setTotal]= useState(0); //saves total comment and replies

    const body = document.querySelector("body");

    // function to get present date 
    const month = ["Jan", "Feb", "March", "April", "May", "June", "July", "Aug", "Sept", 
    "Oct", "Nov", "Dec"];
    const d= new Date();

    useEffect(()=> {
        const mobileView= window.matchMedia("(max-width: 991.98px)");
            if( mobileView.matches){
                setScreenSize(true);
            }
      }, [])

    
    //creating json for Comment
    const postComment=(total, comment, userImage, username)=>{
        const commentData= {
            "id": (total + 1).toFixed(),
            "replies": [],
            "content": comment,
            "createdAt": d.getDate()+" "+month[d.getMonth()]+" "+d.getFullYear(),
            "score": "0",
            "user": {
              "image": { 
                "png": userImage,
                "webp": "./images/avatars/image-juliusomo.webp"
              },
              "username": username
            }
        };
        postData1(commentData);
    }
    //post request for Comment
    const postData1= (commentData)=>{
        dispatch(create(commentData));
    }

    //handle Reply popup
    const replyData=(id, totalComments)=>{
        if(replyID>0){
            const chatBox= document.getElementById("chat-box-"+replyID);
            chatBox.classList.remove("chat-box-edit");
        }else{
            setReply(true);
        }
        setreplyID(id);
        setTotal(totalComments);
    }
    //creating json for Reply  
    const postReply=(replyID, total, comment, replyTo, userImage, username)=>{
        const calc= Number(replyID);
        const id= Math.trunc(calc);
        let replyId;
        if(Number.isInteger(calc)){
            replyId = calc + (total + 1) * 0.1;
        }else{
            replyId =  (calc + total * 0.1);
        }
        const replyData={
            "commentId": id,
            "id": replyId.toFixed(1),
            "content": comment,
            "createdAt": d.getDate()+" "+month[d.getMonth()]+" "+d.getFullYear(),
            "score": "0",
            "replyingTo": replyTo,
            "user": {
              "image": {
                "png": userImage,
                "webp": "./images/avatars/image-ramsesmiron.webp"
              },
              "username": username
            }
        };
        postData2(id, replyData);
    }
    //Post request for Reply
    const postData2= (id, replyData)=>{
        dispatch(createReply({id, replyData}));
    } 

    //Handle Edit popup
    const editData=(id)=>{
        setEdit(true);
        setEditID(id);
    }
    //Patch request for Update content
    const postUpdate=(comment)=>{
        let id= Number(editID);
        const main = Math.trunc(id);
        if(comment){
            if(Number.isInteger(id)){
                dispatch(update({id, comment}));
            }else{
                id= Math.trunc((id - main) * 10);
                dispatch(updateReply({main, id, comment}));
            }
        }
        setEdit(false);
    }

    //Handle Delete popup
    const deletePopup=(id)=>{
        const offsetHeight= window.pageYOffset;
        const CurrentDeleteBox= document.getElementById("delete-box-"+id);
        CurrentDeleteBox.style.setProperty("--top", offsetHeight+"px");
        body.style.overflow="hidden";
        if(deleteID === 0){
            setDelete(true);
            CurrentDeleteBox.classList.remove("delete-box-edit-1");
            CurrentDeleteBox.classList.add("delete-box-edit-2");
        }else{
            CurrentDeleteBox.classList.remove("delete-box-edit-1");
            CurrentDeleteBox.classList.add("delete-box-edit-2");
        }
        setDelteID(id);
    }
    //Delete the content
    const deleteData=(id)=>{
        const calc = Number(id);
        const commentID= Math.trunc(calc);

        if(Number.isInteger(calc)){ 
            dispatch(remove(commentID));
        }else{
            dispatch(removeReply({commentID, calc}));
        }
        cancelDelete(id);
    }
    //Cancel the Delete popup
    const cancelDelete=(id)=>{
        const deleteBox= document.getElementById("delete-box-"+id);
        deleteBox.classList.remove("delete-box-edit-2");
        deleteBox.classList.add("delete-box-edit-1");
        body.style.overflow="auto";
    }

    const voteAdd=(id)=>{
        let noOfVotes= document.getElementById('no-of-vote'+id).innerHTML;
        document.getElementById('no-of-vote'+id).innerHTML= Number(noOfVotes) + 1;
    }
    const voteMinus=(id)=>{
        const noOfVotes= document.getElementById('no-of-vote'+id).innerHTML;
        if( Number(noOfVotes) > 0){  
            document.getElementById('no-of-vote'+id).innerHTML= Number(noOfVotes) - 1;
        }
    }

    return {screenSize, replied, replyID, total, edit, editID, dlt, deleteID,
        editData, postComment, deleteData, deletePopup, cancelDelete, replyData, 
        postReply, postUpdate, voteAdd, voteMinus}
}

export default UseChat;
