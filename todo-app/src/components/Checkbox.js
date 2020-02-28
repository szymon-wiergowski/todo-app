import React from "react";

import { Checkbox } from "semantic-ui-react";

import { BASE_URL } from "./ToDo";

export default props => {
  const { id, done, onCheck } = props;

  const handleOnDone = (id, done) => {
    const checkDone = {
      done: !done
    };
    fetch(`${BASE_URL}/todo/${id}.json`, {
      method: "PATCH",
      body: JSON.stringify(checkDone)
    }).then(() => {
      onCheck();
    });
  };

  return (
    <Checkbox
      label="done"
      toggle
      style={{ margin: "15px" }}
      checked={done}
      onClick={() => handleOnDone(id, done)}
    />
  );
};
