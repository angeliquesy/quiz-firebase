import React, {Fragment, useContext, useEffect, useState} from 'react'
import classes from './Home.css'
import Loader from '../../components/Ui/Loader/Loader'
import QuizList from '../../components/QuizList/QuizList'
import Button from '../../components/Ui/Button/Button'
import Fav from '../../components/Ui/Fav/Fav'
import { QuizContext } from '../../context/quiz/quizContext'
import { AuthContext } from '../../context/auth/authContext'
import { triviaIds } from '../../constants/triviaIds'

const Home = () => {

  const { isAuthenticated, userId, getUser, user } = useContext(AuthContext)
  const { fetch, state, clearLoading, error } = useContext(QuizContext)
  const { quizzes, loading } = state

  const [sorted, setSorted] = useState(false)
  let myQuizzes = []
  let filteredQuizzes = []

  useEffect(() => {
    fetch()
    getUser()

    return () => {
      clearLoading()
    }
  }, [])

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

  const hasFav = id => {
    return user.favs.some(i => i === id)
  }

  const sortByFavs = arr => {
    return arr.sort(( a, b ) => (hasFav(a.id) === hasFav(b.id)) ? 0 : hasFav(a.id) ? -1 : 1)
  }

  const render = () => {
    if (isAuthenticated) {
      filterQuizzes()
    }
    else {
      filteredQuizzes = quizzes
    }

    filteredQuizzes = filteredQuizzes.filter(quiz => quiz.id !== triviaIds[0] && quiz.id !== triviaIds[1])
    myQuizzes = myQuizzes.filter(quiz => quiz.id !== triviaIds[0] && quiz.id !== triviaIds[1])

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

        {isAuthenticated && user.favs && sorted
          ? <QuizList
              quizzes={sortByFavs(filteredQuizzes)}
              user={user}
              hasFav={hasFav}
              isAuthenticated={true}
            />
          : <QuizList
              quizzes={filteredQuizzes}
              user={user}
              hasFav={hasFav}
              isAuthenticated={isAuthenticated}
            />
        }

        {isAuthenticated &&
          <Fragment>
            <h2 id='my-quizzes'>My quizzes</h2>

            { myQuizzes.length
              ? <QuizList
                  quizzes={myQuizzes}
                  user={user}
                  isAuthenticated={true}
                  hasFav={hasFav}
                  areMine
              />
              : <Button to='/quiz-creator' parentClass={classes.CreateButton} type='success'>Create a quiz</Button>
            }

          </Fragment>
        }
      </Fragment>
    )
  }

  return (
    <div className={classes.Home}>
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
  )
}

export default Home
