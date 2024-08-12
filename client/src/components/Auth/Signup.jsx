/* eslint-disable react/jsx-no-undef */
import { Stack, TextField, Button, Box, Typography, InputAdornment } from '@mui/material';
import LockIcon from '@mui/icons-material/Lock';
import EmailIcon from '@mui/icons-material/Email';
import { useEffect, useState } from 'react';
import useAuth from '../../hooks/useAuth';  // Adjust the path based on your structure
import { useNavigate } from 'react-router-dom';
import Notification from './Notification';
import { Link } from 'react-router-dom';

const Signup = () => {
    const { user, signUp, googleSignIn } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (user) {
            navigate('/');
        }
    }, [user, navigate]);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const [errorOpen, setErrorOpen] = useState(false);
    const [successOpen, setSuccessOpen] = useState(false);

    const handleEmail = (e) => setEmail(e.target.value);
    const handlePassword = (e) => setPassword(e.target.value);
    const handleConfirmPassword = (e) => setConfirmPassword(e.target.value);
    const resetForm = () => {
        setEmail('');
        setPassword('');
        setConfirmPassword('');
    };

    const handleGoogleSignup = async () => {
        const { error } = await googleSignIn();
        if (error) {
            setError(error.message);
            setErrorOpen(true);
        } else {
            setSuccess('Account created successfully');
            setSuccessOpen(true);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setError("Passwords do not match");
            setErrorOpen(true);
            return;
        }

        const { error } = await signUp(email, password);
        if (error) {
            setError(error.message);
            setErrorOpen(true);
        } else {
            setSuccess('Account created successfully');
            setSuccessOpen(true);
            setTimeout(() => {
                navigate('/');
            }, 1000);
            resetForm();
        }
    };

    return (
        <Box sx={{ width: '100%', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            {/* Error */}
            <Notification message={error} type="error" open={errorOpen} setOpen={setErrorOpen} />
            {/* Success */}
            <Notification message={success} type="success" open={successOpen} setOpen={setSuccessOpen} />
            <Stack spacing={3} maxWidth="400px" width="100%" padding={4} component="form" sx={{ boxShadow: 3, borderRadius: 2, backgroundColor: 'white' }}>
                <Typography variant="h4" component="h1" gutterBottom>
                    Sign up
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
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <EmailIcon />
                            </InputAdornment>
                        ),
                    }}
                    value={email}
                    onChange={handleEmail}
                />
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="password"
                    label="Password"
                    name="password"
                    type='password'
                    autoComplete="current-password"
                    variant='outlined'
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <LockIcon />
                            </InputAdornment>
                        ),
                    }}
                    value={password}
                    onChange={handlePassword}
                />
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="confirm-password"
                    label="Confirm Password"
                    name="confirm-password"
                    type='password'
                    autoComplete="confirm-password"
                    variant='outlined'
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <LockIcon />
                            </InputAdornment>
                        ),
                    }}
                    value={confirmPassword}
                    onChange={handleConfirmPassword}
                />
                <Button type="submit" fullWidth variant="contained" disableElevation onClick={handleSubmit}>
                    Submit
                </Button>
                <Typography variant="body2" color="text.secondary" align="center">
                    Already have an account?{' '}
                    <Link to="/login" style={{ textDecoration: 'none' }}>
                        Login
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
                    }} onClick={handleGoogleSignup}>
                        Google
                    </Button>
                </Stack>
            </Stack>
        </Box>
    );
};

export default Signup;
