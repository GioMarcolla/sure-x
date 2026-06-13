import { useState, useEffect } from 'react'

const useIsMobile = () => {
    const getInitial = () =>
        typeof window !== 'undefined' &&
        window.matchMedia('(hover: none) and (pointer: coarse)').matches

    const [isMobile, setIsMobile] = useState<boolean>(getInitial)

    useEffect(() => {
        if (typeof window === 'undefined') return

        const mql = window.matchMedia('(hover: none) and (pointer: coarse)')
        const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches)

        mql.addEventListener('change', handler)
        return () => mql.removeEventListener('change', handler)
    }, [])

    return isMobile
}

export default useIsMobile
