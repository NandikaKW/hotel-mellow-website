import 'react'

const InfoStats = () => {
    const stats = [
        { value: '25K', label: 'Happy Customer' },
        { value: '160', label: 'Total Rooms' },
        { value: '25', label: 'Award Wins' },
        { value: '200', label: 'Total Members' }
    ]

    return (
        <section id="info" className="py-5">
            <div className="container" data-aos="fade-up">
                <div className="row text-center">
                    {stats.map((stat, index) => (
                        <div key={index} className="col-md-3 mb-4 mb-lg-0">
                            <h3 className="display-1 fw-normal text-primary">{stat.value}</h3>
                            <p className="text-capitalize">{stat.label}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default InfoStats