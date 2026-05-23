'use client';

import { FC, HTMLAttributes, ReactElement } from 'react';

type SureRegisterFormProps = HTMLAttributes<HTMLElement> & {
    onSuccess?: () => void;
};

const SureRegisterForm: FC<SureRegisterFormProps> = ({
    onSuccess,
}): ReactElement => {
    return <div></div>;
};

SureRegisterForm.displayName = 'SureRegisterForm';

export default SureRegisterForm;
