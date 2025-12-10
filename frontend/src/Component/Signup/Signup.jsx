import React, {useState} from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";

export default function Signup(){
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email:'',
        password:'',
        confirmPassword:''
    });
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState(false);
    const [isLoading, setIsLoading] = useState(false);  

    const location = useLocation();
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({
        ...formData,
        [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if(formData.password != formData.confirmPassword){
            setError('Password does not match');
            return;
        }

        if(formData.password.length < 6){
            setError('Password must be at least 6 characters');
            return;
        }

        setIsLoading(true);

        try{
            navigate('/');
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Registration failed');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center py-12 px-4">
            <div className="w-full max-w-md bg-white rounded-3xl shadow-xl px-8">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-sage-800">Create Account</h1>
                    <p className="text-sage-500 mt-2">
                        Join us now on a wellness journey
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="firstName" className="block text-sm font-medium text-sage-700 mb-2">
                            First Name
                        </label>
                        <input
                            id="firstName"
                            name="firstName"
                            type="text"
                            value={formData.firstName}
                            onChange={handleChange}
                            required
                            className="input-field"
                            placeholder="John"
                        />
                      </div>
                      <div>
                        <label htmlFor="lastName" className="block text-sm font-medium text-sage-700 mb-2">
                            Last Name
                        </label>
                        <input 
                            id="lastName"
                            name="lastName"
                            type="text"
                            value={formData.lastName}
                            onChange={handleChange}
                            required
                            className="input-field"
                            placeholder="Doe"
                        />
                      </div>   
                    </div>

                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-sage-700 mb-2">
                            Email Address
                        </label>
                        <input 
                            id="email"
                            name="email"
                            type="text"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            className="input-field"
                            placeholder="example123@gmail.com"
                        />
                    </div>
                </form>
            </div>
        </div>
    );
}