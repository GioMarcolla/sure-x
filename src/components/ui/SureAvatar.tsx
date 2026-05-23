'use client';

import { AvatarType } from '@/store/user.store';
import Image from 'next/image';
import { FC, useEffect, useRef, useState } from 'react';

const CACHE_KEY = 'sureplay-avatar-url-cache';
const memoryCache = new Map<string, { url: string; expiresAt: number }>();

type SureAvatarProps = {
    avatar: AvatarType | null;
    className?: string;
};

const SureAvatar: FC<SureAvatarProps> = ({ avatar, className = '' }) => {
    const [signedUrl, setSignedUrl] = useState<string | null>(null);
    const imageId = avatar?.id ?? null;
    const mountedRef = useRef(true);

    // Resolve URL from memory cache on render (synchronous)
    const cachedUrl = imageId ? getCachedUrl(imageId) : null;
    const url = signedUrl ?? cachedUrl;

    useEffect(() => {
        if (!imageId || cachedUrl) return;

        const fetchUrl = async () => {
            try {
                const res = await fetch(`/api/images/${imageId}/signed`);
                if (!res.ok) return;

                const data = (await res.json()) as {
                    url?: string;
                    expiresAt?: number;
                };

                if (!data.url) return;

                const expiresAt =
                    typeof data.expiresAt === 'number'
                        ? data.expiresAt
                        : Date.now() + 55 * 60 * 1000;

                setCachedUrl(imageId, { url: data.url, expiresAt });

                if (mountedRef.current) {
                    setSignedUrl(data.url);
                }
            } catch {
                console.warn(`Failed to fetch signed URL for image ${imageId}. Using placeholder avatar.`);
            }
        };

        fetchUrl();

        return () => {
            mountedRef.current = false;
        };
    }, [imageId]); // Removed cachedUrl

    if (!url) {
        return (
            <svg
                width={avatar?.width ?? 300}
                height={avatar?.height ?? 300}
                viewBox="0 0 24 24"
                fill="gray"
                className={`h-24 w-24 rounded-full bg-gray-200 ${className}`}
                aria-label="Empty user avatar"
            >
                <circle cx="12" cy="8" r="4" fill="#ccc" />
                <path
                    d="M12 14c-5 0-8 2.5-8 5v1h16v-1c0-2.5-3-5-8-5z"
                    fill="#ccc"
                />
            </svg>
        );
    }

    return (
        <Image
            src={url}
            alt={avatar?.alt || 'User avatar'}
            className={`h-24 w-24 rounded-full border-2 border-(--border-color) object-contain ${className}`}
            width={avatar?.width ?? 300}
            height={avatar?.height ?? 300}
            loading="lazy"
            fetchPriority="high"
        />
    );
};

SureAvatar.displayName = 'SureAvatar';

export default SureAvatar;

/* ------------------------------------------------------------------ */
/* Cache helpers                                                      */
/* ------------------------------------------------------------------ */

function getCachedUrl(imageId: string): string | null {
    const now = Date.now();

    // 1. Memory
    const mem = memoryCache.get(imageId);
    if (mem && mem.expiresAt > now) return mem.url;

    // 2. localStorage (guarded)
    if (typeof window === 'undefined') return null;

    try {
        const raw = window.localStorage.getItem(CACHE_KEY);
        if (!raw) return null;

        const store = JSON.parse(raw) as Record<
            string,
            { url: string; expiresAt: number } | undefined
        >;

        const entry = store[imageId];
        if (!entry || entry.expiresAt <= now) {
            delete store[imageId];
            window.localStorage.setItem(CACHE_KEY, JSON.stringify(store));
            return null;
        }

        memoryCache.set(imageId, entry);
        return entry.url;
    } catch {
        return null;
    }
}

function setCachedUrl(
    imageId: string,
    entry: { url: string; expiresAt: number }
): void {
    memoryCache.set(imageId, entry);
    if (typeof window === 'undefined') return;

    try {
        const raw = window.localStorage.getItem(CACHE_KEY);
        const store = raw
            ? (JSON.parse(raw) as Record<
                  string,
                  { url: string; expiresAt: number }
              >)
            : {};

        store[imageId] = entry;
        window.localStorage.setItem(CACHE_KEY, JSON.stringify(store));
    } catch {
        // Ignore quota exceeded or private mode
    }
}
