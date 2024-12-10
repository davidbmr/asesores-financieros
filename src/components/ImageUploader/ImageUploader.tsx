import React, { useState } from "react";
import style from "./ImageUploader.module.css";

interface ImageUploaderProps {
  existingImage?: string;
  onImageUpload: (base64Image: string) => void;
  label?: string;  // Agregamos la propiedad label
}

const ImageUploader: React.FC<ImageUploaderProps> = ({ existingImage, onImageUpload, label = "Subir Imagen" }) => {
  const [imagePreview, setImagePreview] = useState<string | null>(existingImage || null);

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        setImagePreview(base64String);
        onImageUpload(base64String);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className={style.imageUploader}>
      <input 
        type="file" 
        accept="image/*" 
        id="fileUpload" 
        className={style.inputFile} 
        onChange={handleImageUpload} 
      />
      <label htmlFor="fileUpload" className={style.inputLabel}>
        {label}
      </label>
      {imagePreview && <img src={imagePreview} alt="Imagen subida" className={style.imagePreview} />}
      {!imagePreview && existingImage && <img src={existingImage} alt="Imagen existente" className={style.imagePreview} />}
    </div>
  );
};

export default ImageUploader;
