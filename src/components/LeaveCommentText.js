const LeaveCommentText = ({ position }) => {
  return (
    <div
      className="leave-comment-text"
      style={{
        position: "absolute",
        left: position.x + 10,
        top: position.y,
      }}
    >
      Please Click To Leave Comment
    </div>
  );
};
export default LeaveCommentText;
