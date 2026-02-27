const z = require('zod');

// type of date of the user 
const user = z.object({
    id: z.string({ message: 'id invalid!' }).trim().min(1, { message: 'id empty!' }),
    email: z.string({ message: 'email invalid!' }).trim().min(1, { message: 'email empty!' }).email({ message: 'format of email invalid' }),
    name: z.string({ message: 'name invalid!' }).trim().min(1, { message: 'name empty!' }),
});

function validatePartialUser(input) {
    return user.partial().safeParse(input);

}

module.exports = { validatePartialUser }