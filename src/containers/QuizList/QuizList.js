import React, {useContext, useEffect} from 'react'
import classes from './QuizList.css'
import {NavLink} from 'react-router-dom'
import Loader from '../../components/Ui/Loader/Loader'
//import {connect} from 'react-redux'
//import {fetchQuizzes} from '../../store/actions/quiz'
import {QuizContext} from '../../context/quiz/quizContext'

function QuizList() {

  const {fetch, loading, state} = useContext(QuizContext)

  const {quizzes} = state

  useEffect(() => {
    fetch()
  }, [])

  const renderQuizzes = () => {
    return quizzes.map(quiz => {
      return (
        <li key={quiz.id}>
          <NavLink to={'/quiz/' + quiz.id}>
            {quiz.name}
          </NavLink>
        </li>
      )
    })
  }

  return (
    <div className={classes.QuizList}>
      <div>
        <h1>Список тестов</h1>
        {
          loading && quizzes.length !== 0
            ? <Loader />
          : <ul>
              { renderQuizzes() }
            </ul>
        }
      </div>
    </div>
  );

}

export default QuizList;
