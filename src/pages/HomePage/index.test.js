import React from 'react'
import Enzyme from 'enzyme';
import renderer from 'react-test-renderer'
import HomePage from '.'
import TestingEnvironment from '../../test-utils/router'
import {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
 
Enzyme.configure({ adapter: new Adapter() });
jest.mock('../../components/pageWrapper', ()=>'pageWrapper')

describe('Home page', ()=>{
    it("should show button 'Add category' only for admins", () =>{
        const tree = renderer.create(
            <TestingEnvironment value={{
                user:{
                    email: "test",
                    role:'admin'
                },
                loggedIn: true
            }}>
                <HomePage/>
            </TestingEnvironment>
        ).toJSON()
        expect(tree).toMatchSnapshot()
    })
    it("should not show button 'Add category'", () =>{
        const tree = renderer.create(
            <TestingEnvironment value={{
                user:null,
                loggedIn: false
            }}>
                <HomePage/>
            </TestingEnvironment>
        ).toJSON()
        expect(tree).toMatchSnapshot()
    })
    it("should get categories",async()=>{
        const wrapper = shallow(<HomePage />);
        const instance = wrapper.instance();
        await instance.getAllNotDeletedCategories()
        expect(wrapper.state('categories').length).toBeGreaterThan(0);
    })
})