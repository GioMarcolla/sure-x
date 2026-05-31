import { FC, HTMLAttributes, ReactElement } from 'react';
import SureNavbar from './SureNavbar';
import { cn } from '@/lib/tailwind.utils';

type SureHeaderProps = HTMLAttributes<HTMLElement> & {};

const SureHeader: FC<SureHeaderProps> = ({
    className,
    ...props
}): ReactElement => {
    return (
        <header
            className={cn(
                'flex w-full items-center justify-between border-b border-(--border-color-strong) px-[5%] backdrop-blur-lg',
                className
            )}
            {...props}
        >
            <SureNavbar />
        </header>
    );
};

SureHeader.displayName = 'SureHeader';

export default SureHeader;
