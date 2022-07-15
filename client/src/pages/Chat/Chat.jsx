import { useContext, useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
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
  const location = useLocation()
  
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
      // if(!location.pathname.includes('chat')){
        setNotifications((prev)=>[...prev, data ])
      // }
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
        key={msgContent.time + msgContent.message + Math.random()} 
        backgroundColor={msgContent.author  === currentUser.loggedUser.first ?
          "hsl(210,99%,50%)":
          "#7d7e80"
        }
        side={msgContent.author  === currentUser.loggedUser.first ?
          "baseline":
          "end"}
         >
        
       <div className="message">
        <span className="message-content">
          <p>{msgContent.author}</p>
          <p>{msgContent.time}</p>
        </span>
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
      <h2>Chat</h2>
      <div className="chat-header">
        <h4>Live Chat</h4>
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