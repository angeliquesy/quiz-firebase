import React, {Fragment, useState, useContext} from 'react';
import classes from './Auth.css'
import Button from '../../components/Ui/Button/Button'
import Input from '../../components/Ui/Input/Input'
import { AuthContext } from '../../context/auth/authContext'
import Form from '../../components/Form/Form'

function validateEmail(email) {
  const regExp = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return regExp.test(String(email).toLowerCase());
}

const Auth = () => {
  const { auth, error } = useContext(AuthContext)

  const [state, setState] = useState({
    isFormValid: false,
    formControls: {
      email: {
        value: '',
        type: 'email',
        label: 'Email',
        errorMessage: 'Enter correct email',
        valid: false,
        touched: false,
        validation: {
          required: true,
          email: true,
        }
      },
      password: {
        value: '',
        type: 'password',
        label: 'Password',
        errorMessage: 'Enter correct password',
        valid: false,
        touched: false,
        validation: {
          required: true,
          minLength: 6
        }
      }
    }
  })

  const loginHandler = () => {
    auth(
      state.formControls.email.value,
      state.formControls.password.value,
      true
    )
  }

  const registerHandler = () => {
    auth(
      state.formControls.email.value,
      state.formControls.password.value,
      false
    )
  }

  const submitHandler = e => {
    e.preventDefault()
  }

  const validateControl = (value, validation) => {
    if (!validation) {
      return true
    }

    let isValid = true

    if (validation.required) {
      isValid = value.trim() !== '' && isValid
    }

    if (validation.email) {
      isValid = validateEmail(value) && isValid
    }

    if (validation.minLength) {
      isValid = value.length >= validation.minLength && isValid
    }

    return isValid
  }

  const onChangeHandler = (event, controlName) => {
    const formControls = {...state.formControls}
    const control = {...formControls[controlName]}

    control.value = event.target.value
    control.touched = true
    control.valid = validateControl(control.value, control.validation)

    formControls[controlName] = control

    let isFormValid = true

    Object.keys(formControls).forEach(name => {
      isFormValid = formControls[name].valid && isFormValid
    })

    setState({...state, formControls, isFormValid})
  }

  const renderInputs = () => {
    return Object.keys(state.formControls).map((controlName, index) => {
      const control = state.formControls[controlName]
      return (
        <Input
          key={controlName + index}
          type={control.type}
          value={control.value}
          valid={control.valid}
          touched={control.touched}
          label={control.label}
          shouldValidate={!!control.validation}
          errorMessage={control.errorMessage}
          onChange={event => onChangeHandler(event, controlName)}
        />
      )
    })
  }

  return (
    <div className={classes.Auth}>
      <div>
        <h1>Authorization</h1>

        <Form
          onSubmit={submitHandler}
          errorText={error === 'signIn'
            ? 'The email or password is incorrect.\nPlease enter correct email and password or sign up'
            : 'The email already exists. Try to sign in'}
          errorCondition={error}
        >

          <Fragment>

            {renderInputs()}
          </Fragment>

          <Fragment>
            <Button type='success' onClick={loginHandler}
                    disabled={!state.isFormValid}
            >
              Sign in
            </Button>

            <Button type='primary' onClick={registerHandler}
                    disabled={!state.isFormValid}
            >
              Sign up
            </Button>
          </Fragment>

        </Form>

      </div>
    </div>
  )
}


export default Auth
