import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IoNotificationsOutline } from "react-icons/io5";
import { RootState, AppDispatch } from "../../store/store";
import { fetchNotifications, markAsRead, addNotification } from "../../store/slices/notifications/notificationsSlice";
import style from "./NotificationBell.module.css";
import io from "socket.io-client";
import { useNavigate } from "react-router-dom";

const NotificationBell = ({}: any) => {
  const dispatch = useDispatch<AppDispatch>();
  const { notifications, loading } = useSelector((state: RootState) => state.notification);
  const userId = useSelector((state: RootState) => state.auth.usuario?.uid);
  const authState = useSelector((state: RootState) => state.auth.usuario);
  const navigate = useNavigate();

  const [isOpen, setIsOpen] = useState(false);
  const bellRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (userId) {
      dispatch(fetchNotifications(userId));

      const socket = io("https://eva-backend-definitivo.onrender.com", {
        query: { userId },
      });

      socket.on("connect", () => {
        console.log("Connected to server");
      });

      socket.on("newNotification", (notification) => {
        dispatch(addNotification(notification));
      });

      socket.on("disconnect", () => {
        console.log("Disconnected from server");
      });

      return () => {
        socket.disconnect();
      };
    }
  }, [dispatch, userId]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (bellRef.current && !bellRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [bellRef]);

  const unreadNotifications = notifications.filter((notification) => !notification.read).length;

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleMarkAsRead = (notificationId: string) => {
    dispatch(markAsRead(notificationId));
  };

  const handleRedirect = (role: string, serviceId: string | null) => {
    if (role === "CLIENTE") {
      navigate("/seguimiento-servicio");
    } else if (role === "CONTADORA" && serviceId) {
      navigate(`/seguimiento-cliente/${serviceId}`);
    }
  };

  const sortedNotifications = [...notifications].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return (
    <div className={style.notificationBell} ref={bellRef}>
      <div className={style.bellIcon} onClick={handleToggle}>
        <IoNotificationsOutline size={30} />
        {unreadNotifications > 0 && <span className={style.unreadBadge}></span>}
      </div>
      {isOpen && (
        <div className={style.notificationList}>
          {loading ? (
            <div className={style.loading}>Cargando...</div>
          ) : sortedNotifications.length > 0 ? (
            sortedNotifications.map((notification) => (
              <div
                key={notification._id}
                className={style.notificationItem}
                onClick={() => handleMarkAsRead(notification._id)}
              >
                <div
                  className={style.notificationMessage}
                  onClick={() => handleRedirect(authState.role, notification.serviceId)}
                >
                  {notification?.message}
                </div>
                <div className={style.notificationDate}>{notification?.date}</div>
              </div>
            ))
          ) : (
            <div className={style.noNotifications}>No tienes notificaciones nuevas</div>
          )}
        </div>
      )}
    </div>
  );
};

export default NotificationBell;
