'use client';

import { useState } from 'react';
import { RiStarFill, RiStarHalfFill, RiStarLine, RiThumbUpLine, RiThumbDownLine } from '@remixicon/react';

interface Review {
    id: string;
    author: string;
    rating: number;
    date: string;
    comment: string;
}

interface ReviewsTabProps {
    averageRating: number;
    totalReviews: number;
    ratingBreakdown: {
        five: number;
        four: number;
        three: number;
        two: number;
        one: number;
    };
    reviews: Review[];
}

export default function ReviewsTab({ averageRating, totalReviews, ratingBreakdown, reviews }: ReviewsTabProps) {
    const [helpfulVotes, setHelpfulVotes] = useState<Record<string, { up: number; down: number }>>({});

    const formatPercent = (value: number) => {
        const rounded = Math.round(value * 10) / 10;
        return `${rounded % 1 === 0 ? rounded.toFixed(0) : rounded.toFixed(1)}%`;
    };

    const handleHelpful = (reviewId: string, type: 'up' | 'down') => {
        setHelpfulVotes((prev) => ({
            ...prev,
            [reviewId]: {
                up: type === 'up' ? (prev[reviewId]?.up || 0) + 1 : prev[reviewId]?.up || 0,
                down: type === 'down' ? (prev[reviewId]?.down || 0) + 1 : prev[reviewId]?.down || 0,
            },
        }));
    };

    const renderStars = (rating: number) => {
        const stars = [];
        const fullStars = Math.floor(rating);
        const hasHalfStar = rating % 1 >= 0.5;
        const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

        for (let i = 0; i < fullStars; i++) {
            stars.push(<RiStarFill key={`full-${i}`} className="w-4 h-4 text-yellow-500" />);
        }
        if (hasHalfStar) {
            stars.push(<RiStarHalfFill key="half" className="w-4 h-4 text-yellow-500" />);
        }
        for (let i = 0; i < emptyStars; i++) {
            stars.push(<RiStarLine key={`empty-${i}`} className="w-4 h-4 text-yellow-500" />);
        }
        return stars;
    };

    return (
        <div>
            <h4 className="mb-4">Course Rating</h4>
            <div className="grid grid-cols-12 gap-6 mb-10">
                <div className="col-span-12 md:col-span-5">
                    <div className="flex flex-col justify-center items-center border border-black/10 dark:border-white/10 h-full rounded-xl p-6">
                        <h2 className="text-4xl font-semibold text-yellow-500">{averageRating}</h2>
                        <div className="flex mt-2 justify-center gap-1">
                            {renderStars(averageRating)}
                        </div>
                        <p className="text-gray-600 dark:text-dark-400 mt-4">
                            Average Rating: {averageRating} from {totalReviews}+ Reviews
                        </p>
                        <p className="text-gray-400 dark:text-gray-300 text-sm mt-1 italic">Trusted by learners worldwide</p>
                    </div>
                </div>
                <div className="col-span-12 md:col-span-7">
                    <div className="border border-black/10 dark:border-white/10 h-full rounded-xl p-6">
                        {[
                            { label: '5 star', value: ratingBreakdown.five },
                            { label: '4 star', value: ratingBreakdown.four },
                            { label: '3 star', value: ratingBreakdown.three },
                            { label: '2 star', value: ratingBreakdown.two },
                            { label: '1 star', value: ratingBreakdown.one },
                        ].map((item, index) => (
                            <div key={index} className="flex items-center gap-2 mb-2 last:mb-0">
                                <p className="w-12 text-sm text-gray-600 dark:text-gray-600">{item.label}</p>
                                <div className="w-full bg-gray-200 dark:bg-gray-800 h-2 rounded-full overflow-hidden">
                                    <div
                                        className="bg-yellow-500 h-full transition-all duration-500 ease-in-out"
                                        style={{ width: `${item.value}%` }}
                                    />
                                </div>
                                <span className="text-sm text-gray-600 dark:text-gray-600 ml-2">
                                    {formatPercent(item.value)}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <h4 className="mb-6">Featured Reviews</h4>
            {reviews.map((review, index) => (
                <div
                    key={review.id}
                    className={`${index > 0 ? 'border-t border-gray-200 dark:border-gray-800' : ''} py-6`}
                >
                    <div className="flex items-start gap-4 mb-3">
                        <div>
                            <h5 className="font-semibold text-gray-800 dark:text-gray-300">{review.author}</h5>
                            <div className="flex items-center gap-2">
                                <div className="flex items-center gap-1 text-yellow-500 my-1">
                                    {renderStars(review.rating)}
                                </div>
                                <p className="text-gray-600 dark:text-dark-400 text-sm">{review.date}</p>
                            </div>
                        </div>
                    </div>
                    <p className="text-gray-600 dark:text-dark-400 mb-4">{review.comment}</p>
                    <div className="flex items-center gap-3 text-sm text-gray-600 dark:text-dark-400">
                        <span>Helpful?</span>
                        <button
                            onClick={() => handleHelpful(review.id, 'up')}
                            className="flex items-center gap-1 p-2 border dark:border-gray-500 rounded-md hover:bg-primary-500 hover:text-white transition-all duration-300 ease-in-out"
                        >
                            <RiThumbUpLine className="w-4 h-4" />
                            {helpfulVotes[review.id]?.up > 0 && <span>{helpfulVotes[review.id].up}</span>}
                        </button>
                        <button
                            onClick={() => handleHelpful(review.id, 'down')}
                            className="flex items-center gap-1 p-2 border dark:border-gray-500 rounded-md hover:bg-primary-500 hover:text-white transition-all duration-300 ease-in-out"
                        >
                            <RiThumbDownLine className="w-4 h-4" />
                            {helpfulVotes[review.id]?.down > 0 && <span>{helpfulVotes[review.id].down}</span>}
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
}

