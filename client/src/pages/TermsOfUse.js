import React from 'react';
import './TermsOfUse.css';

const TermsOfUse = () => {
    return (
        <div className="terms-of-use">
            <div className="terms-banner">
                <h1>Terms of Use</h1>
                <p>Understand the rules and regulations for using our platform.</p>
            </div>
            <div className="terms-content">
                <h2>Acceptance of Terms</h2>
                <p>
                    By accessing and using the CyberAegiz platform, you agree to comply with and be bound by these terms. 
                    If you do not agree to these terms, please refrain from using the platform.
                </p>

                <h2>Use of the Platform</h2>
                <p>
                    The platform is intended for personal and professional use. Users must ensure their activities align 
                    with applicable laws and regulations. Unauthorized or harmful use of the platform is strictly prohibited.
                </p>

                <h2>User Responsibilities</h2>
                <p>
                    As a user, you are responsible for maintaining the confidentiality of your account details and ensuring 
                    that any data or content shared does not violate third-party rights or legal standards.
                </p>

                <h2>Intellectual Property</h2>
                <p>
                    All content, designs, and code on the platform are the intellectual property of CyberAegiz. Unauthorized 
                    reproduction or redistribution of our materials is strictly prohibited.
                </p>

                <h2>Limitation of Liability</h2>
                <p>
                    CyberAegiz shall not be held liable for any damages resulting from the use or inability to use the platform. 
                    This includes, but is not limited to, direct, indirect, or consequential damages.
                </p>

                <h2>Modification of Terms</h2>
                <p>
                    CyberAegiz reserves the right to modify these Terms of Use at any time. Continued use of the platform 
                    constitutes acceptance of the updated terms.
                </p>

                <h2>Contact Us</h2>
                <p>
                    If you have any questions or concerns about these terms, please contact us at 
                    <a href="mailto:support@cyberaegiz.com"> support@cyberaegiz.com</a>.
                </p>
            </div>
        </div>
    );
};

export default TermsOfUse;
