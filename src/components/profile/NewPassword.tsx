import React, { useState } from 'react';
import { ProfileAttributes } from '../../types/types';
import changePassword from '../../core/services/changePassword';
import { ICustomerGetInfo } from '../../types/customers-types';
import logIn from '../../core/services/LogInFunction';
import styles from './commonStyles.module.css';

function NewPassword({ userID, userVersion, ...props }: ProfileAttributes) {
  const [currentPasswordValue, setCurrentPasswordValue] = useState('');
  const [newPasswordValue, setNewPasswordValue] = useState('');

  const [saveDisable, setSaveDisable] = useState(true);
  const [passwordWarning, togglePasswordWarning] = useState('');

  const [hideCurrentPassword, showHideCurrentPassword] = useState('password');
  const [hideNewPassword, showHideNewPassword] = useState('password');

  const [updateMistake, setUpdateMistake] = useState('');
  const [updateSuccess, setUpdateSuccess] = useState('');

  function tryToChangePassword() {
    changePassword(userID, userVersion, currentPasswordValue, newPasswordValue).then(
      (result) => {
        if (result.status === 400) {
          setUpdateMistake('Wrong current password');
        } else {
          result.json().then(
            (res: ICustomerGetInfo) => {
              const { email } = res;
              logIn(email, newPasswordValue).then(
                () => {
                  setUpdateSuccess('Password is updated. Please wait while page reloads.');
                  setTimeout(() => window.location.reload(), 2000);
                },
                () => {},
              );
            },
            () => {},
          );
        }
      },
      () => {},
    );
  }

  function checkNewPassword(value: string) {
    togglePasswordWarning('');
    setSaveDisable(false);
    if (value.length < 8) {
      togglePasswordWarning('Password should be at least 8 characters long');
      setSaveDisable(true);
    }
    if (!/[A-Z]/.test(value)) {
      togglePasswordWarning('Password should contain at least one uppercase letter (A-Z)');
      setSaveDisable(true);
    }
    if (!/[a-z]/.test(value)) {
      togglePasswordWarning('Password should contain at least one lowercase letter (a-z)');
      setSaveDisable(true);
    }
    if (!/[0-9]/.test(value)) {
      togglePasswordWarning('Password should contain at least one digit (0-9)');
      setSaveDisable(true);
    }
    if (value.trim() !== value) {
      togglePasswordWarning('Password should not have leading or trailing spaces');
      setSaveDisable(true);
    }
    if (value === '') {
      togglePasswordWarning('Password is required');
      setSaveDisable(true);
    }
  }

  function toggleHideCurrentPassword() {
    if (hideCurrentPassword === 'password') {
      showHideCurrentPassword('text');
    } else {
      showHideCurrentPassword('password');
    }
  }

  function toggleHideNewPassword() {
    if (hideNewPassword === 'password') {
      showHideNewPassword('text');
    } else {
      showHideNewPassword('password');
    }
  }

  return (
    <div hidden={props.hidden}>
      <p>Old password</p>
      <input
        className={styles.input}
        placeholder='Old password'
        type={hideCurrentPassword}
        onChange={(e) => {
          setCurrentPasswordValue(e.target.value);
        }}
      />
      <button className={styles.btn} type='button' onClick={() => toggleHideCurrentPassword()}>
        {hideCurrentPassword === 'text' ? 'Hide' : 'Show'}
      </button>
      <p>New password</p>
      <input
        className={styles.input}
        placeholder='New password'
        type={hideNewPassword}
        onChange={(e) => {
          setNewPasswordValue(e.target.value);
          checkNewPassword(e.target.value);
        }}
      />
      <button className={styles.btn} type='button' onClick={() => toggleHideNewPassword()}>
        {hideNewPassword === 'text' ? 'Hide' : 'Show'}
      </button>
      <p className={styles.invalid}>{passwordWarning}</p>
      <p />
      <button
        className={styles.btn}
        type='button'
        onClick={tryToChangePassword}
        disabled={saveDisable}
      >
        Save new password
      </button>
      <p className={styles.failure}>{updateMistake}</p>
      <p className={styles.success}>{updateSuccess}</p>
    </div>
  );
}

export default NewPassword;
