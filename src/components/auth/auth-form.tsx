
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useNavigate } from 'react-router-dom';
import Logo from '@/components/ui/logo';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';

// Password validation criteria
const passwordCriteria = [
  { id: 'length', label: 'At least 8 characters', regex: /.{8,}/ },
  { id: 'uppercase', label: 'At least one uppercase letter', regex: /[A-Z]/ },
  { id: 'lowercase', label: 'At least one lowercase letter', regex: /[a-z]/ },
  { id: 'number', label: 'At least one number', regex: /\d/ },
  { id: 'special', label: 'At least one special character', regex: /[!@#$%^&*(),.?":{}|<>]/ },
];

const AuthForm = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('signin');
  const [emailSentDialogOpen, setEmailSentDialogOpen] = useState(false);
  const [registeredEmail, setRegisteredEmail] = useState('');
  
  // Sign Up form state
  const [signUpForm, setSignUpForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  
  // Sign In form state
  const [signInForm, setSignInForm] = useState({
    email: '',
    password: '',
  });
  
  // Validate password against criteria
  const validatePassword = (password: string) => {
    return passwordCriteria.map(criterion => ({
      ...criterion,
      valid: criterion.regex.test(password),
    }));
  };
  
  const passwordValidation = validatePassword(signUpForm.password);
  const allCriteriaMet = passwordValidation.every(criterion => criterion.valid);
  const passwordsMatch = signUpForm.password === signUpForm.confirmPassword;
  
  // Check if all sign up fields are filled and valid
  const signUpFormValid = 
    signUpForm.firstName !== '' && 
    signUpForm.lastName !== '' && 
    signUpForm.email !== '' && 
    signUpForm.password !== '' && 
    signUpForm.confirmPassword !== '' &&
    passwordsMatch &&
    allCriteriaMet;

  // Check if all sign in fields are filled
  const signInFormValid = 
    signInForm.email !== '' && 
    signInForm.password !== '';

  const handleSignUpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // In a real app, you'd send this to your backend
    console.log('Sign Up Form Submitted:', signUpForm);
    
    // Save user data in localStorage (simulating database storage)
    const userData = {
      firstName: signUpForm.firstName,
      lastName: signUpForm.lastName,
      email: signUpForm.email,
      password: signUpForm.password, // In a real app, you'd never store plain text passwords
      verified: false,
      dateCreated: new Date().toISOString()
    };
    
    // Store in localStorage (simulating a database)
    localStorage.setItem(`user_${signUpForm.email}`, JSON.stringify(userData));
    
    // Show email confirmation dialog
    setRegisteredEmail(signUpForm.email);
    setEmailSentDialogOpen(true);
  };

  const handleSignInSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Check if user exists in localStorage
    const userData = localStorage.getItem(`user_${signInForm.email}`);
    
    if (!userData) {
      toast.error('User not found. Please sign up.');
      return;
    }
    
    const user = JSON.parse(userData);
    
    // Check password (simple comparison for demo purposes)
    if (user.password !== signInForm.password) {
      toast.error('Invalid password');
      return;
    }
    
    // Check if user is verified
    if (!user.verified) {
      toast.warning('Please verify your email before signing in');
      setRegisteredEmail(signInForm.email);
      setEmailSentDialogOpen(true);
      return;
    }
    
    // Simulate successful login
    toast.success('Sign in successful!');
    
    // Save current user to localStorage
    localStorage.setItem('currentUser', JSON.stringify({
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      verified: user.verified
    }));
    
    // Navigate to workspace selection
    navigate('/workspace');
  };

  const handleTabChange = (value: string) => {
    setActiveTab(value);
  };
  
  const handleVerifyEmail = () => {
    // Simulate email verification
    const userData = localStorage.getItem(`user_${registeredEmail}`);
    
    if (userData) {
      const user = JSON.parse(userData);
      user.verified = true;
      localStorage.setItem(`user_${registeredEmail}`, JSON.stringify(user));
      toast.success('Email verified successfully! You can now sign in.');
      setEmailSentDialogOpen(false);
      setActiveTab('signin');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gradient-to-b from-white to-unitask-muted">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Logo size="large" />
          <p className="text-muted-foreground mt-2">Team Project Management for Students</p>
        </div>
        
        <Card className="w-full shadow-lg">
          <CardHeader>
            <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="signin">Sign In</TabsTrigger>
                <TabsTrigger value="signup">Sign Up</TabsTrigger>
              </TabsList>
              
              <TabsContent value="signin" className="mt-0">
                <form onSubmit={handleSignInSubmit}>
                  <CardContent className="space-y-4 pt-4">
                    <div className="space-y-2">
                      <Label htmlFor="signin-email">Email</Label>
                      <Input 
                        id="signin-email" 
                        type="email" 
                        placeholder="yourname@university.edu" 
                        value={signInForm.email}
                        onChange={(e) => setSignInForm({...signInForm, email: e.target.value})}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="signin-password">Password</Label>
                        <a href="#" className="text-xs text-unitask-primary hover:underline">Forgot password?</a>
                      </div>
                      <Input 
                        id="signin-password" 
                        type="password" 
                        value={signInForm.password}
                        onChange={(e) => setSignInForm({...signInForm, password: e.target.value})}
                        required
                      />
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button type="submit" className="w-full bg-unitask-primary hover:bg-unitask-secondary" disabled={!signInFormValid}>
                      SIGN IN
                    </Button>
                  </CardFooter>
                </form>
              </TabsContent>
              
              <TabsContent value="signup" className="mt-0">
                <form onSubmit={handleSignUpSubmit}>
                  <CardContent className="space-y-4 pt-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="firstName">First Name</Label>
                        <Input 
                          id="firstName" 
                          value={signUpForm.firstName}
                          onChange={(e) => setSignUpForm({...signUpForm, firstName: e.target.value})}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="lastName">Last Name</Label>
                        <Input 
                          id="lastName" 
                          value={signUpForm.lastName}
                          onChange={(e) => setSignUpForm({...signUpForm, lastName: e.target.value})}
                          required
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="signup-email">Email</Label>
                      <Input 
                        id="signup-email" 
                        type="email" 
                        placeholder="yourname@university.edu" 
                        value={signUpForm.email}
                        onChange={(e) => setSignUpForm({...signUpForm, email: e.target.value})}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="signup-password">Password</Label>
                      <Input 
                        id="signup-password" 
                        type="password" 
                        value={signUpForm.password}
                        onChange={(e) => setSignUpForm({...signUpForm, password: e.target.value})}
                        required
                      />
                      
                      <div className="mt-2 space-y-2 text-xs">
                        <p className="font-medium text-muted-foreground">Password must contain:</p>
                        <ul className="space-y-1">
                          {passwordValidation.map((criterion) => (
                            <li 
                              key={criterion.id} 
                              className={`flex items-center ${criterion.valid ? 'text-green-600' : 'text-muted-foreground'}`}
                            >
                              {criterion.valid ? '✓' : '○'} {criterion.label}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="confirmPassword">Confirm Password</Label>
                      <Input 
                        id="confirmPassword" 
                        type="password" 
                        value={signUpForm.confirmPassword}
                        onChange={(e) => setSignUpForm({...signUpForm, confirmPassword: e.target.value})}
                        required
                      />
                      {signUpForm.confirmPassword && !passwordsMatch && (
                        <p className="text-xs text-red-500 mt-1">Passwords do not match</p>
                      )}
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button type="submit" className="w-full bg-unitask-primary hover:bg-unitask-secondary" disabled={!signUpFormValid}>
                      SIGN UP
                    </Button>
                  </CardFooter>
                </form>
              </TabsContent>
            </Tabs>
          </CardHeader>
        </Card>
      </div>
      
      {/* Email Verification Dialog */}
      <Dialog open={emailSentDialogOpen} onOpenChange={setEmailSentDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Email Verification Required</DialogTitle>
            <DialogDescription>
              We've sent a verification email to {registeredEmail}. Please check your inbox and click the verification link.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <p className="text-sm text-muted-foreground">
              For this demo, you can click the button below to simulate clicking on the verification link in the email.
            </p>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setEmailSentDialogOpen(false)}>Close</Button>
            <Button onClick={handleVerifyEmail}>Verify Email</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AuthForm;
