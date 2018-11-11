import React from "react";

export default ({
  todo,
  movableRight,
  movableLeft,
  onMoveRight,
  onMoveLeft
}) => (
  <div className="todo">
    {movableLeft && <button onClick={onMoveLeft}>{"<="}</button>}
    {todo}
    {movableRight && <button onClick={onMoveRight}>{"=>"}</button>}
  </div>
);
