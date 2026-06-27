import * as v from 'valibot';
import passwordRule from '@/lib/validator/password.vRule';
import usernameRule from '../validator/username.vRule';

const loginSchema = v.pipe(
    v.object({
        username: usernameRule,
        password: passwordRule,
    })
);

export default loginSchema;
