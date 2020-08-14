//  import React from 'react'
//  import {BrowserRouter} from 'react-router-dom'
//  import Enzyme, { mount } from 'enzyme';
//  import renderer from 'react-test-renderer'
//  import AccountPage from '.'
// import TestingEnvironment from '../../test-utils/router'
//  import {shallow} from 'enzyme';
//  import Adapter from 'enzyme-adapter-react-16';
//  import UserContext from '../../Context'
 
//  Enzyme.configure({ adapter: new Adapter() });

//  describe('Account page tests', ()=>{
//      it('Should get posts by userId from context(admin)', async() => {
//          var user = {id: '5f311a985ef6df3a1884233b'}
//          const wrapper = shallow(
//          <UserContext.Provider value ={{user: {id: '5f311a985ef6df3a1884233b'}}}>
//              <AccountPage /> 
//          </UserContext.Provider>);
//          const instance = wrapper.find(AccountPage).dive().instance();
//          console.log(wrapper.find(AccountPage).dive().context())
//          await instance.getPosts()
//          console.log(wrapper.state('posts').length)
//          console.log(wrapper.state('noPosts'))
//      })
// })