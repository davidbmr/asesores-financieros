import React from "react";
import style from "./Sidebar.module.css";
import sidebarItemStyle from "./SidebarItem.module.css";
import { SidebarItem } from "./SidebarItem";
import { useNavigate } from "react-router-dom";

import imgLogo from "@/assets/ia.png";
import { IoPersonOutline } from "react-icons/io5";
import { IoMdCalendar } from "react-icons/io";

import { useAppDispatch } from "@/store/hooks";
import { logout } from "@/store/slices/auth";
import { useSelector } from "react-redux";
import { RootState } from "@/store";

export const Sidebar = ({ appRoutes, isResponsiveMenu }: any) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const userData = useSelector((state: RootState) => state.auth.usuario);
  console.log(userData);
  const containerClassName = isResponsiveMenu
    ? `${style.container__drawer} ${style.responsiveMenu}`
    : style.container__drawer;

  const handleProfileClick = () => {
    navigate("/mi-perfil");
  };

  const handlehorarioClick = () => {
    navigate("/mi-horario");
  };

  return (
    <div className={containerClassName}>
      <div className={style.logo__container}>
        <img src={imgLogo} className={style.logo__item} />
      </div>

      <div className={style.list__container}>
        {appRoutes.map((route: any, index: any) => {
          if (route.group) {
            return (
              <React.Fragment key={index}>
                {index > 0 && <div className={style.whiteDivider} />}
                <div className={style.group}>{route.groupName}</div>
                {route.routes.map((childRoute: any, childIndex: any) => (
                  <React.Fragment key={childIndex}>
                    <SidebarItem item={childRoute} styles={sidebarItemStyle} />
                  </React.Fragment>
                ))}
              </React.Fragment>
            );
          } else {
            return (
              <React.Fragment key={index}>
                <SidebarItem item={route} styles={sidebarItemStyle} />
              </React.Fragment>
            );
          }
        })}
      </div>

      <div
        style={{
          padding: "20px",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          gap: "10px",
        }}
      >
        {userData?.role === "CONTADORA" && (
          <button
            style={{
              background: "transparent",
              color: "var(--primary-color-app)",
              padding: "10px 20px",
              border: "1px solid var(--primary-color-app)",
              borderRadius: "5px",
              width: "100%",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
            onClick={handleProfileClick}
          >
            <IoPersonOutline size={20} style={{ marginRight: "10px" }} />
            Ver mi perfil
          </button>
        )}
        {userData?.role === "CONTADORA" && (
          <button
            style={{
              background: "transparent",
              color: "var(--primary-color-app)",
              padding: "10px 20px",
              border: "1px solid var(--primary-color-app)",
              borderRadius: "5px",
              width: "100%",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
            onClick={handlehorarioClick}
          >
            <IoMdCalendar size={20} style={{ marginRight: "10px" }} />
           Mis Horarios
          </button>
        )}

        <button
          style={{
            background: "var(--primary-color-app)",
            color: "#fff",
            padding: "10px 20px",
            border: "none",
            borderRadius: "5px",
            width: "100%",
            cursor: "pointer",
          }}
          onClick={() => dispatch(logout())}
        >
          Cerrar sesión
        </button>
      </div>
    </div>
  );
};
