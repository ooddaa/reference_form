/**@jsxImportSource @emotion/react */
import React, { FormEvent, useState, ChangeEvent } from "react";
import { Global } from "@emotion/react";
import { styles, utils } from "./styles/ReferenceFormStyles";

const localStyles = {
  main: {},
  mainTitle: {},
  sectionTitle: {},
  personal: {},
  label: {},
  textInput: {},
  employer: {},
  employmentDates: {
    ...utils.flexCenter,
  },
  date: {},
  guarantor: {},
  guarantorRelationship: {},
  buttons: {},
  cancelBtn: {},
  submitBtn: {},
};

/* 

{
  "personal": {
    "first_name": "First name",
    "last_name": "Last name",
    "current_address": "Address 1, Address 2, ..."
  },
  "employer": [
    {
      "name": "Employer",
      "start_date": "20180301",
      "end_date": "20190815"
}, {
      "name": "Employer",
      "start_date": "20180901",
      "end_date": "20190131"
} ],
  "guarantor": {
    "name": "Guarantor",
    "address": "Address1, Address2, ...",
    "relation": "Parent"
} }
*/
interface DataModel {
  personal: {
    first_name: string;
    last_name: string;
    current_address: string;
  };
  employer: [
    {
      name: string;
      start_date: string;
      end_date: string;
    },
    {
      name: string;
      start_date: string;
      end_date: string;
    }
  ];
  guarantor: {
    name: string;
    address: string;
    relation: string;
  };
}

function ReferenceForm() {
  const [submitted, setSubmitted] = useState(false);
  const firstName = useFormInput("", {
    msg: "I don't know of any name shorter than 2 letters, please provide a longer name",
    validationFn: (val) => val.length > 1,
  });
  const lastName = useFormInput("");
  const address = useFormInput("", {
    msg: "Address must be at least 5 characters long",
    validationFn: (val) => val.length >= 5,
  });
  const employerName = useFormInput("");
  const employmentStartDate = useFormInput("");
  const employmentEndDate = useFormInput("");
  const guarantorName = useFormInput("");
  const guarantorAddress = useFormInput("");
  const guarantorRelationship = useFormInput("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    /* submit if everything is validated */
    function isValid({
      validation: { isValid },
    }: {
      validation: { isValid: boolean };
    }) {
      return isValid;
    }

    function report(state: UseFormInputResult) {
      let {
        control: { value },
        validation: { isValid, validationMsg },
      } = state;
      return [value, isValid, validationMsg];
    }

    function parseDate(date: string): string {
      return date.replace(/-/g, "")
    }
    
    if (
      [
        firstName,
        lastName,
        address,
        employerName,
        employmentStartDate,
        employmentEndDate,
        guarantorName,
        guarantorAddress,
        guarantorRelationship,
      ].every(isValid)
    ) {

      const rv = { 
        "personal": {
          "first_name": firstName.control.value,
          "last_name": lastName.control.value,
          "current_address": address.control.value,
        },
        "employer": [
          {
            "name": employerName.control.value,
            "start_date": parseDate(employmentStartDate.control.value), // make "20180301",
            "end_date": parseDate(employmentEndDate.control.value), //"20190815"
      }, 
      
      /**@todo add employers */
      //{
      //       "name": "Employer",
      //       "start_date": "20180901",
      //       "end_date": "20190131"
      // } 
    ],
        "guarantor": {
          "name": guarantorName.control.value,
          "address": guarantorAddress.control.value,
          "relation": guarantorRelationship.control.value,
      } }
      console.log("ok", rv);
      setSubmitted(true);
    } else {
      /* debug */
      const summary = [
        firstName,
        lastName,
        address,
        employerName,
        employmentStartDate,
        employmentEndDate,
        guarantorName,
        guarantorAddress,
        guarantorRelationship,
      ].map(report);

      console.log("something wrong!", summary);

      /* send to API */

      setSubmitted(false);
    }
  };

  return (
    <div>
      <Global
        styles={{
          "*": {
            margin: 0,
            padding: 0,
            boxSizing: "border-box",
          },
          body: {
            height: "100vh",
            backgroundColor: styles.colors["bg-primary"],
            fontFamily: "Inter, sans-serif",
          },

          /* center the form */
          "#root": {
            height: "100%",
            ...utils.flexCenter,
          },
        }}
      />

      {/* FORM WRAPPER */}
      <main
        className="reference-form"
        test-id="__reference-form"
        css={localStyles.main}
      >
        <div
          className="reference-form--title"
          test-id="__reference-form--title"
          css={localStyles.mainTitle}
        >
          Reference Form
        </div>

        {/* FORM */}
        <form action="submit" onSubmit={handleSubmit}>
          {/* PERSONAL */}
          <div
            className="reference-form--personal"
            test-id="__reference-form--personal"
            css={localStyles.personal}
          >
            <div
              className="reference-form--personal__title"
              test-id="__reference-form--personal__title"
              css={localStyles.sectionTitle}
            >
              Personal
            </div>

            <label htmlFor="fist_name" css={localStyles.label}>
              First name
            </label>
            <input
              type="text"
              name="fist_name"
              css={localStyles.textInput}
              {...firstName.control}
              required
            />

            <label htmlFor="last_name" css={localStyles.label}>
              Last name
            </label>
            <input
              type="text"
              name="last_name"
              css={localStyles.textInput}
              {...lastName.control}
              required
            />

            <label htmlFor="address" css={localStyles.label}>
              Address
            </label>
            <input
              type="text"
              name="address"
              css={localStyles.textInput}
              {...address.control}
              required
            />
          </div>

          {/* EMPLOYER */}
          <div
            className="reference-form--employer"
            test-id="__reference-form--employer"
            css={localStyles.employer}
          >
            <div
              className="reference-form--employer__title"
              test-id="__reference-form--employer__title"
              css={localStyles.sectionTitle}
            >
              Employer
            </div>

            <label htmlFor="employer_name" css={localStyles.label}>
              Employer name
            </label>
            <input
              type="text"
              name="employer_name"
              css={localStyles.textInput}
              {...employerName.control}
              required
            />

            {/* EMPLOYMENT DATES */}
            <div
              className="reference-form--employer__dates"
              test-id="__reference-form--employer__dates"
              css={localStyles.employmentDates}
            >
              {/* START DATE */}
              <div
                className="employment-start-date"
                test-id="__employment-start-date"
                css={localStyles.date}
              >
                <label htmlFor="employment-start-date" css={localStyles.label}>
                  Employment start date
                </label>
                <input
                  type="date"
                  name="employment-start-date"
                  css={localStyles.textInput}
                  {...employmentStartDate.control}
                  required
                />
              </div>
              {/* END DATE */}
              <div
                className="employment-end-date"
                test-id="__employment-end-date"
                css={localStyles.date}
              >
                <label htmlFor="employment-end-date" css={localStyles.label}>
                  Employment end date
                </label>
                <input
                  type="date"
                  name="employment-end-date"
                  css={localStyles.textInput}
                  {...employmentEndDate.control}
                  /* may still be working for the employer */
                  // required
                />
              </div>
            </div>
          </div>

          {/* GUARANTOR */}
          <div
            className="reference-form--guarantor"
            test-id="__reference-form--guarantor"
            css={localStyles.guarantor}
          >
            <div
              className="reference-form--guarantor__title"
              test-id="__reference-form--guarantor__title"
              css={localStyles.sectionTitle}
            >
              Guarantor
            </div>

            <label htmlFor="guarantor_name" css={localStyles.label}>
              Guarantor name
            </label>
            <input
              type="text"
              name="guarantor_name"
              css={localStyles.textInput}
              {...guarantorName.control}
              required
            />

            <label htmlFor="guarantor_address" css={localStyles.label}>
              Guarantor address
            </label>
            <input
              type="text"
              name="guarantor_address"
              css={localStyles.textInput}
              {...guarantorAddress.control}
              required
            />

            {/* SELECTOR */}
            <div
              className="reference-form--guarantor__relationship"
              test-id="__reference-form--guarantor__relationship"
              css={localStyles.guarantorRelationship}
            >
              <select
                name="guarantor_relationship"
                {...guarantorRelationship.control}
              >
                <option>Parent</option>
                <option>Sibling</option>
                <option>Employer</option>
                <option>Other</option>
              </select>
            </div>
          </div>

          {/* SUBMISSION BUTTONS */}

          <div
            className="reference-form--buttons"
            test-id="__reference-form--buttons"
            css={localStyles.buttons}
          >
            <button
              className="reference-form--buttons__cancel"
              test-id="__reference-form--buttons__cancel"
              css={localStyles.cancelBtn}
            >
              Cancel
            </button>
            <button
              className="reference-form--buttons__submitBtn"
              test-id="__reference-form--buttons__submitBtn"
              type="submit"
              css={localStyles.submitBtn}
            >
              Submit
            </button>
          </div>
        </form>
      </main>
    </div>
  );
}

export default ReferenceForm;

interface ValidationConfig {
  msg?: string;
  validationFn?: (val: string) => boolean;
}

export interface UseFormInputResult {
  control: {
    value: string;
    onChange: (
      e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>
    ) => void;
  };
  validation: {
    isValid: boolean;
    validationMsg?: string;
    // keyof ValidationConfig,
  };
}

function useFormInput(
  initialValue: string,
  validationConfig?: ValidationConfig
) {
  const [value, setValue] = useState<string>(initialValue);
  const [validationMsg, setValidationMsg] = useState<string>();

  /* presume non valid input */
  const [isValid, setIsValid] = useState<boolean>(false);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>
  ) => {
    /* validate text */
    if (e.target.type === "text") {
      /* user provided custom validation function? */
      if (
        validationConfig &&
        typeof validationConfig.validationFn === "function"
      ) {
        /* run validation function and update input's validation state */
        let ok = validationConfig.validationFn(e.target.value);
        setIsValid(ok);
        setValidationMsg(!ok ? validationConfig?.msg : undefined);
      } else {
        /* no validation function === users don't care */
        setIsValid(true);

        /* we can provide a hint to user but not really validate */
        setValidationMsg(validationConfig?.msg || undefined);
      }
    } else {
      /* selects/dates could be validated here, but no point atm */
      setIsValid(true);
      setValidationMsg(validationConfig?.msg || undefined);
    }

    /* provide the value for display */
    setValue(e.target.value);
  };

  return {
    control: {
      value,
      onChange: handleChange,
    },
    validation: {
      isValid,
      validationMsg,
      // ...validationConfig,
    },
  };
}
