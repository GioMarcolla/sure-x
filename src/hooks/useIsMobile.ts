import { useState, useEffect } from 'react';

const useIsMobile = () => {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        // Primary check: coarse pointer (touch) and no hover
        const mql = window.matchMedia('(hover: none) and (pointer: coarse)');
        setIsMobile(mql.matches);

        const handler = (err: MediaQueryListEvent) => setIsMobile(err.matches);
        mql.addEventListener('change', handler);
        return () => mql.removeEventListener('change', handler);
    }, []);

    return isMobile;
};

export default useIsMobile;
