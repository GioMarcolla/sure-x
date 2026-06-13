import { cn } from '@/lib/tailwind.utils';
import { ButtonHTMLAttributes, FC, ReactElement } from 'react';

type SureBasicButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {};

const SureBasicButton: FC<SureBasicButtonProps> = ({
    children,
    className,
    ...props
}): ReactElement => {
    return (
        <button className={cn('hover:cursor-pointer', className)} {...props}>
            {children}
        </button>
    );
};

SureBasicButton.displayName = 'SureBasicButton';

export default SureBasicButton;
