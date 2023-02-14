import React from 'react';
import "./Layout.css"
import UseChat from '../Hooks/useChat';

const Delete = ({id}) => {

    const {deleteData, cancelDelete} = UseChat();

    const handleCancel=()=>{
        cancelDelete(id);
    }

    const handleDelete=()=>{
        deleteData(id);
    }

    return (
    <div className='blur'>
        <div className='popup-box'> 
            <div>
                <h1>Delete the comment</h1>
            </div>
            <div>
                <p>Are you sure you want to delete this comment? This will remove the comment and can't be undone.</p>
            </div>
            <div>
                <button onClick={handleCancel} className="cancel">NO, CANCEL</button>
                <button onClick={handleDelete} className="delete">YES, DELETE</button>
            </div>
        </div>
    </div>
    );
}

export default Delete;
