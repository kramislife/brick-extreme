import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import LoginImg from "@/assets/authAssets/Login.png";
import { Link } from "react-router-dom";

const Login = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-brand-gradient p-4">
      <div className="w-full max-w-7xl flex gap-12 items-center">
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
            src={LoginImg}
            alt="Login illustration"
            className="w-full h-full object-contain drop-shadow-2xl filter saturate-110"
            whileHover={{
              scale: 1.03,
              transition: { duration: 0.3, ease: "easeOut" },
            }}
          />
        </motion.div>

        {/* Right side - Login Form */}
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
          {/* Background decoration */}
          <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/5 to-transparent pointer-events-none" />

          <div className="space-y-10 py-10 px-2 relative">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="space-y-3"
            >
              <h1 className="text-4xl font-bold text-white tracking-tight">
                Welcome Back
              </h1>
              <p className="text-light/90 text-md tracking-wide font-light">
                Enter your details below to Sign-in
              </p>
            </motion.div>

            <form className="space-y-7">
              <motion.div
                className="space-y-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.5 }}
              >
                <Input
                  type="email"
                  placeholder="Email Address"
                  className="bg-darkBrand/50 border-white/20 text-white placeholder:text-gray-400 h-14 rounded-xl focus:ring-2 focus:ring-light/40 focus:border-light/40 transition-all duration-300 text-lg"
                  required
                />
              </motion.div>

              <motion.div
                className="space-y-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7, duration: 0.5 }}
              >
                <Input
                  type="password"
                  placeholder="Password"
                  className="bg-darkBrand/50 border-white/20 text-white placeholder:text-gray-400 h-14 rounded-xl focus:ring-2 focus:ring-light/40 focus:border-light/40 transition-all duration-300 text-lg"
                  required
                />
              </motion.div>

              <motion.div
                className="text-right"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8, duration: 0.5 }}
              >
                <Link
                  to="/forgot_password"
                  className="text-sm text-light hover:text-blue transition-colors duration-300 font-md"
                >
                  Forgot Password?
                </Link>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9, duration: 0.5 }}
              >
                <Button
                  type="submit"
                  className="w-full bg-gradient-r border border-brand hover:bg-brand-gradient text-white h-14 rounded-xl text-md shadow-lg transition-all duration-300 relative overflow-hidden group"
                >
                  <span className="relative z-10">Log In</span>
                </Button>
              </motion.div>
            </form>

            <motion.div
              className="text-light/90 text-md"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1, duration: 0.5 }}
            >
              Don't have an account?{" "}
              <Link
                to="/register"
                className="text-blue hover:text-white transition-colors duration-300 font-md"
              >
                Register Now
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Login;
