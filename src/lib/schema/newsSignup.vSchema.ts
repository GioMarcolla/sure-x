import * as v from 'valibot';
import emailRule from '@/lib/validator/email.vRule';
import nameRule from '@/lib/validator/name.vRule';

const newsSignupSchema = v.object({
    email: emailRule,
    name: nameRule,
});

export default newsSignupSchema;
