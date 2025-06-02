import React from "react";
import { motion } from "framer-motion";
import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";

const PrivacyPolicy = () => {
  return (
    <>
      <Navbar />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="min-h-screen py-24 bg-black"
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto bg-zerion-black-light p-8 rounded-xl shadow-lg border border-zerion-purple/20">
            <h1 className="text-3xl font-bold mb-6 text-white">Privacy Policy</h1>
            <div className="prose prose-invert">
              <p className="text-gray-300 mb-6">
                This Privacy Policy outlines how Zerion.WTF ("we", "us", "our") collects, uses, and protects any information you provide when using our services.
              </p>

              <h2 className="text-xl font-semibold mb-4 text-white">1. Information We Collect</h2>
              <p className="text-gray-300 mb-6">
                We may collect the following information:
                <ul className="list-disc list-inside mt-2">
                  <li>Your Discord username and ID (for verification and support)</li>
                  <li>Purchase details (e.g., transaction ID, plan type)</li>
                  <li>Roblox username or user ID (for whitelisting and in-game linking)</li>
                  <li>Any messages or inquiries sent to our support team</li>
                </ul>
              </p>

              <h2 className="text-xl font-semibold mb-4 text-white">2. How We Use Your Information</h2>
              <p className="text-gray-300 mb-6">
                We use your information to:
                <ul className="list-disc list-inside mt-2">
                  <li>Provide access to Zerion features</li>
                  <li>Verify purchases and whitelist users</li>
                  <li>Maintain order logs and support history</li>
                  <li>Improve user experience and resolve issues</li>
                </ul>
              </p>

              <h2 className="text-xl font-semibold mb-4 text-white">3. Data Security</h2>
              <p className="text-gray-300 mb-6">
                We are committed to protecting your information. We use basic security practices to ensure that your data is not lost, misused, or accessed without authorization. However, no method of digital storage is 100% secure.
              </p>

              <h2 className="text-xl font-semibold mb-4 text-white">4. Sharing of Information</h2>
              <p className="text-gray-300 mb-6">
                We do not sell, trade, or rent your personal data to third parties. Your information is only used internally and shared with staff members who require access to perform their duties.
              </p>

              <h2 className="text-xl font-semibold mb-4 text-white">5. User Rights</h2>
              <p className="text-gray-300 mb-6">
                You may request the deletion of your stored data or inquire about what data we hold by contacting us through our official support channels. Deleting your data may result in the loss of access to Zerion features.
              </p>

              <h2 className="text-xl font-semibold mb-4 text-white">6. Policy Updates</h2>
              <p className="text-gray-300 mb-6">
                We may update this Privacy Policy at any time. Changes will be posted on this page, and continued use of our services indicates your agreement with the updated terms.
              </p>

              <h2 className="text-xl font-semibold mb-4 text-white">Questions?</h2>
              <p className="text-gray-300">
                For questions regarding this policy or your data, contact the Zerion.WTF team via our official support Discord.
              </p>
            </div>
          </div>
        </div>
      </motion.div>
      <Footer />
    </>
  );
};

export default PrivacyPolicy;