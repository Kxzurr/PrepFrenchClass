import { ReactNode } from 'react';
import Link from 'next/link';

interface ButtonProps {
    children?: ReactNode;
    variant?: 'primary' | 'secondary' | 'outline' | 'outline-sky' | 'indigo' | 'yellow' | 'sky' | 'gray' | 'red' | 'green' | 'blue';
    size?: 'xs' | 'sm' | 'md' | 'lg';
    href?: string;
    onClick?: () => void;
    type?: 'button' | 'submit' | 'reset';
    className?: string;
    rounded?: boolean;
    disabled?: boolean;
    clickBtn?: boolean;
    icon?: boolean;
    iconElement?: ReactNode;
    iconPosition?: 'left' | 'right';
    ariaLabel?: string;
    id?: string;
}

export default function Button({
    children,
    variant = 'primary',
    size = 'md',
    href,
    onClick,
    type = 'button',
    className = '',
    rounded = false,
    disabled = false,
    clickBtn = false,
    icon = false,
    iconElement,
    iconPosition = 'right',
    ariaLabel,
    id,
}: ButtonProps) {
    const baseClasses = 'btn inline-flex items-center justify-center font-medium transition-all duration-300';
    
    const variantClasses: Record<string, string> = {
        primary: 'btn-primary',
        secondary: 'btn-secondary',
        outline: 'btn-outline',
        'outline-sky': 'btn-outline-sky',
        indigo: 'btn-indigo',
        yellow: 'btn-yellow',
        sky: 'btn-sky',
        gray: 'btn-gray',
        red: 'btn-red',
        green: 'btn-green',
        blue: 'btn-blue',
    };

    const sizeClasses: Record<string, string> = {
        xs: 'btn-xs',
        sm: 'btn-sm',
        md: 'btn-md',
        lg: 'btn-lg',
    };

    const roundedClass = rounded ? 'rounded-full' : '';
    const disabledClass = disabled ? 'opacity-50 cursor-not-allowed' : '';
    const clickBtnClass = clickBtn ? 'click-btn' : '';
    const iconClass = icon ? 'btn-icon' : '';

    const buttonClasses = [
        baseClasses,
        variantClasses[variant] || variantClasses.primary,
        sizeClasses[size] || sizeClasses.md,
        roundedClass,
        disabledClass,
        clickBtnClass,
        iconClass,
        className,
    ]
        .filter(Boolean)
        .join(' ');

    const iconContent = iconElement;
    
    const content = (
        <>
            {iconContent && iconPosition === 'left' && (
                <span className={children ? 'mr-1' : ''}>{iconContent}</span>
            )}
            {children}
            {iconContent && iconPosition === 'right' && (
                <span className={children ? 'ml-1' : ''}>{iconContent}</span>
            )}
        </>
    );

    if (href) {
        return (
            <Link 
                href={href} 
                id={id}
                className={buttonClasses} 
                onClick={onClick}
                aria-label={ariaLabel}
            >
                {content}
            </Link>
        );
    }

    return (
        <button
            id={id}
            type={type}
            className={buttonClasses}
            onClick={onClick}
            disabled={disabled}
            aria-label={ariaLabel}
        >
            {content}
        </button>
    );
}

