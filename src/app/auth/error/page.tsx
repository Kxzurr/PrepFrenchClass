'use client';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';

function ErrorContent() {
    const searchParams = useSearchParams();
    const error = searchParams.get('error');

    const getErrorMessage = () => {
        switch (error) {
            case 'OAuthSignin':
                return 'Error connecting to OAuth provider';
            case 'OAuthCallback':
                return 'Error in OAuth callback';
            case 'OAuthCreateAccount':
                return 'Could not create OAuth account';
            case 'EmailCreateAccount':
                return 'Could not create email account';
            case 'Callback':
                return 'Error in callback route';
            case 'OAuthAccountNotLinked':
                return 'Email is already associated with another account';
            case 'EmailSignInError':
                return 'Check your email address';
            case 'CredentialsSignin':
                return 'Sign in failed. Check the details you provided';
            case 'SessionCallback':
                return 'Session callback error';
            case 'Verification':
                return 'The token has expired or is invalid';
            default:
                return 'An error occurred during authentication';
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="w-full max-w-md space-y-8 text-center">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight text-gray-900">
                        Authentication Error
                    </h2>
                    <p className="mt-4 text-gray-600">
                        {getErrorMessage()}
                    </p>
                </div>

                <div className="space-y-4">
                    <Link
                        href="/auth/signin"
                        className="inline-block rounded-md bg-indigo-600 px-6 py-2 text-white font-medium hover:bg-indigo-700"
                    >
                        Back to Sign In
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default function Error() {
    return (
        <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
            <ErrorContent />
        </Suspense>
    );
}
