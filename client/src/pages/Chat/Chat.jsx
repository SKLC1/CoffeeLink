import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function Chat({socket, currentUser}) {
  const {room} = useParams()
   const [currentMsg, setCurrentMsg] = useState("")
   const [msgList, setMsgList] = useState([])
  
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
       <div>{`${msgContent.author}:${msgContent.message}`}</div>
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