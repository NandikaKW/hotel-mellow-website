import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import logo from '../../assets/images/main-logo.png'

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false)

    // Prevent body scroll when menu is open
    useEffect(() => {
        if (isMenuOpen) {
            document.body.classList.add('menu-open')
        } else {
            document.body.classList.remove('menu-open')
        }

        return () => {
            document.body.classList.remove('menu-open')
        }
    }, [isMenuOpen])

    // Close menu when window is resized to desktop
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 992 && isMenuOpen) {
                setIsMenuOpen(false)
            }
        }

        window.addEventListener('resize', handleResize)
        return () => window.removeEventListener('resize', handleResize)
    }, [isMenuOpen])

    const scrollToSection = (sectionId) => {
        const section = document.getElementById(sectionId)
        if (section) {
            section.scrollIntoView({ behavior: 'smooth' })
        }
        setIsMenuOpen(false)
    }

    const navLinks = [
        { name: 'Home', sectionId: 'slider' },
        { name: 'About', sectionId: 'about-us' },
        { name: 'Services', sectionId: 'services' },
        { name: 'Rooms', sectionId: 'room' },
        { name: 'Blog', sectionId: 'blog' },
        { name: 'Contact', sectionId: 'contact' }
    ]

    return (
        <header id="header">
            {/* Top Bar - keep as is */}
            <div className="bg-secondary py-2 d-none d-lg-block">
                <div className="container-fluid padding-side">
                    <div className="d-flex justify-content-between align-items-center">
                        <div className="d-flex gap-4">
                            <div className="d-flex align-items-center gap-1">
                                <svg width="14" height="14" className="text-primary">
                                    <use href="#location"></use>
                                </svg>
                                <span className="small">123 Serenity Avenue, Tranquil City</span>
                            </div>
                            <div className="d-flex align-items-center gap-1">
                                <svg width="14" height="14" className="text-primary">
                                    <use href="#phone"></use>
                                </svg>
                                <span className="small">+666 333 9999</span>
                            </div>
                            <div className="d-flex align-items-center gap-1">
                                <svg width="14" height="14" className="text-primary">
                                    <use href="#email"></use>
                                </svg>
                                <span className="small">info@hotelmellow.com</span>
                            </div>
                        </div>
                        <div className="d-flex gap-3">
                            <a href="#"><svg width="16" height="16"><use href="#facebook"></use></svg></a>
                            <a href="#"><svg width="16" height="16"><use href="#twitter"></use></svg></a>
                            <a href="#"><svg width="16" height="16"><use href="#linkedin"></use></svg></a>
                            <a href="#"><svg width="16" height="16"><use href="#instagram"></use></svg></a>
                            <a href="#"><svg width="16" height="16"><use href="#youtube"></use></svg></a>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Navigation */}
            <nav className="navbar navbar-expand-lg py-3">
                <div className="container-fluid padding-side">
                    <Link className="navbar-brand" to="/" onClick={() => scrollToSection('slider')}>
                        <img src={logo} alt="Mellow Hotel" height="50" />
                    </Link>

                    <button
                        className="navbar-toggler border-0"
                        type="button"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        aria-label="Toggle navigation"
                    >
                        <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            {isMenuOpen ? (
                                <line x1="18" y1="6" x2="6" y2="18"></line>
                            ) : (
                                <line x1="3" y1="12" x2="21" y2="12"></line>
                            )}
                            {isMenuOpen ? (
                                <line x1="6" y1="6" x2="18" y2="18"></line>
                            ) : (
                                <>
                                    <line x1="3" y1="6" x2="21" y2="6"></line>
                                    <line x1="3" y1="18" x2="21" y2="18"></line>
                                </>
                            )}
                        </svg>
                    </button>

                    <div className={`collapse navbar-collapse ${isMenuOpen ? 'show' : ''}`}>
                        <ul className="navbar-nav mx-auto mb-2 mb-lg-0">
                            {navLinks.map((link) => (
                                <li key={link.name} className="nav-item px-3">
                                    <button
                                        className="nav-link btn btn-link p-0"
                                        onClick={() => scrollToSection(link.sectionId)}
                                    >
                                        {link.name}
                                    </button>
                                </li>
                            ))}
                        </ul>
                        <div className="search-wrapper">
                            <form className="position-relative" onSubmit={(e) => e.preventDefault()}>
                                <input
                                    type="text"
                                    className="form-control bg-light rounded-pill px-4 py-2"
                                    placeholder="Search..."
                                />
                                <button type="submit" className="position-absolute top-50 end-0 translate-middle-y border-0 bg-transparent me-3">
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <circle cx="11" cy="11" r="8"></circle>
                                        <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                                    </svg>
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </nav>
        </header>
    )
}

export default Header