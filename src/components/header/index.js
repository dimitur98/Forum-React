import React from 'react'

const Header = () => {
    return(
        <header>
        <nav class="navbar navbar-expand-sm navbar-light bg-white border-bottom box-shadow mb-3">
            <div class="container">
                <a class="navbar-brand" >Forum</a>
                <button class="navbar-toggler" type="button" data-toggle="collapse" data-target=".navbar-collapse" aria-controls="navbarSupportedContent"
                        aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="navbar-collapse collapse d-sm-inline-flex flex-sm-row-reverse">
                    
                    <ul class="navbar-nav">
                        <li class="nav-item">
                            <a class="nav-link text-dark" >Home</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link text-dark" >Login</a>
                        </li><li class="nav-item">
                            <a class="nav-link text-dark" >Register</a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    </header>
    )
}

export default Header