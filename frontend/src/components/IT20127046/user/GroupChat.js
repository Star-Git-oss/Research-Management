import React, { useEffect, useState } from "react";
import axios from 'axios';
import ScrollToBottom from "react-scroll-to-bottom";

export default function GroupChat({ socket, username, room }) {

    const [currentMessage, setCurrentMessage] = useState("");
    const [messageList, setMessageList] = useState([]);
    const [savedMsg, setSavedMsg] = useState([]);
  
    const sendMessage = async () => {
      if (currentMessage !== "") {
        const messageData = {
          room: room,
          author: username,
          message: currentMessage,
          time:
            new Date(Date.now()).getHours() +
            ":" +
            new Date(Date.now()).getMinutes(),
        };

        console.log(messageData);
        axios.post("http://localhost:5000/save/chatMsg", messageData)
        .then(() => {
            //alert('Message Save Successful');
        })
        .catch((err) => {
            alert(err);
        });
  
        await socket.emit("send_message", messageData);
        setMessageList((list) => [...list, messageData]);
        setCurrentMessage("");
      }
    };
  
    useEffect(() => {
      socket.on("receive_message", (data) => {
        setMessageList((list) => [...list, data]);
      });
      
    }, [socket]);
  
    const getPreMsg = () => {
      axios.get(`http://localhost:5000/chatMsg/get/${room}`)
        .then(res => {setSavedMsg(res.data)});
  
        console.log(savedMsg);
    }

    // const arr = savedMsg.map((data, index) => {
    //   return(
    //     <tr>
    //       <td>{data.message}</td>
    //       <td>{data.author}</td>
    //       <td>{data.time}</td>
    //     </tr>
    //   )
    // })

  
    return (
      <div className="chat-window">

        <br/>

        <div className="chat-body">

          <ScrollToBottom className="message-container">

            <button onClick={getPreMsg} className="preMessage"><i class="fa fa-chevron-up fa-2x" aria-hidden="true"></i></button>
            
            {savedMsg.map((data, index) => {
              return(
                <div className="message" id={username === data.author ? "you" : "other"}>
                  <div>
                      <div className="message-content">
                        <p>{data.message}</p>
                      </div>
                      <div className="message-meta">
                        <p id="time">{data.author}</p>
                        <p id="author">{data.time}</p>
                      </div>
                  </div>
                </div>
              )
            })}
            
            {messageList.map((messageContent) => {
              return (
                <div
                  className="message"
                  id={username === messageContent.author ? "you" : "other"}
                >
                  <div>
                    <div className="message-content">
                      <p>{messageContent.message}</p>
                    </div>
                    <div className="message-meta">
                      <p id="time">{messageContent.time}</p>
                      <p id="author">{messageContent.author}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </ScrollToBottom>
        </div><br/><br/>
        
        <div className="chat-footer">
          <input
            type="text"
            value={currentMessage}
            placeholder="Hey..."
            onChange={(event) => {
              setCurrentMessage(event.target.value);
            }}
            onKeyPress={(event) => {
              event.key === "Enter" && sendMessage();
            }}
          />
          <button onClick={sendMessage}><i class="fa fa-paper-plane" aria-hidden="true"></i></button>
        </div>
      </div>
    );
}
