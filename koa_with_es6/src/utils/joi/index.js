import Joi from 'joi'
import language from './language'
import {BusinessError} from '../error'

export const validate = (data, schema) => {
    const options = {
        language
    }

    const result = Joi.validate(data, schema, options)
    const error = result.error
    if (!error) {
        return result.value
    } else {
        throw new BusinessError(result.error.details[0].message)
    }
}

export default Joi
