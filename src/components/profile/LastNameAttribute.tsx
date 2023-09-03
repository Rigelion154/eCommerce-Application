import React, { useState } from 'react';
import { Actions } from '../../types/updatesRequests-types';
import updateUserByID from '../../core/services/updateCustomerById';
import { ProfileAttributes } from '../../types/types';

function LastNameAttribute({ userID, userVersion, ...props }: ProfileAttributes) {
  const [inputIsDisabled, changeInputDisabled] = useState(true);
  const [updateIsDisabled, changeUpdateDisabled] = useState(false);
  const [saveIsDisabled, changeSaveDisabled] = useState(true);
  const [inputValue, setValue] = useState(props.value as string);
  const [lastNameWarning, toggleLastNameWarning] = useState('');
  const [updateSuccess, toggleUpdateSuccess] = useState('');

  function enableInput() {
    changeInputDisabled(false);
    changeUpdateDisabled(true);
    changeSaveDisabled(false);
  }
  function checkLastName(value: string) {
    const validRegex = /^[a-zA-Zа-яА-Я]*$/;
    changeSaveDisabled(false);
    toggleLastNameWarning('');
    if (value === '') {
      toggleLastNameWarning('This field is required');
      changeSaveDisabled(true);
    } else if (value !== value.trim()) {
      toggleLastNameWarning('Please delete trails at the beginning and/or end');
      changeSaveDisabled(true);
    } else if (!value.match(validRegex)) {
      toggleLastNameWarning('The field must not have any special characters or numbers');
      changeSaveDisabled(true);
    }
  }
  function tryToUpdate() {
    const actions: Actions = [];
    actions.push({
      action: 'setLastName',
      lastName: inputValue,
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
      <header>Your last name</header>
      <input
        defaultValue={props.value}
        type='text'
        disabled={inputIsDisabled}
        onChange={(e) => {
          setValue(e.target.value);
          checkLastName(e.target.value);
        }}
      />
      <button type='button' onClick={enableInput} disabled={updateIsDisabled}>
        Edit
      </button>
      <button type='button' onClick={tryToUpdate} disabled={saveIsDisabled}>
        Save
      </button>
      <p>{lastNameWarning}</p>
      <p>{updateSuccess}</p>
    </div>
  );
}

export default LastNameAttribute;
