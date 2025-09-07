import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { jwtDecode } from "jwt-decode";
import adminauthService from "./adminauthServices";

function adminAuthStatus() {
  const token = localStorage.getItem("admin-token");
  if (token === null) {
    return null;
  }
  
  try {
    const decoded = jwtDecode(token);
    // Check if token is expired
    const currentTime = Date.now() / 1000;
    if (decoded.exp < currentTime) {
      // Token is expired, remove it
      localStorage.removeItem("admin-token");
      return null;
    }
    
    return {
      _id: decoded._id,
      email: decoded.email,
      isAdmin: decoded.isAdmin
    };
  } catch (error) {
    // Token is invalid, remove it
    localStorage.removeItem("admin-token");
    return null;
  }
}

const initialState = {
  adminData: adminAuthStatus(),
  isLoading: false,
  isError: false,
  isSuccess: false,
  message: "",
};

export const adminLogin = createAsyncThunk("admin/login", async (user, thunkAPI) => {
  try {
    return await adminauthService.adminLogin(user);
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message;
    return thunkAPI.rejectWithValue(message);
  }
});

export const adminLogout = createAsyncThunk("admin/logout", async () => {
  await adminauthService.adminLogout();
});

export const adminauthSlices = createSlice({
  name: "adminAuth",
  initialState,
  reducers: {
    resetAdminAuth: (state) => {
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = false;
      state.message = "";
    },
    clearAdminAuth: (state) => {
      state.adminData = null;
      state.isError = false;
      state.isSuccess = false;
      state.message = "";
      localStorage.removeItem("admin-token");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(adminLogout.fulfilled, (state) => {
        state.isError = false;
        state.isLoading = false;
        state.isSuccess = false;
        state.message = "";
        state.adminData = null;
      })
      .addCase(adminLogin.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(adminLogin.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.adminData = action.payload.data;
      })
      .addCase(adminLogin.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.adminData = null;
        // Clear any expired token
        localStorage.removeItem("admin-token");
      });
  },
});

export const { resetAdminAuth, clearAdminAuth } = adminauthSlices.actions;
export default adminauthSlices.reducer;
