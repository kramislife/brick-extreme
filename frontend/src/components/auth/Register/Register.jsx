import { Link } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import RegisterImg from "@/assets/authAssets/Register.png";
import { registerAnimations } from "@/hooks/animationConfig";

const Register = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-brand-gradient px-4 py-10">
      <div className="w-full max-w-7xl flex gap-12 items-center">
        {/* Left side - Animation */}
        <motion.div
          {...registerAnimations.imageContainerVariants}
          className="flex-1 hidden lg:block"
        >
          <motion.img
            src={RegisterImg}
            alt="Register illustration"
            className="w-full h-full object-contain drop-shadow-2xl filter saturate-110"
            {...registerAnimations.imageVariants}
          />
        </motion.div>

        {/* Right side - Register Form */}
        <motion.div
          {...registerAnimations.formContainerVariants}
          className="flex-1 p-8 rounded-3xl backdrop-blur-lg shadow-2xl bg-gradient-to-br from-brand-start/40 to-brand-end/40 border border-white/20 relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/5 to-transparent pointer-events-none" />

          <div className="space-y-8 py-5 px-2 relative">
            <motion.div
              {...registerAnimations.headerVariants}
              className="space-y-3"
            >
              <h1 className="text-4xl font-bold text-white tracking-tight">
                Create Account
              </h1>
              <p className="text-light/90 text-md tracking-wide font-light">
                Enter your details below to Register
              </p>
            </motion.div>

            <form className="space-y-6">
              {/* Full Name Input */}
              <motion.div
                {...registerAnimations.getInputVariants(0.6)}
                className="space-y-4"
              >
                <Input
                  type="text"
                  placeholder="Full Name"
                  className="bg-darkBrand/50 border-white/20 text-white placeholder:text-gray-400 h-14 rounded-xl focus:ring-2 focus:ring-light/40 focus:border-light/40 transition-all duration-300 text-lg"
                  required
                />
              </motion.div>

              {/* Username Input */}
              <motion.div
                {...registerAnimations.getInputVariants(0.7)}
                className="space-y-4"
              >
                <Input
                  type="text"
                  placeholder="Username"
                  className="bg-darkBrand/50 border-white/20 text-white placeholder:text-gray-400 h-14 rounded-xl focus:ring-2 focus:ring-light/40 focus:border-light/40 transition-all duration-300 text-lg"
                  required
                />
              </motion.div>

              {/* Contact Number Input */}
              <motion.div
                {...registerAnimations.getInputVariants(0.8)}
                className="space-y-4"
              >
                <Input
                  type="tel"
                  placeholder="Contact Number"
                  className="bg-darkBrand/50 border-white/20 text-white placeholder:text-gray-400 h-14 rounded-xl focus:ring-2 focus:ring-light/40 focus:border-light/40 transition-all duration-300 text-lg"
                  required
                />
              </motion.div>

              {/* Email Input */}
              <motion.div
                {...registerAnimations.getInputVariants(0.9)}
                className="space-y-4"
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
                {...registerAnimations.getInputVariants(1.0)}
                className="space-y-4"
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
                {...registerAnimations.getInputVariants(1.1)}
                className="space-y-4"
              >
                <Input
                  type="password"
                  placeholder="Confirm Password"
                  className="bg-darkBrand/50 border-white/20 text-white placeholder:text-gray-400 h-14 rounded-xl focus:ring-2 focus:ring-light/40 focus:border-light/40 transition-all duration-300 text-lg"
                  required
                />
              </motion.div>

              {/* Register Button */}
              <motion.div {...registerAnimations.buttonVariants}>
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
              {...registerAnimations.loginLinkVariants}
              className="text-light/90 text-md"
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