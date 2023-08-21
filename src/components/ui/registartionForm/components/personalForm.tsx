import React from 'react';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import styles from '../RegistrationForm.module.css';

interface PersonalFormProps {
  email: string;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
  emailError: string;
  setEmailError: React.Dispatch<React.SetStateAction<string>>;
  emailValid: boolean;
  setEmailValid: React.Dispatch<React.SetStateAction<boolean>>;
  password: string;
  setPassword: React.Dispatch<React.SetStateAction<string>>;
  showPassword: boolean;
  setShowPassword: React.Dispatch<React.SetStateAction<boolean>>;
  passwordValid: boolean;
  setPasswordValid: React.Dispatch<React.SetStateAction<boolean>>;
  passwordError: string;
  setPasswordError: React.Dispatch<React.SetStateAction<string>>;
  firstName: string;
  setFirstName: React.Dispatch<React.SetStateAction<string>>;
  firstNameError: string;
  setFirstNameError: React.Dispatch<React.SetStateAction<string>>;
  firstNameValid: boolean;
  setFirstNameValid: React.Dispatch<React.SetStateAction<boolean>>;
  lastName: string;
  setLastName: React.Dispatch<React.SetStateAction<string>>;
  lastNameError: string;
  setLastNameError: React.Dispatch<React.SetStateAction<string>>;
  lastNameValid: boolean;
  setLastNameValid: React.Dispatch<React.SetStateAction<boolean>>;
  birthDay: string;
  setBirthDay: React.Dispatch<React.SetStateAction<string>>;
  birthDayError: string;
  setBirthDayError: React.Dispatch<React.SetStateAction<string>>;
  birthDayValid: boolean;
  setBirthDayValid: React.Dispatch<React.SetStateAction<boolean>>;
}

function PersonalForm(props: PersonalFormProps) {
  const {
    email,
    setEmail,
    emailError,
    setEmailError,
    emailValid,
    setEmailValid,
    password,
    setPassword,
    showPassword,
    setShowPassword,
    passwordValid,
    setPasswordValid,
    passwordError,
    setPasswordError,
    firstName,
    setFirstName,
    firstNameError,
    setFirstNameError,
    firstNameValid,
    setFirstNameValid,
    lastName,
    setLastName,
    lastNameError,
    setLastNameError,
    lastNameValid,
    setLastNameValid,
    birthDay,
    setBirthDay,
    birthDayError,
    setBirthDayError,
    birthDayValid,
    setBirthDayValid,
  } = props;

  const validateEmail = (value: string) => {
    const emailPattern = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/;

    if (!value) {
      setEmailError('This field is required');
      setEmailValid(false);
    } else if (!emailPattern.test(value)) {
      setEmailError('Please enter a valid email address');
      setEmailValid(false);
    } else {
      setEmailError('');
      setEmailValid(true);
    }
  };

  const validatePassword = (value: string) => {
    const containUpperLetter = /[A-ZА-Я]/.test(value);
    const containLowerLetter = /[a-zа-я]/.test(value);
    const containNumber = /\d/.test(value);

    if (value.length < 8) {
      setPasswordError('Password must contain at least 8 characters');
      setPasswordValid(false);
    } else if (!containUpperLetter || !containLowerLetter || !containNumber) {
      setPasswordError(
        'Password must contain at least 1 uppercase letter, 1 lowercase letter and 1 number',
      );
      setPasswordValid(false);
    } else {
      setPasswordError('');
      setPasswordValid(true);
    }
  };

  const validateFirstName = (value: string) => {
    const firstNamePattern = /^[a-zA-Zа-яА-Я]*$/;

    if (!value) {
      setFirstNameError('This field is required');
      setFirstNameValid(false);
    } else if (!firstNamePattern.test(value)) {
      setFirstNameError('The field must not have any special characters or numbers');
      setFirstNameValid(false);
    } else {
      setFirstNameError('');
      setFirstNameValid(true);
    }
  };

  const validateLastName = (value: string) => {
    const lastNamePattern = /^[a-zA-Zа-яА-Я]*$/;

    if (!value) {
      setLastNameError('This field is required');
      setLastNameValid(false);
    } else if (!lastNamePattern.test(value)) {
      setLastNameError('The field must not have any special characters or numbers');
      setLastNameValid(false);
    } else {
      setLastNameError('');
      setLastNameValid(true);
    }
  };

  const validateBirthDay = (value: string) => {
    if (!value) {
      setBirthDayError('This field is required');
      setBirthDayValid(false);
    } else {
      const selectedDate = new Date(value);
      const currentDate = new Date();
      const minAge = new Date();
      minAge.setFullYear(currentDate.getFullYear() - 12);

      if (selectedDate > currentDate) {
        setBirthDayError('Date cannot be in the future');
        setBirthDayValid(false);
      } else if (selectedDate > minAge) {
        setBirthDayError('User must be over 12 years old');
        setBirthDayValid(false);
      } else {
        setBirthDayError('');
        setBirthDayValid(true);
      }
    }
  };

  return (
    <div className={styles.personal__field}>
      {emailError && !emailValid && <p className={styles.error__message}>{emailError}</p>}
      <input
        type='email'
        value={email}
        onChange={(e) => {
          setEmail(e.target.value);
        }}
        onKeyDown={(e) => {
          if (e.key === ' ') {
            e.preventDefault();
          }
        }}
        onBlur={() => {
          validateEmail(email);
          if (!email) {
            setEmailError('This field is required');
            setEmailValid(false);
          }
        }}
        className={emailError && !emailValid ? styles.invalid : ''}
        placeholder='email'
      />
      {passwordError && !passwordValid && <p className={styles.error__message}>{passwordError}</p>}
      <div className={styles.password__input_block}>
        <input
          type={showPassword ? 'text' : 'password'}
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
            validatePassword(e.target.value);
          }}
          onKeyDown={(e) => {
            if (e.key === ' ') {
              e.preventDefault();
            }
          }}
          onBlur={() => {
            if (!password) {
              setPasswordError('This field is required');
              setPasswordValid(false);
            }
          }}
          className={passwordError && !passwordValid ? styles.invalid : ''}
          placeholder='password'
        />
        <button
          type='button'
          onClick={() => setShowPassword((prev) => !prev)}
          className={styles.show__password_btn}
        >
          {showPassword ? <AiFillEye /> : <AiFillEyeInvisible className={styles.eyeIcon} />}
        </button>
      </div>
      {firstNameError && !firstNameValid && (
        <p className={styles.error__message}>{firstNameError}</p>
      )}
      <input
        type='text'
        value={firstName}
        onChange={(e) => {
          setFirstName(e.target.value);
          if (!e.target.value) {
            setFirstNameError('This field is required');
            setFirstNameValid(false);
          } else {
            validateFirstName(e.target.value);
          }
        }}
        onBlur={() => validateFirstName(firstName)}
        className={firstNameError && !firstNameValid ? styles.invalid : ''}
        placeholder='First name'
      />
      {lastNameError && !lastNameValid && <p className={styles.error__message}>{lastNameError}</p>}
      <input
        type='text'
        value={lastName}
        onChange={(e) => {
          setLastName(e.target.value);
          if (!e.target.value) {
            setLastNameError('This field is required');
            setLastNameValid(false);
          } else {
            validateLastName(e.target.value);
          }
        }}
        onBlur={() => validateLastName(lastName)}
        className={lastNameError && !lastNameValid ? styles.invalid : ''}
        placeholder='Last name'
      />
      {birthDayError && !birthDayValid && <p className={styles.error__message}>{birthDayError}</p>}
      <input
        type='date'
        value={birthDay}
        onChange={(e) => {
          const selectedDate = new Date(e.target.value);
          const isoDate = selectedDate.toISOString().split('T')[0];
          setBirthDay(isoDate);
        }}
        onBlur={() => validateBirthDay(birthDay)}
        className={birthDayError && !birthDayValid ? styles.invalid : ''}
        placeholder='Date of birth'
      />
    </div>
  );
}

export default PersonalForm;
