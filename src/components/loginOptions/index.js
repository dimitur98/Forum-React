import React from 'react'
import { Link } from 'react-router-dom'

const LoginOptions = () => {
    return(
        <div class="form-group">
            <p>
                <a id="forgot-password">Forgot your password?</a>
            </p>
            <p>
                <Link to='/Register'>Register as a new user</Link>
            </p>
            <p>
                <Link>Resend email confirmation</Link>
            </p>
        </div>
    )
}

export default LoginOptions