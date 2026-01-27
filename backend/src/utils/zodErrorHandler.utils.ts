import { ZodError } from 'zod';
import AppError from '@/utils/appError.utils.js';


export const zodErrorHandler = (error: ZodError): AppError => {
    const errors = error.issues.map((err) => ({
        field: err.path.join("."),
        message: err.message,
    }));

    return AppError.badRequest('Validation failed', errors);

};
/*example use:
validate with zod:
const result = schema.safeParse(req.body); // we are using safeParse because more control as it returns result object with properties related to the result like success: true, or success:false etc..
if (!result.success) {
    throw zodErrorHandler(result.error); , passing the error object and it will return an AppError object 

}

*/

export default zodErrorHandler;