import React from 'react';

function ProfileAttribute({ headerText }: { headerText: string }) {
  return (
    <div>
      <header>{headerText}</header>
      <input />
      <button type='button'>Change</button>
      <button type='button'>Save</button>
    </div>
  );
}

export default ProfileAttribute;
