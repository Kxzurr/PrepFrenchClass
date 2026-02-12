import Image from 'next/image';
import Link from 'next/link';
import PageHead from '../../../common/PageHead';
import notFoundImage from '../../../assets/images/404.png';

export default function NotFound() {
    const breadcrumbs = [
        { label: 'Home Page', href: '/' },
        { label: '404' },
    ];

    return (
        <>
            <PageHead title="404 - Page Not Found" breadcrumbs={breadcrumbs} showChevron={false} />
            <section className="py-20 pb-25">
                <div className="container">
                    <div className="text-center">
                        <div className="mb-8 flex justify-center">
                            <Image
                                src={notFoundImage}
                                alt="404 Not Found"
                                width={600}
                                height={400}
                                className="max-w-full h-auto"
                            />
                        </div>
                        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-primary-950 dark:text-primary-100">
                            Oops! Page Not Found
                        </h1>
                        <p className="text-lg text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto">
                            The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
                        </p>
                        <Link
                            href="/"
                            className="inline-block px-8 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-all duration-300 font-semibold"
                        >
                            Go Back Home
                        </Link>
                    </div>
                </div>
            </section>
        </>
    );
}

