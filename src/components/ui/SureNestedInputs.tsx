import { FC, HTMLAttributes, ReactElement } from 'react';
import SureInput from '@/components/ui/SureInput';
import { cn } from '@/lib/tailwind.utils';

type SureNestedInputsProps = HTMLAttributes<HTMLDivElement> & {
    children: ReactElement<typeof SureInput>[];
};

const SureNestedInputs: FC<SureNestedInputsProps> = ({
    children,
    className,
    ...props
}): ReactElement => {
    return (
        <div
            className={cn(
                'flex w-full flex-col gap-4',
                'md:flex-row',
                className
            )}
            {...props}
        >
            {children}
        </div>
    );
};

SureNestedInputs.displayName = 'SureNestedInputs';

export default SureNestedInputs;
