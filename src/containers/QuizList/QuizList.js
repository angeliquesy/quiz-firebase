import React, {Fragment, useContext, useEffect} from 'react'
import classes from './QuizList.css'
import {NavLink} from 'react-router-dom'
import Loader from '../../components/Ui/Loader/Loader'
import {QuizContext} from '../../context/quiz/quizContext'
import {AuthContext} from '../../context/auth/authContext'
import Button from '../../components/Ui/Button/Button'
import Fav from '../../components/Ui/Fav/Fav'

function QuizList() {

  const {isAuthenticated, id} = useContext(AuthContext)
  const {fetch, state, clearLoading, deleteQuiz} = useContext(QuizContext)
  const {quizzes, loading} = state
  const myQuizzes = []

  useEffect(() => {
    fetch()

    return () => {
      clearLoading()
    }
  }, [])

  const filterQuizzes = () => {
    quizzes.forEach((quiz, index, arr) => {
      if (quiz.createdBy === id) {
        myQuizzes.push(quiz)
        arr.splice(index, 1)
      }
    })
  }

  const renderQuizzes = (quizzes, areMine) => {
    return quizzes.map(quiz => {
      return (
        <li key={quiz.id}>
          <NavLink to={'/quiz/' + quiz.id}>
            {quiz.name}
          </NavLink>
          <div>
            { areMine &&
              <Button type='icon' onClick={() => deleteQuiz(quiz.id)}>
                <i className='fa fa-trash' />
              </Button> }
            <Fav />
          </div>
        </li>
      )
    })
  }

  const render = () => {
    if (isAuthenticated) filterQuizzes()

    return (
      <Fragment>
        <ul>
          { renderQuizzes(quizzes) }
        </ul>
        { isAuthenticated &&
          <Fragment>
            <h2>Мои тесты</h2>
            <ul>
              { myQuizzes.length
                ? renderQuizzes(myQuizzes, true)
                : <Button to='/quiz-creator' type='primary'>Создать тест</Button>
              }
            </ul>
          </Fragment>
        }
      </Fragment>
    )
  }

  return (
    <div className={classes.QuizList}>
      <div>
        <h1>Список тестов</h1>
        {
          loading
            ? <Loader />
            : !quizzes.length ? <p>Список пуст</p> : render()
        }
      </div>
    </div>
  );

}

export default QuizList;
