// redux/slice/filter.slice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface FilterState {
  fromDate: string;
  toDate: string;
  keyword: string;
}

const initialState: FilterState = {
  fromDate: '',
  toDate: '',
  keyword: '',
};

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setFilter: (state, action: PayloadAction<FilterState>) => {
      state.fromDate = action.payload.fromDate;
      state.toDate = action.payload.toDate;
      state.keyword = action.payload.keyword;
    },
    clearFilter: (state) => {
      state.fromDate = '';
      state.toDate = '';
      state.keyword = '';
    },
  },
});

export const { setFilter, clearFilter } = filterSlice.actions;
export default filterSlice.reducer;
