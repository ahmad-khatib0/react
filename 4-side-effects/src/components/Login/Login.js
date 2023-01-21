import React, { useState, useEffect } from 'react'

import Card from '../UI/Card/Card'
import classes from './Login.module.css'
import Button from '../UI/Button/Button'

const Login = (props) => {
  const [enteredEmail, setEnteredEmail] = useState('')
  const [emailIsValid, setEmailIsValid] = useState()
  const [enteredPassword, setEnteredPassword] = useState('')
  const [passwordIsValid, setPasswordIsValid] = useState()
  const [formIsValid, setFormIsValid] = useState(false)

  useEffect(() => {
    const identifier = setTimeout(() => {
      console.log('Checking form validity!')
      setFormIsValid(enteredEmail.includes('@') && enteredPassword.trim().length > 6)
    }, 500)

    return () => {
      console.log('CLEANUP')
      clearTimeout(identifier)
    }
    // this cleanup function runs before each next run of the useEffect logic, but not on
    // startup , and this cleanup function runs on when the component get unmounted, so this debounce
    // settimeout will be canceled if the 500 millisecond didn't pass for a given value change
  }, [enteredEmail, enteredPassword])

  const emailChangeHandler = (event) => {
    setEnteredEmail(event.target.value)
  }

  const passwordChangeHandler = (event) => {
    setEnteredPassword(event.target.value)
  }

  const validateEmailHandler = () => {
    setEmailIsValid(enteredEmail.includes('@'))
  }

  const validatePasswordHandler = () => {
    setPasswordIsValid(enteredPassword.trim().length > 6)
  }

  const submitHandler = (event) => {
    event.preventDefault()
    props.onLogin(enteredEmail, enteredPassword)
  }

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <div className={`${classes.control} ${emailIsValid === false ? classes.invalid : ''}`}>
          <label htmlFor="email">E-Mail</label>
          <input
            type="email"
            id="email"
            value={enteredEmail}
            onChange={emailChangeHandler}
            onBlur={validateEmailHandler}
          />
        </div>
        <div className={`${classes.control} ${passwordIsValid === false ? classes.invalid : ''}`}>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={enteredPassword}
            onChange={passwordChangeHandler}
            onBlur={validatePasswordHandler}
          />
        </div>
        <div className={classes.actions}>
          <Button type="submit" className={classes.btn} disabled={!formIsValid}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  )
}

export default Login
