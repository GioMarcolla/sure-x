import { useState, useEffect } from 'react';

const usePrefersReducedMotion = () => {
    const [reduced, setReduced] = useState(false);

    useEffect(() => {
        const mql = window.matchMedia('(prefers-reduced-motion: reduce)');
        setReduced(mql.matches);

        const handler = (err: MediaQueryListEvent) => setReduced(err.matches);
        mql.addEventListener('change', handler);
        return () => mql.removeEventListener('change', handler);
    }, []);

    return reduced;
};

export default usePrefersReducedMotion;
