import { useState } from 'react'
import logoFooter from '../../assets/images/main-logo-footer.png'
import { db } from '../../firebase/config'
import { collection, addDoc } from 'firebase/firestore'

const Footer = () => {
    const [email, setEmail] = useState('')
    const [name, setName] = useState('')
    const [popup, setPopup] = useState({
        show: false,
        type: 'success',
        title: '',
        message: ''
    })

    // Scroll to section function
    const scrollToSection = (sectionId) => {
        const section = document.getElementById(sectionId)
        if (section) {
            section.scrollIntoView({ behavior: 'smooth' })
        }
    }

    const showPopup = (type, title, message) => {
        setPopup({
            show: true,
            type,
            title,
            message
        })

        setTimeout(() => {
            setPopup({
                show: false,
                type: 'success',
                title: '',
                message: ''
            })
        }, 3500)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!name || !email) {
            showPopup(
                'error',
                'Missing Information',
                'Please fill in both name and email.'
            )
            return
        }

        try {
            await addDoc(collection(db, 'subscribers'), {
                name: name,
                email: email,
                subscribedAt: new Date().toISOString()
            })

            showPopup(
                'success',
                'Subscription Successful',
                'Thank you for subscribing to Hotel Mellow updates.'
            )

            setName('')
            setEmail('')
        } catch (error) {
            console.error('Error subscribing:', error)

            showPopup(
                'error',
                'Something Went Wrong',
                'Please try again later.'
            )
        }
    }

    const socialIcons = [
        { name: 'facebook', icon: '#facebook' },
        { name: 'twitter', icon: '#twitter' },
        { name: 'instagram', icon: '#instagram' },
        { name: 'linkedin', icon: '#linkedin' },
        { name: 'youtube', icon: '#youtube' }
    ]

    // Quick links - using sectionId for scrolling
    const quickLinks = [
        { name: 'Home', sectionId: 'slider' },
        { name: 'About Us', sectionId: 'about-us' },
        { name: 'Our Services', sectionId: 'services' },
        { name: 'Rooms', sectionId: 'room' },
        { name: 'Blog', sectionId: 'blog' },
        { name: 'Contact', sectionId: 'contact' }
    ]

    const serviceLinks = [
        { name: 'Spa & Wellness', sectionId: 'services' },
        { name: 'Rooftop Pool', sectionId: 'services' },
        { name: 'Yoga & Meditation', sectionId: 'services' },
        { name: 'Fitness Center', sectionId: 'services' },
        { name: 'Fine Dining', sectionId: 'services' },
        { name: 'Event Spaces', sectionId: 'services' }
    ]

    return (
        <>
            {popup.show && (
                <div className="subscribe-popup-overlay">
                    <div className={`subscribe-popup ${popup.type === 'error' ? 'popup-error' : ''}`}>
                        <div className="popup-icon">
                            {popup.type === 'success' ? '✓' : '⚠'}
                        </div>

                        <h3>{popup.title}</h3>

                        <p>{popup.message}</p>

                        <div className="popup-progress"></div>
                    </div>
                </div>
            )}

            <footer className="footer">
                <div className="footer-main">
                    <div className="container">
                        <div className="row g-4">
                            <div className="col-lg-4 col-md-6">
                                <div className="footer-widget">
                                    <img src={logoFooter} alt="Mellow Hotel" className="footer-logo" />
                                    <p className="footer-description">
                                        Welcome to Hotel Mellow, where comfort meets tranquility. Nestled in the heart of a bustling city,
                                        our hotel offers a peaceful retreat for both business and leisure travelers.
                                    </p>
                                    <div className="footer-social">
                                        {socialIcons.map((social, index) => (
                                            <a key={index} href="#" className="social-link" aria-label={social.name}>
                                                <svg width="18" height="18"><use href={social.icon}></use></svg>
                                            </a>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            <div className="col-lg-2 col-md-6">
                                <div className="footer-widget">
                                    <h4 className="footer-widget-title">Quick Links</h4>
                                    <ul className="footer-links">
                                        {quickLinks.map((link, index) => (
                                            <li key={index}>
                                                <button onClick={() => scrollToSection(link.sectionId)} className="footer-link-btn">
                                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                        <polyline points="9 18 15 12 9 6"></polyline>
                                                    </svg>
                                                    {link.name}
                                                </button>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>

                            <div className="col-lg-3 col-md-6">
                                <div className="footer-widget">
                                    <h4 className="footer-widget-title">Our Services</h4>
                                    <ul className="footer-links">
                                        {serviceLinks.map((link, index) => (
                                            <li key={index}>
                                                <button onClick={() => scrollToSection(link.sectionId)} className="footer-link-btn">
                                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                        <polyline points="9 18 15 12 9 6"></polyline>
                                                    </svg>
                                                    {link.name}
                                                </button>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>

                            <div className="col-lg-3 col-md-6">
                                <div className="footer-widget">
                                    <h4 className="footer-widget-title">Newsletter</h4>
                                    <p className="newsletter-text">Subscribe to get special offers and updates</p>
                                    <form onSubmit={handleSubmit} className="newsletter-form">
                                        <input
                                            type="text"
                                            className="newsletter-input"
                                            placeholder="Your Name"
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                            required
                                        />
                                        <input
                                            type="email"
                                            className="newsletter-input"
                                            placeholder="Your Email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            required
                                        />
                                        <button type="submit" className="newsletter-btn">
                                            Subscribe
                                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                <line x1="5" y1="12" x2="19" y2="12"></line>
                                                <polyline points="12 5 19 12 12 19"></polyline>
                                            </svg>
                                        </button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="footer-contact-bar">
                    <div className="container">
                        <div className="contact-info-wrapper">
                            <div className="contact-item">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                                    <circle cx="12" cy="10" r="3"></circle>
                                </svg>
                                <span>123 Serenity Avenue, Tranquil City</span>
                            </div>
                            <div className="contact-item">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <rect x="5" y="2" width="14" height="20" rx="2" ry="2"></rect>
                                    <line x1="12" y1="18" x2="12.01" y2="18"></line>
                                </svg>
                                <span>+666 333 9999</span>
                            </div>
                            <div className="contact-item">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                                    <polyline points="22,6 12,13 2,6"></polyline>
                                </svg>
                                <span>info@hotelmellow.com</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="footer-bottom">
                    <div className="container">
                        <div className="footer-bottom-content">
                            <p className="copyright">© 2024 Hotel Mellow. All rights reserved.</p>
                            <div className="footer-bottom-links">
                                <button onClick={() => scrollToSection('slider')}>Privacy Policy</button>
                                <button onClick={() => scrollToSection('slider')}>Terms of Service</button>
                                <button onClick={() => scrollToSection('slider')}>FAQs</button>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
        </>
    )
}

export default Footer