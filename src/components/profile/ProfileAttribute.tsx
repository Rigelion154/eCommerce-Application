import React, { ComponentPropsWithoutRef, useState } from 'react';
import { Actions } from '../../types/updatesRequests-types';
import updateUserByID from '../../core/services/updateCustomerById';

interface ProfileAttributes extends ComponentPropsWithoutRef<'input'> {
  headerText: string;
  userID: string | null;
  userVersion: number | null;
}

function ProfileAttribute({ headerText, userID, userVersion, ...props }: ProfileAttributes) {
  const [inputIsDisabled, changeInputDisabled] = useState(true);
  const [updateIsDisabled, changeUpdateDisabled] = useState(false);
  const [saveIsDisabled, changeSaveDisabled] = useState(true);
  const [inputValue, setValue] = useState('');
  const [emailWarning, toggleEmailWarning] = useState('');
  function checkEmail(value: string) {
    if (headerText === 'E-Mail') {
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
  }
  function enableInput() {
    changeInputDisabled(false);
    changeUpdateDisabled(true);
    changeSaveDisabled(false);
  }
  function tryToUpdate() {
    const actions: Actions = [];
    switch (headerText) {
      case 'E-Mail':
        actions.push({
          action: 'changeEmail',
          email: inputValue,
        });
        break;
      case 'First name':
        actions.push({
          action: 'setFirstName',
          firstName: inputValue,
        });
        break;
      case 'Last name':
        actions.push({
          action: 'setLastName',
          lastName: inputValue,
        });
        break;
      case 'Date of birth':
        actions.push({
          action: 'setDateOfBirth',
          dateOfBirth: inputValue,
        });
        break;
      default:
        break;
    }
    updateUserByID(userID, userVersion, actions).then(
      () => {},
      () => {},
    );
    changeInputDisabled(true);
    changeUpdateDisabled(false);
    changeSaveDisabled(true);
  }
  return (
    <div>
      <header>{headerText}</header>
      <input
        defaultValue={props.value}
        type={props.type}
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
    </div>
  );
}

export default ProfileAttribute;
