import React from 'react';
import logo from './logo.svg';
import './App.css';
import Head from './components/head';
import Header from './components/header'
import Footer from './components/footer'
import Category from './components/category'

function App() {
  return (
<div>
  <Head />
  <body>
     <Header />
    <div class="container">
        <main role="main" class="pb-3">
            <div class="text-center">
                <h1 class="display-3">ForumSystem</h1>

                <a asp-controller="Posts" asp-action="Create" class="btn btn-primary btn-lg">Create new forum post</a>
            </div>
            <hr />
            <div class="row">
                <Category />                              
            </div>

        </main>
    </div>
    <Footer />
  </body>
</div>
  );
}

export default App;
