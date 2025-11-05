import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface SessionData {
  orderId: string;
  sessionId: string;
  merchantId: string;
  successIndicator: string;
  amount: number;
  currency: string;
}

interface PaymentState {
  sessionData: SessionData | null;
  error: string | null;
  isProcessing: boolean;
}

const initialState: PaymentState = {
  sessionData: null,
  error: null,
  isProcessing: false,
};

const paymentSlice = createSlice({
  name: 'payment',
  initialState,
  reducers: {
    setSessionData: (state, action: PayloadAction<SessionData>) => {
      state.sessionData = action.payload;
      state.error = null;
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.isProcessing = false;
    },
    setProcessing: (state, action: PayloadAction<boolean>) => {
      state.isProcessing = action.payload;
    },
    clearPaymentData: (state) => {
      state.sessionData = null;
      state.error = null;
      state.isProcessing = false;
    },
  },
});

export const {
  setSessionData,
  setError,
  setProcessing,
  clearPaymentData,
} = paymentSlice.actions;

export default paymentSlice.reducer;