'use client';

import { usePathname } from 'next/navigation';
import NavigationStyle1 from './Style-1/Navigation';
import NavigationStyle2 from './Style-2/Navigation';

// Configuration: Map routes to navigation styles
const navigationConfig: Record<string, 'style-1' | 'style-2'> = {
    '/': 'style-1',
};

export default function NavigationWrapper() {
    const pathname = usePathname();
    
    // Don't show navigation on admin pages
    if (pathname.startsWith('/admin')) {
        return null;
    }
    
    const navStyle = navigationConfig[pathname] || 'style-1';
    
    if (navStyle === 'style-2') {
        return <NavigationStyle2 />;
    }
    
    return <NavigationStyle1 />;
}

