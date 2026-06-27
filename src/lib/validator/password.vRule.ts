import * as v from 'valibot';

const passwordRule = v.pipe(
    v.string('Password must be a string'),
    v.minLength(8, 'Password must be at least 8 characters'),
    v.regex(/[0-9]/, 'Must contain at least 1 number'),
    v.regex(/[A-Z]/, 'Must contain at least 1 uppercase letter'),
    v.regex(/[a-z]/, 'Must contain at least 1 lowercase letter'),
    v.regex(/[^a-zA-Z0-9]/, 'Must contain at least 1 symbol'),
    v.custom((value: unknown) => {
        if (typeof value !== 'string') return false;

        // Check for sequences longer than 3 (e.g., 1234, abcd, ABCD)
        const hasNumericSequence = /012|123|234|345|456|567|678|789|890/.test(
            value
        );
        const hasLowerSequence =
            /abc|bcd|cde|def|efg|fgh|ghi|hij|ijk|jkl|klm|lmn|mno|nop|opq|pqr|qrs|rst|stu|tuv|uvw|vwx|wxy|xyz/.test(
                value
            );
        const hasUpperSequence =
            /ABC|BCD|CDE|DEF|EFG|FGH|GHI|HIJ|IJK|JKL|KLM|LMN|MNO|NOP|OPQ|PQR|QRS|RST|STU|TUV|UVW|VWX|WXY|XYZ/.test(
                value
            );

        if (hasNumericSequence || hasLowerSequence || hasUpperSequence) {
            return false;
        }
        return true;
    }, 'Cannot contain sequences longer than 3 characters (e.g., 1234, abcd, ABCD)')
);

export default passwordRule;
