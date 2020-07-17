import React, { Fragment } from 'react'
import {
    BrowserRouter,
    Route,
    Switch
} from 'react-router-dom'
import Head from './components/head'
import HomePage from './pages/HomePage'
import PostCommentsPage from './pages/PostCommentsPage'
import PostsByCategoryPage from './pages/PostsByCategoryPage'
import RegisterPage from './pages/RegisterPage'
import LoginPage from './pages/LoginPage'



const Navigation = () => {
    return(
        <Fragment>
            <Head />
            <BrowserRouter>
                <Switch>
                    <Route  path="/Category/:categoryId" component = { PostsByCategoryPage } />
                    <Route exact path="/" component = { HomePage } />
                    <Route path="/PostComments/:postId" component = { PostCommentsPage } />
                    <Route path="/Register" component = { RegisterPage } />
                    <Route path="/Login" component = { LoginPage } />
                </Switch>
            </BrowserRouter>
        </Fragment>
    )
}

export default Navigation