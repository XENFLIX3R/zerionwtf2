import React from "react";
import { motion } from "framer-motion";
import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";

const TermsOfService = () => {
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
            <h1 className="text-3xl font-bold mb-6 text-white">Terms of Service</h1>
            <div className="prose prose-invert">
              <p className="text-gray-300 mb-6">
                By using Zerion.WTF, you agree to the following Terms of Service. Failure to comply with these terms may result in suspension, permanent blacklist, or denial of access to the product.
              </p>

              <h2 className="text-xl font-semibold mb-4 text-white">Standard Plan - User Terms</h2>
              <h3 className="text-lg font-medium mb-2 text-white">Limited Command Access</h3>
              <p className="text-gray-300 mb-4">
                Standard users are restricted from using certain high-impact commands, including but not limited to:
                <ul className="list-disc list-inside mt-2">
                  <li>kill all</li>
                  <li>bring all</li>
                  <li>ban all</li>
                  <li>chat all</li>
                </ul>
              </p>

              <h2 className="text-xl font-semibold mb-4 text-white">Premium Plan - User Terms</h2>
              <h3 className="text-lg font-medium mb-2 text-white">Full Command Access</h3>
              <p className="text-gray-300 mb-4">
                Premium users have access to advanced commands including:
                <ul className="list-disc list-inside mt-2">
                  <li>view all</li>
                  <li>bring all</li>
                </ul>
              </p>

              <h2 className="text-xl font-semibold mb-4 text-white">Universal Rules – All Users</h2>
              <div className="text-gray-300">
                <h3 className="text-lg font-medium mb-2 text-white">No Game Stealing</h3>
                <p className="mb-4">Running scripts that inject backdoors or malicious modules into our games is strictly forbidden.</p>

                <h3 className="text-lg font-medium mb-2 text-white">No Game Leaking or Snitching</h3>
                <p className="mb-4">Leaking server-side details, exploits, or exposing scripts to staff without authorization will result in permanent blacklisting.</p>

                <h3 className="text-lg font-medium mb-2 text-white">No External Purchase Prompts</h3>
                <p className="mb-4">Creating or inserting purchase prompts for personal profit is not allowed.</p>

                <h3 className="text-lg font-medium mb-2 text-white">No Server-Destroying Scripts</h3>
                <p className="mb-4">
                  The following disruptive actions are not permitted:
                  <ul className="list-disc list-inside mt-2">
                    <li>Spamming decals, hints, or messages</li>
                    <li>Jumpscares</li>
                    <li>Playing loud or looping music</li>
                    <li>Skybox modification</li>
                    <li>Unanchoring parts or objects</li>
                  </ul>
                </p>

                <h3 className="text-lg font-medium mb-2 text-white">Enforcement and Consent</h3>
                <p>By purchasing or using Zerion.WTF, you acknowledge and accept these Terms of Service. Any violation may result in temporary suspension or a permanent blacklist without notice.</p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
      <Footer />
    </>
  );
};

export default TermsOfService;