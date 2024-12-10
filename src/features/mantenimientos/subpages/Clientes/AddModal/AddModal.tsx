import React, { useState } from "react";
import style from "./AddModal.module.css";

import { handleChangeInput } from "@/helpers/handleTextBox";

import { Button } from "primereact/button";
import { TextBoxField } from "@/components/TextBoxField/TextBoxField";
import { SwitchField } from "@/components/SwitchField/SwitchField";
import { SelectField } from "@/components/SelectField/SelectField";

interface PropsAddModal {
	postFetchData?: any;
	updateFetchData?: any;
	updateData?: any;
}

export const AddModal = ({ postFetchData, updateFetchData, updateData }: PropsAddModal) => {
	const [newData, setNewData] = useState<any>({
		rol: "",
		name: "",
		email: "",
		password: "",
		passwordTwo: "",
	});

	const handleCreate = async () => {
		// Estructurando la data para el envio del post
		console.log(newData);
	};

	const handleUpdate = async () => {
		console.log(newData);
	};

	return (
		<div className={style.column__container}>
			<SelectField
				textLabel="Rol"
				value={""}
				name="rol"
				placeholder="Selecciona un rol"
				options={[]}
				onChange={() => { }}
			/>
			<TextBoxField
				textLabel="Nombre"
				value={newData.name || ""}
				name="name"
				onChange={(e) => handleChangeInput(e, setNewData)}
			/>

			<TextBoxField
				textLabel="Correo"
				value={newData.email || ""}
				name="email"
				onChange={(e) => handleChangeInput(e, setNewData)}
			/>

			<TextBoxField
				textLabel="Contraseña"
				value={newData.password || ""}
				name="password"
				type="password"
				onChange={(e) => handleChangeInput(e, setNewData)}
			/>

			<TextBoxField
				textLabel="Confirmar contraseña"
				value={newData.passwordTwo || ""}
				name="passwordTwo"
				type="password"
				onChange={(e) => handleChangeInput(e, setNewData)}
			/>

			{postFetchData && (
				<div>
					<Button className="p-button-sm p-button-info mr-2" onClick={handleCreate}>
						AGREGAR USUARIO
					</Button>
				</div>
			)}

			{updateFetchData && (
				<div>
					<Button className="p-button-sm p-button-info mr-2" onClick={handleUpdate}>
						EDITAR USUARIO
					</Button>
				</div>
			)}
		</div>
	);
};
