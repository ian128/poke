import { ErrorComponent } from './error.component';
import {mount} from 'enzyme'
import Footer from './footer.component';

describe('FooterComponent',()=>{
    it('renders correctly', () => {
        const wrapper = mount(<Footer title="Test" message="test"><h3>Test123</h3></Footer>)
        expect(wrapper.find('.content').hostNodes().find('h3').text()).toBe("Test123");
    })
})