import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchToken } from './TokenAPI'

const initialState = {
  token: {
    time: {
      updated: 'Oct 6, 2022 12:01:00 UTC',
      updatedISO: '2022-10-06T12:01:00+00:00',
      updateduk: 'Oct 6, 2022 at 13:01 BST',
    },
    disclaimer:
      'This data was produced from the CoinDesk Bitcoin Price Index (USD). Non-USD currency data converted using hourly conversion rate from openexchangerates.org',
    chartName: 'Bitcoin',
    bpi: {
      USD: {
        code: 'USD',
        symbol: '&#36;',
        rate: '20,270.5480',
        description: 'United States Dollar',
        rate_float: 20270.548,
      },
      GBP: {
        code: 'GBP',
        symbol: '&pound;',
        rate: '16,937.9078',
        description: 'British Pound Sterling',
        rate_float: 16937.9078,
      },
      EUR: {
        code: 'EUR',
        symbol: '&euro;',
        rate: '19,746.4733',
        description: 'Euro',
        rate_float: 19746.4733,
      },
    },
  },
  status: 'idle',
};

export const init = createAsyncThunk('token/fetch', () => {
  return fetchToken();
});

export const tokenSlice = createSlice({
  name: 'token',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(init.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(init.fulfilled, (state, action) => {
        state.status = 'idle';
        state.token = action.payload;
      })
      .addCase(init.rejected, (state) => {
        state.status = 'failed';
      });
  },
});

export const { update } = tokenSlice.actions;
export default tokenSlice.reducer;
