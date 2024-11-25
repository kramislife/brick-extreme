import { Link } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import RegisterImg from "@/assets/authAssets/Register.png";

const Register = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-brand-gradient px-4 py-10">
      <div className="w-full max-w-7xl flex gap-12 items-center">
        {/* Left side - Animation */}
        <motion.div
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{
            duration: 0.8,
            type: "spring",
            stiffness: 90,
            damping: 20,
          }}
          className="flex-1 hidden lg:block"
        >
          <motion.img
            src={RegisterImg}
            alt="Register illustration"
            className="w-full h-full object-contain drop-shadow-2xl filter saturate-110"
            whileHover={{
              scale: 1.03,
              transition: { duration: 0.3, ease: "easeOut" },
            }}
          />
        </motion.div>

        {/* Right side - Register Form */}
        <motion.div
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{
            duration: 0.8,
            type: "spring",
            stiffness: 90,
            damping: 20,
            delay: 0.2,
          }}
          className="flex-1 p-8 rounded-3xl backdrop-blur-lg shadow-2xl bg-gradient-to-br from-brand-start/40 to-brand-end/40 border border-white/20 relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/5 to-transparent pointer-events-none" />

          <div className="space-y-10 py-5 px-2 relative">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="space-y-3"
            >
              <h1 className="text-4xl font-bold text-white tracking-tight">
                Create Account
              </h1>
              <p className="text-light/90 text-md tracking-wide font-light">
                Enter your details below to Register
              </p>
            </motion.div>

            <form className="space-y-7">
              {/* Name Input */}
              <motion.div
                className="space-y-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.5 }}
              >
                <Input
                  type="text"
                  placeholder="Full Name"
                  className="bg-darkBrand/50 border-white/20 text-white placeholder:text-gray-400 h-14 rounded-xl focus:ring-2 focus:ring-light/40 focus:border-light/40 transition-all duration-300 text-lg"
                  required
                />
              </motion.div>

              {/* Email Input */}
              <motion.div
                className="space-y-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7, duration: 0.5 }}
              >
                <Input
                  type="email"
                  placeholder="Email Address"
                  className="bg-darkBrand/50 border-white/20 text-white placeholder:text-gray-400 h-14 rounded-xl focus:ring-2 focus:ring-light/40 focus:border-light/40 transition-all duration-300 text-lg"
                  required
                />
              </motion.div>

              {/* Password Input */}
              <motion.div
                className="space-y-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.5 }}
              >
                <Input
                  type="password"
                  placeholder="Password"
                  className="bg-darkBrand/50 border-white/20 text-white placeholder:text-gray-400 h-14 rounded-xl focus:ring-2 focus:ring-light/40 focus:border-light/40 transition-all duration-300 text-lg"
                  required
                />
              </motion.div>

              {/* Confirm Password Input */}
              <motion.div
                className="space-y-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9, duration: 0.5 }}
              >
                <Input
                  type="password"
                  placeholder="Confirm Password"
                  className="bg-darkBrand/50 border-white/20 text-white placeholder:text-gray-400 h-14 rounded-xl focus:ring-2 focus:ring-light/40 focus:border-light/40 transition-all duration-300 text-lg"
                  required
                />
              </motion.div>

              {/* Register Button */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1, duration: 0.5 }}
              >
                <Button
                  type="submit"
                  className="w-full bg-gradient-r border border-brand hover:bg-brand-gradient text-white h-14 rounded-xl text-md shadow-lg transition-all duration-300 relative overflow-hidden group"
                >
                  <span className="relative z-10">Register</span>
                </Button>
              </motion.div>
            </form>

            {/* Login Link */}
            <motion.div
              className="text-light/90 text-md"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.1, duration: 0.5 }}
            >
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-blue hover:text-white transition-colors duration-300 font-md"
              >
                Login Now
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Register;