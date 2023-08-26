import React, { useState } from 'react';
import { Actions } from '../../types/updatesRequests-types';
import updateUserByID from '../../core/services/updateCustomerById';
import { ProfileAttributes } from '../../types/types';

function LastNameAttribute({ userID, userVersion, ...props }: ProfileAttributes) {
  const [inputIsDisabled, changeInputDisabled] = useState(true);
  const [updateIsDisabled, changeUpdateDisabled] = useState(false);
  const [saveIsDisabled, changeSaveDisabled] = useState(true);
  const [inputValue, setValue] = useState('');

  function enableInput() {
    changeInputDisabled(false);
    changeUpdateDisabled(true);
    changeSaveDisabled(false);
  }
  function tryToUpdate() {
    const actions: Actions = [];
    actions.push({
      action: 'setLastName',
      lastName: inputValue,
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
      <header>Your last name</header>
      <input
        defaultValue={props.value}
        type='text'
        disabled={inputIsDisabled}
        onChange={(e) => {
          setValue(e.target.value);
        }}
      />
      <button type='button' onClick={enableInput} disabled={updateIsDisabled}>
        Update
      </button>
      <button type='button' onClick={tryToUpdate} disabled={saveIsDisabled}>
        Save
      </button>
    </div>
  );
}

export default LastNameAttribute;
