import React from 'react'
import Enzyme from 'enzyme';
import PostCommentsPage from '.'
import {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
 
Enzyme.configure({ adapter: new Adapter() });

describe('Post comments page tests',() => {
    it('should get post by id',async()=>{
        const wrapper = shallow(<PostCommentsPage  match={{params: {postId: '5f2fb9ec4dfb66246c67de7a'}}}/>)
        const instance = wrapper.instance()
        await instance.getPostById('5f2fb9ec4dfb66246c67de7a')
        expect(wrapper.state('post')._id).toMatch('5f2fb9ec4dfb66246c67de7a');

    })
    it('should get comments by post id', async() =>{
        const wrapper = shallow(<PostCommentsPage  match={{params: {postId: '5f2fb9ec4dfb66246c67de7a'}}}/>)
        const instance = wrapper.instance()
        await instance.getCommentsByPostId('5f2fb9ec4dfb66246c67de7a')
        expect(wrapper.state('comments').length).toBeGreaterThan(0);
    })
})