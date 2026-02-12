'use client';

import { useState } from 'react';
import { RiPhoneLine, RiMailLine, RiMapPinLine, RiSendPlaneLine } from '@remixicon/react';

export default function ContactSection() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        phone: '',
        message: '',
    });

    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        
        // Handle form submission
        console.log('Form submitted:', formData);
        
        // Simulate API call
        setTimeout(() => {
            setIsSubmitting(false);
            alert('Message sent successfully!');
            setFormData({
                name: '',
                email: '',
                subject: '',
                phone: '',
                message: '',
            });
        }, 1000);
    };

    return (
        <section className="lg:py-30 py-20">
            <div className="container">
                <div className="grid grid-cols-12 gap-6 lg:gap-1 items-center">
                    {/* Left Column - Contact Info & Map */}
                    <div className="col-span-12 lg:col-span-5">
                        <p className="text-gray-600 dark:text-dark-400 mb-6 max-w-2xl">
                            We&apos;d love to hear from you! Whether you have questions about our services, need support, or
                            just want to connect — our team is here to help you every step of the way. Reach out to us
                            anytime for inquiries, partnership opportunities, or feedback about your experience. We aim
                            to respond within 24 hours and ensure you get the right assistance quickly and efficiently.
                        </p>

                        <div className="space-y-3 mb-8">
                            <div className="flex items-center gap-2">
                                <RiPhoneLine className="w-5 h-5 shrink-0 text-primary-600" />
                                <p className="text-gray-700 dark:text-gray-300">+1 (234) 567-8900</p>
                            </div>

                            <div className="flex items-center gap-2">
                                <RiMailLine className="w-5 h-5 shrink-0 text-primary-600" />
                                <a
                                    href="mailto:info@classes.com"
                                    className="text-md text-gray-700 dark:text-gray-300 hover:text-primary-600 transition-colors"
                                >
                                    info@classes.com
                                </a>
                            </div>

                            <div className="flex items-center gap-2">
                                <RiMapPinLine className="w-5 h-5 shrink-0 text-primary-600" />
                                <p className="text-gray-700 dark:text-gray-300">
                                    123 Business Avenue, Downtown City, NY 10001, USA
                                </p>
                            </div>
                        </div>

                        <h3 className="text-primary-950 dark:text-primary-100 lg:text-3xl mb-5 leading-snug">
                            Find Our Location
                        </h3>
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d230326.86842593085!2d-74.05718218491116!3d40.66810284241583!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c24fa5d33f083b%3A0xc80b8f06e177fe62!2sNew%20York%2C%20NY%2C%20USA!5e0!3m2!1sen!2sin!4v1761817060688!5m2!1sen!2sin"
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

