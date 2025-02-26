import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '@/store/index';

type historyEntry = {
  time: number;
  price: number;
};

type PriceHistoryResponse = {
  symbol: string | null;
  history: historyEntry[];
};

type PriceHistoryState = {
  symbol: string | null;
  history: historyEntry[];
  apiState: {
    loading: boolean | null;
    error: boolean;
  };
};

const initialState: PriceHistoryState = {
  symbol: null,
  history: [],
  apiState: {
    loading: false,
    error: false
  }
};

type FetchPriceHistoryParams = {
  symbolId: string;
  signal: AbortSignal;
};

export const fetchPriceHistory = createAsyncThunk(
  'stocks/fetchPriceHistory',
  // if you type your function argument here
  async ({ symbolId, signal }: FetchPriceHistoryParams, { rejectWithValue }) => {
    try {
      const response = await fetch(`http://localhost:3100/api/stock/history/${symbolId}`, {
        signal
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return await response.json() as PriceHistoryResponse;
    } catch (error) {
      if (error instanceof Error) {
        if (error.name === 'AbortError') {
          return rejectWithValue({ aborted: true });
        }
        return rejectWithValue({ error: error.message });
      }
      return rejectWithValue({ error: 'Unknown error occurred' });
    }
  }
);

const selectSymbolInfo = (state: RootState) => state.priceHistory.symbol;
const selectPriceHistory = (state: RootState) => state.priceHistory.history;
const apiState = (state: RootState) => state.priceHistory.apiState;

const priceHistorySlice = createSlice({
  name: 'priceHistory',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder
      .addCase(fetchPriceHistory.pending, (state) => {
        state.apiState.loading = true;
        state.apiState.error = false;
        state.history = []; // Clear previous data when loading new
      })
      .addCase(fetchPriceHistory.fulfilled, (state, action) => {
        const { symbol, history } = action.payload;
        state.apiState.loading = false;
        state.apiState.error = false;
        state.history = history;
        state.symbol = symbol;
      })
      .addCase(fetchPriceHistory.rejected, (state, action) => {
        const payload = action.payload as { aborted?: boolean; error?: string };
        if (payload?.aborted) {
          // Do nothing for aborted requests
          return;
        }
        // Handle actual errors
        state.apiState.loading = false;
        state.apiState.error = true;
        state.history = [];
        state.symbol = null;
      });
  }
});

const selectors = {
  selectPriceHistory,
  selectSymbolInfo,
  apiState
};

export default priceHistorySlice;
export { selectors };
