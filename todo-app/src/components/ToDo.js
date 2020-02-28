import React from "react";

import { Segment, Dimmer, Loader, Image, Grid } from "semantic-ui-react";

import ToDoBoard from "./ToDoBoard";
import AddTask from "./AddTask";
import Auth from "./Auth";

export const BASE_URL = "https://rest-api-jfdz12-sw.firebaseio.com";

export default class ToDo extends React.Component {
  state = {
    todo: [],
    loading: true,
    error: null
  };

  fetchToDo = () => {
    fetch(`${BASE_URL}/todo.json`)
      .then(res => res.json())
      .then(data => {
        const keys = Object.keys(data);
        const formattedData = keys.map(key => {
          return {
            id: key,
            ...data[key]
          };
        });
        this.setState({
          loading: false,
          todo: formattedData.sort(function(a, b) {
            return b.dateOfCreateTask - a.dateOfCreateTask;
          })
        });
      })
      .catch(err =>
        this.setState({
          error: err
        })
      );
  };

  componentDidMount() {
    this.fetchToDo();
  }

  handleOnAction = () => {
    this.fetchToDo();
  };

  render() {
    const { todo, error, loading } = this.state;

    if (error) {
      return <div>Error: {error}</div>;
    }

    if (loading) {
      return (
        <Segment>
          <Dimmer active>
            <Loader size="medium">Loading</Loader>
          </Dimmer>
          <Image src="/images/wireframe/short-paragraph.png" />
        </Segment>
      );
    }
    return (
      <Auth>
        <Grid
          textAlign="center"
          style={{ height: "100vh" }}
          verticalAlign="middle"
        >
          <Segment
            style={{
              width: 650
            }}
          >
            <AddTask onAdd={this.handleOnAction} />
            <ToDoBoard
              todo={todo}
              onDelete={this.handleOnAction}
              onSave={this.handleOnAction}
              onCheck={this.handleOnAction}
            />
          </Segment>
        </Grid>
      </Auth>
    );
  }
}
