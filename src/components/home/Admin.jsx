import { useState, useEffect } from 'react'
import { db } from '../../firebase/config'
import { collection, getDocs, orderBy, query, deleteDoc, doc, updateDoc } from 'firebase/firestore'
import Preloader from '../layout/Preloader'

const Admin = () => {
    const [messages, setMessages] = useState([])
    const [subscribers, setSubscribers] = useState([])
    const [bookings, setBookings] = useState([])
    const [loading, setLoading] = useState(true)
    const [pageLoading, setPageLoading] = useState(true)
    const [activeTab, setActiveTab] = useState('bookings')
    const [toast, setToast] = useState({ show: false, message: '', type: 'success' })

    const [confirmBox, setConfirmBox] = useState({
        show: false,
        message: '',
        action: null
    })

    const fetchData = async () => {
        setLoading(true)
        try {
            // Fetch messages
            const messagesSnapshot = await getDocs(query(collection(db, 'messages'), orderBy('createdAt', 'desc')))
            setMessages(messagesSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })))

            // Fetch subscribers
            const subscribersSnapshot = await getDocs(query(collection(db, 'subscribers'), orderBy('subscribedAt', 'desc')))
            setSubscribers(subscribersSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })))

            // Fetch bookings
            const bookingsSnapshot = await getDocs(query(collection(db, 'bookings'), orderBy('createdAt', 'desc')))
            setBookings(bookingsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })))
        } catch (error) {
            console.error('Error fetching data:', error)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        const timer = setTimeout(() => {
            setPageLoading(false)
            fetchData()
        }, 1500)
        return () => clearTimeout(timer)
    }, [])

    const showToast = (message, type = 'success') => {
        setToast({ show: true, message, type })
        setTimeout(() => setToast({ show: false, message: '', type: 'success' }), 3000)
    }

    const showConfirm = (message, action) => {
        setConfirmBox({
            show: true,
            message,
            action
        })
    }

    const handleConfirm = async () => {
        if (confirmBox.action) {
            await confirmBox.action()
        }

        setConfirmBox({
            show: false,
            message: '',
            action: null
        })
    }

    const closeConfirm = () => {
        setConfirmBox({
            show: false,
            message: '',
            action: null
        })
    }

    const handleDeleteMessage = async (id) => {
        showConfirm('Delete this message?', async () => {
            await deleteDoc(doc(db, 'messages', id))
            showToast('Message deleted')
            fetchData()
        })
    }

    const handleDeleteSubscriber = async (id) => {
        showConfirm('Remove this subscriber?', async () => {
            await deleteDoc(doc(db, 'subscribers', id))
            showToast('Subscriber removed')
            fetchData()
        })
    }

    const handleDeleteBooking = async (id) => {
        showConfirm('Delete this booking?', async () => {
            await deleteDoc(doc(db, 'bookings', id))
            showToast('Booking deleted')
            fetchData()
        })
    }

    const handleUpdateBookingStatus = async (id, newStatus) => {
        await updateDoc(doc(db, 'bookings', id), { status: newStatus })
        showToast(`Booking ${newStatus}`)
        fetchData()
    }

    const getStatusBadge = (status) => {
        const badges = {
            pending: <span className="status-badge status-pending">Pending</span>,
            confirmed: <span className="status-badge status-confirmed">Confirmed</span>,
            cancelled: <span className="status-badge status-cancelled">Cancelled</span>
        }
        return badges[status] || badges.pending
    }

    if (pageLoading) return <Preloader />

    return (
        <div className="admin-page">
            {/* Toast Notification */}
            <div className={`admin-toast ${toast.show ? 'show' : ''} ${toast.type === 'error' ? 'toast-error' : ''}`}>
                <div className="toast-icon">
                    {toast.type === 'success' ? (
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <polyline points="20 6 9 17 4 12"></polyline>
                        </svg>
                    ) : (
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <circle cx="12" cy="12" r="10"></circle>
                            <line x1="12" y1="8" x2="12" y2="12"></line>
                            <line x1="12" y1="16" x2="12.01" y2="16"></line>
                        </svg>
                    )}
                </div>
                <span className="toast-message">{toast.message}</span>
            </div>

            {/* Confirm Dialog */}
            {confirmBox.show && (
                <div className="confirm-overlay">
                    <div className="confirm-box">
                        <div className="confirm-icon">⚠️</div>
                        <h3>Confirm Action</h3>
                        <p>{confirmBox.message}</p>
                        <div className="confirm-actions">
                            <button className="confirm-cancel" onClick={closeConfirm}>
                                Cancel
                            </button>
                            <button className="confirm-delete" onClick={handleConfirm}>
                                Yes Delete
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Admin Header */}
            <div className="admin-header">
                <div className="admin-badge">MANAGEMENT PORTAL</div>
                <h1 className="admin-title">Dashboard</h1>
                <p className="admin-subtitle">Manage bookings, messages & subscribers</p>
            </div>

            {/* Admin Tabs */}
            <div className="admin-tabs">
                <button className={`tab-btn ${activeTab === 'bookings' ? 'active' : ''}`} onClick={() => setActiveTab('bookings')}>
                    Bookings <span className="tab-count">{bookings.length}</span>
                </button>
                <button className={`tab-btn ${activeTab === 'messages' ? 'active' : ''}`} onClick={() => setActiveTab('messages')}>
                    Messages <span className="tab-count">{messages.length}</span>
                </button>
                <button className={`tab-btn ${activeTab === 'subscribers' ? 'active' : ''}`} onClick={() => setActiveTab('subscribers')}>
                    Subscribers <span className="tab-count">{subscribers.length}</span>
                </button>
            </div>

            {/* Admin Content */}
            <div className="admin-content">
                {loading ? (
                    <div className="loading-state">
                        <div className="loading-spinner"></div>
                        <p>Loading...</p>
                    </div>
                ) : (
                    <>
                        {activeTab === 'bookings' && (
                            <div className="bookings-grid">
                                {bookings.length === 0 ? (
                                    <div className="empty-state">
                                        <h3>No bookings yet</h3>
                                        <p>Booking requests will appear here</p>
                                    </div>
                                ) : (
                                    bookings.map(booking => (
                                        <div key={booking.id} className="booking-item">
                                            <div className="booking-item-header">
                                                <div>
                                                    <h4>{booking.customerName}</h4>
                                                    <div className="customer-info">
                                                        <span>{booking.customerEmail}</span>
                                                        <span>{booking.customerPhone}</span>
                                                    </div>
                                                </div>
                                                {getStatusBadge(booking.status)}
                                            </div>

                                            <div className="booking-dates">
                                                <div>
                                                    <span className="label">Check-in</span>
                                                    <strong>{booking.checkInDate}</strong>
                                                </div>
                                                <div>
                                                    <span className="label">Check-out</span>
                                                    <strong>{booking.checkOutDate}</strong>
                                                </div>
                                                <div>
                                                    <span className="label">Nights</span>
                                                    <strong className="text-primary">{booking.nights}</strong>
                                                </div>
                                            </div>

                                            <div className="booking-details-row">
                                                <span>{booking.rooms} Room{booking.rooms > 1 ? 's' : ''}</span>
                                                <span>{booking.guests} Guest{booking.guests > 1 ? 's' : ''}</span>
                                                <span>{booking.createdAt?.slice(0, 10)}</span>
                                            </div>

                                            <div className="booking-actions">
                                                {booking.status === 'pending' && (
                                                    <>
                                                        <button className="btn-confirm" onClick={() => handleUpdateBookingStatus(booking.id, 'confirmed')}>
                                                            Confirm
                                                        </button>
                                                        <button className="btn-cancel" onClick={() => handleUpdateBookingStatus(booking.id, 'cancelled')}>
                                                            Cancel
                                                        </button>
                                                    </>
                                                )}
                                                {booking.status === 'confirmed' && (
                                                    <button className="btn-cancel" onClick={() => handleUpdateBookingStatus(booking.id, 'cancelled')}>
                                                        Cancel
                                                    </button>
                                                )}
                                                <button className="btn-delete" onClick={() => handleDeleteBooking(booking.id)}>
                                                    Delete
                                                </button>
                                            </div>
                                        </div>
                                    ))
                                )}
                            </div>
                        )}

                        {activeTab === 'messages' && (
                            <div className="messages-grid">
                                {messages.length === 0 ? (
                                    <div className="empty-state">
                                        <h3>No messages yet</h3>
                                        <p>Contact messages will appear here</p>
                                    </div>
                                ) : (
                                    messages.map(msg => (
                                        <div key={msg.id} className="message-item">
                                            <div className="message-header">
                                                <div>
                                                    <h4>{msg.name}</h4>
                                                    <span className="message-email">{msg.email}</span>
                                                </div>
                                                <div className="message-date-badge">{msg.createdAt?.slice(0, 10)}</div>
                                            </div>
                                            <div className="message-subject">
                                                <strong>Subject:</strong> {msg.subject}
                                            </div>
                                            <div className="message-body">{msg.message}</div>
                                            <div className="message-footer">
                                                <button className="delete-btn" onClick={() => handleDeleteMessage(msg.id)}>
                                                    Delete Message
                                                </button>
                                            </div>
                                        </div>
                                    ))
                                )}
                            </div>
                        )}

                        {activeTab === 'subscribers' && (
                            <div className="subscribers-grid">
                                {subscribers.length === 0 ? (
                                    <div className="empty-state">
                                        <h3>No subscribers yet</h3>
                                        <p>Newsletter subscribers will appear here</p>
                                    </div>
                                ) : (
                                    subscribers.map(sub => (
                                        <div key={sub.id} className="subscriber-item">
                                            <div>
                                                <h4>{sub.name}</h4>
                                                <p>{sub.email}</p>
                                                <small>Joined: {sub.subscribedAt?.slice(0, 10)}</small>
                                            </div>
                                            <button className="delete-btn" onClick={() => handleDeleteSubscriber(sub.id)}>
                                                Remove
                                            </button>
                                        </div>
                                    ))
                                )}
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    )
}

export default Admin