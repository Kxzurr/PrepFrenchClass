'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { RiUserAddLine } from '@remixicon/react';
import { Author } from '@/src/types/blog';
import courseAboutBg from '@/src/assets/images/course/course-about-bg.jpg';
import user08 from '@/src/assets/images/avatar/user-08.jpg';

export default function AuthorProfile() {
    const [isFollowing, setIsFollowing] = useState(false);

    const author: Author = {
        id: '1',
        name: 'Ethan Walker',
        role: 'Content Strategist & Lifestyle Blogger',
        avatar: user08,
        avatarAlt: 'Ethan Walker',
        bio: 'Ethan Walker is a passionate lifestyle blogger and digital strategist with over 7 years of experience in content creation and brand storytelling. She believes in crafting authentic narratives that inspire and connect with audiences globally. Through her blog, she explores topics like mindful living, travel, wellness, and personal growth — empowering others to find balance and purpose in everyday life. Over the years, Ethan has collaborated with global wellness brands, creative studios, and lifestyle publications to produce meaningful digital content. His storytelling approach combines strategy with emotion, helping brands engage authentically with their audiences. When not writing, he enjoys exploring local cultures, trying new coffee blends, and mentoring young creators on building their personal voice online.',
        stats: {
            publishedPosts: 120,
            followers: '58K',
            yearsOfBlogging: 7,
            awardsWon: 12,
        },
    };

    const handleFollow = () => {
        setIsFollowing(!isFollowing);
    };

    return (
        <section className="lg:py-30 py-20">
            <div className="container">
                <div className="h-90 relative overflow-hidden rounded-xl">
                    <Image
                        src={courseAboutBg}
                        alt="Author Background"
                        className="w-full h-full object-cover"
                        fill
                        priority
                    />
                    <div className="absolute inset-0 bg-black/40 w-full h-full"></div>
                </div>
                <div className="max-w-[80rem] mx-auto relative z-10 -mt-23 px-3 2xl:px-0">
                    <div className="flex justify-between items-start flex-wrap gap-2">
                        <div className="flex gap-3 items-start flex-wrap">
                            <div className="size-38 rounded-full overflow-hidden border-7 border-white dark:border-dark-950 shadow-lg">
                                <Image
                                    src={author.avatar}
                                    alt={author.avatarAlt}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <div className="pt-5">
                                <h3>
                                    <Link href="#!" className="md:text-white text-primary-950 dark:text-primary-100 hover:text-primary-600 transition-colors">
                                        {author.name}
                                    </Link>
                                </h3>
                                <p className="md:text-gray-100 text-gray-600 dark:text-dark-400">{author.role}</p>
                            </div>
                        </div>
                        <button
                            onClick={handleFollow}
                            className={`inline-flex items-center gap-2 md:bg-white bg-primary-100 text-primary-900 px-5 py-2.5 rounded-full font-medium hover:bg-gray-100 transition-all duration-300 mt-5 ${
                                isFollowing ? 'bg-primary-500 text-white hover:bg-primary-600' : ''
                            }`}
                        >
                            <RiUserAddLine className="w-4 h-4" />
                            {isFollowing ? 'Following' : 'Follow'}
                        </button>
                    </div>

                    <p className="text-gray-600 dark:text-dark-400 mt-10 leading-relaxed">{author.bio}</p>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 mt-10 text-center">
                        <div className="bg-gray-100 dark:bg-white/10 rounded-xl p-5 backdrop-blur-md">
                            <h4 className="text-3xl mb-1 text-primary-950 dark:text-primary-100">
                                {author.stats.publishedPosts}+
                            </h4>
                            <p className="text-gray-600 dark:text-dark-400">Published Posts</p>
                        </div>
                        <div className="bg-gray-100 dark:bg-white/10 rounded-xl p-5 backdrop-blur-md">
                            <h4 className="text-3xl mb-1 text-primary-950 dark:text-primary-100">{author.stats.followers}</h4>
                            <p className="text-gray-600 dark:text-dark-400">Followers</p>
                        </div>
                        <div className="bg-gray-100 dark:bg-white/10 rounded-xl p-5 backdrop-blur-md">
                            <h4 className="text-3xl mb-1 text-primary-950 dark:text-primary-100">
                                {author.stats.yearsOfBlogging}
                            </h4>
                            <p className="text-gray-600 dark:text-dark-400">Years of Blogging</p>
                        </div>
                        <div className="bg-gray-100 dark:bg-white/10 rounded-xl p-5 backdrop-blur-md">
                            <h4 className="text-3xl mb-1 text-primary-950 dark:text-primary-100">{author.stats.awardsWon}</h4>
                            <p className="text-gray-600 dark:text-dark-400">Awards Won</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

