'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect, useRef, startTransition } from 'react';
import { RiArrowDownSLine, RiMenuLine, RiCloseLine, RiPhoneLine } from '@remixicon/react';
import Image from 'next/image';
import ButtonComponent from '../../../../common/Button';
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

    // Helper function to check if a path is active
    const isActive = (href: string) => {
        if (!href) return false;
        // Normalize paths by removing trailing slashes (except for root)
        const normalizedPathname = pathname === '/' ? '/' : pathname.replace(/\/$/, '');
        const normalizedHref = href === '/' ? '/' : href.replace(/\/$/, '');
        return normalizedPathname === normalizedHref;
    };

    // Helper function to check if any child of a nav item is active
    const hasActiveChild = (item: NavItem) => {
        if (!item.children) return false;
        return item.children.some(child => isActive(child.href));
    };

    const navItems: NavItem[] = [
        {
            label: 'Home',
            children: [
                { label: 'Home Default', href: '/' },
                { label: 'Home Music', href: '/home-music' },
                { label: 'Food Academy', href: '/home-food' },
                { label: 'Campus University', href: '/home-campus' },
                { label: 'Dance Academy', href: '/home-dance' },
                { label: 'Language Academy', href: '/home-language' },
            ],
        },
        {
            label: 'Courses',
            children: [
                { label: 'Course List View', href: '/course-list-view' },
                { label: 'Course Grid View', href: '/course-grid-view' },
                { label: 'Course Category', href: '/course-category' },
            ],
        },
        {
            label: 'Pages',
            children: [
                { label: 'About Us', href: '/about-us' },
                { label: 'Pricing', href: '/pricing' },
                { label: 'Compare Plans', href: '/compare-plans' },
                { label: 'Help Center', href: '/help-center' },
                { label: 'Contact Us', href: '/contact' },
                { label: 'Privacy Policy', href: '/privacy-policy' },
            ],
        },
        {
            label: 'Blog',
            children: [
                { label: 'Post List View', href: '/post-list-view' },
                { label: 'Post Grid View', href: '/post-grid-view' },
                { label: 'Single Post', href: '/single-post' },
                { label: 'Post Category', href: '/post-category' },
                { label: 'Post Search', href: '/post-search' },
                { label: 'Post Tag', href: '/post-tag' },
                { label: 'Author', href: '/post-author' },
            ],
        },
        {
            label: 'Shop',
            children: [
                { label: 'Cart', href: '/shop-cart' },
                { label: 'Checkout', href: '/shop-checkout' },
                { label: 'Thank You', href: '/thank-you' },
            ],
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

    // Close mobile menu when route changes
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

    // Prevent body scroll when mobile menu is open
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

    // Handle sticky navigation
    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 0) {
                setIsSticky(true);
            } else {
                setIsSticky(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        // Check on mount
        handleScroll();

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <nav
            id="mainNavbar"
            className={`navbar-dark fixed inset-x-0 top-0 z-50 h-20 transition-all duration-300 ${
                isSticky ? 'bg-black shadow-lg shadow-gray-200/10' : ''
            }`}
        >
            <div className="container mx-auto flex h-full items-center justify-between px-4">
                {/* Logo */}
                <Link href="/">
                    <Image
                        src={lightLogo}
                        alt="logo"
                        width={120}
                        height={28}
                        className="h-7 w-auto"
                    />
                </Link>

                {/* Desktop Menu */}
                <ul className="hidden items-center space-x-12 font-medium lg:flex">
                    {navItems.map((item) => (
                        <li key={item.label} className="group relative">
                            <a
                                href="#!"
                                className={`flex items-center gap-1 h-20 font-medium text-white hover:text-primary-600 transition-colors [&.active]:text-primary-600 dark:[&.active]:text-primary-600 ${
                                    hasActiveChild(item) ? 'active' : ''
                                }`}
                            >
                                {item.label}
                                <RiArrowDownSLine className="text-sm transition-transform group-hover:rotate-180" />
                            </a>
                            {item.children && (
                                <div className="dropdown-menu absolute top-full ltr:left-0 rtl:right-0 w-48 rounded-b-lg border-t-2 border-t-primary-500 bg-black shadow-dark-800/50 shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50 translate-y-6 group-hover:translate-y-0">
                                    <ul className="py-3">
                                        {item.children.map((child) => (
                                            <li key={child.href}>
                                                <Link
                                                    href={child.href}
                                                    className={`px-5 py-2 block text-[1rem] tracking-[0.5px] text-white/70 hover:text-primary-600 transition-colors [&.active]:text-primary-600 dark:[&.active]:text-primary-600 ${
                                                        isActive(child.href)
                                                            ? 'active'
                                                            : ''
                                                    }`}
                                                >
                                                    {child.label}
                                                </Link>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </li>
                    ))}
                </ul>

                {/* Desktop CTA */}
                <Link
                    href="/contact"
                    className="hidden lg:inline-block btn btn-primary btn-md rounded-full"
                >
                    Contact Us <RiPhoneLine className="inline-block ml-1 size-4" />
                </Link>

                {/* Mobile Menu Button */}
                <ButtonComponent
                    id="mobile-menu-btn"
                    className="lg:hidden !p-0 !bg-transparent !border-none hover:!bg-transparent"
                    onClick={() => setMobileMenuOpen(true)}
                    ariaLabel="Open mobile menu"
                    iconElement={<RiMenuLine className="text-2xl text-white" />}
                    icon={true}
                />
            </div>

            {/* Mobile Sidebar */}
            <div
                id="mobile-sidebar"
                className={`fixed inset-y-0 left-0 w-80 -translate-x-full bg-black shadow-xl transition-transform duration-300 ease-in-out lg:hidden ${
                    mobileMenuOpen ? 'translate-x-0' : ''
                }`}
            >
                <div className="flex h-full flex-col">
                    {/* Header */}
                    <div className="flex items-center justify-between border-b border-gray-700 p-6">
                        <Link href="/" onClick={closeMobileMenu}>
                            <Image
                                src={lightLogo}
                                alt="logo"
                                width={120}
                                height={28}
                                className="h-7 w-auto"
                            />
                        </Link>
                        <button
                            id="mobile-close-btn"
                            onClick={closeMobileMenu}
                            aria-label="Close mobile menu"
                        >
                            <RiCloseLine className="text-2xl text-white" />
                        </button>
                    </div>

                    {/* Nav */}
                    <nav className="flex-1 overflow-y-auto py-6">
                        <ul className="space-y-2 px-6">
                            {navItems.map((item) => (
                                <li key={item.label}>
                                    <button
                                        className={`mobile-dropdown-btn flex w-full items-center justify-between rounded-lg px-4 py-3 font-medium text-white hover:bg-gray-800 transition-colors [&.active]:text-primary-600 dark:[&.active]:text-primary-600 ${
                                            hasActiveChild(item) ? 'active' : ''
                                        }`}
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
                                    {item.children && (
                                        <ul
                                            className={`mobile-dropdown-content space-y-1 pl-4 pt-2 transition-all duration-300 ${
                                                openMobileDropdowns.has(item.label)
                                                    ? 'block'
                                                    : 'hidden'
                                            }`}
                                        >
                                            {item.children.map((child) => (
                                                <li key={child.href}>
                                                    <Link
                                                        href={child.href}
                                                        onClick={closeMobileMenu}
                                                        className={`block rounded px-4 py-2 text-gray-400 hover:text-primary-600 transition-colors [&.active]:text-primary-600 dark:[&.active]:text-primary-600 ${
                                                            isActive(child.href)
                                                                ? 'active'
                                                                : ''
                                                        }`}
                                                    >
                                                        {child.label}
                                                    </Link>
                                                </li>
                                            ))}
                                        </ul>
                                    )}
                                </li>
                            ))}
                        </ul>
                    </nav>

                    {/* Mobile CTA */}
                    <div className="border-t border-gray-700 p-6">
                        <Link
                            href="/contact"
                            onClick={closeMobileMenu}
                            className="block w-full rounded-full border border-white px-6 py-3 text-center font-medium text-gray-200 transition hover:bg-white hover:text-black"
                        >
                            Contact Us
                        </Link>
                    </div>
                </div>
            </div>

            {/* Mobile Menu Overlay */}
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

