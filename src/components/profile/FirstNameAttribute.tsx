import React, { useState } from 'react';
import { Actions } from '../../types/updatesRequests-types';
import updateUserByID from '../../core/services/updateCustomerById';
import { ProfileAttributes } from '../../types/types';

function FirstNameAttribute({ userID, userVersion, ...props }: ProfileAttributes) {
  const [inputIsDisabled, changeInputDisabled] = useState(true);
  const [updateIsDisabled, changeUpdateDisabled] = useState(false);
  const [saveIsDisabled, changeSaveDisabled] = useState(true);
  const [inputValue, setValue] = useState('');
  const [firstNameWarning, toggleFirstNameWarning] = useState('');

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
        window.location.reload();
      },
      () => {},
    );
    changeInputDisabled(true);
    changeUpdateDisabled(false);
    changeSaveDisabled(true);
  }
  return (
    <div>
      <header>Your first name</header>
      <input
        defaultValue={props.value}
        type='text'
        disabled={inputIsDisabled}
        onChange={(e) => {
          setValue(e.target.value);
          checkFirstName(e.target.value);
        }}
      />
      <button type='button' onClick={enableInput} disabled={updateIsDisabled}>
        Update
      </button>
      <button type='button' onClick={tryToUpdate} disabled={saveIsDisabled}>
        Save
      </button>
      <p>{firstNameWarning}</p>
    </div>
  );
}

export default FirstNameAttribute;
