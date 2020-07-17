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
import Register from './pages/RegisterPage'
import RegisterPage from './pages/RegisterPage'


const Navigation = () => {
    return(
        <Fragment>
            <Head />
            <BrowserRouter>
                <Switch>
                    <Route  path="/Category/:categoryId" component = { PostsByCategoryPage } />
                    <Route exact path="/" component = { HomePage } />
                    <Route path="/Comments/:postId" component = { PostCommentsPage } />
                    <Route path="/Register" component = { RegisterPage } />
                </Switch>
            </BrowserRouter>
        </Fragment>
    )
}

export default Navigation