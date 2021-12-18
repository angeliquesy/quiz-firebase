import React, { useRef } from 'react'
import classes from './QuizList.css'
import QuizListItem from './QuizListItem/QuizListItem'
import { CSSTransition, TransitionGroup } from 'react-transition-group'

const QuizList = ({ isAuthenticated, user, quizzes, areMine = false, hasFav }) => {
  const ulRef = useRef(null)

  return (
    <TransitionGroup component={'ul'} className={classes.QuizList} ref={ulRef}>
      {quizzes.map((quiz, index) => {

        return (
          <CSSTransition
            key={quiz.id}
            timeout={600}
            classNames={{
              enter: classes.ItemEnter,
              enterActive: classes.ItemEnterActive,
              exit: classes.ItemExit,
              exitActive: classes.ItemExitActive,
            }}
          >
            <QuizListItem
              isAuthenticated={isAuthenticated}
              quiz={quiz}
              user={user}
              areMine={areMine}
              hasFav={hasFav}
            />
          </CSSTransition>
        )
      }
      )}
    </TransitionGroup>
  )
}

export default QuizList;
