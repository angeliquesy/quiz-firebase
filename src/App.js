import React, { useContext, useEffect } from 'react'
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom'
import Layout from './hoc/Layout/Layout'
import Quiz from './containers/Quiz/Quiz'
import Home from './containers/Home/Home'
import About from './containers/About/About'
import Auth from './containers/Auth/Auth'
import QuizCreator from './containers/QuizCreator/QuizCreator'
import Logout from './components/Logout/Logout'
import { AuthContext } from './context/auth/authContext'
import { QuizState } from './context/quiz/QuizState'
import { CreateState } from './context/create/CreateState'

function App() {
  const { autoLogin, isAuthenticated } = useContext(AuthContext)

  useEffect(() => {
    autoLogin()
  }, [])

  let routes = (
    <Switch>
      <Route path='/auth' component={Auth}/>
      <Route path='/quiz/:id' component={Quiz}/>
      <Route path='/about' component={About}/>
      <Route path='/' component={Home} exact/>
      <Redirect to='/'/>
    </Switch>
  )

  if (isAuthenticated) {
    routes = (
      <Switch>
        <Route path='/quiz-creator' component={QuizCreator}/>
        <Route path='/quiz/:id' component={Quiz}/>
        <Route path='/logout' component={Logout}/>
        <Route path='/about' component={About}/>
        <Route path='/' component={Home} exact/>
        <Redirect to='/'/>
      </Switch>
    )
  }

  return (
    <CreateState>
    <QuizState>
      <BrowserRouter>
        <Layout>
          {routes}
        </Layout>
      </BrowserRouter>
    </QuizState>
    </CreateState>
  );
}

export default App
