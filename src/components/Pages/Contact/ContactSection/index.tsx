'use client';

import { useEffect, useState } from 'react';
import { RiPhoneLine, RiMailLine, RiMapPinLine, RiSendPlaneLine } from '@remixicon/react';

export default function ContactSection() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        phone: '',
        course: '',
        language: '',
        message: '',
    });

    const [courses, setCourses] = useState<Array<{ id: string; title: string }>>([]);
    const [selectedLocation, setSelectedLocation] = useState('Mississauga');

    const locations = [
        {
            name: 'Mississauga',
            address: '55 Village Centre Place, Unit 200',
            city: 'Mississauga, ON L4Z 1V9',
            country: 'Canada',
            mapEmbed: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2889.0!2d-79.64!3d43.59!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDMuNTkwMDAxLC03OS42NDAwMDA!5e0!3m2!1sen!2sca!4v1233486290'
        },
        {
            name: 'Toronto',
            address: '1200 Bay Street Suite 202',
            city: 'Toronto, ON M5R 2A5',
            country: 'Canada',
            mapEmbed: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2883.0!2d-79.78!3d43.67!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDMuNjcwMDAxLC03OS43ODAwMDA!5e0!3m2!1sen!2sca!4v1233486290'
        },
        {
            name: 'Vaughan',
            address: '3300 Highway 7 W, Suite 600',
            city: 'Vaughan, ON L4L 1A6',
            country: 'Canada',
            mapEmbed: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2897.0!2d-79.49!3d43.84!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDMuODQwMDAxLC03OS40OTAwMDA!5e0!3m2!1sen!2sca!4v1233486290'
        },
        {
            name: 'Scarborough',
            address: '1225 Kennedy Rd',
            city: 'Scarborough, ON M1P 4Y1',
            country: 'Canada',
            mapEmbed: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2881.0!2d-79.24!3d43.77!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDMuNzcwMDAxLC03OS4yNDAwMDA!5e0!3m2!1sen!2sca!4v1233486290'
        },
        {
            name: 'Oakville',
            address: '231 Oak Park Blvd., Suite 301',
            city: 'Oakville, ON L6H 7S8',
            country: 'Canada',
            mapEmbed: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2896.0!2d-79.67!3d43.47!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDMuNDcwMDAxLC03OS42NzAwMDA!5e0!3m2!1sen!2sca!4v1233486290'
        }
    ];

    const currentLocation = locations.find(loc => loc.name === selectedLocation) || locations[0];

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
    const [submitMessage, setSubmitMessage] = useState('');

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const response = await fetch('/api/courses?limit=1000');
                if (!response.ok) return;
                const data = await response.json();
                const list = Array.isArray(data.data) ? data.data : data.courses || [];
                setCourses(
                    list
                        .filter((course: Record<string, unknown>) => course?.id && course?.title)
                        .map((course: Record<string, unknown>) => ({ id: String(course.id), title: String(course.title) }))
                );
            } catch (error) {
                console.error('Error fetching courses:', error);
            }
        };

        fetchCourses();
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setSubmitStatus('idle');
        setSubmitMessage('');
        
        try {
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            const result = await response.json();

            if (!response.ok || !result?.success) {
                throw new Error(result?.error || 'Failed to send message.');
            }

            setSubmitStatus('success');
            setSubmitMessage('Message sent successfully!');
            setFormData({
                name: '',
                email: '',
                subject: '',
                phone: '',
                course: '',
                language: '',
                message: '',
            });
        } catch (error) {
            console.error('Contact form error:', error);
            setSubmitStatus('error');
            setSubmitMessage('Failed to send message. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <section className="lg:py-30 py-20">
            <div className="container">
                <div className="grid grid-cols-12 gap-6 lg:gap-12 items-start">
                    {/* Left Column - Contact Info & Map */}
                    <div className="col-span-12 lg:col-span-5">
                        <p className="text-gray-600 dark:text-dark-400 mb-8 max-w-2xl leading-relaxed text-lg">
                            Have questions about our French courses, TEF Canada, or TCF Canada preparation programs? Whether you are learning French for Canada PR, work permit pathways, career growth, or personal development, our team is here to support you at every step.
                        </p>
                        
                        {/* Contact Info Cards */}
                        <div className="space-y-4 mb-10">
                            <div className="flex items-start gap-4 p-4 rounded-xl bg-primary-50 dark:bg-primary-900/20 border border-primary-100 dark:border-primary-800/50 hover:shadow-md transition-shadow">
                                <div className="w-12 h-12 rounded-full bg-primary-600 flex items-center justify-center flex-shrink-0">
                                    <RiPhoneLine className="w-6 h-6 text-white" />
                                </div>
                                <div>
                                    <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-1">Phone</h4>
                                    <p className="text-gray-700 dark:text-gray-300">+1 (234) 567-8900</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4 p-4 rounded-xl bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800/50 hover:shadow-md transition-shadow">
                                <div className="w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center flex-shrink-0">
                                    <RiMailLine className="w-6 h-6 text-white" />
                                </div>
                                <div>
                                    <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-1">Email</h4>
                                    <a
                                        href="mailto:info@prepfrenchclasses.com"
                                        className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors font-medium"
                                    >
                                        info@prepfrenchclasses.com
                                    </a>
                                </div>
                            </div>

                            <div className="flex items-start gap-4 p-4 rounded-xl bg-green-50 dark:bg-green-900/20 border border-green-100 dark:border-green-800/50 hover:shadow-md transition-shadow">
                                <div className="w-12 h-12 rounded-full bg-green-600 flex items-center justify-center flex-shrink-0">
                                    <RiMapPinLine className="w-6 h-6 text-white" />
                                </div>
                                <div>
                                    <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-1">Locations</h4>
                                    <p className="text-gray-700 dark:text-gray-300">Multiple offices across Ontario</p>
                                </div>
                            </div>
                        </div>

                        <p className="text-gray-600 dark:text-dark-400 mb-8 leading-relaxed">
                            Contact us for detailed course information, upcoming batch schedules, fee structure, or guidance on choosing the right program. You can also request a free live demo class to experience our teaching style, interaction level, and course structure before enrolling.
                        </p>

                        <p className="text-gray-600 dark:text-dark-400 mb-10 leading-relaxed">
                            Simply fill out the contact form, send us a message on WhatsApp, or email us to book your free demo session. We typically respond within 24 hours to ensure you receive quick and clear assistance.
                        </p>

                        <h3 className="text-primary-950 dark:text-primary-100 lg:text-3xl mb-6 leading-snug font-bold">
                            Find Our Location
                        </h3>

                        {/* Location Selector */}
                        <div className="mb-6">
                            <label 
                                htmlFor="location-select" 
                                className="block text-gray-700 dark:text-gray-300 font-semibold mb-2"
                            >
                                Select Office Location
                            </label>
                            <select
                                id="location-select"
                                value={selectedLocation}
                                onChange={(e) => setSelectedLocation(e.target.value)}
                                className="w-full border border-gray-300 dark:border-gray-800 rounded-xl px-4 py-3 bg-white dark:bg-dark-950 text-gray-700 dark:text-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all duration-300"
                            >
                                {locations.map((location) => (
                                    <option key={location.name} value={location.name}>
                                        {location.name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Display Selected Address */}
                        <div className="mb-6 p-5 bg-gradient-to-br from-primary-50 to-blue-50 dark:from-primary-900/30 dark:to-blue-900/30 rounded-xl border border-primary-200 dark:border-primary-800">
                            <h4 className="font-bold text-primary-950 dark:text-primary-100 mb-3 text-lg">{currentLocation.name}</h4>
                            <p className="text-gray-700 dark:text-gray-300 font-medium">{currentLocation.address}</p>
                            <p className="text-gray-700 dark:text-gray-300 font-medium">{currentLocation.city}</p>
                        </div>

                        <iframe
                            src={currentLocation.mapEmbed}
                            width="100%"
                            height="330"
                            className="rounded-xl shadow-lg"
                            style={{ border: 0 }}
                            allowFullScreen
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                            title={`Google Maps - ${currentLocation.name}`}
                        />
                    </div>

                    {/* Right Column - Contact Form */}
                    <div className="col-span-12 lg:col-span-7 lg:sticky lg:top-24 lg:max-h-[calc(100vh-96px)]">
                        <div className="border border-gray-200 dark:border-gray-800 rounded-2xl lg:p-10 p-6 shadow-lg hover:shadow-2xl transition-shadow bg-white dark:bg-dark-900/50 backdrop-blur-sm lg:overflow-y-auto">
                            <div className="mb-8">
                                <h3 className="text-3xl font-bold text-primary-950 dark:text-primary-100 mb-3">Send us a Message</h3>
                                <p className="text-gray-600 dark:text-dark-400 text-lg">
                                    We&apos;d love to hear from you! Fill out the form below and our team will get in touch soon.
                                </p>
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-5">
                                {submitStatus !== 'idle' && (
                                    <div
                                        className={`rounded-lg border px-4 py-3 text-sm ${
                                            submitStatus === 'success'
                                                ? 'border-green-200 bg-green-50 text-green-700'
                                                : 'border-red-200 bg-red-50 text-red-700'
                                        }`}
                                    >
                                        {submitMessage}
                                    </div>
                                )}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label
                                            htmlFor="name"
                                            className="block text-gray-700 dark:text-gray-300 font-semibold mb-2"
                                        >
                                            Full Name
                                        </label>
                                        <input
                                            type="text"
                                            id="name"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            placeholder="Your full name"
                                            className="w-full border border-gray-300 dark:border-gray-800 rounded-xl px-4 py-3 bg-white dark:bg-dark-950 text-gray-700 dark:text-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all duration-300"
                                            required
                                        />
                                    </div>

                                    <div>
                                        <label
                                            htmlFor="email"
                                            className="block text-gray-700 dark:text-gray-300 font-semibold mb-2"
                                        >
                                            Email Address
                                        </label>
                                        <input
                                            type="email"
                                            id="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            placeholder="Your email address"
                                            className="w-full border border-gray-300 dark:border-gray-800 rounded-xl px-4 py-3 bg-white dark:bg-dark-950 text-gray-700 dark:text-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all duration-300"
                                            required
                                        />
                                    </div>

                                    <div>
                                        <label
                                            htmlFor="subject"
                                            className="block text-gray-700 dark:text-gray-300 font-semibold mb-2"
                                        >
                                            Subject
                                        </label>
                                        <input
                                            type="text"
                                            id="subject"
                                            name="subject"
                                            value={formData.subject}
                                            onChange={handleChange}
                                            placeholder="Enter message subject"
                                            className="w-full border border-gray-300 dark:border-gray-800 rounded-xl px-4 py-3 bg-white dark:bg-dark-950 text-gray-700 dark:text-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all duration-300"
                                        />
                                    </div>

                                    <div>
                                        <label
                                            htmlFor="phone"
                                            className="block text-gray-700 dark:text-gray-300 font-semibold mb-2"
                                        >
                                            Phone Number
                                        </label>
                                        <input
                                            type="tel"
                                            id="phone"
                                            name="phone"
                                            value={formData.phone}
                                            onChange={handleChange}
                                            placeholder="Your contact number"
                                            className="w-full border border-gray-300 dark:border-gray-800 rounded-xl px-4 py-3 bg-white dark:bg-dark-950 text-gray-700 dark:text-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all duration-300"
                                        />
                                        </div>

                                        <div>
                                            <label
                                                htmlFor="course"
                                                className="block text-gray-700 dark:text-gray-300 font-semibold mb-2"
                                            >
                                                Select Course
                                            </label>
                                            <select
                                                id="course"
                                                name="course"
                                                value={formData.course}
                                                onChange={handleChange}
                                                className="w-full border border-gray-300 dark:border-gray-800 rounded-xl px-4 py-3 bg-white dark:bg-dark-950 text-gray-700 dark:text-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all duration-300"
                                            >
                                                <option value="">Select a course</option>
                                                {courses.map((course) => (
                                                    <option key={course.id} value={course.title}>
                                                        {course.title}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>

                                        <div>
                                            <label
                                                htmlFor="language"
                                                className="block text-gray-700 dark:text-gray-300 font-semibold mb-2"
                                            >
                                                Language Learning Path
                                            </label>
                                            <select
                                                id="language"
                                                name="language"
                                                value={formData.language}
                                                onChange={handleChange}
                                                className="w-full border border-gray-300 dark:border-gray-800 rounded-xl px-4 py-3 bg-white dark:bg-dark-950 text-gray-700 dark:text-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all duration-300"
                                            >
                                                <option value="">Select learning path</option>
                                                <option value="English to French">English to French</option>
                                                <option value="Hindi to French">Hindi to French</option>
                                            </select>
                                        </div>
                                </div>

                                <div>
                                    <label
                                        htmlFor="message"
                                        className="block text-gray-700 dark:text-gray-300 font-semibold mb-2"
                                    >
                                        Message
                                    </label>
                                    <textarea
                                        id="message"
                                        name="message"
                                        rows={5}
                                        value={formData.message}
                                        onChange={handleChange}
                                        placeholder="Write your message here..."
                                        className="w-full border border-gray-300 dark:border-gray-800 rounded-xl px-4 py-3 bg-white dark:bg-dark-950 text-gray-700 dark:text-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all duration-300 resize-none"
                                        required
                                    />
                                </div>

                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="btn w-full btn-primary flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    <span>{isSubmitting ? 'Sending...' : 'Send Your Message'}</span>
                                    <RiSendPlaneLine className="size-4" />
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

