import React, { useState } from 'react';
import { AiFillCamera } from 'react-icons/ai';

export default function ImageUploader({ inputRef }) {
    const [previewImage, setPreviewImage] = useState(null);

    const handleFileUpload = (e) => {
        const file = e.target.files[0];

        if (file) {
            const reader = new FileReader();

            reader.onload = (e) => {
                setPreviewImage(e.target.result);
            };

            reader.readAsDataURL(file);
        }
    };

    const handleClickUpload = () => {
        inputRef.current.click();
    };

    return (
        <div className="avatar-container">
            <div className="upload-button" onClick={handleClickUpload}>
                <AiFillCamera />
                <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileUpload}
                    ref={inputRef}
                    style={{ display: 'none' }}
                />
            </div>
            <img
                src={previewImage ? previewImage : "https://t4.ftcdn.net/jpg/03/46/93/61/360_F_346936114_RaxE6OQogebgAWTalE1myseY1Hbb5qPM.jpg"}
                alt="Preview"
                className='avatarinput'
            />
        </div>
    );
}
