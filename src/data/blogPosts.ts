import { BlogPost } from '@/src/types/blog';
import musicBlog3 from '@/src/assets/images/music/music-blog-3.jpg';
import lngBlog3 from '@/src/assets/images/language/lng-blog-3.jpg';
import campusBlog1 from '@/src/assets/images/campus/campus-blog-1.png';
import danceCourse5 from '@/src/assets/images/dance/dance-course-5.jpg';
import foodAbout2 from '@/src/assets/images/food/food-about-2.png';
import mainGallery04 from '@/src/assets/images/homes/main-gallery-04.jpg';
import user01 from '@/src/assets/images/avatar/user-01.jpg';
import user02 from '@/src/assets/images/avatar/user-02.jpg';
import user03 from '@/src/assets/images/avatar/user-03.jpg';
import user04 from '@/src/assets/images/avatar/user-04.jpg';
import user05 from '@/src/assets/images/avatar/user-05.jpg';
import user06 from '@/src/assets/images/avatar/user-06.jpg';
import user07 from '@/src/assets/images/avatar/user-07.jpg';
import user08 from '@/src/assets/images/avatar/user-08.jpg';

export const blogPosts: BlogPost[] = [
    {
        id: '1',
        image: musicBlog3,
        imageAlt: 'Music Workshop',
        category: 'Music',
        categoryColor: 'pink',
        title: 'The Science of Sound: Why Music Makes You Feel Alive',
        titleHref: '/single-post',
        description: 'Learn how rhythm, melody, and harmony impact your emotions and spark creativity in daily life.',
        authorName: 'Liam Anderson',
        authorAvatar: user03,
        authorAvatarAlt: 'Author Avatar',
        authorRole: 'Music Coach',
        readTime: '6 Min Read',
    },
    {
        id: '2',
        image: lngBlog3,
        imageAlt: 'Language Learning',
        category: 'Language',
        categoryColor: 'blue',
        title: 'Learn Faster: 5 Simple Habits to Master Any New Language',
        titleHref: '/single-post',
        description: 'Boost your fluency with daily practice, immersive learning, and smart pronunciation techniques.',
        authorName: 'Isabella Chen',
        authorAvatar: user04,
        authorAvatarAlt: 'Author Avatar',
        authorRole: 'Language Tutor',
        readTime: '3 Min Read',
    },
    {
        id: '3',
        image: campusBlog1,
        imageAlt: 'University Learning',
        category: 'Learning',
        categoryColor: 'green',
        title: 'The Future of Education: How Universities Adapt to Learning',
        titleHref: '/single-post',
        description: 'Discover how modern universities blend technology and tradition to create smarter learning spaces.',
        authorName: 'Noah Patel',
        authorAvatar: user05,
        authorAvatarAlt: 'Author Avatar',
        authorRole: 'Education Expert',
        readTime: '7 Min Read',
    },
    {
        id: '4',
        image: danceCourse5,
        imageAlt: 'Contemporary Dance Class',
        category: 'Dance',
        categoryColor: 'rose',
        title: 'Express Yourself Freely: The Power of Contemporary Dance',
        titleHref: '/single-post',
        description: 'Discover how dance connects emotion, rhythm, and creativity — helping you build confidence and balance.',
        authorName: 'Sophia Martinez',
        authorAvatar: user02,
        authorAvatarAlt: 'Author Avatar',
        authorRole: 'Dance Instructor',
        readTime: '4 Min Read',
    },
    {
        id: '5',
        image: mainGallery04,
        imageAlt: 'Online Learning',
        category: 'Online Learning',
        categoryColor: 'indigo',
        title: '10 Powerful Tips to Stay Motivated While Learning Online',
        titleHref: '/single-post',
        description: 'Learn how to stay consistent, focused, and productive while studying in an online environment.',
        authorName: 'Ava Thompson',
        authorAvatar: user06,
        authorAvatarAlt: 'Author Avatar',
        authorRole: 'Learning Strategist',
        readTime: '4 Min Read',
    },
    {
        id: '6',
        image: foodAbout2,
        imageAlt: 'Cooking Skills',
        category: 'Cooking',
        categoryColor: 'yellow',
        title: 'Master the Art of Home Cooking: Simple Recipes Made Delicious',
        titleHref: '/single-post',
        description: 'Discover easy and healthy recipes, kitchen hacks, and step-by-step cooking techniques to elevate your everyday meals.',
        authorName: 'Olivia Bennett',
        authorAvatar: user07,
        authorAvatarAlt: 'Chef Avatar',
        authorRole: 'Culinary Instructor',
        readTime: '7 Min Read',
    },
    {
        id: '7',
        image: mainGallery04,
        imageAlt: 'Creative Workshop',
        category: 'Music',
        categoryColor: 'pink',
        title: 'Unlock Your Creative Potential: Music Production for Beginners',
        titleHref: '/single-post',
        description: 'Start your journey into music production with essential tools, techniques, and creative workflows that professional producers use.',
        authorName: 'Alex Thompson',
        authorAvatar: user01,
        authorAvatarAlt: 'Author Avatar',
        authorRole: 'Music Producer',
        readTime: '9 Min Read',
    },
    {
        id: '8',
        image: campusBlog1,
        imageAlt: 'Student Success',
        category: 'Learning',
        categoryColor: 'green',
        title: 'Study Smarter, Not Harder: Effective Learning Strategies for Students',
        titleHref: '/single-post',
        description: 'Discover proven study techniques, time management tips, and memory enhancement methods to maximize your academic performance.',
        authorName: 'Emma Wilson',
        authorAvatar: user08,
        authorAvatarAlt: 'Author Avatar',
        authorRole: 'Academic Coach',
        readTime: '6 Min Read',
    },
];

