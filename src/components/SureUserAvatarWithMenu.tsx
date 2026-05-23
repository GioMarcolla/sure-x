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
import SureAvatar from './ui/SureAvatar';

type SureUserMenuProps = HTMLAttributes<HTMLElement> & {
    user: UserType | null;
};

const SureUserAvatarWithMenu: FC<SureUserMenuProps> = ({
    user,
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

    return user ? (
        <div ref={ref} className="relative inline-block">
            <SureBasicButton
                type="button"
                onClick={() => setOpen((o) => !o)}
                className="focus:ring-accent rounded-full focus:ring-2 focus:outline-none"
                aria-haspopup="menu"
                aria-expanded={open}
            >
                <SureAvatar avatar={user.avatar} className="h-12! w-12!" />
            </SureBasicButton>
            {open && (
                <div
                    className="absolute right-0 z-50 mt-2 w-48 overflow-hidden rounded-xl border border-(--card-border) bg-(--card) shadow-lg ring-1 ring-black/5 backdrop-blur-md"
                    role="menu"
                >
                    <div className="border-b border-(--border-color) px-4 py-3 text-sm text-(--ink)">
                        <p>Signed in as {user.firstName}</p>
                    </div>

                    <div className="border-b border-(--border-color) px-4 py-3 text-sm text-(--ink) hover:bg-(--bg-strong)">
                        <Link href="/haze-map">My Haze Map</Link>
                    </div>

                    <div className="px-4 py-3 text-sm text-red-600 hover:bg-(--bg-strong)">
                        <button
                            type="button"
                            className="w-full text-left"
                            onClick={handleLogout}
                        >
                            Logout
                        </button>
                    </div>
                </div>
            )}
        </div>
    ) : (
        <></>
    );
};

SureUserAvatarWithMenu.displayName = 'SureUserAvatarWithMenu';

export default SureUserAvatarWithMenu;
