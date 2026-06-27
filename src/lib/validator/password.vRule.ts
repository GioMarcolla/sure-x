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
        const hasNumericSequence = /0123|1234|2345|3456|4567|5678|6789|7890/.test(
            value
        );
        const hasLowerSequence =
            /abcd|bcde|cdef|defg|efgh|fghi|ghij|hijk|ijkl|jklm|klmn|lmno|mnop|nopq|opqr|pqrs|qrst|rstu|stuv|tuvw|uvwx|vwxy|wxyz/.test(
                value
            );
        const hasUpperSequence =
            /ABCD|BCDE|CDEF|DEFG|EFGH|FGHI|GHIJ|HIJK|IJKL|JKLM|KLMN|LMNO|MNOP|NOPQ|OPQR|PQRS|QRST|RSTU|STUV|TUVW|UVWX|VWXY|WXYZ/.test(
                value
            );

        if (hasNumericSequence || hasLowerSequence || hasUpperSequence) {
            return false;
        }
        return true;
    }, 'Cannot contain sequences longer than 3 characters (e.g., 1234, abcd, ABCD)')
);

export default passwordRule;
