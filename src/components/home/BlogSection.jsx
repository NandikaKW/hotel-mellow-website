import { Link } from 'react-router-dom'
import post1 from '../../assets/images/post1.jpg'
import post2 from '../../assets/images/post2.jpg'
import post3 from '../../assets/images/post3.jpg'
import post4 from '../../assets/images/post4.jpg'
import post5 from '../../assets/images/post5.jpg'

const BlogSection = () => {
    const posts = [
        {
            image: post3,
            category: 'Hotels',
            title: 'A Day in the Life of a Hotel Mellow Guest',
            date: '22 Feb, 2024',
            size: 'large'
        },
        {
            image: post2,
            category: 'Activities',
            title: 'Guide to Seasonal Activities in the City',
            date: '22 Feb, 2024',
            size: 'small'
        },
        {
            image: post1,
            category: 'Rooms',
            title: 'A Look Inside Hotel Mellow\'s Suites',
            date: '22 Feb, 2024',
            size: 'small'
        },
        {
            image: post5,
            category: 'Activities',
            title: 'Why Hotel Mellow Is the Perfect Staycation Destination',
            date: '22 Feb, 2024',
            size: 'large'
        },
        {
            image: post4,
            category: 'Rooms',
            title: 'The Benefits of Booking Directly with Hotel Mellow',
            date: '22 Feb, 2024',
            size: 'small'
        }
    ]

    return (
        <section id="blog" className="blog-section">
            <div className="container" data-aos="fade-up">
                {/* Header */}
                <div className="text-center mb-5">
                    <span className="blog-badge">Latest Stories</span>
                    <h2 className="display-3 fw-normal mb-3">Our Blogs & Events</h2>
                    <p className="col-lg-7 mx-auto text-muted">
                        Discover inspiring stories, travel tips, and exclusive updates from Hotel Mellow
                    </p>
                </div>

                {/* Blog Grid */}
                <div className="blog-grid">
                    <div className="row g-4">
                        {/* Large Featured Post */}
                        <div className="col-lg-7">
                            <div className="blog-card blog-card-large">
                                <div className="blog-image">
                                    <img src={posts[3].image} alt={posts[3].title} />
                                    <div className="blog-overlay"></div>
                                </div>
                                <div className="blog-content">
                                    <span className="blog-category">{posts[3].category}</span>
                                    <h3 className="blog-title">{posts[3].title}</h3>
                                    <div className="blog-meta">
                                        <span className="blog-date">
                                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                <circle cx="12" cy="12" r="10"></circle>
                                                <polyline points="12 6 12 12 16 14"></polyline>
                                            </svg>
                                            {posts[3].date}
                                        </span>
                                        <span className="blog-read-time">
                                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"></path>
                                            </svg>
                                            5 min read
                                        </span>
                                    </div>
                                    <Link to="/blog" className="blog-link">
                                        <span>Read Article</span>
                                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <line x1="5" y1="12" x2="19" y2="12"></line>
                                            <polyline points="12 5 19 12 12 19"></polyline>
                                        </svg>
                                    </Link>
                                </div>
                            </div>
                        </div>

                        {/* Small Post 1 */}
                        <div className="col-lg-5">
                            <div className="blog-card blog-card-small">
                                <div className="blog-image">
                                    <img src={posts[0].image} alt={posts[0].title} />
                                    <div className="blog-overlay"></div>
                                </div>
                                <div className="blog-content">
                                    <span className="blog-category">{posts[0].category}</span>
                                    <h4 className="blog-title">{posts[0].title}</h4>
                                    <div className="blog-meta">
                                        <span className="blog-date">
                                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                <circle cx="12" cy="12" r="10"></circle>
                                                <polyline points="12 6 12 12 16 14"></polyline>
                                            </svg>
                                            {posts[0].date}
                                        </span>
                                    </div>
                                    <Link to="/blog" className="blog-link">
                                        <span>Read More</span>
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <line x1="5" y1="12" x2="19" y2="12"></line>
                                            <polyline points="12 5 19 12 12 19"></polyline>
                                        </svg>
                                    </Link>
                                </div>
                            </div>
                        </div>

                        {/* Standard Cards Row */}
                        <div className="col-lg-4">
                            <div className="blog-card-standard">
                                <div className="standard-image">
                                    <img src={posts[1].image} alt={posts[1].title} />
                                    <span className="standard-category">{posts[1].category}</span>
                                </div>
                                <div className="standard-content">
                                    <h4 className="standard-title">{posts[1].title}</h4>
                                    <div className="standard-meta">
                                        <span>{posts[1].date}</span>
                                        <span>•</span>
                                        <span>4 min read</span>
                                    </div>
                                    <Link to="/blog" className="standard-link">
                                        Discover More
                                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <line x1="5" y1="12" x2="19" y2="12"></line>
                                            <polyline points="12 5 19 12 12 19"></polyline>
                                        </svg>
                                    </Link>
                                </div>
                            </div>
                        </div>

                        <div className="col-lg-4">
                            <div className="blog-card-standard">
                                <div className="standard-image">
                                    <img src={posts[2].image} alt={posts[2].title} />
                                    <span className="standard-category">{posts[2].category}</span>
                                </div>
                                <div className="standard-content">
                                    <h4 className="standard-title">{posts[2].title}</h4>
                                    <div className="standard-meta">
                                        <span>{posts[2].date}</span>
                                        <span>•</span>
                                        <span>3 min read</span>
                                    </div>
                                    <Link to="/blog" className="standard-link">
                                        Discover More
                                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <line x1="5" y1="12" x2="19" y2="12"></line>
                                            <polyline points="12 5 19 12 12 19"></polyline>
                                        </svg>
                                    </Link>
                                </div>
                            </div>
                        </div>

                        <div className="col-lg-4">
                            <div className="blog-card-standard">
                                <div className="standard-image">
                                    <img src={posts[4].image} alt={posts[4].title} />
                                    <span className="standard-category">{posts[4].category}</span>
                                </div>
                                <div className="standard-content">
                                    <h4 className="standard-title">{posts[4].title}</h4>
                                    <div className="standard-meta">
                                        <span>{posts[4].date}</span>
                                        <span>•</span>
                                        <span>3 min read</span>
                                    </div>
                                    <Link to="/blog" className="standard-link">
                                        Discover More
                                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <line x1="5" y1="12" x2="19" y2="12"></line>
                                            <polyline points="12 5 19 12 12 19"></polyline>
                                        </svg>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* View All Button */}
                <div className="text-center mt-5">
                    <Link to="/blog" className="blog-view-all-btn">
                        <span>Explore All Articles</span>
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <line x1="5" y1="12" x2="19" y2="12"></line>
                            <polyline points="12 5 19 12 12 19"></polyline>
                        </svg>
                    </Link>
                </div>
            </div>
        </section>
    )
}

export default BlogSection