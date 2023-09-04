import React, { useState } from 'react';
import { Actions } from '../../types/updatesRequests-types';
import updateUserByID from '../../core/services/updateCustomerById';
import { ProfileAttributes } from '../../types/types';
import styles from './commonStyles.module.css';

function FirstNameAttribute({ userID, userVersion, ...props }: ProfileAttributes) {
  const [inputIsDisabled, changeInputDisabled] = useState(true);
  const [updateIsDisabled, changeUpdateDisabled] = useState(false);
  const [saveIsDisabled, changeSaveDisabled] = useState(true);
  const [inputValue, setValue] = useState(props.value as string);
  const [firstNameWarning, toggleFirstNameWarning] = useState('');
  const [updateSuccess, toggleUpdateSuccess] = useState('');

  function enableInput() {
    changeInputDisabled(false);
    changeUpdateDisabled(true);
    changeSaveDisabled(false);
  }
  function checkFirstName(value: string) {
    const validRegex = /^[a-zA-Zа-яА-Я]*$/;
    changeSaveDisabled(false);
    toggleFirstNameWarning('');
    if (value === '') {
      toggleFirstNameWarning('This field is required');
      changeSaveDisabled(true);
    } else if (value !== value.trim()) {
      toggleFirstNameWarning('Please delete trails at the beginning and/or end');
      changeSaveDisabled(true);
    } else if (!value.match(validRegex)) {
      toggleFirstNameWarning('The field must not have any special characters or numbers');
      changeSaveDisabled(true);
    }
  }
  function tryToUpdate() {
    const actions: Actions = [];
    actions.push({
      action: 'setFirstName',
      firstName: inputValue,
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
      <header>Your first name</header>
      <input
        className={styles.input}
        defaultValue={props.value}
        type='text'
        disabled={inputIsDisabled}
        onChange={(e) => {
          setValue(e.target.value);
          checkFirstName(e.target.value);
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
      <p className={styles.invalid}>{firstNameWarning}</p>
      <p className={styles.success}>{updateSuccess}</p>
    </div>
  );
}

export default FirstNameAttribute;
