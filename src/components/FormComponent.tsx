"use client";

import { useEffect, useRef, useState } from "react";

/* Styles */
import "./FormComponent.scss";

/* Interface */
import type {
  IInput,
  ILabelInput,
  ISubmit,
  ITextarea,
} from "../interface/formComponent";

/* icons */
import { AiOutlineEye } from "react-icons/ai";

// ================================================= Form Components Start =================================================

/*=====================
👉 Input Without Label
======================*/

const Input = (props: IInput) => {
  const [error, setError] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (error && inputRef.current) {
      inputRef.current.focus();
    }
  }, [error]);

  const handleFocusChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value === "") {
      setError(true);
    } else {
      setError(false);
    }
  };

  const handleBlur = () => {
    if (inputRef.current && inputRef.current.value === "") {
      setError(true);
    }
  };

  return (
    <div className={`input_wrapper ${props.class || ""}`}>
      <input
        ref={inputRef}
        type={props.type}
        id={props.id || ""}
        className="input"
        placeholder={props.placeholder || ""}
        autoComplete={props.type === "password" ? "new-password" : "off"}
        name={props.name ? props.name : "myInput"}
        onClick={props.onClick}
        onChange={(e) => {
          props.onChange && props.onChange(e);
          handleFocusChange(e);
        }}
        onBlur={handleBlur}
        value={props.value}
        autoFocus={props.autoFocus}
        required={props.required}
        disabled={props.disabled}
        readOnly={props.readOnly}
      />
      {error && <p className="error">This Field Cannot be Empty</p>}
    </div>
  );
};

/*==================
👉 Input With Label
===================*/

const LabelInput = (props: ILabelInput) => {
  const [error, setError] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (error && inputRef.current) {
      inputRef.current.focus();
    }
  }, [error]);

  const handleFocusChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value === "") {
      setError(true);
    } else {
      setError(false);
    }
  };

  const handleBlur = () => {
    if (inputRef.current && inputRef.current.value === "") {
      setError(true);
    }
  };

  return (
    <>
      <div className={`input_wrapper label_input_wrapper ${props.class || ""}`}>
        <label
          htmlFor={props.id || ""}
          className={`label input_label ${props.labelClass || ""}`}
        >
          {props.labelName}
        </label>

        <input
          ref={inputRef}
          type={props.type}
          id={props.id || ""}
          className="input"
          placeholder={props.placeholder || ""}
          autoComplete={props.type === "password" ? "new-password" : "off"}
          name={props.labelName || ""}
          onClick={props.onClick}
          onChange={(e) => {
            props.onChange && props.onChange(e);
            handleFocusChange(e);
          }}
          onBlur={handleBlur}
          value={props.value}
          required={props.required}
          disabled={props.disabled}
          readOnly={props.readOnly}
        />
        {error && <p className="error">This Field Cannot be Empty</p>}
      </div>
    </>
  );
};

/*==========
👉 Textarea
===========*/

const Textarea = (props: ITextarea) => {
  return (
    <>
      <label
        htmlFor={props.labelName || ""}
        className={`input_label ${props.labelClass || ""}`}
      >
        {props.labelName || ""}
      </label>
      <br />
      <textarea
        name={props.labelName || ""}
        className={`input_textarea  ${props.class || ""}`}
        placeholder={props.placeholder || ""}
        rows={props.rows}
        cols={props.cols}
        required={props.required}
        disabled={props.disabled}
        readOnly={props.readOnly}
      />
    </>
  );
};

/*========
👉 Submit
=========*/

const Submit = (props: ISubmit) => {
  return (
    <>
      <input
        type="submit"
        id={props.id || ""}
        className={`myBtn input_submit ${props.class || ""}`}
        onClick={props.onClick}
        value={props.value}
      />
    </>
  );
};

// =================================================== Form Components End ==================================================

export { Input, LabelInput, Textarea, Submit };
