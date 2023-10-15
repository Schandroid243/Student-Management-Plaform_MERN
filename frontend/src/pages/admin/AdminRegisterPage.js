import * as React from 'react';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Grid, Box, Typography, Paper, Checkbox, FormControlLabel, TextField, CssBaseline, IconButton, InputAdornment, CircularProgress} from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import bgpic from "../../assets/designlogin.jpg"
import { LightPurpleButton } from '../../components/buttonStyles';
import { registerUser } from '../../redux/userRelated/userHandle';
import styled from 'styled-components';
import Popup from '../../components/Popup';
import axios from 'axios';

import PasswordStrengthIndicator from '../../components/password';

const defaultTheme = createTheme();

const AdminRegisterPage = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const { status, currentUser, response, error, currentRole } = useSelector(state => state.user);;

    const [toggle, setToggle] = useState(false)
    const [loader, setLoader] = useState(false)
    const [showPopup, setShowPopup] = useState(false);
    const [message, setMessage] = useState("");
    const [emailError, setEmailError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);
    const [retypePasswordError, setRetypePasswordError] = useState(false); // Add retypePasswordError state
    const [adminNameError, setAdminNameError] = useState(false);
    const [schoolNameError, setSchoolNameError] = useState(false);
    const role = "Admin"
    const [password, setPassword] = useState(""); // Define a state variable for password
    // Add a state variable for retypePassword
    const [retypePassword, setRetypePassword] = useState("");

    const [showPasswordStrengthIndicator, 
          setShowPasswordStrengthIndicator] = useState(false);


    const handleSubmit = (event) => {
        event.preventDefault();
    
        const name = event.target.adminName.value;
        const schoolName = event.target.schoolName.value;
        const email = event.target.email.value;
        const password = event.target.password.value;
        const retypePassword = event.target.retypePassword.value;
    
        if (!name || !schoolName || !email || !password || !retypePassword) {
            if (!name) setAdminNameError(true);
            if (!schoolName) setSchoolNameError(true);
            if (!email) setEmailError(true);
            if (!password) setPasswordError(true);
            if (!retypePassword) setRetypePasswordError(true);
            return;
        }
        if (name === 'password') {
            setPassword(value);
            setShowPasswordStrengthIndicator(true); // Show the password strength indicator
        }
    
        // Make an Axios request to your server to handle registration
        axios
        .post('http://localhost:5000/AdminReg', {
            name,
            email,
            password,
            retypePassword, // Include retypePassword in the data
            role,
            schoolName,
        })
        .then((response) => {
            // Registration successful, handle the success response here if needed
            console.log('Registration successful:', response.data);
    
            // If needed, you can perform additional actions here
    
            // Redirect the user to the admin dashboard
            navigate('/Admin/dashboard');
        })
        .catch((error) => {
            // Registration failed, handle the error
            console.error('Axios error:', error);
    
            // Log the detailed error information
            console.error('Request failed with status code', error.response.status);
            console.error('Response data:', error.response.data);
    
            // Update the state to display an error message to the user
            setMessage('An error occurred while registering.');
            setShowPopup(true); // Show the error popup
            setLoader(false); // Disable the loader
        });
    
    };
    
    const handleInputChange = (event) => {
        const { name , value} = event.target;
        if (name === 'email') setEmailError(false);
        if (name === 'password') setPasswordError(false);
        if (name === 'adminName') setAdminNameError(false);
        if (name === 'schoolName') setSchoolNameError(false);
        if (name === 'retypePassword') setRetypePasswordError(false); // Clear retypePassword error

        if (name === 'password') {
            setPassword(value); 
            setShowPasswordStrengthIndicator(true);// Update the password state when the password input changes
        }
    };
   
    
    useEffect(() => {
        if (status === 'success' || (currentUser !== null && currentRole === 'Admin')) {
            navigate('/Admin/dashboard');
        } else if (status === 'failed') {
            setMessage(response);
            setShowPopup(true);
            setLoader(false);
        } else if (status === 'error') {
            console.log(error);
        }
    }, [status, currentUser, currentRole, navigate, error, response]);


    
    return (
        <ThemeProvider theme={defaultTheme}>
            <Grid container component="main" sx={{ height: '100vh' }}>
                <CssBaseline />
                <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                    <Box
                        sx={{
                            my: 8,
                            mx: 4,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <Typography variant="h4" sx={{ mb: 2, color: "#2c2143" }}>
                            Admin Register
                        </Typography>
                        <Typography variant="h7">
                            Create your own school by registering as an admin.
                            <br />
                            You will be able to add students and faculty and
                            manage the system.
                        </Typography>
                        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 2 }}>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="adminName"
                                label="Enter your name"
                                name="adminName"
                                autoComplete="name"
                                autoFocus
                                error={adminNameError}
                                helperText={adminNameError && 'Name is required'}
                                onChange={handleInputChange}
                            />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="schoolName"
                                label="Create your school name"
                                name="schoolName"
                                autoComplete="off"
                                error={schoolNameError}
                                helperText={schoolNameError && 'School name is required'}
                                onChange={handleInputChange}
                            />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="email"
                                label="Enter your email"
                                name="email"
                                autoComplete="email"
                                error={emailError}
                                helperText={emailError && 'Email is required'}
                                onChange={handleInputChange}
                            />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type={toggle ? 'text' : 'password'}
                                id="password"
                                autoComplete="current-password"
                                error={passwordError}
                                helperText={passwordError && 'Password is required'}
                                onChange={handleInputChange}
                                onFocus={() => setShowPasswordStrengthIndicator(true)}
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton onClick={() => setToggle(!toggle)}>
                                                {toggle ? (
                                                    <Visibility />
                                                ) : (
                                                    <VisibilityOff />
                                                )}
                                            </IconButton>
                                        </InputAdornment>
                                    ),
                                }}
                            />
<PasswordStrengthIndicator password={password} show={showPasswordStrengthIndicator} />

<TextField
    margin="normal"
    required
    fullWidth
    name="retypePassword"
    label="Retype Password"
    type={toggle ? 'text' : 'password'}
    id="retypePassword"
    autoComplete="current-password"
    error={retypePasswordError}
    helperText={retypePasswordError && 'Retype Password is required'}
    onChange={handleInputChange}
    InputProps={{
        endAdornment: (
            <InputAdornment position="end">
                <IconButton onClick={() => setToggle(!toggle)}>
                    {toggle ? (
                        <Visibility />
                    ) : (
                        <VisibilityOff />
                    )}
                </IconButton>
            </InputAdornment>
        ),
    }}
/>

                            <Grid container sx={{ display: "flex", justifyContent: "space-between" }}>
                                <FormControlLabel
                                    control={<Checkbox value="remember" color="primary" />}
                                    label="Remember me"
                                />
                            </Grid>
                            <LightPurpleButton
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                            >
                                {loader ? <CircularProgress size={24} color="inherit"/> : "Register"}
                            </LightPurpleButton>
                            <Grid container>
                                <Grid>
                                    Already have an account?
                                </Grid>
                                <Grid item sx={{ ml: 2 }}>
                                    <StyledLink to="/Adminlogin">
                                        Log in
                                    </StyledLink>
                                </Grid>
                            </Grid>
                        </Box>
                    </Box>
                </Grid>
                <Grid
                    item
                    xs={false}
                    sm={4}
                    md={7}
                    sx={{
                        backgroundImage: `url(${bgpic})`,
                        backgroundRepeat: 'no-repeat',
                        backgroundColor: (t) =>
                            t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                    }}
                />
            </Grid>
            <Popup message={message} setShowPopup={setShowPopup} showPopup={showPopup} />
        </ThemeProvider>
    );
}

export default AdminRegisterPage

const StyledLink = styled(Link)`
  margin-top: 9px;
  text-decoration: none;
  color: #7f56da;
`;
