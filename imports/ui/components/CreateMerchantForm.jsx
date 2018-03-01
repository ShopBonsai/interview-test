import React from "react";
import RaisedButton from "material-ui/RaisedButton";

import TextField from "../components/TextField";

const CreateMerchantForm = ({
  data,
  onFormChange,
  onSave,
  disableSaveButton
}) => {
  return (
    <div className="create-form-merchant">
      <TextField
        hintText="name"
        floatingLabelText="Type the name of the merchant"
        onChange={(event, value) => onFormChange("merchant", value)}
        errorText={data.merchant.error}
      />
      <TextField
        hintText="Type your contact email"
        onChange={(event, value) => onFormChange("contactEmail", value)}
        errorText={data.contactEmail.error}
      />
      <TextField
        hintText="Type phone"
        onChange={(event, value) => onFormChange("phone", value)}
        errorText={data.phone.error}
      />
      <TextField
        hintText="Type address"
        onChange={(event, value) => onFormChange("address", value)}
        errorText={data.address.error}
      />
      <RaisedButton
        label="Save"
        disabled={disableSaveButton}
        primary={true}
        onClick={() => onSave()}
      />
    </div>
  );
};
export default CreateMerchantForm;
