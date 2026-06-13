import { useState, useEffect } from 'react';

const usePrefersReducedMotion = () => {
    const getInitial = () =>
        typeof window !== 'undefined' &&
        window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const [reduced, setReduced] = useState<boolean>(getInitial);

    useEffect(() => {
        if (typeof window === 'undefined') return;

        const mql = window.matchMedia('(prefers-reduced-motion: reduce)');
        const handler = (event: MediaQueryListEvent) =>
            setReduced(event.matches);

        mql.addEventListener('change', handler);
        return () => mql.removeEventListener('change', handler);
    }, []);

    return reduced;
};

export default usePrefersReducedMotion;
