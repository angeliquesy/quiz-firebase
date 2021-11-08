import React from 'react'
import classes from './QuizList.css'
import QuizListItem from './QuizListItem/QuizListItem'

const QuizList = ({ isAuthenticated, user, quizzes, areMine = false, hasFav }) => (
  <ul className={classes.QuizList}>
    {quizzes.map(quiz => (
        <QuizListItem
          key={quiz.id}
          isAuthenticated={isAuthenticated}
          quiz={quiz}
          user={user}
          areMine={areMine}
          hasFav={hasFav}
        />
      )
    )}
  </ul>
)


export default QuizList;
