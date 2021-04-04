import {mount} from 'enzyme'
import Header from './header.component';

describe('FooterComponent',()=>{
    it('renders correctly', () => {
        const wrapper = mount(<Header name="Arrow123"></Header>)
        expect(wrapper.find('.title-content').hostNodes().text()).toBe("Arrow123");
    })
})