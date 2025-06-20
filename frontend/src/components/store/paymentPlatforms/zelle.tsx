import React, { useState } from 'react';
import { Building, Copy, CheckCircle } from 'lucide-react';

interface ZellePaymentProps {
  onNext: () => void;
}

export const ZellePayment: React.FC<ZellePaymentProps> = ({ onNext }) => {
  const [copied, setCopied] = useState(false);
  const [confirmationId, setConfirmationId] = useState('');
  
  const zelleEmail = 'cokorie77@gmail.com';

  const copyToClipboard = () => {
    navigator.clipboard.writeText(zelleEmail);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (confirmationId.trim()) {
      onNext();
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-purple-50 p-4 rounded-lg flex items-center">
        <Building className="h-5 w-5 text-purple-600 mr-2" />
        <span className="text-sm text-purple-800 work-sans">
          Send payment using Zelle and provide the confirmation ID below
        </span>
      </div>

      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h3 className="text-lg roboto-condensed text-gray-900 mb-4">Zelle Payment Instructions</h3>
        
        <ol className="space-y-3 text-sm text-gray-700 mb-6">
          <li className="flex items-start raleway-medium">
            <span className="bg-purple-900 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs mr-3 mt-0.5">1</span>
            Open your banking app or visit your bank's website
          </li>
          <li className="flex items-start raleway-medium">
            <span className="bg-purple-900 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs mr-3 mt-0.5">2</span>
            Select "Send Money with Zelle"
          </li>
          <li className="flex items-start raleway-medium">
            <span className="bg-purple-900 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs mr-3 mt-0.5">3</span>
            Use our email address as the recipient
          </li>
          <li className="flex items-start raleway-medium">
            <span className="bg-purple-900 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs mr-3 mt-0.5">4</span>
            Enter the total amount and send
          </li>
          <li className="flex items-start raleway-medium">
            <span className="bg-purple-900 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs mr-3 mt-0.5">5</span>
            Copy the confirmation ID and paste it below
          </li>
        </ol>

        <div className="bg-gray-50 p-4 rounded-lg">
          <label className="block text-sm font-medium work-sans text-gray-700 mb-2">
            Zelle Email Address
          </label>
          <div className="flex items-center justify-between bg-white border border-gray-300 rounded-lg px-4 py-3">
            <span className="font-mono text-sm">{zelleEmail}</span>
            <button
              onClick={copyToClipboard}
              className="ml-2 p-2 text-purple-600 hover:text-purple-800 transition-colors duration-200"
            >
              {copied ? <CheckCircle className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
            </button>
          </div>
          {copied && (
            <p className="text-sm text-green-600 mt-2">Email address copied to clipboard!</p>
          )}
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <div>
          <label className="block text-sm font-medium work-sans text-gray-700 mb-2">
            Zelle Transaction ID *
          </label>
          <input
            type="text"
            value={confirmationId}
            onChange={(e) => setConfirmationId(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            placeholder="Enter your Zelle confirmation ID"
            required
          />
          <p className="text-sm text-gray-600 mt-2">
            You'll receive this Transaction ID after completing the Zelle transfer
          </p>
        </div>

        <button
          type="submit"
          disabled={!confirmationId.trim()}
          className="w-full mt-6 bg-purple-900 text-white py-3 px-6 rounded-lg font-semibold hover:bg-purple-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
        >
          Confirm Transaction ID
        </button>
      </form>
    </div>
  );
};