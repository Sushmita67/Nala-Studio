// import React, { useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import {
//   Mail,
//   Lock,
//   Eye,
//   EyeOff,
//   ArrowRight
// } from 'lucide-react';
// import { useAuth } from '../context/AuthContext';
//
// interface LoginProps {
//   showToast: (message: string, type?: 'success' | 'error' | 'info') => void;
// }
//
// const Login: React.FC<LoginProps> = ({ showToast }) => {
//   const navigate = useNavigate();
//   const { login } = useAuth();
//   const [formData, setFormData] = useState({
//     email: '',
//     password: ''
//   });
//   const [showPassword, setShowPassword] = useState(false);
//   const [isLoading, setIsLoading] = useState(false);
//
//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setIsLoading(true);
//
//     try {
//       const success = await login(formData.email, formData.password);
//       if (success) {
//         showToast('Login successful!', 'success');
//         navigate('/dashboard');
//       } else {
//         showToast('Invalid email or password', 'error');
//       }
//     } catch (error) {
//       showToast('Login failed. Please try again.', 'error');
//     } finally {
//       setIsLoading(false);
//     }
//   };
//
//   const handleSocialLogin = (provider: string) => {
//     showToast(`${provider} login coming soon!`, 'info');
//   };
//
//   return (
//     <div className="min-h-screen">
//       <div className="pt-24 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
//         <div className="max-w-md w-full space-y-8">
//         <div className="text-center">
//           <div className="flex justify-center">
//             <div className="w-16 h-16 bg-gradient-to-br from-nala-primary to-nala-accent rounded-full flex items-center justify-center">
//               <span className="text-white font-bold text-2xl">N</span>
//             </div>
//           </div>
//           <h2 className="mt-6 text-3xl font-bold text-gray-900 dark:text-white">
//             Welcome Back
//           </h2>
//           <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
//             Sign in to your Nala Studio account
//           </p>
//         </div>
//
//         <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
//           <form className="space-y-6" onSubmit={handleSubmit}>
//             <div>
//               <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
//                 Email Address
//               </label>
//               <div className="relative">
//                 <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                   <Mail className="h-5 w-5 text-gray-400" />
//                 </div>
//                 <input
//                   id="email"
//                   name="email"
//                   type="email"
//                   autoComplete="email"
//                   required
//                   value={formData.email}
//                   onChange={(e) => setFormData({ ...formData, email: e.target.value })}
//                   className="block w-full pl-10 pr-3 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-nala-primary focus:border-transparent dark:bg-gray-700 dark:text-white"
//                   placeholder="Enter your email"
//                 />
//               </div>
//             </div>
//
//             <div>
//               <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
//                 Password
//               </label>
//               <div className="relative">
//                 <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                   <Lock className="h-5 w-5 text-gray-400" />
//                 </div>
//                 <input
//                   id="password"
//                   name="password"
//                   type={showPassword ? 'text' : 'password'}
//                   autoComplete="current-password"
//                   required
//                   value={formData.password}
//                   onChange={(e) => setFormData({ ...formData, password: e.target.value })}
//                   className="block w-full pl-10 pr-12 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-nala-primary focus:border-transparent dark:bg-gray-700 dark:text-white"
//                   placeholder="Enter your password"
//                 />
//                 <button
//                   type="button"
//                   className="absolute inset-y-0 right-0 pr-3 flex items-center"
//                   onClick={() => setShowPassword(!showPassword)}
//                 >
//                   {showPassword ? (
//                     <EyeOff className="h-5 w-5 text-gray-400" />
//                   ) : (
//                     <Eye className="h-5 w-5 text-gray-400" />
//                   )}
//                 </button>
//               </div>
//             </div>
//
//             <div className="flex items-center justify-between">
//               <div className="flex items-center">
//                 <input
//                   id="remember-me"
//                   name="remember-me"
//                   type="checkbox"
//                   className="h-4 w-4 text-nala-primary focus:ring-nala-primary border-gray-300 rounded"
//                 />
//                 <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
//                   Remember me
//                 </label>
//               </div>
//
//               <div className="text-sm">
//                 <Link
//                   to="/forgot-password"
//                   className="font-medium text-nala-primary hover:text-nala-primary/80"
//                 >
//                   Forgot password?
//                 </Link>
//               </div>
//             </div>
//
//             <div>
//               <button
//                 type="submit"
//                 disabled={isLoading}
//                 className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-nala-primary hover:bg-nala-primary/80 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-nala-primary disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
//               >
//                 {isLoading ? (
//                   <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
//                 ) : (
//                   <>
//                     Sign in
//                     <ArrowRight className="ml-2 h-5 w-5" />
//                   </>
//                 )}
//               </button>
//             </div>
//           </form>
//
//           <div className="mt-6">
//             <div className="relative">
//               <div className="absolute inset-0 flex items-center">
//                 <div className="w-full border-t border-gray-300 dark:border-gray-600" />
//               </div>
//               <div className="relative flex justify-center text-sm">
//                 <span className="px-2 bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400">
//                   Or continue with
//                 </span>
//               </div>
//             </div>
//
//             <div className="mt-6 grid grid-cols-3 gap-3">
//               <button
//                 onClick={() => handleSocialLogin('Google')}
//                 className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm bg-white dark:bg-gray-700 text-sm font-medium text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors"
//               >
//                 Google
//               </button>
//
//               <button
//                 onClick={() => handleSocialLogin('Facebook')}
//                 className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm bg-white dark:bg-gray-700 text-sm font-medium text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors"
//               >
//                 Facebook
//               </button>
//
//               <button
//                 onClick={() => handleSocialLogin('Apple')}
//                 className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm bg-white dark:bg-gray-700 text-sm font-medium text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors"
//               >
//                 Apple
//               </button>
//             </div>
//           </div>
//
//           <div className="mt-6 text-center">
//             <p className="text-sm text-gray-600 dark:text-gray-400">
//               Don't have an account?{' '}
//               <Link
//                 to="/register"
//                 className="font-medium text-nala-primary hover:text-nala-primary/80"
//               >
//                 Sign up
//               </Link>
//             </p>
//           </div>
//         </div>
//
//         {/* Guest Checkout Option */}
//         <div className="text-center">
//           <p className="text-sm text-gray-600 dark:text-gray-400">
//             Want to book without an account?{' '}
//             <Link
//               to="/booking"
//               className="font-medium text-nala-primary hover:text-nala-primary/80"
//             >
//               Continue as guest
//             </Link>
//           </p>
//         </div>
//       </div>
//     </div>
//     </div>
//   );
// };
//
// export default Login;