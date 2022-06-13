/**@jsxImportSource @emotion/react */
import React, { FormEvent, useState, ChangeEvent } from "react";
import { Global } from "@emotion/react";
import { mq, styles, utils } from "./styles/ReferenceFormStyles";
import CustomSelect from './CustomSelect'
import { DataModel, UseFormInputResult, ValidationConfig, SimpleCustomSelectEvent } from './interfaces'
import { v4 as uuidv4 } from 'uuid';
import findIndex from 'lodash/findIndex'

const maxWidth = 450;
const minWidth = 350;
const minHeight = 200;

const general = {
  color: styles.colors["dark-blue"],
  display: "flex",
  "flex-direction": "column",
  marginBottom: styles.spacing[24],
};

const generalInput = {
  height: styles.spacing[36],
  backgroundColor: styles.colors["bg-primary"],
  border: "1px transparent solid",
  borderRadius: styles["border-radius"].primary,
  padding: "0 8px",
  // margin: "4px 0 0 0",
  marginBottom: styles.spacing[16],
  "&:focus": {
    border: `1px ${styles.colors["border-primary"]} solid`,
    outline: "none",
  },
};

const submitBtn = {
  border: "none",
  display: "inline-block",
  marginTop: styles.spacing[6],
  width: styles.spacing[128],
  height: styles.spacing[48],
  borderRadius: styles["border-radius"].primary,
  color: styles.colors["bg-primary"],
  backgroundColor: styles.colors["dark-blue"],
  fontWeight: 600,
  letterSpacing: "1.5px",
  cursor: "pointer",
  "&:active": {
    transform: "scale(.98)",
  },
};

const localStyles = {
  main: {
    maxWidth: `${maxWidth}px`,
    minWidth: `${minWidth}px`,
    minHeight: `${minHeight}px`,
    margin: styles.spacing[48],
    backgroundColor: styles.colors.white,
    borderRadius: styles["border-radius"].xlarge,
    border: `1px solid ${styles.colors["border-primary"]}`,
    padding: styles.spacing[24],
    boxShadow: `0 0 10px ${styles.colors["border-primary"]}`,

    /* media queries */
    [mq[400]]: {
      minWidth: `350px`,
    },

    [mq[600]]: {
      minWidth: `450px`,
    },

    [mq[1000]]: {
      minWidth: `600px`,
    },
  },
  mainTitle: {
    fontSize: styles.typography["title-md"],
    padding: `${styles.spacing[8]} ${styles.spacing[16]} ${styles.spacing[16]} ${styles.spacing[16]}`,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  sectionTitle: {
    fontWeight: 500,
    paddingBottom: styles.spacing[8],
    borderBottom: `1px solid ${styles.colors["border-primary"]}`,
    marginBottom: styles.spacing[16],
  },
  personal: {
    ...general,
    "& input:last-of-type": {
      marginBottom: 0
    },
    marginBottom: styles.spacing[48],
  },
  label: {
    fontSize: styles.spacing[12],
    fontWeight: 400,
    color: styles.colors["dark-blue"],
    marginBottom: styles.spacing[4],
  },
  textInput: {
    ...generalInput,
  },
  employer: {
    ...general,
    marginBottom: styles.spacing[36]
  },
  employers: {

  },
  employmentDates: {
    ...utils.flexCenter,
    justifyContent: 'flex-start',
  },
  date: {
    width: "150px"
  },
  dateInput: {
    ...generalInput,
    marginTop: styles.spacing[8],
    marginBottom: styles.spacing[4],
  },
  guarantor: {
    ...general,
  },
  guarantorRelationship: {},
  buttons: {
    ...utils.flexRow,
    justifyContent: "flex-end",
    gap: styles.spacing[12],
  },
  cancelBtn: {
    ...submitBtn,
    border: `2px solid ${styles.colors["border-primary"]}`,
    color: styles.colors["text-light"],
    backgroundColor: styles.colors.white,
    "&:hover": {
      color: styles.colors["text-primary"],
    },
  },
  submitBtn: {
    ...submitBtn,
    "&:hover": {
      backgroundColor: styles.colors["dark-blue-hover"],
    },
  },
  submitBtnSuccess: {
    ...submitBtn,
    width: styles.spacing[128],
    backgroundColor: styles.colors["green-primary"],
  },
  addEmployerBtn: {
    ...submitBtn,
    ...utils.flexCenter,
    padding: `${styles.spacing[4]} ${styles.spacing[8]}`,
    fontSize: styles.spacing[12],
    marginTop: styles.spacing[0],
    width: styles.spacing[128],
    height: styles.spacing[48],
  },
  removeEmployerBtn: {
    ...submitBtn,
    ...utils.flexCenter,
    padding: `${styles.spacing[4]} ${styles.spacing[8]}`,
    fontSize: styles.spacing[12],
    marginTop: styles.spacing[6],
    width: styles.spacing[128],
    height: styles.spacing[36],
    backgroundColor: styles.colors.white,
    border: `1px solid ${styles.colors["red"]}`,
    color: styles.colors["red"],
  },
  success: {
    display: "none",
    width: `${maxWidth}px`,
    height: "auto",
    marginTop: styles.spacing[36],
  },
};

const selectStyles = {
  control: {
    height: styles.spacing[36],
    borderRadius: styles["border-radius"].primary,
    border: `1px solid ${styles.colors["border-primary"]}`,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    "flex-direction": "row",
  },
  body: {
    height: "100%",
    width: "100%",
    backgroundColor: "white",
    borderRadius: `${styles["border-radius"].xlarge} 0 0 ${styles["border-radius"].xlarge}`,
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
    padding: `0 0 0 ${styles.spacing[16]}`,
    color: styles.colors["text-primary"],
    fontSize: styles.spacing[12],
  },
  arrow: {
    height: "100%",
    width: styles.spacing[48],
    backgroundColor: "white",
    borderRadius: `0 ${styles["border-radius"].xlarge} ${styles["border-radius"].xlarge} 0`,
    borderLeft: `1px solid ${styles.colors["border-primary"]}`,
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  optionsList: {
    width: '300px',
    backgroundColor: 'white',
    border: `1px solid ${styles.colors["border-primary"]}`,
    borderRadius: `${styles["border-radius"].xlarge}`, 
    "& div:first-of-type": {
      borderRadius: `${styles["border-radius"].xlarge} ${styles["border-radius"].xlarge} 0 0`,
    },
    "& div:last-child": {
      borderRadius: `0 0 ${styles["border-radius"].xlarge} ${styles["border-radius"].xlarge}`,
    },
  },
  option: {
    width: "100%",
    height: styles.spacing[36],
    padding: `0 ${styles.spacing[16]}`,
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
    color: styles.colors["text-primary"],
    fontSize: styles.spacing[12],
    "&:hover": {
      backgroundColor: styles.colors["bg-primary"],
    }
  },
};

const selectProps = {
  options: [{ value: "Parent" }, { value: "Sibling" }, { value: "Employer" }, { value: "Other" }],
};

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
  const guarantorName = useFormInput("");
  const guarantorAddress = useFormInput("");
  const guarantorRelationship = useFormInput("Please select an option");

  const [employers, setEmployers] = useState(
    [
      {
        uuid: uuidv4(),
        employerName: "",
        employmentStartDate: "",
        employmentEndDate: "",
      },
    ]
  );

  const handleEmployer = (
    name: string,
    e: ChangeEvent<HTMLInputElement>,
    uuid_: string
  ) => {
    const newEmployers: any[] = [...employers];
    const index = findIndex(newEmployers, ({ uuid }: { uuid: string }) => uuid === uuid_)

    if (index === -1) {
      throw new Error(`uuid ${uuid_} was not found among employers.\nemployers ${JSON.stringify(employers)}`)
    }

    newEmployers[index][name] = e.target["value"];
    setEmployers(newEmployers);
  }

  const removeEmployer = (uuid_: string) => {
    const newEmployers = [...employers]
    const index = findIndex(newEmployers, ({ uuid }: { uuid: string }) => uuid === uuid_)
    newEmployers.splice(index, 1)
    setEmployers(newEmployers)
  } 

  const addEmployer = () => {
    setEmployers([...employers, {
      uuid: uuidv4(),
      employerName: "",
      employmentStartDate: "",
      employmentEndDate: "",
    }]);
  };

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
      return date.replace(/-/g, "");
    }

    if (
      [
        firstName,
        lastName,
        address,
        guarantorName,
        guarantorAddress,
        guarantorRelationship,
      ].every(isValid)
    ) {
      const rv: DataModel = {
        personal: {
          first_name: firstName.control.value,
          last_name: lastName.control.value,
          current_address: address.control.value,
        },
        employer: [
          ...employers.map(({employerName, employmentStartDate, employmentEndDate}) => {
            return {
              name: employerName,
              start_date: parseDate(employmentStartDate), // make "20180301",
              end_date: parseDate(employmentEndDate), //"20190815"
            }
          })
        ],
        guarantor: {
          name: guarantorName.control.value,
          address: guarantorAddress.control.value,
          relation: guarantorRelationship.control.value,
        },
      };
      console.log("ok", rv);
      setSubmitted(true);
    } else {
      /* debug */
      const summary = [
        firstName,
        lastName,
        address,
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
            height: "auto",
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
              test-id="__reference-form--personal__first-name"
              type="text"
              name="fist_name"
              css={localStyles.textInput}
              {...firstName.control}
              disabled={submitted}
              required
            />

            <label htmlFor="last_name" css={localStyles.label}>
              Last name
            </label>
            <input
              test-id="__reference-form--personal__last-name"
              type="text"
              name="last_name"
              css={localStyles.textInput}
              {...lastName.control}
              disabled={submitted}
              required
            />

            <label htmlFor="address" css={localStyles.label}>
              Address
            </label>
            <input
              test-id="__reference-form--personal__address"
              type="text"
              name="address"
              css={localStyles.textInput}
              {...address.control}
              disabled={submitted}
              required
            />
          </div>

          {/* EMPLOYERS */}
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

            <div 
              className="employers" test-id="__reference-form--employers" 
              css={localStyles.employers}>
              {employers?.map((employer, i) => {
                const { uuid, employerName, employmentStartDate, employmentEndDate } =
                  employer;

                return (
                  <div
                    className={`employer employer--${i}`}
                    test-id={`__employer--${i}`}
                    css={localStyles.employer}
                    key={i}
                  >
                    <label htmlFor="employerName" css={localStyles.label}>
                      Employer name
                    </label>
                    <input
                      type="text"
                      name="employerName"
                      css={localStyles.textInput}
                      onChange={(e) => handleEmployer("employerName", e, uuid)}
                      value={employerName}
                      disabled={submitted}
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
                        <label
                          htmlFor="employmentStartDate"
                          css={localStyles.label}
                        >
                          Employment start date
                        </label>
                        <input
                          type="date"
                          name="employmentStartDate"
                          css={localStyles.dateInput}
                          onChange={(e) =>
                            handleEmployer("employmentStartDate", e, uuid)
                          }
                          value={employmentStartDate}
                          disabled={submitted}
                          required
                        />
                      </div>
                      {/* END DATE */}
                      <div
                        className="employment-end-date"
                        test-id="__employment-end-date"
                        css={localStyles.date}
                      >
                        <label
                          htmlFor="employmentEndDate"
                          css={localStyles.label}
                        >
                          Employment end date
                        </label>
                        <input
                          type="date"
                          name="employmentEndDate"
                          css={localStyles.dateInput}
                          onChange={(e) =>
                            handleEmployer("employmentEndDate", e, uuid)
                          }
                          value={employmentEndDate}
                          disabled={submitted}
                          /* may still be working for the employer */
                          // required
                        />
                      </div>
                      
                    </div>
                    <div 
                      className="remove-employer" 
                      css={localStyles.removeEmployerBtn}
                      onClick={() => removeEmployer(uuid)}
                    >
                      Remove
                    </div>

                  </div>
                );
              })}
            </div>

            <div
              className="add-employer"
              test-id="__add-employer"
              css={localStyles.addEmployerBtn}
              onClick={() => addEmployer()}
            >
              Add employer
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
            test-id="__guarantor_name"
              type="text"
              name="guarantor_name"
              css={localStyles.textInput}
              {...guarantorName.control}
              disabled={submitted}
              required
            />

            <label htmlFor="guarantor_address" css={localStyles.label}>
              Guarantor address
            </label>
            <input
            test-id="__guarantor_address"
              type="text"
              name="guarantor_address"
              css={localStyles.textInput}
              {...guarantorAddress.control}
              disabled={submitted}
              required
            />

            {/* SELECTOR */}
            <div
              className="reference-form--guarantor__relationship"
              test-id="__reference-form--guarantor__relationship"
              css={localStyles.guarantorRelationship}
            >
              <CustomSelect
                  {...{
                    ...selectProps,
                    ...guarantorRelationship.control,
                    styles: selectStyles,
                    disabled: submitted,
                    testId: "__guarantor_relationship"
                  }}
                />
            </div>
          </div>

          <div className="divider" css={localStyles.sectionTitle}></div>

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

            {submitted ? (
              <button
                className="reference-form--buttons__submitBtn"
                test-id="__reference-form--buttons__submitBtn"
                type="submit"
                css={localStyles.submitBtnSuccess}
                disabled
              >
                Thank you!
              </button>
            ) : (
              <button
                className="reference-form--buttons__submitBtn"
                test-id="__reference-form--buttons__submitBtn"
                type="submit"
                css={localStyles.submitBtn}
              >
                Submit
              </button>
            )}
          </div>
        </form>
      </main>

      {submitted && (
        <div className="success" test-id="__success" css={localStyles.success}>
          all ok
        </div>
      )}
    </div>
  );
}

export default ReferenceForm;


function useFormInput(
  initialValue: string,
  validationConfig?: ValidationConfig
) {
  const [value, setValue] = useState<string>(initialValue);
  const [validationMsg, setValidationMsg] = useState<string>();

  /* presume non valid input */
  const [isValid, setIsValid] = useState<boolean>(false);

  const handleChange = (
    e:  
    | ChangeEvent<HTMLInputElement> 
    | ChangeEvent<HTMLSelectElement> 
    | SimpleCustomSelectEvent
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
      ...validationConfig,
    },
  };
}
