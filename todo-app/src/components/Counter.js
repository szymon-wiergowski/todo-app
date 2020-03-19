import React from "react";
import { connect } from "react-redux";
import { increment, decrement, reset } from "../state/counter";

import { Container, Header, Button } from "semantic-ui-react";

import "../App.css";

const Counter = ({ increment, decrement, reset, counter }) => {
  return (
    <div className="counter">
      <Container text>
        <Header as="h2">Welcome to Counter</Header>
        <p className="counter_text">{`Current count: ${counter}`}</p>
      </Container>
      <Button.Group>
        <Button onClick={decrement} color="red">
          DECREMENT
        </Button>
        <Button onClick={reset}>RESET</Button>
        <Button onClick={increment} color="green">
          INCREMENT
        </Button>
      </Button.Group>
    </div>
  );
};

// Pobieramy pożądany kawałek stanu
const mapStateToProps = state => ({
  counter: state.counter
});

// Dajemy możliwość wysyłania(dispatchowania) akcji z komponentu
const mapDispatchToProps = {
  increment,
  decrement,
  reset
};

// Dzięki export default nie musimy wymyślać nowej nazwy dla Countera, który jest podłączony do store'a
export default connect(mapStateToProps, mapDispatchToProps)(Counter);
