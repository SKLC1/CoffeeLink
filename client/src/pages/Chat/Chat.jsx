import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Form } from "../../StyledComponents/Form.style";
import { Item } from "../../StyledComponents/Item.style";
import { Message } from "../../StyledComponents/Message.style";
import { UserContext } from "../../UserContext";
import './Chat.css'

function Chat({socket}) {
  const {room} = useParams()
  const [currentMsg, setCurrentMsg] = useState("")
  const [msgList, setMsgList] = useState([])
  const {currentUser, notifications, setNotifications} = useContext(UserContext)
  
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
      setNotifications((prev)=>[...prev, data ])
    })

    socket.on("output-messages",(data)=>{
      console.log(data);
      data.map((msg)=>{
        setMsgList((prev)=>[...prev, msg])
      })
    })
  },[socket])

  useEffect(()=>{
    renderMsgList()
  },[msgList])

  function renderMsgList(){
    return msgList.map((msgContent)=>{
      return (
      <Message 
        key={msgContent.time + msgContent.message} 
        backgroundColor={msgContent.author? "#09f878": "hsl(210,99%,50%);"}>
       <div className="message">
        <div className="message-content">
          <p>{msgContent.author}</p>
          <p>{msgContent.time}</p>
        </div>
        <p className="message-meta">
          {msgContent.message}
        </p>
       </div>
      </Message>
      )
    })
  }

  return ( 
    <>
    <Form>
      <h1>Chat</h1>
      <div className="chat-header">
        <p>Live Chat</p>
      </div>
      <div className="chat-body">
        <div className="chat-window">
        {renderMsgList()}
        </div>
      </div>
      <div className="chat-footer">
        <input type='text' onChange={(e)=>{setCurrentMsg(e.target.value)}}/>
        <button onClick={sendMsg}>Send</button>
      </div>
    </Form>
    </>
   );
}

export default Chat;