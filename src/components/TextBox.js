import { useContext, useState } from "react";
import MainContext from "../MainContext";

const TextBox = ({ boxPosition }) => {
  const { setCommentMode, notes, setNotes, setBoxVisible, commentMode } =
    useContext(MainContext);
  const [note, setNote] = useState("");
  const types = [
    {
      name: "comment",
      color: "aquamarine",
      text: "Yorum",
    },
    {
      name: "private-comment",
      color: "#999",
      text: "Gizli Yorum",
    },
    {
      name: "note",
      color: "orange",
      text: "Not",
    },
  ];

  const [color, setColor] = useState(types[0].color);

  const handleChange = (e) => {
    setColor(e.target.value);
  };

  const addNote = () => {
    const currentNote = {
      text: note,
      color: color,
      number: notes.length + 1,
      x: boxPosition.x,
      y: boxPosition.y,
    };
    setBoxVisible(false);
    setCommentMode(true);
    setNotes([...notes, currentNote]);
  };
  return (
    <div
      className="text-box-container"
      onMouseEnter={() => {
        if (commentMode) {
          setCommentMode(false);
        }
      }}
      onMouseLeave={() => {
        if (!commentMode) {
          setCommentMode(false);
        } else {
          setCommentMode(true);
        }
      }}
      style={{
        "--color": color,
        position: "absolute",
        left: boxPosition.x,
        top: boxPosition.y,
      }}
    >
      <span>{notes.length + 1}</span>
      <div className="text-box">
        <select onChange={handleChange}>
          {types.map((type, key) => {
            return (
              <option key={key} value={type.color}>
                {type.text}
              </option>
            );
          })}
        </select>
        <textarea onChange={(e) => setNote(e.target.value)} rows="5" />
        <button className="btn-add" disabled={!note} onClick={addNote}>
          Add
        </button>
      </div>
    </div>
  );
};
export default TextBox;
