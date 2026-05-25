// src/components/home/Contact.jsx
import { useState } from 'react'
import { db } from '../../firebase/config'
import { collection, addDoc } from 'firebase/firestore'
import { getAuth, signInAnonymously } from 'firebase/auth'

const ContactSection = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    })

    const [isSubmitting, setIsSubmitting] = useState(false)
    const [submitStatus, setSubmitStatus] = useState(null)

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setIsSubmitting(true)
        setSubmitStatus(null)

        try {
            // Sign in anonymously to allow writing to Firestore
            const auth = getAuth()
            await signInAnonymously(auth)

            // Add message to Firestore
            const docRef = await addDoc(collection(db, 'messages'), {
                name: formData.name,
                email: formData.email,
                subject: formData.subject,
                message: formData.message,
                createdAt: new Date().toISOString(),
                isRead: false
            })

            console.log('Message saved with ID:', docRef.id)
            setSubmitStatus('success')

            // Clear form
            setFormData({
                name: '',
                email: '',
                subject: '',
                message: ''
            })

            // Auto-hide success message after 5 seconds
            setTimeout(() => setSubmitStatus(null), 5000)
        } catch (error) {
            console.error('Error saving message:', error)
            setSubmitStatus('error')
            setTimeout(() => setSubmitStatus(null), 5000)
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <section id="contact" className="contact-section padding-medium">
            <div className="container">
                {/* Section Header */}
                <div className="text-center mb-5" data-aos="fade-up">
                    <span className="contact-subtitle">Get In Touch</span>
                    <h2 className="display-3 fw-normal mb-3">Contact Us</h2>
                    <p className="col-lg-7 mx-auto text-muted">
                        Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
                    </p>
                </div>

                <div className="row g-5">
                    {/* Contact Info */}
                    <div className="col-lg-4" data-aos="fade-right">
                        <div className="contact-info-card">
                            <div className="contact-info-item">
                                <div className="contact-icon">
                                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                                        <circle cx="12" cy="10" r="3"></circle>
                                    </svg>
                                </div>
                                <div>
                                    <h4>Visit Us</h4>
                                    <p>123 Serenity Avenue<br />Tranquil City, TC 12345</p>
                                </div>
                            </div>

                            <div className="contact-info-item">
                                <div className="contact-icon">
                                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                                        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.362 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.338 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"></path>
                                    </svg>
                                </div>
                                <div>
                                    <h4>Call Us</h4>
                                    <p>+666 333 9999<br />+666 333 8888</p>
                                </div>
                            </div>

                            <div className="contact-info-item">
                                <div className="contact-icon">
                                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                                        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                                        <polyline points="22,6 12,13 2,6"></polyline>
                                    </svg>
                                </div>
                                <div>
                                    <h4>Email Us</h4>
                                    <p>info@hotelmellow.com<br />reservations@hotelmellow.com</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Contact Form */}
                    <div className="col-lg-8" data-aos="fade-left">
                        <div className="contact-form-wrapper">
                            {submitStatus === 'success' && (
                                <div className="alert-success-custom" style={{
                                    backgroundColor: '#d4edda',
                                    color: '#155724',
                                    padding: '12px 20px',
                                    borderRadius: '10px',
                                    marginBottom: '20px',
                                    border: '1px solid #c3e6cb'
                                }}>
                                    ✓ Thank you for your message! We'll get back to you soon.
                                </div>
                            )}

                            {submitStatus === 'error' && (
                                <div className="alert-error-custom" style={{
                                    backgroundColor: '#f8d7da',
                                    color: '#721c24',
                                    padding: '12px 20px',
                                    borderRadius: '10px',
                                    marginBottom: '20px',
                                    border: '1px solid #f5c6cb'
                                }}>
                                    ✗ Something went wrong. Please try again.
                                </div>
                            )}

                            <form onSubmit={handleSubmit}>
                                <div className="row g-4">
                                    <div className="col-md-6">
                                        <input
                                            type="text"
                                            name="name"
                                            className="contact-input"
                                            placeholder="Your Name *"
                                            value={formData.name}
                                            onChange={handleChange}
                                            required
                                            style={{
                                                width: '100%',
                                                padding: '12px 16px',
                                                border: '1px solid #ddd',
                                                borderRadius: '8px',
                                                fontSize: '16px'
                                            }}
                                        />
                                    </div>
                                    <div className="col-md-6">
                                        <input
                                            type="email"
                                            name="email"
                                            className="contact-input"
                                            placeholder="Your Email *"
                                            value={formData.email}
                                            onChange={handleChange}
                                            required
                                            style={{
                                                width: '100%',
                                                padding: '12px 16px',
                                                border: '1px solid #ddd',
                                                borderRadius: '8px',
                                                fontSize: '16px'
                                            }}
                                        />
                                    </div>
                                    <div className="col-12">
                                        <input
                                            type="text"
                                            name="subject"
                                            className="contact-input"
                                            placeholder="Subject *"
                                            value={formData.subject}
                                            onChange={handleChange}
                                            required
                                            style={{
                                                width: '100%',
                                                padding: '12px 16px',
                                                border: '1px solid #ddd',
                                                borderRadius: '8px',
                                                fontSize: '16px'
                                            }}
                                        />
                                    </div>
                                    <div className="col-12">
                                        <textarea
                                            name="message"
                                            className="contact-textarea"
                                            rows="5"
                                            placeholder="Your Message *"
                                            value={formData.message}
                                            onChange={handleChange}
                                            required
                                            style={{
                                                width: '100%',
                                                padding: '12px 16px',
                                                border: '1px solid #ddd',
                                                borderRadius: '8px',
                                                fontSize: '16px',
                                                resize: 'vertical'
                                            }}
                                        ></textarea>
                                    </div>
                                    <div className="col-12">
                                        <button
                                            type="submit"
                                            className="contact-submit-btn"
                                            disabled={isSubmitting}
                                            style={{
                                                backgroundColor: '#D16806',
                                                color: 'white',
                                                border: 'none',
                                                padding: '12px 32px',
                                                borderRadius: '50px',
                                                fontSize: '16px',
                                                fontWeight: '600',
                                                cursor: isSubmitting ? 'not-allowed' : 'pointer',
                                                display: 'inline-flex',
                                                alignItems: 'center',
                                                gap: '8px',
                                                transition: 'all 0.3s ease'
                                            }}
                                        >
                                            {isSubmitting ? 'Sending...' : 'Send Message'}
                                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                <line x1="5" y1="12" x2="19" y2="12"></line>
                                                <polyline points="12 5 19 12 12 19"></polyline>
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default ContactSection