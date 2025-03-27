import React, { useState } from 'react';
import axios from 'axios';



export default function ContactPage() {
    // State variables to manage form input
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });

    // State to display success/error feedback
    const [status, setStatus] = useState("");

    // Handle input change
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.id]: e.target.value
        });
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8080/rre/api/v1/contact', formData);
            if (response.status === 200) {
                setStatus("Message sent successfully!");
                setFormData({ name: '', email: '', message: '' });
            }
        } catch (error) {
            setStatus("Error sending message. Please try again later.");
            console.error("Submission error:", error);
        }
    };

    return (
        <>
    

            {/* Contact Form Section */}
            <div className="container mt-5">
                <h2 className="text-center">Contact Us</h2>
                <p className="text-center">Have a question? Reach out to us, and we'll get back to you as soon as possible.</p>

                <div className="row">
                    {/* Contact Form */}
                    <div className="col-md-6">
                        <form onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <label htmlFor="name" className="form-label">Name</label>
                                <input 
                                    type="text" 
                                    className="form-control" 
                                    id="name" 
                                    placeholder="Enter your name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="email" className="form-label">Email</label>
                                <input 
                                    type="email" 
                                    className="form-control" 
                                    id="email" 
                                    placeholder="Enter your email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="message" className="form-label">Message</label>
                                <textarea 
                                    className="form-control" 
                                    id="message" 
                                    rows="4" 
                                    placeholder="Enter your message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    required
                                ></textarea>
                            </div>
                            <button type="submit" className="btn btn-primary">Send Message</button>
                        </form>

                        {/* Feedback message */}
                        {status && <p className="mt-3">{status}</p>}
                    </div>

                    {/* Contact Information */}
                    <div className="col-md-6">
                        <h4>Contact Details</h4>
                        <p><strong>Email:</strong> support@rre.com</p>
                        <p><strong>Phone:</strong> +254797434209</p>
                        <p><strong>Address:</strong> Nairobi, Kenya</p>
                    </div>
                </div>
            </div>

          
        </>
    );
}
