import React, { useState } from 'react';
import PasswordInput from './PasswordInput';
import InvalidPassword from './InvalidPassword';

function PasswordWrapper() {
  const [hidden, setHidden] = useState(true);

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
      <PasswordInput placeholder='Your Password' onChange={(e) => checkPassword(e)} />
      <InvalidPassword hidden={hidden} />
    </div>
  );
}

export default PasswordWrapper;
