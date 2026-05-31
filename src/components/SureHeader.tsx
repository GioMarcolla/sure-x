import { FC, HTMLAttributes, ReactElement } from 'react';
import SureNavbar from './SureNavbar';

type SureHeaderProps = HTMLAttributes<HTMLElement> & {};

const SureHeader: FC<SureHeaderProps> = (): ReactElement => {
    return (
        <header className="flex w-full items-center justify-between border-b border-(--border-color-strong) px-[5%] backdrop-blur-lg">
            <SureNavbar />
        </header>
    );
};

export default SureHeader;
