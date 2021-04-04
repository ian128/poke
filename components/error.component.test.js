import { ErrorComponent } from './error.component';
import {mount} from 'enzyme'

describe('ErrorComponent',()=>{
    it('renders correctly', () => {
        const wrapper = mount(<ErrorComponent title="Test" message="test"></ErrorComponent>)
        expect(wrapper.find('.title').hostNodes().text()).toBe("Test");
        expect(wrapper.find('.message').hostNodes().text()).toBe("test");
    })
})