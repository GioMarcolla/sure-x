import { FC, HTMLAttributes, ReactElement } from 'react';

type SureBasicButtonProps = HTMLAttributes<HTMLButtonElement> & {};

const SureBasicButton: FC<SureBasicButtonProps> = ({
    children,
    ...props
}): ReactElement => {
    return <button {...props}>{children}</button>;
};

SureBasicButton.displayName = 'SureBasicButton';

export default SureBasicButton;
