// src/components/util/modals/NotAvailableModal.tsx
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

interface NotAvailableModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const NotAvailableModal: React.FC<NotAvailableModalProps> = ({
  isOpen,
  onClose,
}) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 bg-black/30 backdrop-blur-sm flex items-center justify-center px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="bg-white rounded-xl p-6 w-full max-w-sm shadow-xl text-center relative"
          >
            <button
              className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
              onClick={onClose}
            >
              <X size={20} />
            </button>
            <h2 className="text-lg font-semibold text-gray-800 mb-2">
              Page Not Yet Available
            </h2>
            <p className="text-sm text-gray-600 mb-4">
              This feature is currently in development.
            </p>
            <button
              onClick={onClose}
              className="mt-2 px-4 py-2 bg-gray-800 text-white text-sm rounded-md hover:bg-gray-700 transition"
            >
              Close
            </button>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
