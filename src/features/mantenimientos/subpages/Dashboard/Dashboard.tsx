import React, { useState, useEffect } from "react";
import style from "./Dashboard.module.css";
import { Chart } from "primereact/chart";

import { MainContentStructure } from "@/components/MainContentStructure/MainContentStructure";
import { ContentBox } from "@/components/ContentBox/ContentBox";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { DashboardCliente } from "./components/DashboardCliente/DashboardCliente";
import { DashboardAdmin } from "./components/DashboardAdmin/DashboardAdmin";
import { useGetFetch } from "@/hooks/useGetFetch";

export function Dashboard() {
  

  return (
    <MainContentStructure titleText="">
      <h1> test </h1>
    </MainContentStructure>
  );
}
