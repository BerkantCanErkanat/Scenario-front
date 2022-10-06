import React from "react";
import { FormGroup, Input, Label} from "reactstrap";

export function FormGroupElement({formGroupInfo,inputId,inputName,inputPlaceholder,inputType,onChange,onKeyDown}) {
  return (
    <div>
      <FormGroup floating>
        <Input
          valid={formGroupInfo.isValid === null || inputId === 'castName' ? null : formGroupInfo.isValid === true ? true : false}
          invalid={formGroupInfo.isValid === null || inputId === 'castName' ? null : formGroupInfo.isValid === false ? true : false}
          id={inputId}
          name={inputName}
          placeholder={inputPlaceholder}
          type={inputType}
          onChange = {onChange}
          onKeyDown = {onKeyDown || null}
        />
        <Label for={inputId}>{inputName}</Label>
      </FormGroup>
    </div>
  );
}