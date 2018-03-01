import React from "react";
import TextFieldMUI from "material-ui/TextField";

const TextField = props => {
  return (
    <TextFieldMUI
      className="input-material-ui"
      errorStyle={{ textAlign: "left" }}
      {...props}
    />
  );
};

export default TextField;
