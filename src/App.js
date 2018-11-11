import React, { Component } from "react";
import Board from "./Board";
import "./App.css";

// NOTE: Please build this kanban board from scratch without pre-built components such as react-trello...

// 1. Create a list of 4 boards with 2 default items in each list.
// 2. Style boards according to the png provided.
// 3. Create the functionality to add a task to each list.
// 4. Create the buttons and functionality to move cards from one list to another.
// 5. Persist cards in the browser.

// Comments from here is Jae's plan for the architecture.
//
// COMPONENT HIERARCHY
/**
 * App
 *  list(s)
 *    listHeader
 *      text
 *    listBody
 *      item(s)
 *        text
 *        buttons (move item)
 *    listFooter
 *      button (add item)
 */

//  STATE
/**
 * App
 *  list(s) - order
 *    name
 *  item(s) - order
 *    text
 *    list / position
 */

/** ACTIONS and STATE CHANGES
 * Add item to a list
 *  * App add an item with the list property set in state
 * Move items between lists
 *  * App changes the list property of an item in state
 *  * App change the position of mulitple notes in state
 *
 * defaults : 4 lists and 2 items for each
 * reorder cards / persist lists in the browser
 */

/** THINGS TO BE CONFIRMED
 * No drag and drop? move just by buttons?
 * Fixed position for each person(list)?
 * No editable list name?
 *  * if so, list changes its name state
 * No editable nor deletable text of an item once it's created?
 *  * if so, App changes text of an item in state
 * No reordering of items in a list
 *  * if so, App changes the position value in multiple notes
 */

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      boards: [
        {
          name: "Derrick",
          todos: ["Grocery Shopping", "Repair your broken phone"]
        },
        {
          name: "Maxwell",
          todos: ["Grocery Shopping", "Repair your broken phone"]
        },
        {
          name: "Zaza",
          todos: ["Grocery Shopping", "Repair your broken phone"]
        },
        {
          name: "Sam",
          todos: ["Grocery Shopping", "Repair your broken phone"]
        }
      ]
    };
  }

  handleAddTodo = (boardIndex, event) => {
    event.preventDefault();
    const newTodo = event.target.elements.input.value;
    if (newTodo) {
      // 1. take a copy of the existing state
      const boards = { ...this.state.boards };
      // 2. add the new todo
      boards[boardIndex].todos.push(newTodo);
      // 3. Set the new boards object to state
      this.setState(boards);
      event.target.elements.input.value = "";
    }
  };

  handleMoveRight = (boardIndex, todoIndex) => {
    const boards = { ...this.state.boards };
    const object = boards[boardIndex].todos[todoIndex];
    boards[boardIndex].todos.splice(todoIndex, 1);
    boards[boardIndex + 1].todos.push(object);
    this.setState(boards);
  };

  handleMoveLeft = (boardIndex, todoIndex) => {
    const boards = { ...this.state.boards };
    const object = boards[boardIndex].todos[todoIndex];
    boards[boardIndex].todos.splice(todoIndex, 1);
    boards[boardIndex - 1].todos.push(object);
    this.setState(boards);
  };

  handleShowInputBox = boardIndex => {
    document.getElementsByName("input")[boardIndex].type = "text";
  };

  render() {
    return (
      <div className="app" style={styles.app}>
        {this.state.boards.map((board, boardIndex) => (
          <Board
            board={board}
            boardIndex={boardIndex}
            key={boardIndex}
            onMoveRight={todoIndex =>
              this.handleMoveRight(boardIndex, todoIndex)
            }
            onMoveLeft={todoIndex => this.handleMoveLeft(boardIndex, todoIndex)}
            onSubmit={event => this.handleAddTodo(boardIndex, event)}
            onShowInputBox={() => this.handleShowInputBox(boardIndex)}
          />
        ))}
      </div>
    );
  }
}

const styles = {
  app: {
    display: "flex",
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-around",
    padding: 25 / 2
  }
};

export default App;
