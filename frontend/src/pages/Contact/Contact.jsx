import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Mail, 
  User, 
  MessageSquare, 
  MapPin, 
  Phone, 
  Send 
} from 'lucide-react';

import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add form submission logic here
    console.log('Form submitted:', formData);
    // You would typically send this data to a backend service
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        delayChildren: 0.3,
        staggerChildren: 0.2 
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1 
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="w-full max-w-4xl grid md:grid-cols-2 gap-8"
      >
        {/* Contact Information */}
        <motion.div 
          variants={itemVariants}
          className="bg-blue-600 text-white rounded-lg p-8 flex flex-col justify-between"
        >
          <div>
            <h2 className="text-3xl font-bold mb-4">Contact Brick Extreme</h2>
            <p className="mb-6">Ready to Build? Get Started Today.</p>
            
            <div className="space-y-4">
              <div className="flex items-center">
                <MapPin className="mr-3" />
                <span>2406 W 1350 N Lehi, Ut 84043</span>
              </div>
              <div className="flex items-center">
                <Phone className="mr-3" />
                <span>+1 801-781-0705</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Contact Form */}
        <motion.div variants={itemVariants}>
          <Card>
            <CardHeader>
              <CardTitle>Send Us a Message</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="name">Name</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <Input 
                      type="text" 
                      name="name"
                      placeholder="Your Name" 
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className="pl-10"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="email">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <Input 
                      type="email" 
                      name="email"
                      placeholder="Your Email" 
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="pl-10"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="subject">Subject (Optional)</Label>
                  <div className="relative">
                    <MessageSquare className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <Input 
                      type="text" 
                      name="subject"
                      placeholder="Your Subject" 
                      value={formData.subject}
                      onChange={handleChange}
                      className="pl-10"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="message">Message</Label>
                  <div className="relative">
                    <Textarea 
                      name="message"
                      placeholder="Your Message" 
                      required
                      value={formData.message}
                      onChange={handleChange}
                      className="min-h-[120px]"
                    />
                  </div>
                </div>

                <Button 
                  type="submit" 
                  className="w-full"
                  variant="default"
                >
                  <Send className="mr-2" /> Send Message
                </Button>
              </form>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Contact;