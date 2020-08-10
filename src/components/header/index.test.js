import React from 'react'
import renderer from 'react-test-renderer'
import Header from '.'
import TestingEnvironment from '../../test-utils/router'

describe('Header', ()=>{
    it('should render routes for logged in user', () =>{
        const tree = renderer.create(
            <TestingEnvironment value={{
                user:{
                    email: "test"
                },
                loggedIn: true
            }}>
                <Header/>
            </TestingEnvironment>
        ).toJSON()
        expect(tree).toMatchSnapshot()
    })
    it('should render routes for not logged in user', () =>{
        const tree = renderer.create(
            <TestingEnvironment value={{
                user:null,
                loggedIn: false
            }}>
                <Header/>
            </TestingEnvironment>
        ).toJSON()
        expect(tree).toMatchSnapshot()
    })
})