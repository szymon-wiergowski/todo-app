import React, { useState } from "react";

import { Button, Form, Message, Icon, Input } from "semantic-ui-react";

import { BASE_URL } from "./ToDo";

const AddTask = (props) => {
  const [task, setTask] = useState("");
  const [dateOfCreateTask, setDateOfCreateTask] = useState("");
  const [taskError, setTaskError] = useState(false);
  const [formError, setFormError] = useState(false);

  const handleOnChange = event => {
    setTask(event.target.value);
    setDateOfCreateTask(Date.now());
  };

  const handleOnClick = event => {
    event.preventDefault();

    let error = false;

    const taskLength = task.length;

    if (taskLength < 5 || taskLength > 35) {
      setTaskError(true);
      error = true;
    } else {
      setTaskError(false);
    }

    if (error) {
      setFormError(true);
      return;
    }
    setFormError(false);

    const formattedFormData = {
      task,
      done: false,
      dateOfCreateTask
    };

    fetch(`${BASE_URL}/todo.json`, {
      method: "POST",
      body: JSON.stringify(formattedFormData)
    })
      .then(() => {
        props.onAdd();
        setTask("");
        setDateOfCreateTask("");
      })
      .catch(err => {
        alert(err.message);
      });
  };

  return (
    <Form size="large">
      <h3>Add task</h3>
      <Form.Field>
        <Input
          type="text"
          value={task}
          onChange={handleOnChange}
          placeholder="New task"
        />
        {taskError ? (
          <Message negative>
            <Message.Header>Incorrect input</Message.Header>
            <p>The task should be between 5 and 35 characters</p>
          </Message>
        ) : null}
      </Form.Field>
      <Button
        size="small"
        type="submit"
        icon
        color="green"
        onClick={handleOnClick}
        disabled={!task}
      >
        <Icon name="add" />
      </Button>
    </Form>
  );
};

export default AddTask;
