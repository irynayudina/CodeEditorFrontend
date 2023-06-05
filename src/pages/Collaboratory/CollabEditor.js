import { useCallback, useEffect, useState } from "react";
import Quill from "quill";
import "quill/dist/quill.snow.css";
import { io } from "socket.io-client";
import { useParams } from "react-router-dom";



import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { Button } from "react-bootstrap";
import './Collab.scss'
import { Link } from "react-router-dom";







const SAVE_INTERVAL_MS = 2000;
const TOOLBAR_OPTIONS = [
  [{ header: [1, 2, 3, 4, 5, 6, false] }],
  [{ font: [] }],
  [{ list: "ordered" }, { list: "bullet" }],
  ["bold", "italic", "underline"],
  [{ color: [] }, { background: [] }],
  [{ script: "sub" }, { script: "super" }],
  [{ align: [] }],
  ["image", "blockquote", "code-block"],
  ["clean"],
];

export default function CollabEditor() {
  //here is user interactions with collab
  const { userInfo } = useSelector((state) => state.auth);
  const location = useLocation();
  let { associatedProject_id } = location?.state || "not passed";
  // getting collaboration by documentId
  // if it does not exist - creating a collaboration
  // if it exists - checking our user to see if hes in owners list
  // if hes not - adding to the list

  // on a userpage getting the list of all collabs user has
  // each of them will be a link with specific collab_id to click and open

  // inside editor of project collaboration leads to blank collab or to collab with id
  // based on the result of a check if any collab has associatedProject_id equal to this project id

  // remove collab link from main navbar

  // emmit page reload every time new person joins
  // and update people and active people once user joins or leaves

  // only owner of the project can save changes in the project related to collaboration
  const saveInProject = async () => {
    console.log("saved to project " + associatedProject_id);
    console.log("the saved text is: ");
    let plainText = quill.getText();
    console.log(plainText);
    //request to edit the project, toast to display error or success
  }



  // here is socket
  const { id: documentId } = useParams();
  const [socket, setSocket] = useState();
  const [quill, setQuill] = useState();
  const [users, setUsers] = useState([]);

  useEffect(() => {
  const userInfoPass = { _id: userInfo._id };
    const s = io("http://localhost:3001", {
      query: { userInfo: JSON.stringify(userInfoPass) },
    });
    setSocket(s);

    console.log("user is connected, the creation function");
    console.log("owner is " + userInfo?._id);
    console.log("collab_id is " + documentId);
    console.log("associatedProject_id is " + associatedProject_id);

    return () => {
      // s.emmit("user left", { id: userInfo._id });
      s.disconnect();
    };
  }, []);




  useEffect(() => {
    if (socket == null || !userInfo._id) return;
    socket.on("welcome", function (data) {
      console.log("i was welcomed: " + data.message);
      socket.emit("join user", { id: data.id, name: userInfo.name, usrId: userInfo._id });
    });
    socket.on("users updated", function (data) {
      console.log("Updated user list:", data); 
      setUsers(data.users)
    });
    socket.on("user disconnected", function (data) {
      console.log("User disconnected:", data);
      setUsers(data.users);
    });
  }, [socket, userInfo]);







  useEffect(() => {
    if (socket == null || quill == null) return;

    socket.once("load-document", (document) => {
      quill.setContents(document);
      quill.enable();
    });

    socket.emit("get-document", documentId);
  }, [socket, quill, documentId]);

  useEffect(() => {
    if (socket == null || quill == null) return;

    const interval = setInterval(() => {
      socket.emit("save-document", quill.getContents());
    }, SAVE_INTERVAL_MS);

    return () => {
      clearInterval(interval);
    };
  }, [socket, quill]);

  useEffect(() => {
    if (socket == null || quill == null) return;

    const handler = (delta) => {
      quill.updateContents(delta);
    };
    socket.on("receive-changes", handler);

    return () => {
      socket.off("receive-changes", handler);
    };
  }, [socket, quill]);

  useEffect(() => {
    if (socket == null || quill == null) return;

    const handler = (delta, oldDelta, source) => {
      if (source !== "user") return;
      socket.emit("send-changes", delta);
    };
    quill.on("text-change", handler);

    return () => {
      quill.off("text-change", handler);
    };
  }, [socket, quill]);

  const wrapperRef = useCallback((wrapper) => {
    if (wrapper == null) return;

    wrapper.innerHTML = "";
    const editor = document.createElement("div");
    wrapper.append(editor);
    const q = new Quill(editor, {
      theme: "snow",
      modules: { toolbar: TOOLBAR_OPTIONS },
    });
    q.disable();
    q.setText("Loading...");
    setQuill(q);
  }, []);
  return (
    <div>
      <div className="top-collab-nav">
        <Button variant="primary" size="sm" onClick={saveInProject}>
          Save in associated project (only the owner)
        </Button>
        <div>
          <div className="people-collab">
            People:
            <span>peoplw</span> <span>peoplw</span> <span>peoplw</span>{" "}
          </div>
          <div className="people-active-now">
            Active now:
            {users.map((user, index) => (
              <Link
                key={index}
                to={`/public/user/${user?.usrId}#projects`}
                className="text-decoration-none black-link"
              >
                <span>{user?.name}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
      <div className="container" ref={wrapperRef}></div>
    </div>
  );
}
