//Setup Adapter
import { configure } from "enzyme";
import Adapter from "enzyme-adapter-react-15";

configure({ adapter: new Adapter() });

//Framework
import React from "react";
import ReactDom from "react-dom";
import { mount, render } from "enzyme";

//Page
import Home from "../../imports/ui/pages/Home.jsx";

describe("Home", () => {
  it("renders without crashing", () => {
    const div = document.createElement("div");
    ReactDom.render(<Home />, div);
  });

  describe("render", () => {
    const home = mount(<Home />);
    it("should render the button", () => {
      expect(home.find("Button")).toBeTruthy();
      expect(home.find("Button").text()).toEqual("Go shopping");
    });
    it("should render the title", () => {
      expect(home.find("h2")).toBeTruthy();
      expect(home.find("h2").text()).toEqual("Welcome to our humble Shop");
    });
  });
});
