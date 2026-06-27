import * as v from 'valibot';

const nameRule = v.pipe(v.string(), v.minLength(1, 'Name is required'));

export default nameRule;
