'use client';

import { FC, HTMLAttributes, ReactElement } from 'react';

type SureLoginFormProps = HTMLAttributes<HTMLElement> & {
    onSuccess?: () => void;
};

const SureLoginForm: FC<SureLoginFormProps> = ({ onSuccess }): ReactElement => {
    return <div></div>;
};

SureLoginForm.displayName = 'SureLoginForm';

export default SureLoginForm;
