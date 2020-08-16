import React, { Fragment, Component } from 'react'
import {
    BrowserRouter,
    Route,
    Switch,
    Redirect
} from 'react-router-dom'
import Head from './components/head'
import HomePage from './pages/HomePage/index'
import PostCommentsPage from './pages/PostCommentsPage/index'
import PostsByCategoryPage from './pages/PostsByCategoryPage/index'
import RegisterPage from './pages/RegisterPage/index'
import LoginPage from './pages/LoginPage/index'
import CreateCategoryPage from './pages/CreateCategoryPage/index'
import CreatePostPage from './pages/CreatePostPage/index'
import AccountPage from './pages/AccountPage/index'
import ChangePasswordPage from './pages/ChangePasswordPage/index'
import ChangeAvatarPage from './pages/ChangeAvatarPage'
import UserContext from './Context'
import PrivacyPage from './pages/PrivacyPage'
import ConfirmationPage from './pages/ConfirmationPage'
import EditPostPage from './pages/EditPostPage'
import ErrorPage from './pages/ErrorPage'



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
                        <Route path="/Register">
                            { loggedIn ? (<Redirect to='/'/>) :(<RegisterPage/>) } 
                        </Route>
                        <Route path="/CreateCategory">
                            { loggedIn ? (<CreateCategoryPage/>) :(<Redirect to='/Login'/>) } 
                        </Route>
                        <Route path="/CreatePost/:categoryId/:authorId">
                            { loggedIn ? (<CreatePostPage/>) :<Redirect to='/Login'/> } 
                        </Route>
                        <Route path="/Login">
                            { loggedIn ? (<Redirect to="/"/>) :(<LoginPage/>) } 
                        </Route>
                        <Route path="/Account">
                            { loggedIn ? (<AccountPage/>) :(<Redirect to='/Login'/>) } 
                        </Route>
                        <Route path="/ChangePassword">
                            { loggedIn ? (<ChangePasswordPage/>) :(<Redirect to='/Login'/>) }
                        </Route>
                        <Route path="/ChangeAvatar" component = { ChangeAvatarPage }>
                            { loggedIn ? (<ChangeAvatarPage/>) :(<Redirect to='/Login'/>) }
                        </Route>
                        <Route path="/EditPost/:postId" component = { EditPostPage }>
                            { loggedIn ? (<EditPostPage/>) :(<Redirect to='/Login'/>) }
                        </Route>
                        <Route path='/Privacy' component={PrivacyPage}/>
                        <Route path='/Confirm/:uuid/:userId' component={ConfirmationPage}/>
                        <Route component={ErrorPage}/>
                    </Switch>
                </BrowserRouter>
            </Fragment>
        )
    }
}

export default Navigation