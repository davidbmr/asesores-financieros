import { Dialog } from "primereact/dialog";
import style from "./PrimeModal.module.css"

export const PrimeModal = ({ modalStatus, onHideModal, children, header, width = 600 , heigth = "auto"}) => {
	return (
		<Dialog
			header={header}
			visible={modalStatus}
			modal
			draggable={false}
			style={{ width: `${width}px`, height: `${heigth}px` }}
			onHide={onHideModal}
			dismissableMask={true}
			className={style.modal}
		>
			{children}
		</Dialog>
	);
};
