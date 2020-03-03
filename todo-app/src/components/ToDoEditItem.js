import React, { useState } from "react";

import { Button, Form, Icon, List, Message, Input } from "semantic-ui-react";

import { BASE_URL } from "./ToDo";
import Checkbox from "./Checkbox";

const ToDoEditList = props => {
  const { item } = props;

  const [editTask, setEditTask] = useState(item.task);
  const [taskError, setTaskError] = useState(false);
  const [formError, setFormError] = useState(false);

  const handleOnChange = event => {
    setEditTask(event.target.value);
  };

  const handleOnSaveClick = event => {
    event.preventDefault();

    let error = false;

    const taskLength = editTask.length;

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
      task: editTask
    };

    fetch(`${BASE_URL}/todo/${item.id}.json`, {
      method: "PATCH",
      body: JSON.stringify(formattedFormData)
    }).then(() => {
      props.onSave();
    });
  };

  const handleOnCloseClick = () => {
    props.onClose();
  };

  return (
    <div key={item.id}>
      <List.Item>
        <Form.Field>
          <Input
            fluid
            size="small"
            type="text"
            value={editTask}
            name="task"
            onChange={handleOnChange}
          />
          {taskError ? (
            <Message negative>
              <Message.Header>Incorrect input</Message.Header>
              <p>The task should be between 5 and 35 characters</p>
            </Message>
          ) : null}
        </Form.Field>
      </List.Item>
      <Button
        size="small"
        attached="left"
        positive
        icon
        onClick={handleOnSaveClick}
        disabled={!item.task}
      >
        <Icon name="save" />
      </Button>
      <Button size="small" attached="right" icon onClick={handleOnCloseClick}>
        <Icon name="close" />
      </Button>
      <Checkbox done={item.done} id={item.id} item={item.task} />
      <hr />
    </div>
  );
};

export default ToDoEditList;

// export default class ToDoEditList extends React.Component {
//   state = {
//     ...this.props.item,
//     id: null,
//     taskError: false,
//     formError: false
//   };

//   handleOnChange = event => {
//     this.setState({
//       [event.target.name]: event.target.value
//     });
//   };

//   handleOnSaveClick = event => {
//     event.preventDefault();

//     let error = false;

//     const taskLength = this.state.task.length;

//     if (taskLength < 5 || taskLength > 35) {
//       this.setState({ taskError: true });
//       error = true;
//     } else {
//       this.setState({ taskError: false });
//     }

//     if (error) {
//       this.setState({ formError: true });
//       return;
//     }

//     this.setState({ formError: false });

//     const formattedFormData = {
//       ...this.state,
//       taskError: null,
//       formError: null
//     };

//     fetch(`${BASE_URL}/todo/${this.props.item.id}.json`, {
//       method: "PUT",
//       body: JSON.stringify(formattedFormData)
//     }).then(() => {
//       this.props.onSave();
//     });
//   };

//   handleOnCloseClick = () => {
//     this.props.onClose();
//   };

//   render() {
//     const { item } = this.props;
//     const { task, taskError } = this.state;

//     return (
//       <div key={item.id}>
//         <List.Item>
//           <Form.Field>
//             <Input
//               fluid
//               size='small'
//               type="text"
//               value={task}
//               name="task"
//               onChange={this.handleOnChange}
//             />
//             {taskError ? (
//               <Message negative>
//                 <Message.Header>Incorrect input</Message.Header>
//                 <p>The task should be between 5 and 35 characters</p>
//               </Message>
//             ) : null}
//           </Form.Field>
//         </List.Item>
//         <Button
//           size="small"
//           attached="left"
//           positive
//           icon
//           onClick={this.handleOnSaveClick}
//           disabled={!task}
//         >
//           <Icon name="save" />
//         </Button>
//         <Button
//           size="small"
//           attached="right"
//           icon
//           onClick={this.handleOnCloseClick}
//         >
//           <Icon name="close" />
//         </Button>
//         <Checkbox done={item.done} id={item.id} item={item.task} />
//         <hr />
//       </div>
//     );
//   }
// }
