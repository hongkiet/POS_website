import { useState } from 'react';
import axios from 'axios';

function ChangePassword() {
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const token = localStorage.getItem('token');
            if (!token) {
                setMessage('Please log in first.');
                return;
            }

            const response = await axios.post('/api/account/change-password', {
                currentPassword,
                newPassword,
                confirmPassword,
            }, {
                headers: {
                    Authorization: token
                }
            });

            const { code, message } = response.data;

            if (code === 0) {
                setMessage(message);
                window.alert('Password changed successfully');
                window.location.href = '/';
            } else {
                setMessage(message);
            }
        } catch (error) {
            setMessage('An error occurred');
        }
    };

    return (
        <div className="card">
            <div className="card-body py-5">
                <div className="d-flex justify-content-center align-items-center vh-90">
                    <form onSubmit={handleSubmit} className="border p-4">
                        <div className="form-group">
                            <label htmlFor="currentPassword">Current Password:</label>
                            <input
                                type="password"
                                id="currentPassword"
                                className="form-control"
                                value={currentPassword}
                                onChange={(event) => setCurrentPassword(event.target.value)}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="newPassword">New Password:</label>
                            <input
                                type="password"
                                id="newPassword"
                                className="form-control"
                                value={newPassword}
                                onChange={(event) => setNewPassword(event.target.value)}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="confirmPassword">Confirm Password:</label>
                            <input
                                type="password"
                                id="confirmPassword"
                                className="form-control"
                                value={confirmPassword}
                                onChange={(event) => setConfirmPassword(event.target.value)}
                            />
                        </div>
                        <div></div>
                        <button type="submit" className="btn btn-primary ml-4">Change Password</button>
                        {message && (
                            <div className={message.startsWith('Success') ? 'alert alert-success' : 'alert alert-danger'}>
                                {message}
                            </div>
                        )}
                    </form>
                </div>
            </div>
        </div>
    );
}

export default ChangePassword;
