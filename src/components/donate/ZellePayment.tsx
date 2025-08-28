/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FaBuilding,
  FaArrowLeft,
  FaPaperPlane,
  FaCopy,
  FaPaste,
  FaCheck,
  FaExclamationTriangle,
} from 'react-icons/fa';
import { useForm } from 'react-hook-form';
import { BoldText, ExtraBoldText, RegularText } from '../ui/fonts/typography';
import { useTheme } from '../../contexts/ThemeContext';

interface ZellePaymentProps {
  amount: number;
  currency: string;
  onBack: () => void;
  onComplete: () => void;
}

interface ZelleFormData {
  zelleSenderEmail: string;
  zelleSenderPhone: string;
  zelleConfirmation: string;
}

export const ZellePayment: React.FC<ZellePaymentProps> = ({
  amount,
  currency,
  onBack,
  onComplete,
}) => {
  const { colorScheme } = useTheme();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
  } = useForm<ZelleFormData>();

  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedId, setCopiedId] = useState(false);
  const [activeTab, setActiveTab] = useState<'email' | 'phone'>('email');
  const transactionIdRef = useRef<HTMLInputElement | null>(null);
  const zelleEmail = 'info@claudygod.com';

  // Dialog state
  const [showDialog, setShowDialog] = useState(false);
  const [dialogType, setDialogType] = useState<
    'success' | 'error' | 'processing'
  >('processing');
  const [dialogMessage, setDialogMessage] = useState('');

  const formatAmount = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency,
      minimumFractionDigits: 2,
    }).format(value);
  };

  const getApiBase = () => {
    if (import.meta.env.PROD) {
      return 'https://cgm-backend-5qvj.onrender.com';
    }
    return window.location.origin.includes('localhost')
      ? 'http://localhost:10000'
      : 'https://cgm-backend-5qvj.onrender.com';
  };

  const VALIDATE_ENDPOINT = `${getApiBase()}/api/zelle-payment/validate`;

  // Copy Zelle email to clipboard
  const copyZelleEmail = async () => {
    try {
      await navigator.clipboard.writeText(zelleEmail);
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2000);
    } catch (err) {
      console.error('Copy failed:', err);
    }
  };

  const copyTransactionId = async () => {
    try {
      await navigator.clipboard.writeText(
        transactionIdRef.current?.value || ''
      );
      setCopiedId(true);
      setTimeout(() => setCopiedId(false), 2000);
    } catch (err) {
      console.error('Copy failed:', err);
    }
  };

  const pasteTransactionId = async () => {
    try {
      const text = await navigator.clipboard.readText();
      const uppercaseText = text
        .toUpperCase()
        .replace(/[^A-Z0-9]/g, '')
        .slice(0, 9);
      setValue('zelleConfirmation', uppercaseText);
    } catch (err) {
      console.error('Paste failed:', err);
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pastedText = e.clipboardData.getData('text');
    const uppercaseText = pastedText
      .toUpperCase()
      .replace(/[^A-Z0-9]/g, '')
      .slice(0, 9);

    if (transactionIdRef.current) {
      transactionIdRef.current.value = uppercaseText;
      setValue('zelleConfirmation', uppercaseText);
    }
  };

  const onSubmit = async (data: ZelleFormData) => {
    try {
      setDialogType('processing');
      setDialogMessage('Validating your payment details...');
      setShowDialog(true);

      const payload = {
        ...data,
        amount,
        currency,
      };

      const response = await fetch(VALIDATE_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Payment validation failed');
      }

      // Show success dialog
      setDialogType('success');
      setDialogMessage('Payment validated successfully!');

      // Close dialog and complete after delay
      setTimeout(() => {
        setShowDialog(false);
        onComplete();
      }, 2000);
    } catch (error: any) {
      // Show error dialog
      setDialogType('error');
      setDialogMessage(`Validation failed: ${error.message}`);
      setShowDialog(true);
      console.error('Zelle validation error:', error);
    }
  };

  const closeDialog = () => {
    setShowDialog(false);
  };

  return (
    <div className="relative">
      <AnimatePresence>
        {showDialog && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 flex items-center justify-center z-50 p-4"
            style={{ background: colorScheme.text, opacity: 0.5 }}
            onClick={dialogType !== 'processing' ? closeDialog : undefined}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="w-full max-w-md mx-4 rounded-xl shadow-xl"
              style={{
                background: colorScheme.background,
                border: `1px solid ${colorScheme.border}`,
              }}
              onClick={e => e.stopPropagation()}
            >
              <div className="p-6 text-center">
                {dialogType === 'processing' && (
                  <>
                    <div className="flex justify-center mb-4">
                      <div
                        className="w-16 h-16 rounded-full animate-spin"
                        style={{
                          border: `4px solid ${colorScheme.border}`,
                          borderTopColor: colorScheme.primary,
                        }}
                      ></div>
                    </div>
                    <ExtraBoldText
                      fontSize="20px"
                      style={{ color: colorScheme.text }}
                      className="mb-2"
                    >
                      Processing Payment
                    </ExtraBoldText>
                    <RegularText style={{ color: colorScheme.textSecondary }}>
                      {dialogMessage}
                    </RegularText>
                  </>
                )}

                {dialogType === 'success' && (
                  <>
                    <div
                      className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
                      style={{ background: colorScheme.success, opacity: 0.1 }}
                    >
                      <FaCheck
                        className="text-3xl"
                        style={{ color: colorScheme.success }}
                      />
                    </div>
                    <ExtraBoldText
                      fontSize="20px"
                      style={{ color: colorScheme.text }}
                      className="mb-2"
                    >
                      Success!
                    </ExtraBoldText>
                    <RegularText
                      style={{ color: colorScheme.textSecondary }}
                      className="mb-4"
                    >
                      {dialogMessage}
                    </RegularText>
                    <div className="mt-4">
                      <div
                        className="w-12 h-1 rounded-full mx-auto animate-pulse"
                        style={{ background: colorScheme.success }}
                      ></div>
                    </div>
                  </>
                )}

                {dialogType === 'error' && (
                  <>
                    <div
                      className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
                      style={{ background: colorScheme.error, opacity: 0.1 }}
                    >
                      <FaExclamationTriangle
                        className="text-3xl"
                        style={{ color: colorScheme.error }}
                      />
                    </div>
                    <ExtraBoldText
                      fontSize="20px"
                      style={{ color: colorScheme.text }}
                      className="mb-2"
                    >
                      Validation Failed
                    </ExtraBoldText>
                    <RegularText
                      style={{
                        color: colorScheme.textSecondary,
                        background: colorScheme.error + '10',
                        textAlign: 'left',
                      }}
                      className="mb-4 p-3 rounded"
                    >
                      {dialogMessage}
                    </RegularText>
                    <button
                      onClick={closeDialog}
                      className="px-4 py-2 rounded-lg transition-colors"
                      style={{
                        background: colorScheme.primary,
                        color: colorScheme.buttonText,
                      }}
                    >
                      Try Again
                    </button>
                  </>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="p-6 rounded-xl max-w-md mx-auto"
        style={{
          background: colorScheme.background,
          border: `1px solid ${colorScheme.border}`,
        }}
      >
        <div className="flex justify-between items-center mb-6">
          <button
            onClick={onBack}
            className="flex items-center gap-1 transition-colors"
            style={{ color: colorScheme.primary }}
          >
            <FaArrowLeft className="mr-1" />
            <RegularText>Back</RegularText>
          </button>
          <div className="flex items-center gap-2">
            <div
              className="p-2 rounded-lg"
              style={{ background: colorScheme.primary + '10' }}
            >
              <FaBuilding
                style={{ color: colorScheme.primary }}
                className="text-xl"
              />
            </div>
            <ExtraBoldText fontSize="20px" style={{ color: colorScheme.text }}>
              Zelle Payment
            </ExtraBoldText>
          </div>
        </div>

        <div
          className="p-5 rounded-xl mb-6 shadow-sm"
          style={{
            background: colorScheme.primary + '08',
            border: `1px solid ${colorScheme.primary + '30'}`,
          }}
        >
          <RegularText
            className="text-center mb-1"
            style={{ color: colorScheme.text }}
          >
            Send {formatAmount(amount)} to:
          </RegularText>

          <div className="flex items-center justify-center gap-2 mt-3">
            <div
              className="px-4 py-2 rounded-lg flex items-center justify-between w-full max-w-xs"
              style={{
                background: colorScheme.background,
                border: `1px solid ${colorScheme.primary + '50'}`,
              }}
            >
              <RegularText
                className="truncate"
                style={{ color: colorScheme.primary }}
              >
                {zelleEmail}
              </RegularText>
              <button
                onClick={copyZelleEmail}
                className={`ml-2 p-1 rounded ${
                  copiedEmail
                    ? `text-green-600 bg-green-100`
                    : `hover:${colorScheme.primary + '10'}`
                }`}
                style={{ color: colorScheme.primary }}
                aria-label="Copy email"
              >
                {copiedEmail ? <FaCheck /> : <FaCopy />}
              </button>
            </div>
          </div>

          <RegularText
            className="text-center mt-3"
            style={{ color: colorScheme.textSecondary }}
          >
            Please use your registered Zelle email
          </RegularText>
        </div>

        {/* Tab Navigation */}
        <div
          className="flex border-b mb-6"
          style={{ borderColor: colorScheme.border }}
        >
          <button
            type="button"
            className={`flex-1 py-3 text-center ${
              activeTab === 'email'
                ? `border-b-2 ${colorScheme.primary}`
                : `hover:${colorScheme.textSecondary}`
            }`}
            style={{
              color:
                activeTab === 'email'
                  ? colorScheme.primary
                  : colorScheme.textSecondary,
              borderColor: colorScheme.primary,
            }}
            onClick={() => setActiveTab('email')}
          >
            <BoldText>Email</BoldText>
          </button>
          <button
            type="button"
            className={`flex-1 py-3 text-center ${
              activeTab === 'phone'
                ? `border-b-2 ${colorScheme.primary}`
                : `hover:${colorScheme.textSecondary}`
            }`}
            style={{
              color:
                activeTab === 'phone'
                  ? colorScheme.primary
                  : colorScheme.textSecondary,
              borderColor: colorScheme.primary,
            }}
            onClick={() => setActiveTab('phone')}
          >
            <BoldText>Phone</BoldText>
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {activeTab === 'email' ? (
            <div>
              <label htmlFor="zelleSenderEmail" className="block mb-2">
                <RegularText>
                  Your Zelle Email{' '}
                  <span style={{ color: colorScheme.error }}>*</span>
                </RegularText>
              </label>
              <div className="relative">
                <input
                  id="zelleSenderEmail"
                  type="email"
                  {...register('zelleSenderEmail', {
                    required: 'Email is required',
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: 'Invalid email address',
                    },
                  })}
                  className={`w-full pl-3 pr-10 py-2.5 rounded-lg focus:outline-none ${
                    errors.zelleSenderEmail
                      ? `border ${colorScheme.error} focus:ring-2 ${colorScheme.error}`
                      : `border ${colorScheme.border} focus:ring-2 ${colorScheme.focusRing}`
                  }`}
                  placeholder="your.email@example.com"
                  style={{ background: colorScheme.background }}
                />
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    style={{ color: colorScheme.textSecondary }}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                </div>
              </div>
              {errors.zelleSenderEmail && (
                <RegularText
                  className="mt-1.5 flex items-center"
                  style={{ color: colorScheme.error }}
                >
                  <FaExclamationTriangle className="mr-1" />
                  {errors.zelleSenderEmail.message}
                </RegularText>
              )}
            </div>
          ) : (
            <div>
              <label htmlFor="zelleSenderPhone" className="block mb-2">
                <RegularText>
                  Your Zelle Phone{' '}
                  <span style={{ color: colorScheme.error }}>*</span>
                </RegularText>
              </label>
              <div className="relative">
                <input
                  id="zelleSenderPhone"
                  type="tel"
                  {...register('zelleSenderPhone', {
                    required: 'Phone number is required',
                    pattern: {
                      value: /^[0-9]{10}$/,
                      message: 'Invalid phone number (10 digits)',
                    },
                  })}
                  className={`w-full pl-3 pr-10 py-2.5 rounded-lg focus:outline-none ${
                    errors.zelleSenderPhone
                      ? `border ${colorScheme.error} focus:ring-2 ${colorScheme.error}`
                      : `border ${colorScheme.border} focus:ring-2 ${colorScheme.focusRing}`
                  }`}
                  placeholder="1234567890"
                  style={{ background: colorScheme.background }}
                />
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    style={{ color: colorScheme.textSecondary }}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    />
                  </svg>
                </div>
              </div>
              {errors.zelleSenderPhone && (
                <RegularText
                  className="mt-1.5 flex items-center"
                  style={{ color: colorScheme.error }}
                >
                  <FaExclamationTriangle className="mr-1" />
                  {errors.zelleSenderPhone.message}
                </RegularText>
              )}
            </div>
          )}

          <div>
            <div className="flex items-center justify-between mb-2">
              <label htmlFor="zelleConfirmation">
                <RegularText>
                  Transaction ID{' '}
                  <span style={{ color: colorScheme.error }}>*</span>
                </RegularText>
              </label>
              <div className="flex gap-1">
                <button
                  type="button"
                  onClick={pasteTransactionId}
                  className="text-xs flex items-center gap-1 px-2 py-1 rounded"
                  style={{
                    color: colorScheme.primary,
                    background: colorScheme.primary + '10',
                  }}
                >
                  <FaPaste className="text-sm" /> Paste
                </button>
                <button
                  type="button"
                  onClick={copyTransactionId}
                  className={`text-xs flex items-center gap-1 px-2 py-1 rounded ${
                    copiedId
                      ? `text-green-700 bg-green-50`
                      : `text-purple-700 hover:text-purple-900 hover:bg-purple-50`
                  }`}
                  style={{
                    color: copiedId ? colorScheme.success : colorScheme.primary,
                    background: copiedId
                      ? colorScheme.success + '10'
                      : colorScheme.primary + '10',
                  }}
                >
                  {copiedId ? <FaCheck /> : <FaCopy />} Copy
                </button>
              </div>
            </div>

            <div className="relative">
              <input
                id="zelleConfirmation"
                {...register('zelleConfirmation', {
                  required: 'Transaction ID is required',
                  minLength: {
                    value: 9,
                    message: 'ID must be exactly 9 characters',
                  },
                  maxLength: {
                    value: 9,
                    message: 'ID must be exactly 9 characters',
                  },
                  pattern: {
                    value: /^[A-Z0-9]{9}$/,
                    message:
                      'Must be 9 alphanumeric characters (uppercase only)',
                  },
                })}
                ref={e => {
                  register('zelleConfirmation').ref(e);
                  transactionIdRef.current = e;
                }}
                onPaste={handlePaste}
                onChange={e => {
                  const value = e.target.value
                    .toUpperCase()
                    .replace(/[^A-Z0-9]/g, '');
                  e.target.value = value;
                  setValue('zelleConfirmation', value);
                }}
                className={`w-full pl-3 pr-24 py-2.5 rounded-lg focus:outline-none ${
                  errors.zelleConfirmation
                    ? `border ${colorScheme.error} focus:ring-2 ${colorScheme.error}`
                    : `border ${colorScheme.border} focus:ring-2 ${colorScheme.focusRing}`
                }`}
                placeholder="Enter 9-character ID"
                maxLength={9}
                style={{ background: colorScheme.background }}
              />
              <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                <span
                  className="text-xs font-mono px-2 py-1 rounded"
                  style={{
                    color: colorScheme.textSecondary,
                    background: colorScheme.border,
                  }}
                >
                  {transactionIdRef.current?.value?.length || 0}/9
                </span>
              </div>
            </div>

            {errors.zelleConfirmation && (
              <RegularText
                className="mt-1.5 flex items-center"
                style={{ color: colorScheme.error }}
              >
                <FaExclamationTriangle className="mr-1" />
                {errors.zelleConfirmation.message}
              </RegularText>
            )}
            <RegularText
              className="mt-1.5"
              style={{ color: colorScheme.textSecondary }}
            >
              You can find this in your Zelle payment confirmation
            </RegularText>
          </div>

          <div className="pt-4">
            <div className="flex gap-3">
              <button
                type="button"
                onClick={onBack}
                className="flex-1 px-4 py-3 rounded-lg flex items-center justify-center"
                style={{
                  color: colorScheme.text,
                  background: colorScheme.border,
                  border: `1px solid ${colorScheme.border}`,
                }}
              >
                <FaArrowLeft className="mr-2" />
                <BoldText>Back</BoldText>
              </button>

              <button
                type="submit"
                disabled={isSubmitting}
                className={`flex-1 px-4 py-3 rounded-lg text-white flex items-center justify-center shadow-md ${
                  isSubmitting
                    ? `bg-${colorScheme.primary} opacity-70 cursor-not-allowed`
                    : `bg-gradient-to-r ${colorScheme.primaryGradient} hover:${colorScheme.primaryGradient}`
                }`}
                style={{ color: colorScheme.buttonText }}
              >
                {isSubmitting ? (
                  <>
                    <svg
                      className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    <BoldText>Validating...</BoldText>
                  </>
                ) : (
                  <>
                    <FaPaperPlane className="mr-2" />
                    <BoldText>Submit Payment</BoldText>
                  </>
                )}
              </button>
            </div>
          </div>
        </form>

        <div
          className="mt-6 p-4 rounded-xl"
          style={{
            background: colorScheme.primary + '08',
            border: `1px solid ${colorScheme.primary + '30'}`,
          }}
        >
          <div className="flex items-center mb-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 mr-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              style={{ color: colorScheme.primary }}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <BoldText style={{ color: colorScheme.text }}>
              Important Notes:
            </BoldText>
          </div>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              <RegularText style={{ color: colorScheme.textSecondary }}>
                Make sure you've sent the exact amount to{' '}
                <span style={{ color: colorScheme.primary }}>{zelleEmail}</span>
              </RegularText>
            </li>
            <li>
              <RegularText style={{ color: colorScheme.textSecondary }}>
                Transaction ID must be exactly 9 alphanumeric characters
              </RegularText>
            </li>
            <li>
              <RegularText style={{ color: colorScheme.textSecondary }}>
                Use the same email or phone you registered with Zelle
              </RegularText>
            </li>
            <li>
              <RegularText style={{ color: colorScheme.textSecondary }}>
                Contact support@claudygod.org for assistance
              </RegularText>
            </li>
          </ul>
        </div>
      </motion.div>
    </div>
  );
};
