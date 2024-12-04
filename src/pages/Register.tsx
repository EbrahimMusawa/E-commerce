import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { 
  User, Mail, Lock, ArrowRight, Eye, EyeOff, 
  CheckCircle2, XCircle, Info, Shield
} from 'lucide-react';
import { register as registerUser } from '../services/api';

interface RegisterFormData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  acceptTerms: boolean;
}

const Register = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting, dirtyFields },
  } = useForm<RegisterFormData>({
    mode: 'onChange',
  });

  const password = watch('password');

  const passwordRequirements = [
    { 
      label: 'At least 8 characters',
      test: (pass: string) => pass.length >= 8 
    },
    { 
      label: 'Contains uppercase letter',
      test: (pass: string) => /[A-Z]/.test(pass)
    },
    { 
      label: 'Contains lowercase letter',
      test: (pass: string) => /[a-z]/.test(pass)
    },
    { 
      label: 'Contains number',
      test: (pass: string) => /\d/.test(pass)
    },
    { 
      label: 'Contains special character',
      test: (pass: string) => /[@$!%*?&]/.test(pass)
    },
  ];

  const onSubmit = async (data: RegisterFormData) => {
    try {
      await registerUser({
        email: data.email,
        name: {
          firstname: data.firstName,
          lastname: data.lastName,
        },
      });
      toast.success('Registration successful! Please sign in.');
      navigate('/login');
    } catch (error) {
      toast.error('Registration failed. Please try again.');
    }
  };

  const togglePasswordVisibility = () => setShowPassword(!showPassword);
  const toggleConfirmPasswordVisibility = () => setShowConfirmPassword(!showConfirmPassword);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center">
          <div className="h-12 w-12 rounded-full bg-indigo-100 flex items-center justify-center">
            <User className="h-6 w-6 text-indigo-600" />
          </div>
        </div>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Create your account
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Already have an account?{' '}
          <Link
            to="/login"
            className="font-medium text-indigo-600 hover:text-indigo-500 transition-colors duration-200"
          >
            Sign in
          </Link>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow-lg shadow-indigo-50/20 sm:rounded-xl sm:px-10">
          <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="firstName"
                  className="block text-sm font-medium text-gray-700"
                >
                  First name
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <input
                    type="text"
                    id="firstName"
                    autoComplete="given-name"
                    className={`appearance-none block w-full px-3 py-2 pl-10 border rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition-colors duration-200 ${
                      errors.firstName ? 'border-red-300' : dirtyFields.firstName ? 'border-green-300' : 'border-gray-300'
                    }`}
                    {...register('firstName', {
                      required: 'First name is required',
                      minLength: {
                        value: 2,
                        message: 'First name must be at least 2 characters',
                      },
                    })}
                  />
                  <User className={`absolute left-3 top-2.5 h-5 w-5 ${
                    errors.firstName ? 'text-red-400' : dirtyFields.firstName ? 'text-green-400' : 'text-gray-400'
                  }`} />
                  {dirtyFields.firstName && !errors.firstName && (
                    <CheckCircle2 className="absolute right-3 top-2.5 h-5 w-5 text-green-400" />
                  )}
                </div>
                {errors.firstName && (
                  <p className="mt-2 text-sm text-red-600 flex items-center">
                    <XCircle className="h-4 w-4 mr-1" />
                    {errors.firstName.message}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="lastName"
                  className="block text-sm font-medium text-gray-700"
                >
                  Last name
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <input
                    type="text"
                    id="lastName"
                    autoComplete="family-name"
                    className={`appearance-none block w-full px-3 py-2 pl-10 border rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition-colors duration-200 ${
                      errors.lastName ? 'border-red-300' : dirtyFields.lastName ? 'border-green-300' : 'border-gray-300'
                    }`}
                    {...register('lastName', {
                      required: 'Last name is required',
                      minLength: {
                        value: 2,
                        message: 'Last name must be at least 2 characters',
                      },
                    })}
                  />
                  <User className={`absolute left-3 top-2.5 h-5 w-5 ${
                    errors.lastName ? 'text-red-400' : dirtyFields.lastName ? 'text-green-400' : 'text-gray-400'
                  }`} />
                  {dirtyFields.lastName && !errors.lastName && (
                    <CheckCircle2 className="absolute right-3 top-2.5 h-5 w-5 text-green-400" />
                  )}
                </div>
                {errors.lastName && (
                  <p className="mt-2 text-sm text-red-600 flex items-center">
                    <XCircle className="h-4 w-4 mr-1" />
                    {errors.lastName.message}
                  </p>
                )}
              </div>
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email address
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <input
                  id="email"
                  type="email"
                  autoComplete="email"
                  className={`appearance-none block w-full px-3 py-2 pl-10 border rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition-colors duration-200 ${
                    errors.email ? 'border-red-300' : dirtyFields.email ? 'border-green-300' : 'border-gray-300'
                  }`}
                  {...register('email', {
                    required: 'Email is required',
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: 'Invalid email address',
                    },
                  })}
                />
                <Mail className={`absolute left-3 top-2.5 h-5 w-5 ${
                  errors.email ? 'text-red-400' : dirtyFields.email ? 'text-green-400' : 'text-gray-400'
                }`} />
                {dirtyFields.email && !errors.email && (
                  <CheckCircle2 className="absolute right-3 top-2.5 h-5 w-5 text-green-400" />
                )}
              </div>
              {errors.email && (
                <p className="mt-2 text-sm text-red-600 flex items-center">
                  <XCircle className="h-4 w-4 mr-1" />
                  {errors.email.message}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="new-password"
                  className={`appearance-none block w-full px-3 py-2 pl-10 pr-10 border rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition-colors duration-200 ${
                    errors.password ? 'border-red-300' : dirtyFields.password ? 'border-green-300' : 'border-gray-300'
                  }`}
                  {...register('password', {
                    required: 'Password is required',
                    minLength: {
                      value: 8,
                      message: 'Password must be at least 8 characters',
                    },
                    pattern: {
                      value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                      message:
                        'Password must meet all requirements below',
                    },
                  })}
                />
                <Lock className={`absolute left-3 top-2.5 h-5 w-5 ${
                  errors.password ? 'text-red-400' : dirtyFields.password ? 'text-green-400' : 'text-gray-400'
                }`} />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-500 focus:outline-none"
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>
              {password && (
                <div className="mt-4 space-y-2">
                  {passwordRequirements.map((req, index) => (
                    <div
                      key={index}
                      className={`flex items-center text-sm ${
                        req.test(password) ? 'text-green-600' : 'text-gray-500'
                      }`}
                    >
                      {req.test(password) ? (
                        <CheckCircle2 className="h-4 w-4 mr-2" />
                      ) : (
                        <Info className="h-4 w-4 mr-2" />
                      )}
                      {req.label}
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div>
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium text-gray-700"
              >
                Confirm password
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <input
                  id="confirmPassword"
                  type={showConfirmPassword ? 'text' : 'password'}
                  autoComplete="new-password"
                  className={`appearance-none block w-full px-3 py-2 pl-10 pr-10 border rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition-colors duration-200 ${
                    errors.confirmPassword ? 'border-red-300' : dirtyFields.confirmPassword ? 'border-green-300' : 'border-gray-300'
                  }`}
                  {...register('confirmPassword', {
                    required: 'Please confirm your password',
                    validate: value =>
                      value === password || 'Passwords do not match',
                  })}
                />
                <Lock className={`absolute left-3 top-2.5 h-5 w-5 ${
                  errors.confirmPassword ? 'text-red-400' : dirtyFields.confirmPassword ? 'text-green-400' : 'text-gray-400'
                }`} />
                <button
                  type="button"
                  onClick={toggleConfirmPasswordVisibility}
                  className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-500 focus:outline-none"
                >
                  {showConfirmPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>
              {errors.confirmPassword && (
                <p className="mt-2 text-sm text-red-600 flex items-center">
                  <XCircle className="h-4 w-4 mr-1" />
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>

            <div className="flex items-center">
              <input
                id="acceptTerms"
                type="checkbox"
                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                {...register('acceptTerms', {
                  required: 'You must accept the terms and conditions',
                })}
              />
              <label htmlFor="acceptTerms" className="ml-2 block text-sm text-gray-900">
                I accept the{' '}
                <Link to="/terms" className="text-indigo-600 hover:text-indigo-500">
                  terms and conditions
                </Link>
              </label>
            </div>
            {errors.acceptTerms && (
              <p className="text-sm text-red-600 flex items-center">
                <XCircle className="h-4 w-4 mr-1" />
                {errors.acceptTerms.message}
              </p>
            )}

            <div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
              >
                {isSubmitting ? (
                  <div className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Creating account...
                  </div>
                ) : (
                  <>
                    <Shield className="absolute left-3 top-2 h-5 w-5" />
                    Create account
                    <ArrowRight className="absolute right-3 top-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-200" />
                  </>
                )}
              </button>
            </div>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">
                  Protected by industry leading security
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;