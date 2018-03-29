import React from "react";
import ReactDom from "react-dom";

import Home from "../imports/ui/pages/Home.jsx";

describe("Home", () => {
  it("renders without crashing", () => {
    const div = document.createElement("div");
    ReactDom.render(<Home />, div);
  });
});
