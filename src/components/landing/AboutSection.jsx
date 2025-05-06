import React from 'react';
import { motion } from 'framer-motion';
import { Shield, TrendingUp, Award } from 'lucide-react';

const AboutSection = () => {
  const features = [
    {
      icon: <TrendingUp className="h-10 w-10 text-blue-600" />,
      title: 'Expert Trading',
      description: 'Our experienced team of traders utilizes advanced strategies to maximize returns on your investments.',
    },
    {
      icon: <Shield className="h-10 w-10 text-blue-600" />,
      title: 'Security First',
      description: 'Your investments are protected with bank-level security protocols and insurance coverage.',
    },
    {
      icon: <Award className="h-10 w-10 text-blue-600" />,
      title: 'Award-Winning',
      description: 'Recognized for excellence in portfolio management and customer satisfaction.',
    },
  ];

  return (
    <section id="about" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-4xl font-bold text-gray-900 mb-4"
          >
            About Trade Guardian
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl text-gray-600"
          >
            We're revolutionizing investing by managing portfolios on behalf of our clients with transparency, expertise, and cutting-edge technology.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-gray-50 rounded-xl p-8 text-center shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-100 mb-6">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-16 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-8 md:p-12"
        >
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl font-bold mb-4">Our Mission</h3>
              <p className="text-gray-700 mb-6">
                At Trade Guardian, our mission is to democratize investing by providing professional portfolio management to everyone, regardless of their financial knowledge or background.
              </p>
              <p className="text-gray-700">
                We believe that everyone deserves access to quality financial services that can help build wealth and secure their financial future.
              </p>
            </div>
            <div>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white p-6 rounded-lg shadow-sm">
                  <h4 className="font-bold text-3xl text-blue-600 mb-2">5K+</h4>
                  <p className="text-gray-600">Active Clients</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-sm">
                  <h4 className="font-bold text-3xl text-blue-600 mb-2">$100M+</h4>
                  <p className="text-gray-600">Assets Managed</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-sm">
                  <h4 className="font-bold text-3xl text-blue-600 mb-2">17%</h4>
                  <p className="text-gray-600">Avg. Annual Return</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-sm">
                  <h4 className="font-bold text-3xl text-blue-600 mb-2">24/7</h4>
                  <p className="text-gray-600">Customer Support</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;
