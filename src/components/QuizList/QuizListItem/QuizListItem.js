import React, { Fragment, useContext, useRef, useState } from 'react'
import classes from './QuizListItem.css'
import {NavLink} from 'react-router-dom'
import Button from '../../Ui/Button/Button'
import Fav from '../../Ui/Fav/Fav'
import { AuthContext }  from '../../../context/auth/authContext'
import { QuizContext } from '../../../context/quiz/quizContext'

const QuizListItem = ({ quiz, isAuthenticated, areMine, user, hasFav }) => {

  const { toggleFav } = useContext(AuthContext)
  const { deleteQuiz } = useContext(QuizContext)

  const [removed, setRemoved] = useState([])

  const timeout = useRef(null)

  const removeQuiz = id => {
    setRemoved(prev => [...prev, id])
    timeout.current = setTimeout(() => deleteQuiz(id), 5000)
  }

  const recoverQuiz = id => {
    clearTimeout(timeout.current)
    const newRemoved = removed.filter(i => i !== id)
    setRemoved(newRemoved)
  }

  return (
    <li className={classes.QuizListItem}>
      {
          <NavLink to={removed.includes(quiz.id) ? '#' : '/quiz/' + quiz.id}>
            <span className={classes.QuizListItemName}>{quiz.name}</span>
          </NavLink>
      }

      {
        isAuthenticated &&
        <div>
          {
            !removed.includes(quiz.id)
              ?
              <Fragment>
                {
                  areMine &&
                  <Button parentClass={classes.QuizListItemIcon} ariaLabel='Delete quiz' type='icon'
                          onClick={() => removeQuiz(quiz.id)}>
                    <i className='fa fa-trash'/>
                  </Button>
                }

                <Fav
                  parentClass={classes.QuizListItemIcon}
                  onClick={() => toggleFav(quiz.id)}
                  active={user && user.favs ? hasFav(quiz.id) : false}
                />
              </Fragment>
              : <Fragment>
                <span>deleting...</span>
                <Button parentClass={classes.QuizListItemIcon} ariaLabel='Delete quiz' type='icon'
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
