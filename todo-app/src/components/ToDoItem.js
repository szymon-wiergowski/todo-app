import React from "react";

import { List, Button, Icon } from "semantic-ui-react";

import Checkbox from "./Checkbox";
import { BASE_URL } from "./ToDo";

export default props => {
  const { item, id, onEdit, onDelete, onCheck } = props;

  const handleOnClick = itemId => {
    fetch(`${BASE_URL}/todo/${itemId}.json`, {
      method: "DELETE"
    }).then(() => {
      onDelete();
    });
  };

  const handleOnEditClick = () => {
    onEdit(id);
  };

  const date = new Date(item.dateOfCreateTask);

  return (
    <div key={item.id}>
      <List.Item>
        <List.Content>{item.task}</List.Content>
      </List.Item>
      <Button
        size="small"
        icon
        color="red"
        attached="left"
        onClick={() => handleOnClick(item.id)}
      >
        <Icon name="close" />
      </Button>
      <Button
        size="small"
        icon
        primary
        attached="right"
        onClick={handleOnEditClick}
      >
        <Icon name="edit" />
      </Button>
      <Checkbox
        done={props.item.done}
        onCheck={onCheck}
        id={props.item.id}
        item={props.item.task}
      />
      <List.Item>
        <List.Content>
          {date.toLocaleString()}
        </List.Content>
      </List.Item>
      <hr />
    </div>
  );
};
