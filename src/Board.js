import React from "react";
import Todo from "./Todo";

export default ({
  board,
  boardIndex,
  onMoveRight,
  onMoveLeft,
  onSubmit,
  buttonClicked,
  buttonToggle,
  onShowInputBox
}) => (
  <div className="board">
    <h1 className="personName">{board.name}</h1>
    {board.todos.map((todo, todoIndex) => (
      <Todo
        todo={todo}
        todoIndex={todoIndex}
        key={todoIndex}
        movableRight={boardIndex !== 3}
        movableLeft={boardIndex !== 0}
        onMoveRight={() => onMoveRight(todoIndex)}
        onMoveLeft={() => onMoveLeft(todoIndex)}
      />
    ))}

    <form onClick={onShowInputBox} onSubmit={onSubmit}>
      <input type="hidden" name="input" />
      <button name="button">+ Add an item</button>
    </form>
  </div>
);
