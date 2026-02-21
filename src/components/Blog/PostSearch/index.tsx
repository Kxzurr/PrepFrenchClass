'use client';

import { useState } from 'react';
import SearchBanner from './SearchBanner';
import SearchResults from './SearchResults';

export default function PostSearch() {
    const [searchQuery, setSearchQuery] = useState('');

    const handleSearch = (query: string) => {
        setSearchQuery(query);
    };

    return (
        <>
            <SearchBanner onSearch={handleSearch} />
            <SearchResults searchQuery={searchQuery} />
        </>
    );
}

