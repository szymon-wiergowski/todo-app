import React from "react";
import { BrowserRouter as Router } from "react-router-dom";

import Content from "./content/Content";
import Navigation from "./navigation/Navigation";

export default function App() {
  return (
      <Router>
        <Navigation />
        <Content />
      </Router>
  );
}
