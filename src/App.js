import React, {useContext, useEffect} from 'react';
import Layout from "./hoc/Layout/Layout";
import {BrowserRouter, Redirect, Route, Switch} from 'react-router-dom'
import Quiz from "./containers/Quiz/Quiz";
import QuizList from "./containers/QuizList/QuizList";
import Auth from "./containers/Auth/Auth";
import QuizCreator from "./containers/QuizCreator/QuizCreator";
import Logout from './components/Logout/Logout'
import {AuthContext} from './context/auth/authContext'
import {QuizState} from './context/quiz/quizState'
import {CreateState} from './context/create/CreateState'

function App() {
  const {autoLogin, isAuthenticated} = useContext(AuthContext)

  useEffect(() => {
    autoLogin()
  }, [])

  let routes = (
    <Switch>
      <Route path='/auth' component={Auth}/>
      <Route path='/quiz/:id' component={Quiz}/>
      <Route path='/' component={QuizList}/>
      <Redirect to='/'/>
    </Switch>
  )

  if (isAuthenticated) {
    routes = (
      <CreateState>
        <Switch>
          <Route path='/quiz-creator' component={QuizCreator}/>
          <Route path='/quiz/:id' component={Quiz}/>
          <Route path='/logout' component={Logout}/>
          <Route path='/' component={QuizList} exact/>
          <Redirect to='/'/>
        </Switch>
      </CreateState>
    )
  }

  return (
    <QuizState>
      <BrowserRouter>
        <Layout>
          {routes}
        </Layout>
      </BrowserRouter>
    </QuizState>
  );
}

export default App
