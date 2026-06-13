'use client';

import { UserType, useUserStore } from '@/store/user.store';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
    FC,
    HTMLAttributes,
    ReactElement,
    useEffect,
    useRef,
    useState,
} from 'react';
import SureBasicButton from '@/components/ui/SureBasicButton';
import SureAvatar from '@/components/ui/SureAvatar';
import { cn } from '@/lib/tailwind.utils';
import SureBasicCard from '@/components/ui/SureBasicCard';

type SureUserMenuProps = HTMLAttributes<HTMLElement> & {
    user: UserType;
};

const SureUserAvatarWithMenu: FC<SureUserMenuProps> = ({
    user,
    className,
    ...props
}): ReactElement => {
    const router = useRouter();

    const [open, setOpen] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handler = (e: MouseEvent) => {
            if (!ref.current?.contains(e.target as Node)) {
                setOpen(false);
            }
        };
        document.addEventListener('mousedown', handler);
        return () => document.removeEventListener('mousedown', handler);
    }, []);

    const handleLogout = async (ev: React.MouseEvent) => {
        ev.preventDefault();
        const res = await fetch('/api/auth/logout', { method: 'POST' });
        if (res.ok) {
            router.push('/');
            return useUserStore.getState().clearUser();
        }
    };

    return (
        <div
            ref={ref}
            className={cn('relative inline-block', className)}
            {...props}
        >
            <SureBasicButton
                onClick={() => setOpen((o) => !o)}
                className="focus:ring-accent rounded-full focus:ring-2 focus:outline-none"
                aria-haspopup="menu"
                aria-expanded={open}
            >
                <SureAvatar avatar={user.avatar} className="h-10! w-10!" />
            </SureBasicButton>
            {open && (
                <SureBasicCard
                    className="absolute right-0 z-999 mt-2 w-48 rounded-xl bg-(--bg-strong) p-0"
                    role="menu"
                >
                    <div className="absolute -top-1.75 right-3.5 h-3 w-3 rotate-45 border border-(--border-color) border-r-transparent! border-b-transparent! bg-(--bg-strong)"></div>
                    <div className="border-b border-(--border-color) px-4 py-3 text-sm text-(--ink)">
                        <p>Signed in as:</p>
                        <p className="ml-2 font-semibold">
                            {user.firstName} {user.lastName}
                        </p>
                    </div>

                    <Link className="m-0 w-full p-0" href="/haze-map">
                        <div className="border-b border-(--border-color) px-4 py-3 text-sm text-(--ink) hover:bg-(--bg-strong) hover:brightness-95">
                            My Haze Map
                        </div>
                    </Link>

                    <SureBasicButton
                        className="w-full rounded-b-xl px-4 py-3 text-left text-sm text-red-600 hover:bg-(--bg-strong) hover:brightness-95"
                        onClick={handleLogout}
                    >
                        Logout
                    </SureBasicButton>
                </SureBasicCard>
            )}
        </div>
    );
};

SureUserAvatarWithMenu.displayName = 'SureUserAvatarWithMenu';

export default SureUserAvatarWithMenu;
