import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';

const Login = ({ setLogin }) => {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleLogin = (e) => {
        e.preventDefault();

        const users = [
            { username: 'user1', password: 'password1' },
            { username: 'user2', password: 'password2' },
            { username: 'user3', password: 'password3' },
        ];

        const user = users.find((user) => user.username === username && user.password === password);

        if (user) {
            const encryptText = (text) => {
                const encryptedText = btoa(text);
                return encryptedText;
            };
            const originalText = username;
            const encryptedText = encryptText(originalText);
            localStorage.setItem('token', encryptedText);

            setLogin(true)
            navigate('/');
        } else {
            setError('Username Passwor Salah');
        }
    };

    return (
        <div className='login_page'>
            <h1>Login Dulu</h1>
            <Form onSubmit={handleLogin}>
                <Form.Group controlId="username">
                    <Form.Label>Username:</Form.Label>
                    <Form.Control
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </Form.Group>
                <Form.Group controlId="password">
                    <Form.Label>Password:</Form.Label>
                    <Form.Control
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </Form.Group>
                <Button variant="primary" className='mt-2' type="submit">Login</Button>
            </Form>
            {error && <p>{error}</p>}
            <ul className='mt-4'>
                <li>user1, password1</li>
                <li>user2, password2</li>
                <li>user3, password3</li>
            </ul>
        </div>
    );
};

export default Login;
