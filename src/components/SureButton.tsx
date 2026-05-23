import { ButtonHTMLAttributes, FC, HTMLAttributes, ReactElement } from 'react';
import SureBasicButton from '@/components/ui/SureBasicButton';
import { cn } from '@/lib/tailwind.utils';

type SureButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
    variant?:
        | 'default'
        | 'destructive'
        | 'outline'
        | 'secondary'
        | 'ghost'
        | 'link';
    size?: 'default' | 'sm' | 'lg' | 'icon';
};

const SureButton: FC<SureButtonProps> = ({
    className,
    variant = 'default',
    size = 'default',
    children,
    ...props
}): ReactElement => {
    return (
        <SureBasicButton
            className={cn(
                'focus-visible:ring-ring ring-offset-background inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50',
                {
                    'bg-primary text-primary-foreground hover:bg-primary/90':
                        variant === 'default',
                    'bg-destructive text-destructive-foreground hover:bg-destructive/90':
                        variant === 'destructive',
                    'border-input hover:bg-accent hover:text-accent-foreground border':
                        variant === 'outline',
                    'bg-secondary text-secondary-foreground hover:bg-secondary/80':
                        variant === 'secondary',
                    'hover:bg-accent hover:text-accent-foreground':
                        variant === 'ghost',
                    'text-primary underline-offset-4 hover:underline':
                        variant === 'link',
                },
                {
                    'h-10 px-4 py-2': size === 'default',
                    'h-9 rounded-md px-3': size === 'sm',
                    'h-11 rounded-md px-8': size === 'lg',
                    'h-10 w-10': size === 'icon',
                },
                className
            )}
            {...props}
        >
            {children}
        </SureBasicButton>
    );
};

SureButton.displayName = 'SureButton';

export default SureButton;
