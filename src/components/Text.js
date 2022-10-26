import { useContext, useState } from "react";
import MainContext from "../MainContext";

const Text = ({ note }) => {
  const { setCommentMode } = useContext(MainContext);

  const [visible, setVisible] = useState(false);

  return (
    <div
      onMouseEnter={() => {
        setCommentMode(false);
      }}
      onMouseLeave={() => {
        setCommentMode(true);
      }}
      className="text-container"
      style={{
        "--color": note.color,
        position: "absolute",
        top: note.y,
        left: note.x,
      }}
    >
      <span onClick={() => setVisible(!visible)}>{note.number}</span>
      <div className="text-in" style={{ display: visible ? "flex" : "none" }}>
        {note.text}
      </div>
    </div>
  );
};

export default Text;
