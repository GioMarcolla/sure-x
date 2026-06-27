'use client';

import {
    FC,
    FormHTMLAttributes,
    SubmitEvent,
    ReactElement,
    useState,
    isValidElement,
    cloneElement,
} from 'react';
import SureInput from '@/components/ui/SureInput';
import SureButton from '@/components/ui/SureButton';
import { cn } from '@/lib/tailwind.utils';
import SureNestedInputs from './ui/SureNestedInputs';
import { Loader } from 'lucide-react';

const STATUS = {
    IDLE: 'idle',
    LOADING: 'loading',
    SUCCESS: 'success',
    ERROR: 'error',
} as const;

type BTN_POSITION = 'top' | 'right' | 'bottom' | 'left';

const POSITION_MAP: Record<'SELF' | 'FLEX', Record<BTN_POSITION, string>> = {
    SELF: {
        bottom: 'self-end',
        top: 'self-end',
        left: 'self-start',
        right: 'self-start',
    },
    FLEX: {
        bottom: 'flex-col',
        top: 'flex-col-reversed',
        left: 'flex-row-reversed',
        right: 'flex-row',
    },
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
    btnsPosition?: BTN_POSITION;
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
                    POSITION_MAP.FLEX[btnsPosition],
                    className
                )}
            >
                <div
                    className={cn(
                        'flex w-full flex-col gap-2',
                        inlineFields ? 'gap-4' : '',
                        inlineFields ? 'lg:flex-row' : ''
                    )}
                >
                    {...inputs}
                </div>

                <div
                    className={cn(
                        `flex-${stackBtns ? 'col' : 'row'}`,
                        stackBtns ? 'w-full' : 'w-fit',
                        POSITION_MAP.SELF[btnsPosition],
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
