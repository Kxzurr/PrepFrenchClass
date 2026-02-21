'use client';

import PostContent from '../PostContent';
import Sidebar from '../../ListView/Sidebar';

export default function SinglePostSection() {
    return (
        <section className="lg:py-30 py-20">
            <div className="container max-w-[80rem]">
                <div className="grid grid-cols-12 2xl:gap-15 gap-6">
                    <PostContent />
                    <Sidebar />
                </div>
            </div>
        </section>
    );
}

