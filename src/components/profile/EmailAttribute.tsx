import React, { useState } from 'react';
import { Actions } from '../../types/updatesRequests-types';
import updateUserByID from '../../core/services/updateCustomerById';
import { ProfileAttributes } from '../../types/types';

function EmailAttribute({ userID, userVersion, ...props }: ProfileAttributes) {
  const [inputIsDisabled, changeInputDisabled] = useState(true);
  const [updateIsDisabled, changeUpdateDisabled] = useState(false);
  const [saveIsDisabled, changeSaveDisabled] = useState(true);
  const [inputValue, setValue] = useState(props.value as string);
  const [emailWarning, toggleEmailWarning] = useState('');
  const [updateSuccess, toggleUpdateSuccess] = useState('');

  function enableInput() {
    changeInputDisabled(false);
    changeUpdateDisabled(true);
    changeSaveDisabled(false);
  }
  function checkEmail(value: string) {
    toggleEmailWarning('');
    changeSaveDisabled(false);
    const validRegex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
    if (value === '') {
      toggleEmailWarning('E-mail is required');
      changeSaveDisabled(true);
    } else if (value !== value.trim()) {
      toggleEmailWarning('Please delete trails at the beginning and/or end of e-mail');
      changeSaveDisabled(true);
    } else if (!value.match(validRegex)) {
      toggleEmailWarning(
        `Incorrect e-mail. E-mail should have a name and domain, for example: 'test@test.com'`,
      );
      changeSaveDisabled(true);
    }
  }
  function tryToUpdate() {
    const actions: Actions = [];
    actions.push({
      action: 'changeEmail',
      email: inputValue,
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
      <header>Your E-Mail</header>
      <input
        defaultValue={props.value}
        type='text'
        disabled={inputIsDisabled}
        onChange={(e) => {
          setValue(e.target.value);
          checkEmail(e.target.value);
        }}
      />
      <button type='button' onClick={enableInput} disabled={updateIsDisabled}>
        Update
      </button>
      <button type='button' onClick={tryToUpdate} disabled={saveIsDisabled}>
        Save
      </button>
      <p>{emailWarning}</p>
      <p>{updateSuccess}</p>
    </div>
  );
}

export default EmailAttribute;
