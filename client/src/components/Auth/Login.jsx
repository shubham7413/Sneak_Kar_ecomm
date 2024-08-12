import { Stack, TextField, Button, Box, Typography, InputAdornment } from '@mui/material';
import { FcGoogle } from 'react-icons/fc';
import LockIcon from '@mui/icons-material/Lock';
import EmailIcon from '@mui/icons-material/Email';
import useAuth from '../../hooks/useAuth';  // Adjust the path based on your structure
import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Notification from './Notification';
import { Link } from 'react-router-dom';

const Login = () => {
    const { user, signIn, googleSignIn } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const [errorOpen, setErrorOpen] = useState(false);
    const [successOpen, setSuccessOpen] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { error } = await signIn(email, password);
        if (error) {
            setError(error.message);
            setErrorOpen(true);
        } else {
            setSuccess('Logged in successfully');
            setSuccessOpen(true);
            setTimeout(() => {
                navigate('/');
            }, 1000);
        }
        resetForm();
    };

    const handleGoogleLogin = async () => {
        const { error } = await googleSignIn();
        if (error) {
            setError(error.message);
            setErrorOpen(true);
        } else {
            setSuccess('Signed in successfully');
            setSuccessOpen(true);
            setTimeout(() => {
                navigate('/');
            }, 1000);
        }
    };

    const handleEmail = (e) => setEmail(e.target.value);
    const handlePassword = (e) => setPassword(e.target.value);
    const resetForm = () => {
        setEmail('');
        setPassword('');
    };

    useEffect(() => {
        if (user) {
            navigate(location.state || '/');
        }
    }, [user, navigate, location.state]);

    return (
        <Box sx={{ width: '100%', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            {/* Error */}
            <Notification message={error} type="error" open={errorOpen} setOpen={setErrorOpen} />
            {/* Success */}
            <Notification message={success} type="success" open={successOpen} setOpen={setSuccessOpen} />
            <Stack spacing={3} maxWidth="400px" width="100%" padding={4} component="form" sx={{ boxShadow: 3, borderRadius: 2, background: 'white' }}>
                <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 700, textAlign: 'center' }}>
                    Sign in
                </Typography>
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    variant='outlined'
                    value={email}
                    onChange={handleEmail}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <EmailIcon />
                            </InputAdornment>
                        ),
                    }}
                />
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="password"
                    label="Password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    variant='outlined'
                    value={password}
                    onChange={handlePassword}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <LockIcon />
                            </InputAdornment>
                        ),
                    }}
                />
                <Button type="submit" fullWidth variant="contained" disableElevation onClick={handleSubmit}>
                    Sign In
                </Button>
                <Typography variant="body2" color="text.secondary" align="center">
                    <Link to="/forgot-password" style={{ textDecoration: 'none' }}>
                        Forgot password?
                    </Link>
                </Typography>
                <Typography variant="body2" color="text.secondary" align="center">
                    Don't have an account?&nbsp;
                    <Link to="/signup" style={{ textDecoration: 'none' }}>
                        Sign up
                    </Link>
                </Typography>
                <Stack direction="row" spacing={2} justifyContent="center" alignItems="center">
                    <Box sx={{ width: '100%', height: '1px', backgroundColor: 'black' }} />
                    <Typography variant="body2" color="text.secondary" align="center">
                        Or
                    </Typography>
                    <Box sx={{ width: '100%', height: '1px', backgroundColor: 'black' }} />
                </Stack>
                <Stack direction="row" spacing={2} justifyContent="center" alignItems="center">
                    <Button variant="outlined" startIcon={<FcGoogle />} sx={{
                        flex: 1, color: 'black', borderColor: 'lightgray', '&:hover': {
                            borderColor: 'gray'
                        },
                    }} onClick={handleGoogleLogin}>
                        Google
                    </Button>
                </Stack>
            </Stack>
        </Box>
    );
};

export default Login;
