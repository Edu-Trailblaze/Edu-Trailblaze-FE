// redux/slice/filter.slice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface FilterState {
  fromDate: string;
  toDate: string;
}

const initialState: FilterState = {
  fromDate: '',
  toDate: '',
};

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setFilter: (state, action: PayloadAction<FilterState>) => {
      state.fromDate = action.payload.fromDate;
      state.toDate = action.payload.toDate;
    },
    clearFilter: (state) => {
      state.fromDate = '';
      state.toDate = '';
    },
  },
});

export const { setFilter, clearFilter } = filterSlice.actions;
export default filterSlice.reducer;
