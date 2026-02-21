'use client';

import Link from 'next/link';
import { RiRecordCircleLine } from '@remixicon/react';
import { TagGroup } from '@/src/types/blog';

export default function TagSection() {
    const tagGroups: TagGroup[] = [
        {
            letter: 'A',
            tags: [
                { name: 'Art', href: '/post-list-view', hoverColor: { border: 'hover:border-pink-400', text: 'hover:text-pink-600', bg: 'hover:bg-pink-500/10' } },
                { name: 'Analytics', href: '/post-list-view', hoverColor: { border: 'hover:border-indigo-400', text: 'hover:text-indigo-600', bg: 'hover:bg-indigo-500/10' } },
                { name: 'AI', href: '/post-list-view', hoverColor: { border: 'hover:border-rose-400', text: 'hover:text-rose-600', bg: 'hover:bg-rose-500/10' } },
            ],
        },
        {
            letter: 'B',
            tags: [
                { name: 'Business', href: '/post-list-view', hoverColor: { border: 'hover:border-yellow-400', text: 'hover:text-yellow-600', bg: 'hover:bg-yellow-500/10' } },
                { name: 'Branding', href: '/post-list-view', hoverColor: { border: 'hover:border-blue-400', text: 'hover:text-blue-600', bg: 'hover:bg-blue-500/10' } },
                { name: 'Blogging', href: '/post-list-view', hoverColor: { border: 'hover:border-green-400', text: 'hover:text-green-600', bg: 'hover:bg-green-500/10' } },
            ],
        },
        {
            letter: 'C',
            tags: [
                { name: 'Coding', href: '/post-list-view', hoverColor: { border: 'hover:border-emerald-400', text: 'hover:text-emerald-600', bg: 'hover:bg-emerald-500/10' } },
                { name: 'Creativity', href: '/post-list-view', hoverColor: { border: 'hover:border-orange-400', text: 'hover:text-orange-600', bg: 'hover:bg-orange-500/10' } },
            ],
        },
        {
            letter: 'D',
            tags: [
                { name: 'Design', href: '/post-list-view', hoverColor: { border: 'hover:border-purple-400', text: 'hover:text-purple-600', bg: 'hover:bg-purple-500/10' } },
                { name: 'Development', href: '/post-list-view', hoverColor: { border: 'hover:border-pink-400', text: 'hover:text-pink-600', bg: 'hover:bg-pink-500/10' } },
                { name: 'Dance', href: '/post-list-view', hoverColor: { border: 'hover:border-blue-400', text: 'hover:text-blue-600', bg: 'hover:bg-blue-500/10' } },
            ],
        },
        {
            letter: 'E',
            tags: [
                { name: 'Education', href: '/post-list-view', hoverColor: { border: 'hover:border-amber-400', text: 'hover:text-amber-600', bg: 'hover:bg-amber-500/10' } },
                { name: 'Entrepreneurship', href: '/post-list-view', hoverColor: { border: 'hover:border-emerald-400', text: 'hover:text-emerald-600', bg: 'hover:bg-emerald-500/10' } },
                { name: 'Environment', href: '/post-list-view', hoverColor: { border: 'hover:border-pink-400', text: 'hover:text-pink-600', bg: 'hover:bg-pink-500/10' } },
            ],
        },
        {
            letter: 'F',
            tags: [
                { name: 'Fashion', href: '/post-list-view', hoverColor: { border: 'hover:border-fuchsia-400', text: 'hover:text-fuchsia-600', bg: 'hover:bg-fuchsia-500/10' } },
                { name: 'Fitness', href: '/post-list-view', hoverColor: { border: 'hover:border-teal-400', text: 'hover:text-teal-600', bg: 'hover:bg-teal-500/10' } },
                { name: 'Finance', href: '/post-list-view', hoverColor: { border: 'hover:border-indigo-400', text: 'hover:text-indigo-600', bg: 'hover:bg-indigo-500/10' } },
            ],
        },
        {
            letter: 'G',
            tags: [
                { name: 'Gaming', href: '/post-list-view', hoverColor: { border: 'hover:border-green-400', text: 'hover:text-green-600', bg: 'hover:bg-green-500/10' } },
                { name: 'Growth', href: '/post-list-view', hoverColor: { border: 'hover:border-rose-400', text: 'hover:text-rose-600', bg: 'hover:bg-rose-500/10' } },
                { name: 'Graphic Design', href: '/post-list-view', hoverColor: { border: 'hover:border-blue-400', text: 'hover:text-blue-600', bg: 'hover:bg-blue-500/10' } },
            ],
        },
        {
            letter: 'H',
            tags: [
                { name: 'Health', href: '/post-list-view', hoverColor: { border: 'hover:border-amber-400', text: 'hover:text-amber-600', bg: 'hover:bg-amber-500/10' } },
                { name: 'History', href: '/post-list-view', hoverColor: { border: 'hover:border-indigo-400', text: 'hover:text-indigo-600', bg: 'hover:bg-indigo-500/10' } },
                { name: 'Home Decor', href: '/post-list-view', hoverColor: { border: 'hover:border-emerald-400', text: 'hover:text-emerald-600', bg: 'hover:bg-emerald-500/10' } },
            ],
        },
        {
            letter: 'I',
            tags: [
                { name: 'Illustration', href: '/post-list-view', hoverColor: { border: 'hover:border-blue-400', text: 'hover:text-blue-600', bg: 'hover:bg-blue-500/10' } },
                { name: 'Inspiration', href: '/post-list-view', hoverColor: { border: 'hover:border-teal-400', text: 'hover:text-teal-600', bg: 'hover:bg-teal-500/10' } },
            ],
        },
        {
            letter: 'J',
            tags: [
                { name: 'Journalism', href: '/post-list-view', hoverColor: { border: 'hover:border-yellow-400', text: 'hover:text-yellow-600', bg: 'hover:bg-yellow-500/10' } },
                { name: 'Jewelry', href: '/post-list-view', hoverColor: { border: 'hover:border-indigo-400', text: 'hover:text-indigo-600', bg: 'hover:bg-indigo-500/10' } },
                { name: 'Justice', href: '/post-list-view', hoverColor: { border: 'hover:border-red-400', text: 'hover:text-red-600', bg: 'hover:bg-red-500/10' } },
            ],
        },
        {
            letter: 'K',
            tags: [
                { name: 'Knowledge', href: '/post-list-view', hoverColor: { border: 'hover:border-emerald-400', text: 'hover:text-emerald-600', bg: 'hover:bg-emerald-500/10' } },
                { name: 'Kids', href: '/post-list-view', hoverColor: { border: 'hover:border-indigo-400', text: 'hover:text-indigo-600', bg: 'hover:bg-indigo-500/10' } },
                { name: 'Kindness', href: '/post-list-view', hoverColor: { border: 'hover:border-pink-400', text: 'hover:text-pink-600', bg: 'hover:bg-pink-500/10' } },
                { name: 'Karma', href: '/post-list-view', hoverColor: { border: 'hover:border-teal-400', text: 'hover:text-teal-600', bg: 'hover:bg-teal-500/10' } },
            ],
        },
        {
            letter: 'L',
            tags: [
                { name: 'Lifestyle', href: '/post-list-view', hoverColor: { border: 'hover:border-rose-400', text: 'hover:text-rose-600', bg: 'hover:bg-rose-500/10' } },
                { name: 'Leadership', href: '/post-list-view', hoverColor: { border: 'hover:border-yellow-400', text: 'hover:text-yellow-600', bg: 'hover:bg-yellow-500/10' } },
                { name: 'Learning', href: '/post-list-view', hoverColor: { border: 'hover:border-blue-400', text: 'hover:text-blue-600', bg: 'hover:bg-blue-500/10' } },
            ],
        },
        {
            letter: 'M',
            tags: [
                { name: 'Marketing', href: '/post-list-view', hoverColor: { border: 'hover:border-green-400', text: 'hover:text-green-600', bg: 'hover:bg-green-500/10' } },
                { name: 'Music', href: '/post-list-view', hoverColor: { border: 'hover:border-orange-400', text: 'hover:text-orange-600', bg: 'hover:bg-orange-500/10' } },
                { name: 'Motivation', href: '/post-list-view', hoverColor: { border: 'hover:border-fuchsia-400', text: 'hover:text-fuchsia-600', bg: 'hover:bg-fuchsia-500/10' } },
                { name: 'Mindfulness', href: '/post-list-view', hoverColor: { border: 'hover:border-cyan-400', text: 'hover:text-cyan-600', bg: 'hover:bg-cyan-500/10' } },
            ],
        },
        {
            letter: 'N',
            tags: [
                { name: 'Nature', href: '/post-list-view', hoverColor: { border: 'hover:border-cyan-400', text: 'hover:text-cyan-600', bg: 'hover:bg-cyan-500/10' } },
                { name: 'Networking', href: '/post-list-view', hoverColor: { border: 'hover:border-pink-400', text: 'hover:text-pink-600', bg: 'hover:bg-pink-500/10' } },
                { name: 'Nutrition', href: '/post-list-view', hoverColor: { border: 'hover:border-indigo-400', text: 'hover:text-indigo-600', bg: 'hover:bg-indigo-500/10' } },
            ],
        },
        {
            letter: 'O',
            tags: [
                { name: 'Organization', href: '/post-list-view', hoverColor: { border: 'hover:border-lime-400', text: 'hover:text-lime-600', bg: 'hover:bg-lime-500/10' } },
                { name: 'Outdoors', href: '/post-list-view', hoverColor: { border: 'hover:border-purple-400', text: 'hover:text-purple-600', bg: 'hover:bg-purple-500/10' } },
                { name: 'Opportunities', href: '/post-list-view', hoverColor: { border: 'hover:border-rose-400', text: 'hover:text-rose-600', bg: 'hover:bg-rose-500/10' } },
            ],
        },
    ];

    return (
        <section className="lg:py-30 py-20">
            <div className="container">
                <div className="grid xl:grid-cols-5 md:grid-cols-3 lg:grid-cols-4 sm:grid-cols-2 gap-8">
                    {tagGroups.map((group) => (
                        <div
                            key={group.letter}
                            className="text-center border border-black/10 dark:border-white/10 rounded-xl p-6 hover:shadow-md hover:shadow-dark-800/50 transition-all duration-300 hover:-translate-y-1"
                        >
                            <div className="mb-5 size-14 rounded-xl bg-primary-500/10 text-primary-600 flex items-center justify-center font-bold text-2xl shadow-sm">
                                {group.letter}
                            </div>
                            <ul className="space-y-2">
                                {group.tags.map((tag, index) => (
                                    <li key={index}>
                                        <Link
                                            href={tag.href}
                                            className={`flex items-center gap-1 py-2 px-3 rounded-lg border border-gray-200 dark:border-white/10 text-gray-700 dark:text-gray-300 ${tag.hoverColor.border} ${tag.hoverColor.text} ${tag.hoverColor.bg} transition-all duration-300`}
                                        >
                                            <RiRecordCircleLine className="w-6 h-6" />
                                            <span>{tag.name}</span>
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

