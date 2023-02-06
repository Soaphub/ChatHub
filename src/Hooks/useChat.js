import {useState, useEffect} from 'react';

const UseChat = () => {
    const [screenSize, setScreenSize]= useState(false);
    const [replied, setReply]= useState(false);
    const [edit, setEdit]= useState(false);
    const [replyID, setreplyID]= useState(0);
    const [editID, setEditID]= useState(0);
    const [total, setTotal]= useState(0);

    const month = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "Octomber", "November", "December"];
    const d= new Date();

    useEffect(()=> {
        const mobileView= window.matchMedia("(max-width: 991.98px)");
            if( mobileView.matches){
                setScreenSize(true);
            }
      }, [])
    
    const postComment=(total, comment, userImage, username)=>{
        const commentData= {
            "id": (total + 1).toFixed(),
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
    
    const postData1= (commentData)=>{
        fetch("https://my-json-server.typicode.com/Soaphub/chatserver/comments", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(commentData)
        })
    }

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

    const postData2= (id, replyData)=>{
        fetch("https://my-json-server.typicode.com/Soaphub/chatserver/comments/"+id+"/replies", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(replyData)
        });
    } 

    const replyData=(id, totalComments)=>{
        if(replyID>0){
            const chatBox= document.getElementById("chat-box-"+replyID);
            chatBox.classList.remove("chat-box-edit");
        }
        setReply(true);
        setreplyID(id);
        setTotal(totalComments);
    }

    const editData=(id)=>{
        setEdit(true);
        setEditID(id);
    }

    const postUpdate=(comment)=>{
        const calc= Number(editID);
        const id = Math.trunc(calc);

        if(Number.isInteger(calc)){
            fetch("https://my-json-server.typicode.com/Soaphub/chatserver/comments/"+ id+"/replies", {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({    content: comment  })
            })
        }else{
            fetch("https://my-json-server.typicode.com/Soaphub/chatserver/comments/"+ id+ "/replies?id=" + calc, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({    content: comment  })
            })
        }
        setEdit(false);
    }

    const deleteData=(id)=>{
        const calc = Number(id);
        const commentID= Math.trunc(calc);

        if(Number.isInteger(calc)){
            fetch("https://my-json-server.typicode.com/Soaphub/chatserver/comments/" + commentID, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
        }else{
            fetch("https://my-json-server.typicode.com/Soaphub/chatserver/comments/" + commentID+ "/replies?id=" + calc, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
        }
        
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

    return {screenSize, replied, replyID, total, edit, editID,  
        editData, postComment, deleteData, replyData, postReply, postUpdate, voteAdd, voteMinus}
}

export default UseChat;
