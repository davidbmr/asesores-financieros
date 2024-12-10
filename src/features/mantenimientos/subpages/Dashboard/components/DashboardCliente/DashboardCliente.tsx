import React from "react";
import styles from "./DashboardCliente.module.css";
import { SelectField } from "@/components/SelectField/SelectField";

export const DashboardCliente = ({ data, setPeriodo, periodo }) => {
  const handlePeriodoChange = (event) => {
    setPeriodo(event.target.value);
  };

  // Aggregating amounts for Cuentas por Cobrar
  const totalCobrar = data?.CuentasPorCobrar?.reduce(
    (acc, item) => acc + (parseFloat(item?.amount_pen) || 0),
    0
  );



  const totalCobrarVencida = data?.CuentasPorCobrar?.filter(
    (item) => item.status === "Vencida"
  ).reduce((acc, item) => acc + (parseFloat(item.amount_pen) || 0), 0);

  const totalCobrarVigente = data?.CuentasPorCobrar?.filter(
    (item) => item.status === "Vigente"
  ).reduce((acc, item) => acc + (parseFloat(item.amount_pen) || 0), 0);

  // Aggregating amounts for Cuentas por Pagar
  const totalPagarPEN = data?.CuentasPorPagar?.reduce(
    (acc, item) => acc + (parseFloat(item.balance_pen) || 0),
    0
  );

  const totalPagarUSD = data?.CuentasPorPagar?.reduce(
    (acc, item) => acc + (parseFloat(item.balance_usd) || 0),
    0
  );

  // Preparing Resumen de Impuestos
  const totalImpuestos = data?.ResumenImpuestos?.reduce(
    (acc, item) => acc + (item.amount_pen || 0),
    0
  );

  // Preparing data for Saldos Mes
  const totalSalesPEN = data?.SaldosMes?.reduce(
    (acc, item) => acc + (parseFloat(item.sales_pen) || 0),
    0
  );

  const totalExpensesPEN = data?.SaldosMes?.reduce(
    (acc, item) => acc + (parseFloat(item.expenses_pen) || 0),
    0
  );

  return (
    <div className={styles.container}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <h1>Dashboard Cliente</h1>

        <div style={{ width: "10%",marginBottom:"2rem" }}>
          <SelectField
            name="mes"
            textLabel=""
            placeholder="Seleccione un periodo"
            value={periodo}
            onChange={handlePeriodoChange}
            options={[
              { name: "Mes", value: "mes" },
              { name: "3 Meses", value: "3meses" },
              { name: "6 Meses", value: "6meses" },
            ]}
          />
        </div>
      </div>

      <div className={styles.cardContainer}>
        {/* Cuentas por Cobrar */}
        <div className={styles.card}>
          <p className={styles.pTitle}>Cuentas por Cobrar</p>
          <span className={styles.mountTitle}>{"S/33.00"}</span>

          <div className={styles.descriptionContainer}>
            <div className={styles.linecontainer}>
              <span
                className={styles.linePoint}
                style={{
                  backgroundColor: "#32D399",
                }}
              ></span>

              <div className={styles.containerDecrips2}>
                <span
                  className={styles.line}
                  style={{
                    backgroundColor: "#32D399",
                  }}
                >
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                </span>

                <div className={styles.description}>
                  <span className={styles.mountdescription}>
                    Vigentes: S/{totalCobrarVigente?.toFixed(2)}
                  </span>
                </div>
              </div>
            </div>

            <div className={styles.linecontainer}>
              <span
                className={styles.linePoint}
                style={{
                  backgroundColor: "#EF4444",
                }}
              ></span>

              <div className={styles.containerDecrips2}>
                <span
                  className={styles.line}
                  style={{
                    backgroundColor: "#EF4444",
                  }}
                >
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                </span>

                <div className={styles.description}>
                  <span className={styles.mountdescription}>
                    Vencidas: S/{totalCobrarVencida?.toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Cuentas por Pagar */}
        <div className={styles.card}>
          <p className={styles.pTitle}>Cuentas por Pagar</p>

          <div className={styles.descriptionContainer}>
            <div className={styles.linecontainer}>
              <span
                className={styles.linePoint}
                style={{
                  backgroundColor: "#32D399",
                }}
              ></span>

              <div className={styles.containerDecrips2}>
                <span
                  className={styles.line}
                  style={{
                    backgroundColor: "#32D399",
                  }}
                >
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                </span>

                <div className={styles.description}>
                  <span className={styles.mountdescription}>
                    Total a pagar PEN S/{totalPagarPEN?.toFixed(2)}
                  </span>
                </div>
              </div>
            </div>

            <div className={styles.linecontainer}>
              <span
                className={styles.linePoint}
                style={{
                  backgroundColor: "#EF4444",
                }}
              ></span>

              <div className={styles.containerDecrips2}>
                <span
                  className={styles.line}
                  style={{
                    backgroundColor: "#EF4444",
                  }}
                >
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                </span>

                <div className={styles.description}>
                  <span className={styles.mountdescription}>
                  Total a pagar USD ${totalPagarUSD?.toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
          </div>
       
        </div>

        {/* Resumen de Impuestos */}
        <div className={styles.card}>
          <p className={styles.pTitle}>Resumen de Impuestos</p>
          <div className={styles.descriptionContainer}>
            <div className={styles.linecontainer}>
              <span
                className={styles.linePoint}
                style={{
                  backgroundColor: "#32D399",
                }}
              ></span>

              <div className={styles.containerDecrips2}>
                <span
                  className={styles.line}
                  style={{
                    backgroundColor: "#32D399",
                  }}
                >
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                </span>

                <div className={styles.description}>
                  <span className={styles.mountdescription}>
                    S/{totalImpuestos?.toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Saldos del Mes */}
        <div className={styles.card}>
          <p className={styles.pTitle}>Saldos del Mes</p>

          <div className={styles.descriptionContainer}>
            <div className={styles.linecontainer}>
              <span
                className={styles.linePoint}
                style={{
                  backgroundColor: "#32D399",
                }}
              ></span>

              <div className={styles.containerDecrips2}>
                <span
                  className={styles.line}
                  style={{
                    backgroundColor: "#32D399",
                  }}
                >
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                </span>

                <div className={styles.description}>
                  <span className={styles.mountdescription}>
                    Ventas: S/{totalSalesPEN?.toFixed(2)}
                  </span>
                </div>
              </div>
            </div>

            <div className={styles.linecontainer}>
              <span
                className={styles.linePoint}
                style={{
                  backgroundColor: "#EF4444",
                }}
              ></span>

              <div className={styles.containerDecrips2}>
                <span
                  className={styles.line}
                  style={{
                    backgroundColor: "#EF4444",
                  }}
                >
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                </span>

                <div className={styles.description}>
                  <span className={styles.mountdescription}>
                    Gastos: S/{totalExpensesPEN?.toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
