import { useEffect, useState } from 'react'

const Preloader = () => {
    const [isVisible, setIsVisible] = useState(true)

    useEffect(() => {
        // Prevent scrolling while preloader is visible
        document.body.style.overflow = 'hidden'
        document.body.style.height = '100vh'

        // Hide preloader after page loads
        const timer = setTimeout(() => {
            setIsVisible(false)
            // Restore scrolling
            document.body.style.overflow = ''
            document.body.style.height = ''
        }, 2000) // Show for 2 seconds

        return () => {
            clearTimeout(timer)
            document.body.style.overflow = ''
            document.body.style.height = ''
        }
    }, [])

    if (!isVisible) return null

    return (
        <div className="preloader">
            <div className="preloader-inner">
                <div className="loader"></div>
                <div className="preloader-text">Welcome to Hotel Mellow</div>
            </div>
        </div>
    )
}

export default Preloader