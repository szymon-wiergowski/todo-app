import React, { useEffect, useState } from "react";

import { Segment, Dimmer, Loader, Image, Grid } from "semantic-ui-react";

import ToDoBoard from "./ToDoBoard";
import AddTask from "./AddTask";
import Auth from "./Auth";

export const BASE_URL = "https://rest-api-jfdz12-sw.firebaseio.com";

const ToDo = () => {
  const [todo, setTodo] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchToDo = () => {
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
        setLoading(false);
        setTodo(
          formattedData.sort(function(a, b) {
            return b.dateOfCreateTask - a.dateOfCreateTask;
          })
        );
      })
      .catch(err => setError(err));
  };

  useEffect(() => {
    fetchToDo();
  }, []);

  const handleOnAction = () => {
    fetchToDo();
  };

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (loading) {
    return (
      <Segment>
        <Dimmer active>
          <Loader size="massive">Loading</Loader>
        </Dimmer>
        <Image src="/images/wireframe/short-paragraph.png" />
        <Image src="/images/wireframe/short-paragraph.png" />
        <Image src="/images/wireframe/short-paragraph.png" />
        <Image src="/images/wireframe/short-paragraph.png" />
        <Image src="/images/wireframe/short-paragraph.png" />
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
          <AddTask onAdd={handleOnAction} />
          <ToDoBoard
            todo={todo}
            onDelete={handleOnAction}
            onSave={handleOnAction}
            onCheck={handleOnAction}
          />
        </Segment>
      </Grid>
    </Auth>
  );
};

export default ToDo;
