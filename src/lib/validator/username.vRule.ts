import * as v from 'valibot';

const usernameRule = v.pipe(v.string(), v.minLength(1, 'Username is required'));

export default usernameRule;
