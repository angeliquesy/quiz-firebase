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

  useEffect(() => {
    window.addEventListener('beforeunload', cleanRemoved);

    return () => {
      cleanRemoved()
      window.removeEventListener('beforeunload', cleanRemoved);
    }
  }, [])

  const [removed, setRemoved] = useState(false)

  const ref = useRef(null)

  const timeout = useRef(null)

  const cls = [classes.QuizListItem]
  if (removed) cls.push(classes.removed)

  const removeQuiz = id => {
    setRemoved(true)
    timeout.current = true
  }

  const cleanRemoved = () => {
    if (timeout.current) {
      deleteQuiz(quiz.id)
    }
  }



  const recoverQuiz = () => {
    //clearTimeout(timeout.current)
    setRemoved(false)
    timeout.current = false
  }

  return (
    <li className={cls.join(' ')} ref={ref}>
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
                <span>deleted</span>
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
