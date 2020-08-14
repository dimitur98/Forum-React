import React, { Component } from 'react'
import {withRouter} from 'react-router-dom'
import PageWrapper from '../../components/pageWrapper'
import Aside from '../../components/aside'
import SubmitBtn from '../../components/submitBtn'
import UserContext from '../../Context'
import WarningText from '../../components/dangerText'
import getCookie from '../../utils/cookie'

class ChangePasswordPage extends Component{
    constructor(props){
        super(props)

        this.state ={
            oldPassword: '',
            newPassword: '',
            reNewPassword: '',
            match: false
        }
    }

    static contextType = UserContext

    onChange = (event, type) => {
        const newState = {}
        newState[type] = event.target.value
    
        this.setState(newState)

      }

    handleSubmit = async(event) => {
        event.preventDefault()

        const{
            oldPassword,
            newPassword
        } = this.state
        const {user} = this.context
         fetch(`http://localhost:9999/api/user/ChangePassword/${user.id}` , {
            method: 'PUT',
            body: JSON.stringify({
              oldPassword,
              newPassword
            }),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': getCookie('x-auth-token')
            }
        }).then((c) => {
            this.props.history.push('/Account')
        })
    }

    checkPasswords =() =>{
        const {newPassword, reNewPassword} = this.state
        if(newPassword === reNewPassword && newPassword !== ''){
            this.setState({match:true})
        }else{
            this.setState({match:false})
        }
    }

    render(){
        const {user} = this.context
        const {oldPassword, newPassword, reNewPassword, match} = this.state
        return(
            <PageWrapper title='Change your password - DForum'>
                <div className="container">
                    <Aside/>
                    <form onSubmit={this.handleSubmit}>
                        <div className="form-group row">
                            <label for="staticEmail" className="col-sm-2 col-form-label">Email</label>
                            <div className="col-sm-10">
                                <input type="text" readonly className="form-control-plaintext" id="staticEmail" value={user.email}/>
                            </div>
                        </div>
                        <div className="form-group row">
                            <label for="inputPassword" className="col-sm-2 col-form-label">Old Password</label>
                            <div className="col-sm-10">
                                <input type="password" onChange={(e) => this.onChange(e, 'oldPassword')} value={oldPassword} className="form-control" id="inputPassword" placeholder="Old Password"/>
                            </div>
                        </div>
                        <div className="form-group row">
                            <label for="inputPassword" className="col-sm-2 col-form-label">New Password</label>
                            <div className="col-sm-10">
                                <input type="password" onBlur={this.checkPasswords}  onChange={(e) => this.onChange(e, 'newPassword')} value={newPassword} className="form-control" id="inputPassword" placeholder="New Password"/>
                            </div>
                        </div>
                        <div className="form-group row">
                            <label for="inputPassword" className="col-sm-2 col-form-label">Reapeat New Password</label>
                            <div className="col-sm-10">
                                <input type="password" onBlur={this.checkPasswords}  onChange={(e) => this.onChange(e, 'reNewPassword')} value={reNewPassword} className="form-control" id="inputPassword" placeholder="Reapeat New Password"/>
                                {!match && <WarningText text="Passwords don't match"/>}
                            </div>
                        </div>
                        {match && <SubmitBtn name = "Change"/>}
                    </form>
                </div>
            </PageWrapper>
        )
    }
}

export default withRouter(ChangePasswordPage)