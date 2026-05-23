import { FC, ButtonHTMLAttributes, ReactElement } from 'react';

type SureBasicButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {};

const SureBasicButton: FC<SureBasicButtonProps> = (props): ReactElement => {
    return <button {...props}>{props.children}</button>;
};

SureBasicButton.displayName = 'SureBasicButton';

export default SureBasicButton;
