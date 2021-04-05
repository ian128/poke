import * as _ from 'lodash'

export const convertToStartCase=(str)=>{
    return _.startCase(str || '')
}