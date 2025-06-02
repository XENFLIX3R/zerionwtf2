import React from "react";
import { motion } from "framer-motion";
import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";

const SoftwareProtection = () => {
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
            <h1 className="text-3xl font-bold mb-6 text-white">Software Protection Policy</h1>
            <div className="prose prose-invert">
              <p className="text-gray-300 mb-6">
                This policy outlines the rules and restrictions regarding the use, access, and protection of Zerion.WTF's proprietary software and systems.
              </p>

              <h2 className="text-xl font-semibold mb-4 text-white">1. No Reverse Engineering</h2>
              <p className="text-gray-300 mb-6">
                You are strictly prohibited from:
                <ul className="list-disc list-inside mt-2">
                  <li>Decompiling, disassembling, or attempting to reverse engineer any part of Zerion.WTF</li>
                  <li>Inspecting or analyzing the software's underlying structure, source code, or behavior through unauthorized means</li>
                  <li>Using tools, exploits, or debugging methods to interfere with how Zerion operates</li>
                </ul>
              </p>

              <h2 className="text-xl font-semibold mb-4 text-white">2. No Modification or Tampering</h2>
              <p className="text-gray-300 mb-6">
                You may not:
                <ul className="list-disc list-inside mt-2">
                  <li>Modify, alter, or patch Zerion.WTF's systems, files, or functionality</li>
                  <li>Inject custom code or scripts into Zerion unless explicitly allowed</li>
                  <li>Bypass or disable any of Zerion's built-in protections or restrictions</li>
                </ul>
              </p>

              <h2 className="text-xl font-semibold mb-4 text-white">3. No Unauthorized Distribution</h2>
              <p className="text-gray-300 mb-6">
                You are not allowed to:
                <ul className="list-disc list-inside mt-2">
                  <li>Reproduce, share, leak, or redistribute Zerion.WTF or its components</li>
                  <li>Sell, license, or distribute access to Zerion to other individuals or groups</li>
                  <li>Impersonate Zerion.WTF or falsely claim ownership of its software</li>
                </ul>
              </p>

              <h2 className="text-xl font-semibold mb-4 text-white">4. Violations</h2>
              <p className="text-gray-300 mb-6">
                Any violation of this policy will result in:
                <ul className="list-disc list-inside mt-2">
                  <li>Immediate and permanent revocation of access</li>
                  <li>Blacklisting of accounts and associated identifiers</li>
                  <li>Legal action where applicable under intellectual property laws</li>
                </ul>
              </p>

              <h2 className="text-xl font-semibold mb-4 text-white">Respect Our Work</h2>
              <p className="text-gray-300">
                Zerion.WTF is the result of original development, testing, and security research. Attempts to steal, copy, or tamper with the system are taken seriously.
              </p>
            </div>
          </div>
        </div>
      </motion.div>
      <Footer />
    </>
  );
};

export default SoftwareProtection;