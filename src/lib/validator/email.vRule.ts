import * as v from 'valibot';

const emailRule = v.pipe(v.string(), v.email('Invalid email address'));

export default emailRule;
