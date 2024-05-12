import { useRef, useState, useEffect } from 'react';
import { useAuth } from 'hooks/useAuth';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button, Input, Form, Checkbox } from 'antd';
import { MailOutlined, LockOutlined } from '@ant-design/icons';
import axios from 'api/axios';

const LOGIN_URL = '/auth/login';

function Login() {
    const { setAuth, persist, setPersist } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const from = location?.state?.from?.pathname || '/';

    const errRef = useRef();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errMsg, setErrMsg] = useState('');

    useEffect(() => {
        const loggedIn = localStorage.getItem('loggedIn');
        if (loggedIn) {
            navigate(from, { replace: true });
        }
    }, [])

    useEffect(() => {
        setErrMsg('');
    }, [email, password])

    const togglePersist = () => {
        setPersist(persist => !persist);
    }

    useEffect(() => {
        localStorage.setItem('persist', persist);
    }, [persist])

    const handleSubmit = async (e) => {
        if(!email || !password) {
            setErrMsg('Email and Passord are required')
            return
        }

        if(!/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(email)){
            setErrMsg('Invalid Email')
            return
        }

        try {
            const response = await axios.post(LOGIN_URL,
                JSON.stringify({ email, password }),
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                }
            );
            const { user, userType, accessToken } = response?.data;
            setAuth({ email, user, userType, accessToken });
            if(persist) {
                localStorage.setItem('loggedIn', true);
            }
            setEmail('');
            setPassword('');
            navigate(from, { replace: true });
        } catch (err) {
            if (!err?.response) {
                setErrMsg('No Server Response');
            } else if (err.response?.status === 400) {
                setErrMsg('Missing Email or Password');
            } else if (err.response?.status === 401) {
                setErrMsg('Wrong Email or Password');
            } else {
                setErrMsg('Login Failed');
            }
        }
    }

    return (
        <div className="flex h-screen w-full items-center justify-center bg-gray-100 light:bg-gray-900">
            <div className="w-full max-w-md space-y-6 rounded-lg bg-white p-8 shadow-lg light:bg-gray-800">
                <div className="space-y-2 text-center">
                    <h1 className="text-3xl font-bold">Login</h1>
                    <p className="text-gray-500 light:text-gray-400">
                        Enter your email and password to access your school account.
                    </p>
                    <p ref={errRef} className={errMsg ? "block text-red-600 underline" : "hidden"} >{errMsg}</p>
                </div>
                <Form className="space-y-6" onFinish={handleSubmit}>
                    <div>
                        <label className="mb-2 block text-sm font-medium text-gray-700 light:text-gray-300" htmlFor="email">
                            Email
                        </label>
                        <Input
                            prefix={<MailOutlined />}
                            variant='filled'
                            size='large'
                            id="email"
                            placeholder="name@example.com"
                            onChange={(e) => setEmail(e.target.value)}
                            value={email}
                        />
                    </div>
                    <div>
                        <label className="mb-2 block text-sm font-medium text-gray-700 light:text-gray-300" htmlFor="password">
                            Password
                        </label>
                        <Input.Password
                            prefix={<LockOutlined />}
                            variant='filled'
                            size='large'
                            id="password"
                            type="password"
                            placeholder="••••••••"
                            onChange={(e) => setPassword(e.target.value)}
                            value={password}
                        />
                    </div>
                    <Button
                        type="primary"
                        size='large'
                        className='w-full'
                        htmlType='submit'
                    >
                        Login
                    </Button>
                    <div>
                        <Checkbox id='persist' onChange={togglePersist} checked={persist} style={{scale: '1.3'}} />
                        <span className='ml-2'>Remember this device?</span>
                    </div>
                </Form>
            </div>
        </div>
    )
}

export default Login;