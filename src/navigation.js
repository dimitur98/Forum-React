import React, { Fragment, Component } from 'react'
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
import CreateCategoryPage from './pages/CreateCategoryPage'
import UserContext from './Context'



class Navigation extends Component {

    static contextType = UserContext

    render(){
    const { loggedIn } = this.context 

        return(
            <Fragment>
                <Head />
                <BrowserRouter>
                    <Switch>
                        <Route  path="/postsByCategory/:categoryId/:categoryName" component = { PostsByCategoryPage } />
                        <Route exact path="/" component = { HomePage } />
                        <Route path="/PostComments/:postId" component = { PostCommentsPage } />
                        <Route path="/Register" component = { RegisterPage } />
                        <Route path="/CreateCategory" component = { CreateCategoryPage } />
                        {!loggedIn ? <Route path="/Login" component = { LoginPage } /> : <div>already registerd</div>}
                    </Switch>
                </BrowserRouter>
            </Fragment>
        )
    }
}

export default Navigation