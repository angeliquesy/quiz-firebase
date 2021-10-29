import React, {useContext, useEffect} from 'react'
import {useParams} from 'react-router-dom'
import classes from './Quiz.css'
import ActiveQuiz from "../../components/ActiveQuiz/ActiveQuiz";
import FinishedQuiz from "../../components/FinishedQuiz/FinishedQuiz";
// import axios from '../../axios/axios-quiz'
import Loader from '../../components/Ui/Loader/Loader'
import {QuizContext} from '../../context/quiz/quizContext'

//import {fetchQuizById, quizAnswerClick, retryQuiz} from '../../store/actions/quiz'

function Quiz() {
  const {fetchQuizById, retryQuiz, quizAnswerClick, state} = useContext(QuizContext)

  const {
    loading,
    quiz,
    isFinished,
    results,
    activeQuestion,
    answerState,
  } = state

  const {id} = useParams()

  useEffect(() => {
    fetchQuizById(id)

    return () => retryQuiz()
  }, [])

  return (
    <div className={classes.Quiz}>
      <div className={classes.QuizWrapper}>
        <h1>Ответьте на все вопросы</h1>
        {
          loading || !quiz
            ? <Loader/>
            : isFinished
              ? <FinishedQuiz
                results={results}
                quiz={quiz}
                onRetry={retryQuiz}
              />
              : <ActiveQuiz
                question={quiz.questions[activeQuestion].question}
                answers={quiz.questions[activeQuestion].answers}
                onAnswerClick={quizAnswerClick}
                quizLength={quiz.questions.length}
                answerNumber={activeQuestion + 1}
                state={answerState}
            />
        }
      </div>
    </div>
  )
}

export default Quiz

