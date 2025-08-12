// src/components/checkout/OrderSummary.tsx
import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../../contexts/ThemeContext';
import { BoldText, SemiBoldText, RegularText } from '../ui/fonts/typography';
import { CartItem } from '../../contexts/Cartcontext';

interface OrderSummaryProps {
  items: CartItem[];
  subtotal: number;
  tax: number;
  total: number;
}

export const OrderSummary: React.FC<OrderSummaryProps> = ({
  items,
  subtotal,
  tax,
  total
}) => {
  const { colorScheme } = useTheme();

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
      className="rounded-2xl p-6 sticky top-8"
      style={{
        border:"1px solid", color:colorScheme.primary
      }}
    >
      <BoldText as="h2" fontSize="1.25rem" className="mb-6" 
      color={colorScheme.primary}>
        Order Summary
      </BoldText>
      
      {/* Items */}
      <div className="space-y-4 mb-6 max-h-60 overflow-y-auto">
        {items.map((item) => (
          <div 
            key={item.id} 
            className="flex items-center space-x-4 py-3 border-b"
            style={{ borderColor: colorScheme.borderLight }}
          >
            <img
              src={item.image}
              alt={item.name}
              className="w-12 h-12 object-cover rounded-lg"
            />
            <div className="flex-1 min-w-0">
              <SemiBoldText className="truncate"
              fontSize="0.95rem"
              color={colorScheme.background}>{item.name}</SemiBoldText>
              <RegularText fontSize="0.75rem" color={colorScheme.background}>
                Qty: {item.quantity}
              </RegularText>
            </div>
            <SemiBoldText fontSize="0.875rem"
              style={{ color:colorScheme.primary}}>
              ${(item.price * item.quantity).toFixed(2)}
            </SemiBoldText>
          </div>
        ))}
      </div>

      {/* Totals */}
      <div className="space-y-3 border-t pt-4" style={{ borderColor: colorScheme.border }}>
        <div className="flex justify-between">
          <RegularText color={colorScheme.background}>Subtotal</RegularText>
          <RegularText color={colorScheme.error}>${subtotal.toFixed(2)}</RegularText>
        </div>
        <div className="flex justify-between">
          <RegularText color={colorScheme.background}>Shipping</RegularText>
          <RegularText color={colorScheme.success}>Free</RegularText>
        </div>
        <div className="flex justify-between">
          <RegularText color={colorScheme.background}>Tax</RegularText>
          <RegularText color={colorScheme.background}>${tax.toFixed(2)}</RegularText>
        </div>
        <div className="border-t pt-3" style={{ borderColor: colorScheme.border }}>
          <div className="flex justify-between">
            <BoldText color={colorScheme.background}>Total</BoldText>
            <BoldText color={colorScheme.primary}>${total.toFixed(2)}</BoldText>
          </div>
        </div>
      </div>

      <div className="mt-6 pt-6 border-t" style={{ borderColor: colorScheme.border }}>
        <div className="flex items-center text-sm" style={{ color: colorScheme.background }}>
          <span>🔒 Secure checkout with SSL encryption</span>
        </div>
      </div>
    </motion.div>
  );
};