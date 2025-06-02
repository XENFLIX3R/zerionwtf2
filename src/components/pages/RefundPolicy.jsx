import React from "react";
import { motion } from "framer-motion";
import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";

const RefundPolicy = () => {
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
            <h1 className="text-3xl font-bold mb-6 text-white">Refund Policy</h1>
            <div className="prose prose-invert">
              <p className="text-gray-300 mb-6">
                By purchasing access to Zerion.WTF, you agree to the following terms:
              </p>
              
              <p className="text-gray-300 mb-6">
                All sales are final. Zerion is a digital product that provides immediate access to exclusive features and server-sided execution capabilities. Once access is granted, no refunds will be issued under any circumstances.
              </p>
              
              <p className="text-gray-300 mb-4">This includes, but is not limited to:</p>
              
              <ul className="list-disc list-inside mb-6 text-gray-300">
                <li className="mb-2">Changing your mind after purchase</li>
                <li className="mb-2">Inability to use the product due to personal or technical reasons</li>
                <li className="mb-2">Misunderstanding of the product's features or limitations</li>
                <li className="mb-2">Attempting to reverse the transaction after receiving access</li>
              </ul>
              
              <p className="text-gray-300 mb-6">
                We strongly encourage all users to review the product details and ensure compatibility before making a purchase. If you have any questions or concerns, contact our support team before completing your order.
              </p>
              
              <p className="text-gray-300">
                By completing a purchase, you acknowledge that you have read, understood, and agreed to this no refund policy.
              </p>
            </div>
          </div>
        </div>
      </motion.div>
      <Footer />
    </>
  );
};

export default RefundPolicy;