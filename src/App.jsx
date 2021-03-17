
import { useEffect, useState } from 'react';
import './App.css';
import Chat from './Chat';

import Pusher from 'pusher-js'
import axios from './axios'


function App() {

  const [messages, setMessages] = useState([]);
 
  useEffect(() => {
    axios.get('/messages/sync')
    .then(response => {
      setMessages(response.data)
      console.log(response.data)
    })
  }, [])

  useEffect(() => {
    const pusher = new Pusher('ff008f8ea2743fe9ac65', {
      cluster: 'us2'
    });

    const channel = pusher.subscribe('messages');
    channel.bind('inserted', function(newMessage) {
      setMessages([...messages, newMessage])
    });

    return () => {
      channel.unbind_all();
      channel.unsubscribe();
    };

  }, [messages]);

  console.log(messages);

  return (
    <div className="App">

      <div className="app__body">
      
      <Chat messages={messages}/>
      </div>

      

    </div>
  );
}

export default App;
