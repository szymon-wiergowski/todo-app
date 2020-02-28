import React from "react";

import { List, Segment } from "semantic-ui-react";

import ToDoList from "./ToDoList";
import ToDoEditList from "./ToDoEditList";

export const BASE_URL = "https://rest-api-jfdz12-sw.firebaseio.com";

export default class ToDoListBoard extends React.Component {
  state = {
    editTaskId: null
  };

  handleOnEdit = markedId => {
    this.setState({
      editTaskId: markedId
    });
  };

  handleOnClose = () => {
    this.setState({
      editTaskId: null
    });
  };

  handleOnSave = () => {
    this.props.onSave();
    this.setState({
      editTaskId: null
    });
  };

  render() {
    const { editTaskId } = this.state;
    const { todo, onDelete, onCheck } = this.props;

    return (
      <Segment>
          <List divided relaxed size="large">
            {todo.map(item => {
              return editTaskId === item.id ? (
                <ToDoEditList
                  key={item.id}
                  todo={todo}
                  done={item.done}
                  id={item.id}
                  item={item}
                  onClose={this.handleOnClose}
                  onSave={this.handleOnSave}
                  onDelete={onDelete}
                  onCheck={onCheck}
                  onEdit={this.handleOnEdit}
                />
              ) : (
                <ToDoList
                  key={item.id}
                  todo={todo}
                  done={item.done}
                  id={item.id}
                  item={item}
                  onDelete={onDelete}
                  onCheck={onCheck}
                  onEdit={this.handleOnEdit}
                />
              );
            })}
          </List>
      </Segment>
    );
  }
}
