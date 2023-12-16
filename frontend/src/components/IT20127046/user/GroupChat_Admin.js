import "../css/GroupChat.css";
import io from "socket.io-client";
import { useEffect, useState } from "react";
import Chat from "./GroupChat";
import axios from 'axios';
import jwt_decode from 'jwt-decode';
import ScrollToBottom from "react-scroll-to-bottom";

const socket = io.connect("http://localhost:3001");

export default function GroupChatAdmin() {
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");
  const [showChat, setShowChat] = useState(false);
  const [studentGroups, setStudentGroups] = useState([]);

  const joinRoom = () => {
    if (username !== "" && room !== "") {
      socket.emit("join_room", room);
      setShowChat(true);
    }
  };

  useEffect(()=>{

    const usertoken = localStorage.userToken;
    const decoded = jwt_decode(usertoken);

    setUsername(decoded.name);

    axios.get("http://localhost:5000/sgroups")
    .then(res => {setStudentGroups(res.data.existingstudentgroups)});
    console.log(studentGroups);
  }, [])

//   const getStudentGroups = () => {
//     axios.get("http://localhost:5000/sgroups")
//     .then(res => {setStudentGroups(res.data.existingstudentgroups)});
//     console.log(studentGroups);
//   }

  return (
    <div className="container">
      <br/>
      <div className="col-lg-9 mt-0 mb-2">
        <h2>Group Chat</h2>
      </div>
      <hr />

      <div className="container chatBox">
        <div className="row text-center groupSeletePanal">
          <div className="col-3 bg-dark text-white detailsPanel"><br/>
            <h5>Student Groups</h5><br/>

            <input
                type='text'
                className="from-control"
                placeholder="Search"
            /><br/><br/>

            {!showChat ? (
              <button className="btn btn-danger" onClick={() => {setShowChat(false)}} disabled>Leave Chat</button>
            ) : (
              <button className="btn btn-danger" onClick={() => {setShowChat(false)}}>Leave Chat</button>
            )}
            

            <ScrollToBottom className="message-container-groupList">
                {studentGroups.map((data, index) => {
                    return(  
                        <div className="getGroupList" key={index}>
                            <button onClick={() => {setRoom(data.groupid)}} style={{ background: "none", border: "none", margin: "0px 5px 5px 5px", color: "white" }}>
                              {data.groupid}
                            </button>
                        </div>
                    )
                })}
             </ScrollToBottom>

          </div>
          <div className="col-9 p-3 mb-2 bg-light text-dark">
            <div className="d-flex justify-content-center chatBoxAlign">
              {!showChat ? (
                <div className="chatInput"><br/><br/><br/>
                  <h3>Join A Group Chat</h3><br/>
                  <input
                    type="text"
                    placeholder="Name"
                    className="form-control"
                    value={username}
                    onChange={(event) => {
                      setUsername(event.target.value);
                    }}
                  /><br/>
                  <input
                    type="text"
                    placeholder="Group ID"
                    className="form-control"
                    value={room}
                    onChange={(event) => {
                      setRoom(event.target.value);
                    }}
                  /><br/>
                  <button onClick={joinRoom} className="btn btn-outline-info">Join with Group</button>
                </div>
              ) : (
                <Chat socket={socket} username={username} room={room} />
              )}
            </div>
          </div>
        </div>
      </div>
      
    </div>
  );
}
