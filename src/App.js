import "./App.css";
import { useEffect, useRef, useState } from "react";
import LeaveCommentText from "./components/LeaveCommentText";
import TextBox from "./components/TextBox";
import MainContext from "./MainContext";
import Note from "./components/Text";

function App() {
  const [position, setPosition] = useState({
    x: 0,
    y: 0,
  });
  const screen = useRef(null);
  const [commentMode, setCommentMode] = useState(false);
  const [boxVisible, setBoxVisible] = useState(false);
  const [boxPosition, setBoxPosition] = useState({
    x: 0,
    y: 0,
  });

  const [notes, setNotes] = useState([]);

  const handleMouseMove = (e) => {
    setPosition({
      x: e.pageX,
      y: e.pageY,
    });
  };

  const handleKeyUp = (e) => {
    if (e.key === "c") {
      setCommentMode(!commentMode);
    }
    if (e.key === "Escape") {
      setBoxVisible(false);
      setCommentMode(!commentMode);
    }
  };

  const handleMouseClick = (e) => {
    if (commentMode) {
      setBoxPosition({
        x: e.pageX,
        y: e.pageY,
      });
      setCommentMode(false);
      setBoxVisible(true);
    }
  };

  useEffect(() => {
    screen.current.focus();
  }, []);

  useEffect(() => {
    console.log(notes);
  }, [notes]);

  const data = {
    setCommentMode,
    notes,
    setNotes,
    boxPosition,
    setBoxVisible,
  };

  return (
    <MainContext.Provider value={data}>
      <div
        onKeyUp={handleKeyUp}
        ref={screen}
        className={`screen${commentMode ? " editable" : ""}`}
        tabIndex={0}
        style={{ width: "100%", height: "99vh" }}
        onMouseMove={handleMouseMove}
        onClick={handleMouseClick}
      >
        {commentMode && <LeaveCommentText position={position} />}

        {boxVisible && <TextBox boxPosition={boxPosition} />}

        {notes.map((note, key) => (
          <Note key={key} note={note} />
        ))}
        <div>Click "c" to comment mode</div>
      </div>
    </MainContext.Provider>
  );
}

export default App;
