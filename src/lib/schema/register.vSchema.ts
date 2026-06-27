import * as v from 'valibot';
import emailRule from '@/lib/validator/email.vRule';
import passwordRule from '@/lib/validator/password.vRule';
import usernameRule from '../validator/username.vRule';

const registerSchema = v.pipe(
    v.object({
        username: usernameRule,
        email: emailRule,
        password: passwordRule,
        passwordConfirm: passwordRule,
    }),
    v.check(
        (input) => input.password === input.passwordConfirm,
        'Passwords must match'
    )
);

export default registerSchema;
