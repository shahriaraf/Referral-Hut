
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { toast } from 'react-hot-toast'
import { FaEye, FaEyeSlash } from 'react-icons/fa'
import useAuth from '../../../CustomHooks/useAuth'
import { useState } from 'react'

const AnimatedBlob = ({ className, animationProps }) => (
  <motion.div
    className={`absolute rounded-full mix-blend-soft-light filter blur-2xl opacity-70 ${className}`}
    animate={animationProps.animate}
    transition={animationProps.transition}
  />
)

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' })
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const { login } = useAuth()
  const navigate = useNavigate()

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value })

  const onSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      await login(formData.email, formData.password)
      toast.success('Login successful! Welcome back.')
      navigate('/userDashboard') // Or wherever you want to redirect after login
    } catch (err) {
      toast.error(
        err.response?.data?.msg || 'Login failed. Please check your credentials.'
      )
      console.error('Login failed:', err)
    } finally {
      setLoading(false)
    }
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15 } },
  }
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: 'spring', stiffness: 100 },
    },
  }

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4 relative overflow-hidden">
      <AnimatedBlob
        className="w-72 h-72 bg-purple-500 top-1/4 left-1/4"
        animationProps={{
          animate: {
            x: [0, 100, 0],
            y: [0, -50, 0],
            rotate: [0, 90, 0],
            scale: [1, 1.2, 1],
          },
          transition: {
            duration: 15,
            repeat: Infinity,
            repeatType: 'mirror',
            ease: 'easeInOut',
          },
        }}
      />
      <AnimatedBlob
        className="w-64 h-64 bg-indigo-500 bottom-1/4 right-1/4"
        animationProps={{
          animate: {
            x: [0, -80, 0],
            y: [0, 40, 0],
            rotate: [0, -90, 0],
            scale: [1, 1.1, 1],
          },
          transition: {
            duration: 18,
            repeat: Infinity,
            repeatType: 'mirror',
            ease: 'easeInOut',
          },
        }}
      />
      <motion.div
        className="w-full max-w-md bg-slate-800/60 backdrop-blur-lg border border-purple-900 rounded-2xl shadow-lg z-10"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="p-8 space-y-6">
          <motion.h1
            className="text-4xl font-extrabold text-center text-white bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Welcome Back
          </motion.h1>
          <motion.form
            onSubmit={onSubmit}
            className="space-y-6"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div variants={itemVariants}>
              <label className="block mb-2 text-sm font-medium text-purple-300">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={onChange}
                required
                className="w-full px-4 py-3 bg-slate-900/70 border border-purple-800 rounded-md text-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="you@example.com"
              />
            </motion.div>
            <motion.div variants={itemVariants} className="relative">
              <label className="block mb-2 text-sm font-medium text-purple-300">
                Password
              </label>
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={formData.password}
                onChange={onChange}
                required
                className="w-full px-4 py-3 bg-slate-900/70 border border-purple-800 rounded-md text-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="••••••••"
              />
              <div
                className="absolute inset-y-0 right-0 top-7 pr-3 flex items-center text-gray-400 cursor-pointer"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </div>
            </motion.div>
            <motion.div variants={itemVariants}>
              <motion.button
                type="submit"
                disabled={loading}
                className="w-full px-4 py-3 font-bold text-white bg-purple-600 rounded-md disabled:bg-purple-800 flex items-center justify-center"
                whileHover={{ scale: 1.03, backgroundColor: '#7c3aed' }}
                whileTap={{ scale: 0.98 }}
              >
                {loading ? (
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                ) : (
                  'Login'
                )}
              </motion.button>
            </motion.div>
          </motion.form>
          <motion.p
            className="text-sm text-center text-gray-400"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
          >
            Don't have an account?{' '}
            <Link
              to="/register"
              className="font-medium text-purple-400 hover:text-purple-300"
            >
              Register here
            </Link>
          </motion.p>
        </div>
      </motion.div>
    </div>
  )
}
export default Login