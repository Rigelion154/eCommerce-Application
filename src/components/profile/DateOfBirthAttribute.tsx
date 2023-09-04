import React, { useState } from 'react';
import { Actions } from '../../types/updatesRequests-types';
import updateUserByID from '../../core/services/updateCustomerById';
import { ProfileAttributes } from '../../types/types';
import styles from './commonStyles.module.css';

function DateOfBirthAttribute({ userID, userVersion, ...props }: ProfileAttributes) {
  const [inputIsDisabled, changeInputDisabled] = useState(true);
  const [updateIsDisabled, changeUpdateDisabled] = useState(false);
  const [saveIsDisabled, changeSaveDisabled] = useState(true);
  const [inputValue, setValue] = useState(props.value as string);
  const [dateOfBirthWarning, toggleDateOfBirthWarning] = useState('');
  const [updateSuccess, toggleUpdateSuccess] = useState('');

  function enableInput() {
    changeInputDisabled(false);
    changeUpdateDisabled(true);
    changeSaveDisabled(false);
  }
  function checkDateOfBirth(value: string) {
    changeSaveDisabled(false);
    toggleDateOfBirthWarning('');
    if (value === '') {
      toggleDateOfBirthWarning('This field is required');
      changeSaveDisabled(true);
    } else {
      const selectedDate = new Date(value);
      const currentDate = new Date();
      const minAge = new Date();
      minAge.setFullYear(currentDate.getFullYear() - 12);
      if (selectedDate > currentDate) {
        toggleDateOfBirthWarning('Date cannot be in the future');
        changeSaveDisabled(true);
      } else if (selectedDate > minAge) {
        toggleDateOfBirthWarning('User must be over 12 years old');
        changeSaveDisabled(true);
      }
    }
  }
  function tryToUpdate() {
    const actions: Actions = [];
    actions.push({
      action: 'setDateOfBirth',
      dateOfBirth: inputValue,
    });
    updateUserByID(userID, userVersion, actions).then(
      () => {
        toggleUpdateSuccess('Field updated. Please wait until page reloads.');
        setTimeout(() => window.location.reload(), 2000);
      },
      () => {
        toggleUpdateSuccess('Error happened during update. Please reload this page and try again');
      },
    );
    changeInputDisabled(true);
    changeUpdateDisabled(false);
    changeSaveDisabled(true);
  }
  return (
    <div>
      <header>Your date of birth</header>
      <input
        className={styles.input}
        defaultValue={props.value}
        type='date'
        disabled={inputIsDisabled}
        onChange={(e) => {
          setValue(e.target.value);
          checkDateOfBirth(e.target.value);
        }}
      />
      <button
        className={styles.btn}
        type='button'
        onClick={enableInput}
        disabled={updateIsDisabled}
      >
        Edit
      </button>
      <button className={styles.btn} type='button' onClick={tryToUpdate} disabled={saveIsDisabled}>
        Save
      </button>
      <p className={styles.invalid}>{dateOfBirthWarning}</p>
      <p className={styles.success}>{updateSuccess}</p>
    </div>
  );
}

export default DateOfBirthAttribute;
