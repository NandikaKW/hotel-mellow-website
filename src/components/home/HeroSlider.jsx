// src/components/home/HeroSlider.jsx
import { useState, useEffect } from 'react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { db } from '../../firebase/config'
import { collection, addDoc } from 'firebase/firestore'

const HeroSlider = () => {
    const [checkIn, setCheckIn] = useState(new Date())
    const [checkOut, setCheckOut] = useState(new Date())
    const [rooms, setRooms] = useState(1)
    const [guests, setGuests] = useState(1)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [submitStatus, setSubmitStatus] = useState(null)
    const [customerName, setCustomerName] = useState('')
    const [customerEmail, setCustomerEmail] = useState('')
    const [customerPhone, setCustomerPhone] = useState('')
    const [showBookingForm, setShowBookingForm] = useState(false)

    // Set min date for checkout (can't be before checkin)
    useEffect(() => {
        if (checkOut < checkIn) {
            setCheckOut(checkIn)
        }
    }, [checkIn, checkOut])

    const handleBookingSubmit = async (e) => {
        e.preventDefault()
        setIsSubmitting(true)
        setSubmitStatus(null)

        // Validate dates
        if (checkOut <= checkIn) {
            setSubmitStatus({ type: 'error', message: 'Check-out date must be after check-in date' })
            setIsSubmitting(false)
            return
        }

        // Calculate nights
        const nights = Math.ceil((checkOut - checkIn) / (1000 * 60 * 60 * 24))

        try {
            // Add booking to Firestore
            const bookingData = {
                customerName: customerName,
                customerEmail: customerEmail,
                customerPhone: customerPhone,
                checkIn: checkIn.toISOString(),
                checkOut: checkOut.toISOString(),
                checkInDate: checkIn.toLocaleDateString(),
                checkOutDate: checkOut.toLocaleDateString(),
                rooms: rooms,
                guests: guests,
                nights: nights,
                status: 'pending',
                createdAt: new Date().toISOString()
            }

            await addDoc(collection(db, 'bookings'), bookingData)

            setSubmitStatus({
                type: 'success',
                message: `✓ Booking request submitted! We'll contact you within 24 hours to confirm your ${nights}-night stay.`
            })

            // Reset form
            setCustomerName('')
            setCustomerEmail('')
            setCustomerPhone('')
            setCheckIn(new Date())
            setCheckOut(new Date())
            setRooms(1)
            setGuests(1)
            setShowBookingForm(false)

            // Auto-hide success message after 5 seconds
            setTimeout(() => setSubmitStatus(null), 5000)
        } catch (error) {
            console.error('Error saving booking:', error)
            setSubmitStatus({ type: 'error', message: '✗ Something went wrong. Please try again.' })
            setTimeout(() => setSubmitStatus(null), 5000)
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <section id="slider" data-aos="fade-up">
            <div className="container-fluid padding-side">
                <div
                    className="hero-slider rounded-4 d-flex align-items-center"
                    style={{
                        backgroundImage: "linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.3)), url('https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=1600')",
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        minHeight: '85vh'
                    }}
                >
                    <div className="container py-5">
                        <div className="row align-items-center">
                            {/* Left Content */}
                            <div className="col-lg-6 mb-5 mb-lg-0" data-aos="fade-right">
                                <h1 className="hero-title display-1 fw-normal mb-4">
                                    Hotel Mellow<br />Your Gateway to Serenity.
                                </h1>
                                <a href="/rooms" className="hero-explore-btn">
                                    <span>Explore Rooms</span>
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <line x1="5" y1="12" x2="19" y2="12"></line>
                                        <polyline points="12 5 19 12 12 19"></polyline>
                                    </svg>
                                </a>
                            </div>

                            {/* Booking Form */}
                            <div className="col-lg-5 offset-lg-1" data-aos="fade-left">
                                <div className="booking-card-wrapper">
                                    <h2 className="booking-title">
                                        {showBookingForm ? 'Complete Your Booking' : 'Check Availability'}
                                    </h2>

                                    {/* Status Messages */}
                                    {submitStatus && (
                                        <div className={`booking-alert booking-alert-${submitStatus.type}`}>
                                            {submitStatus.message}
                                        </div>
                                    )}

                                    {!showBookingForm ? (
                                        // Availability Form
                                        <>
                                            <div className="form-group">
                                                <label className="form-label">Check-In</label>
                                                <div className="date-input-wrapper">
                                                    <DatePicker
                                                        selected={checkIn}
                                                        onChange={date => setCheckIn(date)}
                                                        className="form-input"
                                                        dateFormat="MMM dd, yyyy"
                                                        minDate={new Date()}
                                                    />
                                                    <svg className="date-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                        <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                                                        <line x1="16" y1="2" x2="16" y2="6"></line>
                                                        <line x1="8" y1="2" x2="8" y2="6"></line>
                                                        <line x1="3" y1="10" x2="21" y2="10"></line>
                                                    </svg>
                                                </div>
                                            </div>

                                            <div className="form-group">
                                                <label className="form-label">Check-Out</label>
                                                <div className="date-input-wrapper">
                                                    <DatePicker
                                                        selected={checkOut}
                                                        onChange={date => setCheckOut(date)}
                                                        className="form-input"
                                                        dateFormat="MMM dd, yyyy"
                                                        minDate={checkIn}
                                                    />
                                                    <svg className="date-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                        <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                                                        <line x1="16" y1="2" x2="16" y2="6"></line>
                                                        <line x1="8" y1="2" x2="8" y2="6"></line>
                                                        <line x1="3" y1="10" x2="21" y2="10"></line>
                                                    </svg>
                                                </div>
                                            </div>

                                            <div className="form-row">
                                                <div className="form-group">
                                                    <label className="form-label">Rooms</label>
                                                    <input
                                                        type="number"
                                                        className="form-input"
                                                        value={rooms}
                                                        onChange={(e) => setRooms(parseInt(e.target.value))}
                                                        min="1"
                                                        max="10"
                                                    />
                                                </div>
                                                <div className="form-group">
                                                    <label className="form-label">Guests</label>
                                                    <input
                                                        type="number"
                                                        className="form-input"
                                                        value={guests}
                                                        onChange={(e) => setGuests(parseInt(e.target.value))}
                                                        min="1"
                                                        max="20"
                                                    />
                                                </div>
                                            </div>

                                            <button
                                                className="booking-btn booking-btn-primary w-100"
                                                onClick={() => {
                                                    const nights = Math.ceil((checkOut - checkIn) / (1000 * 60 * 60 * 24))
                                                    if (nights < 1) {
                                                        setSubmitStatus({ type: 'error', message: 'Please select a valid check-out date' })
                                                        setTimeout(() => setSubmitStatus(null), 3000)
                                                        return
                                                    }
                                                    setShowBookingForm(true)
                                                }}
                                            >
                                                Continue to Booking
                                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                    <line x1="5" y1="12" x2="19" y2="12"></line>
                                                    <polyline points="12 5 19 12 12 19"></polyline>
                                                </svg>
                                            </button>
                                        </>
                                    ) : (
                                        // Customer Details Form
                                        <form onSubmit={handleBookingSubmit}>
                                            <div className="form-group">
                                                <label className="form-label">Full Name *</label>
                                                <input
                                                    type="text"
                                                    className="form-input"
                                                    value={customerName}
                                                    onChange={(e) => setCustomerName(e.target.value)}
                                                    required
                                                    placeholder="John Doe"
                                                />
                                            </div>

                                            <div className="form-group">
                                                <label className="form-label">Email Address *</label>
                                                <input
                                                    type="email"
                                                    className="form-input"
                                                    value={customerEmail}
                                                    onChange={(e) => setCustomerEmail(e.target.value)}
                                                    required
                                                    placeholder="john@example.com"
                                                />
                                            </div>

                                            <div className="form-group">
                                                <label className="form-label">Phone Number *</label>
                                                <input
                                                    type="tel"
                                                    className="form-input"
                                                    value={customerPhone}
                                                    onChange={(e) => setCustomerPhone(e.target.value)}
                                                    required
                                                    placeholder="+1 234 567 8900"
                                                />
                                            </div>

                                            {/* Booking Summary */}
                                            <div className="booking-summary">
                                                <h6>Booking Summary</h6>
                                                <div className="summary-item">
                                                    <span>Check-in:</span>
                                                    <strong>{checkIn.toLocaleDateString()}</strong>
                                                </div>
                                                <div className="summary-item">
                                                    <span>Check-out:</span>
                                                    <strong>{checkOut.toLocaleDateString()}</strong>
                                                </div>
                                                <div className="summary-item">
                                                    <span>Nights:</span>
                                                    <strong className="text-primary">{Math.ceil((checkOut - checkIn) / (1000 * 60 * 60 * 24))}</strong>
                                                </div>
                                                <div className="summary-item">
                                                    <span>Rooms:</span>
                                                    <strong>{rooms}</strong>
                                                </div>
                                                <div className="summary-item">
                                                    <span>Guests:</span>
                                                    <strong>{guests}</strong>
                                                </div>
                                            </div>

                                            <div className="booking-actions-row">
                                                <button
                                                    type="button"
                                                    className="booking-btn booking-btn-secondary"
                                                    onClick={() => setShowBookingForm(false)}
                                                >
                                                    Back
                                                </button>
                                                <button
                                                    type="submit"
                                                    className="booking-btn booking-btn-primary"
                                                    disabled={isSubmitting}
                                                >
                                                    {isSubmitting ? 'Submitting...' : 'Submit Request'}
                                                </button>
                                            </div>
                                        </form>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default HeroSlider