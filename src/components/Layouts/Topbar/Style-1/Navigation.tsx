'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect, useRef, startTransition } from 'react';
import { RiArrowDownSLine, RiMenuLine, RiCloseLine, RiPhoneLine } from '@remixicon/react';
import Image from 'next/image';
import ButtonComponent from '../../../../common/Button';
import logo from '../../../../assets/images/logo.png';
import lightLogo from '../../../../assets/images/light-logo.png';

interface NavItem {
    label: string;
    href?: string;
    children?: { label: string; href: string }[];
}

export default function Navigation() {
    const pathname = usePathname();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [openMobileDropdowns, setOpenMobileDropdowns] = useState<Set<string>>(new Set());
    const [isSticky, setIsSticky] = useState(false);
    const prevPathnameRef = useRef(pathname);

    const isActive = (href: string) => {
        if (!href) return false;
        const normalizedPathname = pathname === '/' ? '/' : pathname.replace(/\/$/, '');
        const normalizedHref = href === '/' ? '/' : href.replace(/\/$/, '');
        return normalizedPathname === normalizedHref;
    };

    const hasActiveChild = (item: NavItem) => {
        if (!item.children) return false;
        return item.children.some(child => isActive(child.href));
    };

    const navItems: NavItem[] = [
        {
            label: 'Home',
            href: '/',
        },
        {
            label: 'About Us',
            href: '/about-us',
        },
          {
            label: 'Courses',
            href: '/courses',
            
        },
          {
            label: 'Blog',
            href: 'https://prepfrenchclass.com/blog',
            
        },
        
    ];

    const toggleMobileDropdown = (label: string) => {
        setOpenMobileDropdowns((prev) => {
            const newSet = new Set(prev);
            if (newSet.has(label)) {
                newSet.delete(label);
            } else {
                newSet.add(label);
            }
            return newSet;
        });
    };

    const closeMobileMenu = () => {
        setMobileMenuOpen(false);
        setOpenMobileDropdowns(new Set());
    };

    useEffect(() => {
        if (prevPathnameRef.current !== pathname) {
            prevPathnameRef.current = pathname;
            if (mobileMenuOpen) {
                startTransition(() => {
                    setMobileMenuOpen(false);
                    setOpenMobileDropdowns(new Set());
                });
            }
        }
    }, [pathname, mobileMenuOpen]);

    useEffect(() => {
        if (mobileMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [mobileMenuOpen]);

    useEffect(() => {
        const handleScroll = () => {
            const scrollPosition = window.scrollY;
            setIsSticky(scrollPosition > 0);
        };

        window.addEventListener('scroll', handleScroll);
        handleScroll();

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <nav
            id="mainNavbar"
            className={`navbar-light fixed inset-x-0 top-0 z-50 h-20 transition-all duration-300 ${
                isSticky ? 'nav-sticky' : ''
            }`}
        >
            <div className="container mx-auto flex h-full items-center justify-between px-4">
                {/* Logo */}
                <Link href="/" className="dark:hidden">
                    <Image src={logo} alt="logo" width={120} height={34} className="w-auto" />
                </Link>
                <Link href="/" className="hidden dark:block">
                    <Image src={lightLogo} alt="logo" width={120} height={34} className="h-7 w-auto" />
                </Link>

                {/* Desktop Menu */}
                <ul className="hidden items-center space-x-12 font-medium lg:flex ml-auto pr-8">
                    {navItems.map((item) => (
                        <li key={item.label} className="group relative">
                            {item.children ? (
                                <>
                                    <a
                                        href="#!"
                                        className={`flex items-center gap-1 h-20 font-medium text-gray-900 dark:text-white hover:text-primary-600 transition-colors ${
                                            hasActiveChild(item) ? 'text-primary-600' : ''
                                        }`}
                                    >
                                        {item.label}
                                        <RiArrowDownSLine className="text-sm transition-transform group-hover:rotate-180" />
                                    </a>

                                    <div className="dropdown-menu absolute top-full left-0 w-48 dark:bg-black dark:shadow-dark-800/50 bg-white shadow-xl rounded-b-lg border-t-2 border-t-primary-500 shadow-gray-200/80 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50 translate-y-6 group-hover:translate-y-0">
                                        <ul className="py-3">
                                            {item.children.map((child) => (
                                                <li key={child.href}>
                                                    <Link
                                                        href={child.href}
                                                        className={`px-5 py-2 block font-semibold text-[1rem] tracking-[0.5px] text-primary-950 dark:text-white/70 hover:text-primary-600 transition-colors ${
                                                            isActive(child.href)
                                                                ? 'text-primary-600'
                                                                : ''
                                                        }`}
                                                    >
                                                        {child.label}
                                                    </Link>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </>
                            ) : (
                                <Link
                                    href={item.href!}
                                    className={`flex items-center h-20 font-medium text-gray-900 dark:text-white hover:text-primary-600 transition-colors ${
                                        isActive(item.href!) ? 'text-primary-600' : ''
                                    }`}
                                >
                                    {item.label}
                                </Link>
                            )}
                        </li>
                    ))}
                </ul>

                {/* Desktop CTA */}
                <Link
                    href="/contact"
                    className="hidden lg:inline-block btn btn-indigo btn-md rounded-full px-5 py-2 text-base font-semibold"
                >
                    Contact Us <RiPhoneLine className="inline-block ml-1 size-4" />
                </Link>

                {/* Mobile Menu Button */}
                <ButtonComponent
                    id="mobile-menu-btn"
                    className="lg:hidden !p-0 !bg-transparent !border-none hover:!bg-transparent"
                    onClick={() => setMobileMenuOpen(true)}
                    ariaLabel="Open mobile menu"
                    iconElement={<RiMenuLine className="text-2xl text-gray-900 dark:text-white" />}
                    icon={true}
                />
            </div>

            {/* Mobile Sidebar remains EXACTLY same structure */}
            <div
                id="mobile-sidebar"
                className={`fixed left-0 h-[100vh] z-50 w-80 bg-white shadow-xl transition-transform duration-300 ease-in-out -translate-x-full lg:hidden dark:bg-dark-950 ${
                    mobileMenuOpen ? 'translate-x-0' : ''
                }`}
            >
                <div className="flex h-full flex-col">
                    

                    <nav className="flex-1 overflow-y-auto py-6 dark:bg-dark-950">
                        <ul className="space-y-2 px-6">
                            {navItems.map((item) => (
                                <li key={item.label}>
                                    {item.children ? (
                                        <>
                                            <button
                                                className="mobile-dropdown-btn flex w-full items-center justify-between rounded-lg px-4 py-3 font-medium text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                                                onClick={() => toggleMobileDropdown(item.label)}
                                            >
                                                {item.label}
                                                <RiArrowDownSLine
                                                    className={`text-sm transition-transform ${
                                                        openMobileDropdowns.has(item.label)
                                                            ? 'rotate-180'
                                                            : ''
                                                    }`}
                                                />
                                            </button>
                                            {openMobileDropdowns.has(item.label) && (
                                                <ul className="mobile-dropdown-content space-y-1 pl-4 pt-2">
                                                    {item.children.map((child) => (
                                                        <li key={child.href}>
                                                            <Link
                                                                href={child.href}
                                                                onClick={closeMobileMenu}
                                                                className="block rounded px-4 py-2 text-gray-600 dark:text-gray-400 hover:text-primary-600 transition-colors"
                                                            >
                                                                {child.label}
                                                            </Link>
                                                        </li>
                                                    ))}
                                                </ul>
                                            )}
                                        </>
                                    ) : (
                                        <Link
                                            href={item.href!}
                                            onClick={closeMobileMenu}
                                            className="block rounded px-4 py-3 font-medium text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                                        >
                                            {item.label}
                                        </Link>
                                    )}
                                </li>
                            ))}
                        </ul>
                    </nav>

                    <div className="border-t border-gray-200 dark:border-gray-700 p-6">
                        <Link
                            href="/contact"
                            onClick={closeMobileMenu}
                            className="block w-full rounded-full border border-black dark:border-white px-6 py-3 text-center font-medium text-gray-900 dark:text-gray-200 transition hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black"
                        >
                            Contact Us
                        </Link>
                    </div>
                </div>
            </div>

            {mobileMenuOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-40 lg:hidden"
                    onClick={closeMobileMenu}
                    aria-hidden="true"
                />
            )}
        </nav>
    );
}
