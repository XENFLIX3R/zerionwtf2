import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { X, CreditCard, DollarSign, Gamepad2, ExternalLink, AlertCircle, CheckCircle } from 'lucide-react';
import { siteConfig } from '@/config';

const PaymentModal = ({ plan, onClose }) => {
  const [selectedMethod, setSelectedMethod] = useState(null);
  const [robloxUsername, setRobloxUsername] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  const [verificationStatus, setVerificationStatus] = useState(null);
  const [error, setError] = useState('');

  const paymentMethods = [
    {
      id: 'robux',
      name: 'Robux',
      icon: <Gamepad2 className="w-6 h-6" />,
      description: 'Pay with Roblox Robux',
      color: 'bg-green-500/20 border-green-500/30 text-green-400'
    },
    {
      id: 'cashapp',
      name: 'CashApp',
      icon: <DollarSign className="w-6 h-6" />,
      description: 'Pay with CashApp',
      color: 'bg-blue-500/20 border-blue-500/30 text-blue-400'
    },
    {
      id: 'card',
      name: 'Credit/Debit Card',
      icon: <CreditCard className="w-6 h-6" />,
      description: 'Pay with Card',
      color: 'bg-purple-500/20 border-purple-500/30 text-purple-400'
    }
  ];

  const gamePassIds = {
    'Standard Plan': '123456789', // Replace with actual gamepass ID
    'Premium Plan': '987654321'   // Replace with actual gamepass ID
  };

  const handleExternalPayment = () => {
    window.open('https://zerionwtf.mysellauth.com', '_blank');
    onClose();
  };

  const verifyRobloxPurchase = async () => {
    if (!robloxUsername.trim()) {
      setError('Please enter your Roblox username');
      return;
    }

    setIsVerifying(true);
    setError('');
    setVerificationStatus(null);

    try {
      // First, get user ID from username
      const userResponse = await fetch(`https://users.roblox.com/v1/usernames/users`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          usernames: [robloxUsername],
          excludeBannedUsers: true
        })
      });

      if (!userResponse.ok) {
        throw new Error('Failed to find Roblox user');
      }

      const userData = await userResponse.json();
      
      if (!userData.data || userData.data.length === 0) {
        throw new Error('Roblox username not found');
      }

      const userId = userData.data[0].id;
      const gamePassId = gamePassIds[plan.name];

      // Check if user owns the gamepass
      const inventoryResponse = await fetch(
        `https://inventory.roblox.com/v1/users/${userId}/items/GamePass/${gamePassId}`,
        {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
          }
        }
      );

      if (!inventoryResponse.ok) {
        if (inventoryResponse.status === 404) {
          setVerificationStatus('not_purchased');
          setError('Gamepass not found in your inventory. Please purchase the gamepass first.');
        } else {
          throw new Error('Failed to verify gamepass ownership');
        }
        return;
      }

      const inventoryData = await inventoryResponse.json();
      
      if (inventoryData.data && inventoryData.data.length > 0) {
        setVerificationStatus('verified');
        // Redirect to Discord after successful verification
        setTimeout(() => {
          window.open(siteConfig.discordUrl, '_blank');
          onClose();
        }, 2000);
      } else {
        setVerificationStatus('not_purchased');
        setError('Gamepass not found in your inventory. Please purchase the gamepass first.');
      }

    } catch (error) {
      console.error('Verification error:', error);
      setError(error.message || 'Failed to verify purchase. Please try again.');
      setVerificationStatus('error');
    } finally {
      setIsVerifying(false);
    }
  };

  const getGamePassLink = () => {
    const gamePassId = gamePassIds[plan.name];
    return `https://www.roblox.com/game-pass/${gamePassId}`;
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="bg-zerion-black-light p-6 rounded-xl border border-zerion-purple/20 w-full max-w-md max-h-[90vh] overflow-y-auto"
      >
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-semibold text-white">
            Purchase {plan.name}
          </h3>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="text-gray-400 hover:text-white"
          >
            <X className="w-4 h-4" />
          </Button>
        </div>

        <div className="mb-6">
          <div className="bg-zerion-black-dark p-4 rounded-lg border border-zerion-purple/20">
            <h4 className="text-lg font-medium text-white mb-2">{plan.name}</h4>
            <p className="text-gray-400 text-sm mb-3">{plan.description}</p>
            <div className="text-2xl font-bold text-zerion-purple">
              {plan.price}<span className="text-sm text-gray-400">{plan.period}</span>
            </div>
          </div>
        </div>

        {!selectedMethod ? (
          <div className="space-y-4">
            <h4 className="text-lg font-medium text-white mb-4">Choose Payment Method</h4>
            {paymentMethods.map((method) => (
              <button
                key={method.id}
                onClick={() => setSelectedMethod(method.id)}
                className={`w-full p-4 rounded-lg border transition-all duration-200 hover:scale-105 ${method.color}`}
              >
                <div className="flex items-center">
                  {method.icon}
                  <div className="ml-3 text-left">
                    <div className="font-medium">{method.name}</div>
                    <div className="text-sm opacity-80">{method.description}</div>
                  </div>
                </div>
              </button>
            ))}
          </div>
        ) : selectedMethod === 'robux' ? (
          <div className="space-y-4">
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-lg font-medium text-white">Robux Payment</h4>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSelectedMethod(null)}
                className="text-gray-400 hover:text-white"
              >
                Back
              </Button>
            </div>

            <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4 mb-4">
              <div className="flex items-center mb-2">
                <AlertCircle className="w-5 h-5 text-blue-400 mr-2" />
                <span className="text-blue-400 font-medium">Instructions</span>
              </div>
              <ol className="text-sm text-gray-300 space-y-1 list-decimal list-inside">
                <li>Purchase the gamepass using the link below</li>
                <li>Enter your Roblox username</li>
                <li>Click verify to confirm your purchase</li>
                <li>Join our Discord and create a ticket</li>
              </ol>
            </div>

            <div className="space-y-4">
              <Button
                onClick={() => window.open(getGamePassLink(), '_blank')}
                className="w-full bg-green-500 hover:bg-green-600 text-white flex items-center justify-center gap-2"
              >
                <ExternalLink className="w-4 h-4" />
                Purchase Gamepass
              </Button>

              <div>
                <Label htmlFor="robloxUsername" className="text-white">
                  Roblox Username
                </Label>
                <Input
                  id="robloxUsername"
                  value={robloxUsername}
                  onChange={(e) => setRobloxUsername(e.target.value)}
                  placeholder="Enter your Roblox username"
                  className="bg-zerion-black-dark border-zerion-purple/30 text-white"
                />
              </div>

              {error && (
                <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-3">
                  <p className="text-red-400 text-sm">{error}</p>
                </div>
              )}

              {verificationStatus === 'verified' && (
                <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-3">
                  <div className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-400 mr-2" />
                    <p className="text-green-400 text-sm">
                      Purchase verified! Redirecting to Discord...
                    </p>
                  </div>
                </div>
              )}

              <Button
                onClick={verifyRobloxPurchase}
                disabled={isVerifying || !robloxUsername.trim()}
                className="w-full bg-zerion-purple hover:bg-zerion-purple-light text-white"
              >
                {isVerifying ? 'Verifying...' : 'Verify Purchase'}
              </Button>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-lg font-medium text-white">
                {selectedMethod === 'cashapp' ? 'CashApp' : 'Card'} Payment
              </h4>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSelectedMethod(null)}
                className="text-gray-400 hover:text-white"
              >
                Back
              </Button>
            </div>

            <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4 mb-4">
              <div className="flex items-center mb-2">
                <AlertCircle className="w-5 h-5 text-blue-400 mr-2" />
                <span className="text-blue-400 font-medium">Instructions</span>
              </div>
              <ol className="text-sm text-gray-300 space-y-1 list-decimal list-inside">
                <li>Complete your payment on our secure checkout page</li>
                <li>Save your payment confirmation/receipt</li>
                <li>Join our Discord and create a ticket</li>
                <li>Submit your payment proof for verification</li>
              </ol>
            </div>

            <Button
              onClick={handleExternalPayment}
              className="w-full bg-zerion-purple hover:bg-zerion-purple-light text-white flex items-center justify-center gap-2"
            >
              <ExternalLink className="w-4 h-4" />
              Continue to Checkout
            </Button>
          </div>
        )}

        <div className="mt-6 pt-4 border-t border-zerion-purple/20">
          <p className="text-xs text-gray-500 text-center">
            Need help? Join our{' '}
            <a
              href={siteConfig.discordUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-zerion-purple hover:underline"
            >
              Discord
            </a>{' '}
            for support
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default PaymentModal;