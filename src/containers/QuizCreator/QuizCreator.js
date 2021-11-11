import React, { Fragment, useContext, useState } from 'react';
import classes from './QuizCreator.css'
import Button from '../../components/Ui/Button/Button'
import { createControl, validate, validateForm } from '../../form/formFramework'
import Input from '../../components/Ui/Input/Input'
import Select from '../../components/Ui/Select/Select'
import { CreateContext } from '../../context/create/createContext'
import Form from '../../components/Form/Form'

function createOptionControl(number) {
  return createControl({
    label: `Variant ${number}`,
    errorMessage: 'The value cannot be empty',
    id: number
  }, {required: true})
}

function createFormControls() {
  return {
    question: createControl({
      label: 'Enter a question',
      errorMessage: 'The question cannot be empty',
    }, {required: true}),
    option1: createOptionControl(1),
    option2: createOptionControl(2),
    option3: createOptionControl(3),
    option4: createOptionControl(4),
  }
}

const capitalize = str => str.charAt(0).toUpperCase() + str.slice(1)

const QuizCreator = () => {

  const { quiz, createQuiz, createQuizQuestion, finishCreateQuiz } = useContext(CreateContext)

  const [init, setInit] = useState({
    name: '',
    isValid: false,
    touched: false,
    submitted: false,
  })

  const [state, setState] = useState({
    rightAnswerId: 1,
    formControls: createFormControls(),
    isFormValid: false,
  })

  const [posted, setPosted] = useState(null)

  const submitHandler = event => {
    event.preventDefault()
  }

  const addQuestionHandler = event => {
    event.preventDefault()

    const { question, option1, option2, option3, option4 } = state.formControls

    const questionItem = {
      question: question.value,
      id: quiz.questions.length + 1,
      rightAnswerId: state.rightAnswerId,
      answers: [
        {text: option1.value, id: option1.id},
        {text: option2.value, id: option2.id},
        {text: option3.value, id: option3.id},
        {text: option4.value, id: option4.id},
      ]
    }

    createQuizQuestion(questionItem)

    setState({
      ...state,
      rightAnswerId: 1,
      formControls: createFormControls(),
      isFormValid: false,
    })
  }

  const finish = async () => {
    const result = !!(await finishCreateQuiz())
    if (result) setInit({name: '', isValid: false, touched: false, submitted: false})
    setPosted(result)
  }

  const createQuizHandler = event => {
    event.preventDefault()

    setState({
      ...state,
      rightAnswerId: 1,
      formControls: createFormControls(),
      isFormValid: false,
    })

    finish()
  }

  const changeHandler = (value, controlName) => {
    const formControls = {...state.formControls}
    const control = {...formControls[controlName]}

    control.touched = true
    control.value = capitalize(value)
    control.valid = validate(control.value, control.validation)

    formControls[controlName] = control

    setState({
      ...state,
      formControls,
      isFormValid: validateForm(formControls)
    })
  }

  const nameHandler = (control, validation) => {
    setInit(prev => ({
      ...prev,
      name: capitalize(control.value),
      isValid: validate(control.value, validation),
      touched: true
    }))
  }

  const addNameHandler = () => {
    setInit(prev => ({...prev, submitted: true}))
    createQuiz(init.name, localStorage.getItem('userId'))
  }

  const renderControls = () => {
    return Object.keys(state.formControls).map((controlName, index) => {
      const control = state.formControls[controlName]

      return (
        <Fragment key={index}>
          <Input
            label={control.label}
            value={control.value}
            valid={control.valid}
            shouldValidate={!!control.validation}
            touched={control.touched}
            errorMessage={control.errorMessage}
            onChange={event => changeHandler(event.target.value, controlName)}
          />
          {index === 0 ? <hr/> : null}
        </Fragment>
      )
    })
  }

  const selectChangeHandler = event => {
    setState({
      ...state,
      rightAnswerId: +event.target.value
    })
  }

  const select = <Select
    label='Select the right answer'
    value={state.rightAnswerId}
    onChange={selectChangeHandler}
    options={[
      {text: 1, value: 1},
      {text: 2, value: 2},
      {text: 3, value: 3},
      {text: 4, value: 4},

    ]}
  />

  return (
    <div className={classes.QuizCreator}>
      <div>
        <h1>
          {init.name ? init.name : 'Quiz creation'}
        </h1>

        {
          posted
            ? <Fragment>
              <p>The quiz has been successfully created!</p>
              <Button type='success' onClick={() => setPosted(null)}>Create a quiz</Button>
              <Button type='primary' to='/'>Go to quiz list</Button>
            </Fragment>

            : <Form
                onSubmit={submitHandler}
                errorText={'An error occurred while trying to send the form.\nPlease check your network connection and try again.'}
                errorCondition={posted === false}
              >

              {
                init.submitted
                  ? <Fragment>

                      <Fragment>
                        {renderControls()}
                        {select}
                      </Fragment>

                      <Fragment>
                        <Button
                          type='primary'
                          onClick={addQuestionHandler}
                          disabled={!state.isFormValid}
                        >
                          Add question
                        </Button>
                        <Button
                          type='success'
                          onClick={createQuizHandler}
                          disabled={quiz.questions.length === 0}
                        >
                          Create a quiz
                        </Button>
                      </Fragment>

                    </Fragment>
                  : <Fragment>

                      <Fragment>
                        <Input
                          label='Enter the quiz name'
                          valid={init.isValid}
                          value={init.name}
                          touched={init.touched}
                          shouldValidate={true}
                          errorMessage='The name cannot be empty'
                          onChange={event => nameHandler(event.target, {required: true})}
                        />
                      </Fragment>

                      <Fragment>
                        <Button
                          type='primary'
                          onClick={addNameHandler}
                          disabled={!init.isValid}
                        >
                          Continue
                        </Button>
                      </Fragment>

                  </Fragment>
              }
            </Form>
        }
      </div>
    </div>
  )
}

export default QuizCreator
