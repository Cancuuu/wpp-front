import React from 'react';
import './Chat.css';
import { IconButton, Avatar} from '@material-ui/core'
import AttachFile from '@material-ui/icons/AttachFile';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import SearchOutlined from '@material-ui/icons/SearchOutlined';
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon';
import SendIcon from '@material-ui/icons/Send';
import { useState } from 'react';
import axios from './axios';

const Chat = ({ messages }) => {

    const [input, setInput] = useState("");

    const sendMessage = async (e) => {
        e.preventDefault();

        await axios.post('/messages/new', {
            "message": input,
            "name": "Demo App",
            "timestamp": "Just Now",
            "received": false,
        });

        setInput('');
    }


    return (
        <div className="chat">
            <div className="chat__header">
                <Avatar src="https://avatars.githubusercontent.com/u/52618089?s=460&u=88cc60da75b1214a21df79a665dc9d481e2de036&v=4" />

                <div className="chat__headerInfo">
                    <h3>
                        Cancu Chat
                    </h3>
                
                </div>
                <div className="chat__headerRight">
                <IconButton>
                        <SearchOutlined />
                    </IconButton>
                    <IconButton>
                        <AttachFile />
                    </IconButton>
                    <IconButton>
                        <MoreVertIcon />
                    </IconButton>
                </div>
            </div>

            <div className="chat__body">
                {messages.map((message) => (
                    <p className={`chat__message ${message.received && "chat__reciever"}`}>
                    <span className="chat__name">
                        {message.name}
                    </span>
                    {message.message}
                    <span className="chat__timestamp">
                        {message.timestamp}
                    </span>
                </p>
                ))}

            </div>

            <div className="chat__footer">
                <InsertEmoticonIcon/>
                <form action="">
                    <input 
                        type="text"
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Type a message"
                        value={input}
                    />
                    <button type="submit" onClick={sendMessage}>
                        Send a message
                    </button>
                </form>
                <IconButton>
                <SendIcon onClick={sendMessage}/>
                </IconButton>
            </div>

        </div>
    )
}

export default Chat
