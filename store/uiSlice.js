import { createSlice } from "@reduxjs/toolkit";

const uiSlice = createSlice({
  name: "ui",
  initialState: {
    mobileMenuOpen: false,
    activeSection: "home",
    isScrolled: false,
  },
  reducers: {
    toggleMobileMenu: (state) => {
      state.mobileMenuOpen = !state.mobileMenuOpen;
    },
    closeMobileMenu: (state) => {
      state.mobileMenuOpen = false;
    },
    setActiveSection: (state, action) => {
      state.activeSection = action.payload;
    },
    setIsScrolled: (state, action) => {
      state.isScrolled = action.payload;
    },
  },
});

export const { toggleMobileMenu, closeMobileMenu, setActiveSection, setIsScrolled } = uiSlice.actions;
export default uiSlice.reducer;