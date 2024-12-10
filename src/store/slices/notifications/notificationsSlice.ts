import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppThunk } from "@/store/store";
import axios from "axios";
import { url } from "@/connections/mainApi";

interface Notification {
  _id: string;
  userId: string;
  serviceId: string;
  message: string;
  date: string;
  read: boolean;
}

interface NotificationsState {
  notifications: Notification[];
  loading: boolean;
}

const initialState: NotificationsState = {
  notifications: [],
  loading: false,
};

const notificationsSlice = createSlice({
  name: "notifications",
  initialState,
  reducers: {
    setNotifications: (state, action: PayloadAction<Notification[]>) => {
      state.notifications = action.payload;
    },
    addNotification: (state, action: PayloadAction<Notification>) => {
      state.notifications = [action.payload, ...state.notifications];
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    markAsRead: (state, action: PayloadAction<string>) => {
      state.notifications = state.notifications.map(notification =>
        notification._id === action.payload ? { ...notification, read: true } : notification
      );
    },
  },
});

export const { setNotifications, addNotification, setLoading, markAsRead } = notificationsSlice.actions;

export const fetchNotifications = (userId: string): AppThunk => async dispatch => {
  dispatch(setLoading(true));
  try {
    const token = localStorage.getItem("rt__eva__backoffice");
    const headers = { access_token: token };
    const response = await axios.get(`${url}notificacion/getNotificaciones/${userId}`, { headers });
    dispatch(setNotifications(response.data.notificaciones));
  } catch (error) {
    console.error(error);
  } finally {
    dispatch(setLoading(false));
  }
};

export default notificationsSlice.reducer;
