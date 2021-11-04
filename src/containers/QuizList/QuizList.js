import React, {Fragment, useContext, useEffect, useState} from 'react'
import classes from './QuizList.css'
import {NavLink} from 'react-router-dom'
import Loader from '../../components/Ui/Loader/Loader'
import {QuizContext} from '../../context/quiz/quizContext'
import {AuthContext} from '../../context/auth/authContext'
import Button from '../../components/Ui/Button/Button'
import Fav from '../../components/Ui/Fav/Fav'
import {triviaIds} from '../../constants/triviaIds'

function QuizList() {

  const {isAuthenticated, userId, toggleFav, getUser, user} = useContext(AuthContext)
  const {fetch, state, clearLoading, deleteQuiz, error} = useContext(QuizContext)
  const {quizzes, loading} = state
  const [sorted, setSorted] = useState(false)
  const myQuizzes = []
  let filteredQuizzes = []

  useEffect(() => {
    fetch()

    if (isAuthenticated) getUser()

    return () => {
      clearLoading()
    }
  }, [])

  const check = (id) => {
    return user.favs.some(i => i === id)
  }

  const filterQuizzes = () => {
    quizzes.forEach((quiz) => {
      if (quiz.createdBy === userId) {
        myQuizzes.push(quiz)
      }
      else {
        filteredQuizzes.push(quiz)
      }
    })
  }

  const renderQuizzes = (quizzes, areMine) => (
    quizzes.map(quiz => {
      for (let i of triviaIds) {
        if (quiz.id === i) return null
      }

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
            {
              isAuthenticated && <Fav
                onClick={() => toggleFav(quiz.id)}
                active={user && user.favs ? check(quiz.id) : false}
              />
            }

          </div>
        </li>
      )
    })
  )

  const sortByFavs = arr => {
    return arr.sort(( a, b ) => (check(a.id) === check(b.id)) ? 0 : check(a.id) ? -1 : 1)
  }

  const render = () => {
    if (isAuthenticated) {
      filterQuizzes()
    }
    else {
      filteredQuizzes = quizzes
    }

    return (
      <Fragment>
        <Button type='gradient' to={`/quiz/${triviaIds[0]}`}>
          Who wants to be a millionaire?
        </Button>
        <Button type='gradient' to={`/quiz/${triviaIds[1]}`}>
          Frontend IT quiz
        </Button>
        {isAuthenticated &&
          <div className={classes.Sorting}>
            <Fav onClick={() => setSorted(prev => !prev)} active={sorted}/>
            <span>Sort by {sorted ? 'default' : 'favorites'}</span>
          </div>
        }

        <ul>
          {isAuthenticated && user.favs && sorted ? renderQuizzes(sortByFavs(filteredQuizzes)) : renderQuizzes(filteredQuizzes)}
        </ul>
        { isAuthenticated &&
        <Fragment>
          <h2 id='my-quizzes'>My quizzes</h2>
          <ul>
            { myQuizzes.length
              ? renderQuizzes(myQuizzes, true)
              : <Button to='/quiz-creator' type='success'>Create a quiz</Button>
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
        <h1>Quiz list</h1>
        {
          loading
            ? <Loader />
            : error ? <p>An error occurred.<br/>
              Please check your network connection and try again.</p>
            : !quizzes.length ? <p>Список пуст</p> : render()
        }
      </div>
    </div>
  );

}

export default QuizList;
