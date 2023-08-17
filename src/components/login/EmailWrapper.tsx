import React, { useState } from 'react';
import EmailInput from './EmailInput';
import InvalidEmail from './InvalidEmail';

function EmailWrapper() {
  const [hidden, setHidden] = useState(true);

  function checkEmail(e: React.FormEvent<HTMLInputElement>) {
    if (e.target) {
      const target = e.target as HTMLInputElement;
      const validRegex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
      if (!target.value.match(validRegex)) {
        setHidden(false);
      } else {
        setHidden(true);
      }
    }
  }

  return (
    <div>
      <EmailInput placeholder='Your Email' onChange={(e) => checkEmail(e)} />
      <InvalidEmail hidden={hidden} />
    </div>
  );
}

export default EmailWrapper;
