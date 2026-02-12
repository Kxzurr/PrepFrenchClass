import { CartItem } from '@/src/types/shop';
import musicCourse1 from '@/src/assets/images/music/music-course-1.png';
import danceCourse4 from '@/src/assets/images/dance/dance-course-4.jpg';
import foodCourse1 from '@/src/assets/images/food/food-course-1.png';
import lngCourse2 from '@/src/assets/images/language/lng-course-2.jpg';
import campusBlog3 from '@/src/assets/images/campus/campus-blog-3.png';

export const cartItems: CartItem[] = [
    {
        id: '1',
        image: musicCourse1,
        imageAlt: 'Music Course',
        title: 'Guitar Basics',
        titleHref: '/courses/single',
        description: 'Learn chords and play songs easily.',
        price: 25.0,
        quantity: 1,
    },
    {
        id: '2',
        image: danceCourse4,
        imageAlt: 'Dance Course',
        title: 'Hip Hop Moves',
        titleHref: '/courses/single',
        description: 'Learn freestyle and rhythm styles.',
        price: 30.0,
        quantity: 3,
    },
    {
        id: '3',
        image: foodCourse1,
        imageAlt: 'Cooking Course',
        title: 'Home Cooking',
        titleHref: '/courses/single',
        description: 'Quick recipes for everyday meals.',
        price: 20.0,
        quantity: 1,
    },
    {
        id: '4',
        image: lngCourse2,
        imageAlt: 'Language Course',
        title: 'Spanish Basics',
        titleHref: '/courses/single',
        description: 'Start speaking Spanish easily.',
        price: 22.0,
        quantity: 2,
    },
    {
        id: '5',
        image: campusBlog3,
        imageAlt: 'University Course',
        title: 'Campus Success',
        titleHref: '/courses/single',
        description: 'Master study and life skills.',
        price: 28.0,
        quantity: 3,
    },
];

