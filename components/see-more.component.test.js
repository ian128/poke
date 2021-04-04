import {mount} from 'enzyme'
import SeeMore from "./see-more.component";

describe('SeeMoreComponent',()=>{
    const wrapper = mount(<SeeMore minHeight="320pt">Lorem Ipsum</SeeMore>)
    it('renders correctly', () => {
        expect(wrapper.find('.content').hostNodes().text()).toBe("Lorem Ipsum");
    })

    it('clicks see more',()=>{
        let btn = wrapper.find(".toggle-button").hostNodes()
        btn.find('a').simulate('click')
     
        expect(btn.prop("expand")).toBeTruthy()
        expect(btn.text()).toBe('See Less')
    })
    
})