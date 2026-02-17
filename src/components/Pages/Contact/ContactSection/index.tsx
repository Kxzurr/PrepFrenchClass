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
        message: '',
    });

    const [courses, setCourses] = useState<Array<{ id: string; title: string }>>([]);

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
                        .filter((course: any) => course?.id && course?.title)
                        .map((course: any) => ({ id: course.id, title: course.title }))
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
                <div className="grid grid-cols-12 gap-6 lg:gap-1 items-center">
                    {/* Left Column - Contact Info & Map */}
                    <div className="col-span-12 lg:col-span-5">
                       <p className="text-gray-600 dark:text-dark-400 mb-6 max-w-2xl">
                            Have questions about our French courses, TEF Canada, or TCF Canada preparation programs? Whether you are learning French for Canada PR, work permit pathways, career growth, or personal development, our team is here to support you at every step.
<br /> <br />
                            Contact us for detailed course information, upcoming batch schedules, fee structure, or guidance on choosing the right program. You can also request a free live demo class to experience our teaching style, interaction level, and course structure before enrolling.
<br /> <br />
                            Simply fill out the contact form, send us a message on WhatsApp, or email us to book your free demo session. We typically respond within 24 hours to ensure you receive quick and clear assistance.
                        </p>
                        <div className="space-y-3 mb-8">
                            <div className="flex items-center gap-2">
                                <RiPhoneLine className="w-5 h-5 shrink-0 text-primary-600" />
                                <p className="text-gray-700 dark:text-gray-300">+1 (234) 567-8900</p>
                            </div>

                            <div className="flex items-center gap-2">
                                <RiMailLine className="w-5 h-5 shrink-0 text-primary-600" />
                                <a
                                    href="mailto:info@prepfrenchclasses.com"
                                    className="text-md text-gray-700 dark:text-gray-300 hover:text-primary-600 transition-colors"
                                >
                                    info@prepfrenchclasses.com
                                </a>
                            </div>

                            <div className="flex items-center gap-2">
                                <RiMapPinLine className="w-5 h-5 shrink-0 text-primary-600" />
                                <p className="text-gray-700 dark:text-gray-300">
                                    Mississauga, Ontario, Canada
                                </p>
                            </div>
                        </div>

                        <h3 className="text-primary-950 dark:text-primary-100 lg:text-3xl mb-5 leading-snug">
                            Find Our Location
                        </h3>
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d184985.77678765866!2d-79.49434774999999!3d43.57732645!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x882b469fe76b05b7%3A0x3146cbed75966db!2sMississauga%2C%20ON%2C%20Canada!5e0!3m2!1sen!2sin!4v1770889977153!5m2!1sen!2sin"
                            width="100%"
                            height="330"
                            className="rounded-xl"
                            style={{ border: 0 }}
                            allowFullScreen
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                            title="Google Maps - New York, NY, USA"
                        />
                    </div>

                    {/* Right Column - Contact Form */}
                    <div className="col-span-12 lg:col-span-6 lg:col-end-13">
                        <div className="border border-gray-200 dark:border-gray-800 rounded-2xl lg:p-8 p-5">
                            <h3 className="text-primary-950 dark:text-primary-100/80 mb-4">Send us a Message</h3>
                            <p className="text-gray-600 dark:text-dark-400 mb-8">
                                We&apos;d love to hear from you! Fill out the form below and our team will get in touch soon.
                            </p>

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

                                        <div className="md:col-span-2">
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

