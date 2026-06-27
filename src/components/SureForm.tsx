'use client';

import {
    FC,
    FormHTMLAttributes,
    SubmitEvent,
    ReactElement,
    useState,
    isValidElement,
    cloneElement,
    Children,
    useEffect,
} from 'react';
import SureInput, { SureInputProps } from '@/components/ui/SureInput';
import SureButton from '@/components/ui/SureButton';
import { cn } from '@/lib/tailwind.utils';
import SureNestedInputs from './ui/SureNestedInputs';
import { TypeOf } from 'better-auth';
import { Loader } from 'lucide-react';
import { ObjectSchema } from 'valibot';

const STATUS = {
    IDLE: 'idle',
    LOADING: 'loading',
    SUCCESS: 'success',
    ERROR: 'error',
} as const;

type StatusType = (typeof STATUS)[keyof typeof STATUS];

type SubmitResultType = { ok: true } | { ok: false; error: string };

type SureFormFieldsType = (
    | ReactElement<any, typeof SureInput>
    | ReactElement<any, typeof SureNestedInputs>
)[];

type SureFormProps = FormHTMLAttributes<HTMLFormElement> & {
    id: string;
    inputs: SureFormFieldsType;
    submitBtn: ReactElement<any, typeof SureButton>;
    cancelBtn?: ReactElement<any, typeof SureButton>;
    stackBtns?: boolean;
    btnsPosition?: 'top' | 'right' | 'bottom' | 'left';
    inlineFields?: boolean;
    submitHandler: () => Promise<SubmitResultType>;
};

const SureForm: FC<SureFormProps> = ({
    id,
    submitHandler,
    inputs,
    className,
    submitBtn,
    cancelBtn = undefined,
    stackBtns = false,
    btnsPosition = 'bottom',
    inlineFields = false,
    ...props
}): ReactElement => {
    const [error, setError] = useState<string | undefined>();
    const [status, setStatus] = useState<StatusType>(STATUS.IDLE);

    const handleSubmit = async (
        event: SubmitEvent<HTMLFormElement>
    ): Promise<void> => {
        event.preventDefault();
        setStatus(STATUS.LOADING);

        const result: SubmitResultType = await submitHandler();

        if (result.ok) {
            setError(undefined);
            setStatus(STATUS.SUCCESS);
        } else {
            if (result.error) {
                setError(result.error);
            } else {
                setError('Unkown error happened while submitting');
            }

            setStatus(STATUS.ERROR);
        }
    };

    return (
        <form
            id={id}
            onSubmit={handleSubmit}
            aria-busy={status === STATUS.LOADING}
            aria-disabled={status === STATUS.LOADING}
            aria-errormessage={error}
            className={cn('w-full')}
            {...props}
        >
            <fieldset
                disabled={status === STATUS.LOADING}
                className={cn(
                    'm-auto mt-8 flex w-full flex-col items-baseline justify-center gap-4',
                    inlineFields ?? 'lg:flex-row',
                    className
                )}
            >
                <div
                    className={cn(
                        'flex w-full flex-col gap-2',
                        inlineFields ?? 'gap-4',
                        inlineFields ?? 'lg:flex-row'
                    )}
                >
                    {...inputs}
                </div>

                <div
                    className={cn(
                        `flex-${stackBtns ? 'col' : 'row'}`,
                        stackBtns ? 'w-full' : 'w-fit',
                        btnsPosition === 'bottom' ? 'self-end' : '',
                        'flex flex-wrap'
                    )}
                >
                    {isValidElement(submitBtn) &&
                        cloneElement(submitBtn, {
                            disabled: status === STATUS.LOADING,
                            children:
                                status === STATUS.LOADING ? (
                                    <div className="flex gap-2">
                                        <Loader className="animate-spin" />
                                        Loading...
                                    </div>
                                ) : (
                                    submitBtn.props.children
                                ),
                        })}
                    {cancelBtn}
                </div>
            </fieldset>
            <p
                className={cn(
                    'm-auto w-fit pt-4 text-center text-sm text-(--error)'
                )}
            >
                {status === STATUS.ERROR && error ? error : ''}
            </p>
        </form>
    );
};

SureForm.displayName = 'SureForm';

export default SureForm;
export {
    STATUS,
    type StatusType,
    type SubmitResultType,
    type SureFormFieldsType,
};
