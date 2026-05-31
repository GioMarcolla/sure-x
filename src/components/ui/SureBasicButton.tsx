import { FC, HTMLAttributes, ReactElement } from 'react';

type SureBasicButtonProps = HTMLAttributes<HTMLButtonElement> & {};

const SureBasicButton: FC<SureBasicButtonProps> = (props): ReactElement => {
    return <button {...props}>{props.children}</button>;
};

SureBasicButton.displayName = 'SureBasicButton';

export default SureBasicButton;
