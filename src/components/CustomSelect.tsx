/** @jsxImportSource @emotion/react */
import React, { useState } from "react";
import './styles/CustomSelect.css'
import { CustomSelectProps, Option } from './interfaces'

const defaultStyles = {
  control: {
    width: "400px",
    height: "50px",
    borderRadius: "9px",
    border: "1px solid black",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    "flex-direction": "row",
  },
  body: {
    height: "100%",
    width: "100%",
    backgroundColor: "white",
    borderRadius: "9px 0 0 9px",
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
    padding: "0 0 0 18px",
  },
  arrow: {
    height: "100%",
    width: "50px",
    backgroundColor: "white",
    borderRadius: "0 9px 9px 0",
    borderLeft: "1px solid grey",
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  optionsList: {
    width: '400px',
    backgroundColor: 'white',
    border: "1px solid grey",
    borderRadius: '9px',
    "& div:first-of-type": {
      borderRadius: '9px 9px 0 0',
    },
    "& div:last-child": {
      borderRadius: '0 0 9px 9px',
    },
  },
  option: {
    width: "398px",
    height: "40px",
    padding: '9px 18px',
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
    "&:hover": {
      backgroundColor: 'pink',
    }
  },
  chevron: {
    height: "20px",
    width: "20px",
    margin: "0 auto",
    color: "grey",
    "&:hover": {
      color: "#111"
    }
  }
};

function CustomSelect({ options, value, onChange, disabled, styles, testId }: CustomSelectProps) {
  const [isOpen, toggleOpen] = useState(false);
  const [currentValue, setCurrentValue] = useState(value)

  return (
    <div className="custom-select">
      <div className="custom-select--control" test-id="__custom-select--control" 
      css={styles ? styles.control : defaultStyles.control}
      onClick={() => !disabled && toggleOpen((x) => !x)}
      >
        <div className="custom-select--control-body" test-id={testId || "__custom-select--control-body"} css={styles ? styles.body : defaultStyles.body}>
          {currentValue}
        </div>
        <div
          className="custom-select--control-arrow"
          css={styles ? styles.arrow : defaultStyles.arrow}
        >
          {isOpen ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="chevron chevron-close"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1}
              css={defaultStyles.chevron}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="chevron chevron-down"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1}
              css={defaultStyles.chevron}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19 9l-7 7-7-7"
              />
            </svg>
          )}
        </div>
      </div>
      {isOpen && options && (
        <div 
          className="custom-select--options-list" 
          test-id="__custom-select--options-list"
          css={styles ? styles.optionsList : defaultStyles.optionsList}
        >
          {options.map((option: Option, i: number) => {
            return (
              <div 
                key={i}
                className={`custom-select--option option--${i}`}
                test-id={`__option--${i}`}
                onClick={() => {
                  setCurrentValue(option.value)
                  onChange({ target: { type: 'select', value: option.value }})
                  toggleOpen(x => !x)
                }}
                css={styles ? styles.option : defaultStyles.option}
              >
                {option.value}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default CustomSelect;
