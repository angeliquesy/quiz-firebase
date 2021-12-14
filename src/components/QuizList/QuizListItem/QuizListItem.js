import React, { Fragment, useContext, useRef, useState, useEffect } from 'react'
import classes from './QuizListItem.css'
import {NavLink} from 'react-router-dom'
import Button from '../../Ui/Button/Button'
import Fav from '../../Ui/Fav/Fav'
import { AuthContext }  from '../../../context/auth/authContext'
import { QuizContext } from '../../../context/quiz/quizContext'

const QuizListItem = ({ quiz, isAuthenticated, areMine, user, hasFav }) => {

  const { toggleFav } = useContext(AuthContext)
  const { deleteQuiz } = useContext(QuizContext)

  const [removed, setRemoved] = useState(false)

  const ref = useRef(null)

  const timeout = useRef(null)

  const removeQuiz = id => {
    setRemoved(true)
    timeout.current = setTimeout(() => deleteQuiz(id), 5000)
  }

  const recoverQuiz = () => {
    clearTimeout(timeout.current)
    setRemoved(false)
  }

  return (
    <li className={classes.QuizListItem} ref={ref}>
      {
        <NavLink to={removed ? '#' : '/quiz/' + quiz.id}>
          <span className={classes.Title}>{quiz.name}</span>
        </NavLink>
      }

      {
        isAuthenticated &&
        <div>
          {
            !removed
              ?
              <Fragment>
                {
                  areMine &&
                  <Button parentClass={classes.Icon} ariaLabel='Delete quiz' type='icon'
                          onClick={() => removeQuiz(quiz.id)}>
                    <i className='fa fa-trash'/>
                  </Button>
                }

                <Fav
                  parentClass={classes.Icon}
                  onClick={() => toggleFav(quiz.id)}
                  active={user && user.favs ? hasFav(quiz.id) : false}
                />
              </Fragment>
              : <Fragment>
                <span>deleting...</span>
                <Button parentClass={classes.Icon} ariaLabel='Delete quiz' type='icon'
                        onClick={() => recoverQuiz(quiz.id)} ariaPressed>
                  <i className='fa fa-undo'/>
                </Button>
              </Fragment>


          }
        </div>

      }
    </li>
  )
}

export default QuizListItem
