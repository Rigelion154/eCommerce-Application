import React, { useState } from 'react';
import PasswordInput from './PasswordInput';
import InvalidPassword from './InvalidPassword';
import PasswordHideButton from './PasswordBtn';

function PasswordWrapper() {
  const [hidden, setHidden] = useState(true);
  const [passwordHiddden, setPasswordHide] = useState('password');

  function hideToggle() {
    if (passwordHiddden === 'password') {
      setPasswordHide('text');
    } else {
      setPasswordHide('password');
    }
  }

  function checkPassword(e: React.FormEvent<HTMLInputElement>) {
    if (e.target) {
      const target = e.target as HTMLInputElement;
      const validRegex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$/;
      if (!target.value.match(validRegex)) {
        setHidden(false);
      } else {
        setHidden(true);
      }
    }
  }
  return (
    <div>
      <PasswordInput
        type={passwordHiddden}
        placeholder='Your Password'
        onChange={(e) => checkPassword(e)}
      />
      <InvalidPassword hidden={hidden} />
      <PasswordHideButton onClick={() => hideToggle()} />
    </div>
  );
}

export default PasswordWrapper;
