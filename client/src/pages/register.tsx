// import React, { useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import {
//   User,
//   Mail,
//   Phone,
//   Lock,
//   Eye,
//   EyeOff,
//   ArrowRight,
//   Upload,
//   Camera
// } from 'lucide-react';
// import { useAuth } from '../context/AuthContext';
//
// interface RegisterProps {
//   showToast: (message: string, type?: 'success' | 'error' | 'info') => void;
// }
//
// const Register: React.FC<RegisterProps> = ({ showToast }) => {
//   const navigate = useNavigate();
//   const { register } = useAuth();
//   const [formData, setFormData] = useState({
//     name: '',
//     email: '',
//     phone: '',
//     password: '',
//     confirmPassword: ''
//   });
//   const [showPassword, setShowPassword] = useState(false);
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false);
//   const [isLoading, setIsLoading] = useState(false);
//   const [profilePhoto, setProfilePhoto] = useState<File | null>(null);
//   const [photoPreview, setPhotoPreview] = useState<string>('');
//
//   const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0];
//     if (file) {
//       setProfilePhoto(file);
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         setPhotoPreview(reader.result as string);
//       };
//       reader.readAsDataURL(file);
//     }
//   };
//
//   // Nepal phone number validation
//   const validateNepalPhone = (phone: string): boolean => {
//     // Nepal phone number patterns: +977-XXXXXXXXX or 977XXXXXXXXX or 98XXXXXXXXX
//     const nepalPhoneRegex = /^(\+977-?|977-?)?(98|97|96|95|94|93|92|91|90|89|88|87|86|85|84|83|82|81|80|79|78|77|76|75|74|73|72|71|70|69|68|67|66|65|64|63|62|61|60|59|58|57|56|55|54|53|52|51|50|49|48|47|46|45|44|43|42|41|40|39|38|37|36|35|34|33|32|31|30|29|28|27|26|25|24|23|22|21|20|19|18|17|16|15|14|13|12|11|10|09|08|07|06|05|04|03|02|01)\d{7}$/;
//     return nepalPhoneRegex.test(phone.replace(/\s/g, ''));
//   };
//
//   const formatNepalPhone = (phone: string): string => {
//     // Remove all non-digits
//     const digits = phone.replace(/\D/g, '');
//
//     // If it starts with 977, keep it, otherwise add 977
//     if (digits.startsWith('977')) {
//       return `+${digits.slice(0, 3)}-${digits.slice(3, 6)}-${digits.slice(6)}`;
//     } else if (digits.startsWith('98') && digits.length === 10) {
//       return `+977-${digits.slice(0, 2)}-${digits.slice(2)}`;
//     } else if (digits.length === 10) {
//       return `+977-${digits.slice(0, 2)}-${digits.slice(2)}`;
//     }
//
//     return phone;
//   };
//
//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//
//     if (formData.password !== formData.confirmPassword) {
//       showToast('Passwords do not match', 'error');
//       return;
//     }
//
//     if (formData.password.length < 6) {
//       showToast('Password must be at least 6 characters long', 'error');
//       return;
//     }
//
//     if (!validateNepalPhone(formData.phone)) {
//       showToast('Please enter a valid Nepal phone number', 'error');
//       return;
//     }
//
//     setIsLoading(true);
//
//     try {
//       const success = await register({
//         name: formData.name,
//         email: formData.email,
//         phone: formatNepalPhone(formData.phone)
//       });
//
//       if (success) {
//         showToast('Registration successful! Welcome to Nala Studio!', 'success');
//         navigate('/dashboard');
//       } else {
//         showToast('Registration failed. Please try again.', 'error');
//       }
//     } catch (error) {
//       showToast('Registration failed. Please try again.', 'error');
//     } finally {
//       setIsLoading(false);
//     }
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
//             Join Nala Studio
//           </h2>
//           <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
//             Create your account and start your beauty journey
//           </p>
//         </div>
//
//         <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
//           <form className="space-y-6" onSubmit={handleSubmit}>
//             {/* Profile Photo Upload */}
//             <div className="text-center">
//               <div className="relative inline-block">
//                 <div className="w-24 h-24 rounded-full bg-gradient-to-br from-pink-100 to-green-100 flex items-center justify-center border-4 border-white dark:border-gray-700 shadow-lg">
//                   {photoPreview ? (
//                     <img
//                       src={photoPreview}
//                       alt="Profile"
//                       className="w-full h-full rounded-full object-cover"
//                     />
//                   ) : (
//                     <Camera className="w-8 h-8 text-gray-400" />
//                   )}
//                 </div>
//                 <label
//                   htmlFor="photo-upload"
//                   className="absolute bottom-0 right-0 w-8 h-8 bg-nala-primary rounded-full flex items-center justify-center cursor-pointer hover:bg-nala-primary/80 transition-colors"
//                 >
//                   <Upload className="w-4 h-4 text-white" />
//                 </label>
//                 <input
//                   id="photo-upload"
//                   type="file"
//                   accept="image/*"
//                   onChange={handlePhotoChange}
//                   className="hidden"
//                 />
//               </div>
//               <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
//                 Upload profile photo (optional)
//               </p>
//             </div>
//
//             <div>
//               <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
//                 Full Name
//               </label>
//               <div className="relative">
//                 <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                   <User className="h-5 w-5 text-gray-400" />
//                 </div>
//                 <input
//                   id="name"
//                   name="name"
//                   type="text"
//                   autoComplete="name"
//                   required
//                   value={formData.name}
//                   onChange={(e) => setFormData({ ...formData, name: e.target.value })}
//                   className="block w-full pl-10 pr-3 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-nala-primary focus:border-transparent dark:bg-gray-700 dark:text-white"
//                   placeholder="Enter your full name"
//                 />
//               </div>
//             </div>
//
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
//               <label htmlFor="phone" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
//                 Nepal Phone Number *
//               </label>
//               <div className="relative">
//                 <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                   <Phone className="h-5 w-5 text-gray-400" />
//                 </div>
//                 <input
//                   id="phone"
//                   name="phone"
//                   type="tel"
//                   autoComplete="tel"
//                   required
//                   value={formData.phone}
//                   onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
//                   className={`block w-full pl-10 pr-3 py-3 border rounded-lg focus:ring-2 focus:ring-nala-primary focus:border-transparent dark:bg-gray-700 dark:text-white ${
//                     formData.phone && !validateNepalPhone(formData.phone)
//                       ? 'border-red-500'
//                       : 'border-gray-300 dark:border-gray-600'
//                   }`}
//                   placeholder="+977-98-1234567"
//                 />
//               </div>
//               {formData.phone && !validateNepalPhone(formData.phone) && (
//                 <p className="mt-1 text-sm text-red-600">
//                   Please enter a valid Nepal phone number
//                 </p>
//               )}
//               <p className="mt-1 text-sm text-gray-500">
//                 Format: +977-98-1234567 or 981234567
//               </p>
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
//                   autoComplete="new-password"
//                   required
//                   value={formData.password}
//                   onChange={(e) => setFormData({ ...formData, password: e.target.value })}
//                   className="block w-full pl-10 pr-12 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-nala-primary focus:border-transparent dark:bg-gray-700 dark:text-white"
//                   placeholder="Create a password"
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
//             <div>
//               <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
//                 Confirm Password
//               </label>
//               <div className="relative">
//                 <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                   <Lock className="h-5 w-5 text-gray-400" />
//                 </div>
//                 <input
//                   id="confirmPassword"
//                   name="confirmPassword"
//                   type={showConfirmPassword ? 'text' : 'password'}
//                   autoComplete="new-password"
//                   required
//                   value={formData.confirmPassword}
//                   onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
//                   className="block w-full pl-10 pr-12 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-nala-primary focus:border-transparent dark:bg-gray-700 dark:text-white"
//                   placeholder="Confirm your password"
//                 />
//                 <button
//                   type="button"
//                   className="absolute inset-y-0 right-0 pr-3 flex items-center"
//                   onClick={() => setShowConfirmPassword(!showConfirmPassword)}
//                 >
//                   {showConfirmPassword ? (
//                     <EyeOff className="h-5 w-5 text-gray-400" />
//                   ) : (
//                     <Eye className="h-5 w-5 text-gray-400" />
//                   )}
//                 </button>
//               </div>
//             </div>
//
//             <div className="flex items-center">
//               <input
//                 id="terms"
//                 name="terms"
//                 type="checkbox"
//                 required
//                 className="h-4 w-4 text-nala-primary focus:ring-nala-primary border-gray-300 rounded"
//               />
//               <label htmlFor="terms" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
//                 I agree to the{' '}
//                 <a href="#" className="text-nala-primary hover:text-nala-primary/80">
//                   Terms of Service
//                 </a>{' '}
//                 and{' '}
//                 <a href="#" className="text-nala-primary hover:text-nala-primary/80">
//                   Privacy Policy
//                 </a>
//               </label>
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
//                     Create Account
//                     <ArrowRight className="ml-2 h-5 w-5" />
//                   </>
//                 )}
//               </button>
//             </div>
//           </form>
//
//           <div className="mt-6 text-center">
//             <p className="text-sm text-gray-600 dark:text-gray-400">
//               Already have an account?{' '}
//               <Link
//                 to="/login"
//                 className="font-medium text-nala-primary hover:text-nala-primary/80"
//               >
//                 Sign in
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
// export default Register;