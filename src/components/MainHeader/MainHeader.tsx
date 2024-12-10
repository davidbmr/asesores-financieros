import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { IoPersonOutline, IoLogOutOutline } from "react-icons/io5";
import { logoutUser } from "../../store/slices/auth/thunks";
import { Toast } from "primereact/toast";
import { IoPerson } from "react-icons/io5";
import { HiOutlineMenuAlt2 } from "react-icons/hi";
import style from "./MainHeader.module.css";
import { useAppDispatch } from "@/store/hooks";
import NotificationBell from "@/components/NotificationBell/NotificationBell"; // Importa el nuevo componente

interface MainHeaderProps {
  additionalClassName?: string;
  setMenuResize?: any;
}

const notifications = [
  { id: 1, message: "You have a new message", read: false },
  { id: 2, message: "Your report is ready to download", read: true },
  { id: 3, message: "Reminder: Meeting at 3 PM", read: false }
];

export const MainHeader = ({ additionalClassName, setMenuResize }: MainHeaderProps) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const toast = useRef(null);
  const [menuActive, setMenuActive] = useState(false);

  const handleNavigate = (path: string) => {
    navigate(`/${path}`);
    setMenuActive(false);
  };

  const handleLogout = () => {
    dispatch(logoutUser());
    navigate("/login");
  };

  const containerClassName = `${style.mainHeader__container} ${additionalClassName || ""}`;

  return (
    <header className={containerClassName}>
      <Toast ref={toast} />
      <div>
        {/* <div onClick={setMenuResize}> */}
        {/* <HiOutlineMenuAlt2 size={30} /> */}
      </div>

      <div className={style.mainHeader__navbar__container}>
        <NotificationBell notifications={notifications} /> 
        <div style={{ position: "relative" }}>
          <div className={style.mainHeader__profile}>
            <IoPerson />
          </div>
        </div>
      </div>
    </header>
  );
};
