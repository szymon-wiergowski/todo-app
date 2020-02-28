import React from "react";

import { Button, Form, Message, Icon, Input } from "semantic-ui-react";

import { BASE_URL } from "./ToDo";

const initialFormState = {
  done: false,
  task: "",
  dateOfCreateTask: "",
  taskError: false,
  formError: false
};

export default class AddTask extends React.Component {
  state = {
    ...initialFormState
  };

  handleOnChange = event => {
    this.setState({
      task: event.target.value,
      dateOfCreateTask: Date.now()
    });
  };

  handleOnClick = event => {
    event.preventDefault();

    let error = false;

    const taskLength = this.state.task.length;

    if (taskLength < 5 || taskLength > 35) {
      this.setState({ taskError: true });
      error = true;
    } else {
      this.setState({ taskError: false });
    }

    if (error) {
      this.setState({ formError: true });
      return;
    }

    this.setState({ formError: false });

    const formattedFormData = {
      ...this.state,
      taskError: null,
      formError: null
    };

    fetch(`${BASE_URL}/todo.json`, {
      method: "POST",
      body: JSON.stringify(formattedFormData)
    })
      .then(() => {
        this.props.onAdd();
        this.setState(initialFormState);
      })
      .catch(err => {
        alert(err.message);
      });
  };

  render() {
    const { task, taskError } = this.state;

    return (
      <Form size="large">
        <h3>Add task</h3>
        <Form.Field>
          <Input
            type="text"
            value={task}
            onChange={this.handleOnChange}
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
          onClick={this.handleOnClick}
          disabled={!task}
        >
          <Icon name="add" />
        </Button>
      </Form>
    );
  }
}
