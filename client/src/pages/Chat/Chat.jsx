import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { UserContext } from "../../UserContext";
import './Chat.css'

function Chat({socket}) {
  const {room} = useParams()
  const [currentMsg, setCurrentMsg] = useState("")
  const [msgList, setMsgList] = useState([])
  const {currentUser} = useContext(UserContext)
  
  async function sendMsg(){
    if(currentMsg !==""){
      const msgData = {
        room: room,
        author: currentUser.loggedUser.first,
        message: currentMsg,
        time: new Date(Date.now()).getHours() + ":" + new Date(Date.now()).getMinutes() 
      }
     await socket.emit("send_message", msgData)
     setMsgList((prev)=>[...prev, msgData])
    }
  }

  useEffect(()=>{
    socket.on("receive_message",(data)=>{
      console.log(data);
      setMsgList((prev)=>[...prev, data])
    })
  },[socket])

  function renderMsgList(){
    return msgList.map((msgContent)=>{
      return (
      <>
       <div id={currentUser.loggedUser.first === msgContent.author? "you": "other"} className="message">
        <div className="message-content">
          <p>{msgContent.author}</p>
          <p>{msgContent.time}</p>
        </div>
        <p className="message-meta">
          {msgContent.message}
        </p>
       </div>
      </>
      )
    })
  }

  return ( 
    <>
      <h1>Chat</h1>
      <div className="chat-header">
        <p>Live Chat</p>
      </div>
      <div className="chat-body">
        {renderMsgList()}
      </div>
      <div className="chat-footer">
        <input type='text' onChange={(e)=>{setCurrentMsg(e.target.value)}}/>
        <button onClick={sendMsg}>Send</button>
      </div>
    </>
   );
}

export default Chat;