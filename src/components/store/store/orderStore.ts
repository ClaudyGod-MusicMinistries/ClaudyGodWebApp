// import { create } from 'zustand';
// // import { Order, CartItem, ShippingInfo, PaymentInfo } from '../types';
// // import { apiService } from '../../services/';

// interface OrderStore {
//   orders: Order[];
//   currentOrder: Order | null;
//   isLoading: boolean;
//   error: string | null;

//   createOrder: (items: CartItem[], shipping: ShippingInfo, paymentMethod: string) => Promise<string>;
//   getOrder: (orderId: string) => Promise<Order | null>;
//   confirmPayment: (orderId: string, paymentInfo: PaymentInfo) => Promise<void>;
//   updateOrderStatus: (orderId: string, status: Order['status']) => void;
//   clearError: () => void;
// }

// export const useOrderStore = create<OrderStore>((set, get) => ({
//   orders: [],
//   currentOrder: null,
//   isLoading: false,
//   error: null,

//   createOrder: async (items: CartItem[], shipping: ShippingInfo, paymentMethod: string) => {
//     set({ isLoading: true, error: null });

//     try {
//       const total = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);

//       const orderData = {
//         amount: total,
//         shipping,
//         paymentMethod,
//         items: items.map(item => ({
//           productId: item.id,
//           name: item.name,
//           quantity: item.quantity,
//           price: item.price
//         }))
//       };

//       const response = await apiService.createOrder(orderData);

//       if (response.success && response.orderId) {
//         const order: Order = {
//           id: response.orderId,
//           orderId: response.orderId,
//           items,
//           shippingInfo: shipping,
//           paymentInfo: { method: paymentMethod as any },
//           subtotal: total,
//           tax: 0,
//           total,
//           status: 'pending',
//           createdAt: new Date()
//         };

//         set(state => ({
//           orders: [...state.orders, order],
//           currentOrder: order,
//           isLoading: false
//         }));

//         return response.orderId;
//       } else {
//         throw new Error('Failed to create order');
//       }
//     } catch (error) {
//       const errorMessage = error instanceof Error ? error.message : 'Failed to create order';
//       set({ error: errorMessage, isLoading: false });
//       throw error;
//     }
//   },

//   getOrder: async (orderId: string) => {
//     set({ isLoading: true, error: null });

//     try {
//       const response = await apiService.getOrder(orderId);

//       if (response) {
//         const order: Order = {
//           id: response.orderId,
//           orderId: response.orderId,
//           items: response.items || [],
//           shippingInfo: response.shippingInfo || {},
//           paymentInfo: response.paymentInfo || {},
//           subtotal: response.subtotal || 0,
//           tax: response.tax || 0,
//           total: response.total || 0,
//           status: response.status || 'pending',
//           createdAt: new Date(response.createdAt)
//         };

//         set({ currentOrder: order, isLoading: false });
//         return order;
//       }

//       return null;
//     } catch (error) {
//       const errorMessage = error instanceof Error ? error.message : 'Failed to fetch order';
//       set({ error: errorMessage, isLoading: false });
//       return null;
//     }
//   },

//   confirmPayment: async (orderId: string, paymentInfo: PaymentInfo) => {
//     set({ isLoading: true, error: null });

//     try {
//       const confirmation = paymentInfo.zelleConfirmation ||
//                           paymentInfo.paypalTxnId ||
//                           paymentInfo.stripePaymentIntentId ||
//                           paymentInfo.paystackReference ||
//                           paymentInfo.bankTransferReference || '';

//       await apiService.confirmPayment(orderId, {
//         paymentMethod: paymentInfo.method,
//         confirmation
//       });

//       set(state => ({
//         orders: state.orders.map(order =>
//           order.orderId === orderId
//             ? { ...order, status: 'confirmed', paymentInfo }
//             : order
//         ),
//         isLoading: false
//       }));
//     } catch (error) {
//       const errorMessage = error instanceof Error ? error.message : 'Failed to confirm payment';
//       set({ error: errorMessage, isLoading: false });
//       throw error;
//     }
//   },

//   updateOrderStatus: (orderId: string, status: Order['status']) => {
//     set(state => ({
//       orders: state.orders.map(order =>
//         order.orderId === orderId ? { ...order, status } : order
//       )
//     }));
//   },

//   clearError: () => {
//     set({ error: null });
//   }
// }));
