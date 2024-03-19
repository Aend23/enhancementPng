import React from 'react';

function Step1({ handleSubmit, handleImageChange, isValidFile, imagePreviewUrl }) {
  return (
    <form onSubmit={handleSubmit} >
      <input className="fileInput" type="file" onChange={handleImageChange} />
      <button className="submitButton" type="submit" disabled={!isValidFile}>
        Upload Image
      </button>
      <div className="imgPreview">
        {imagePreviewUrl ? (
          <img src={imagePreviewUrl} alt="Preview" />
        ) : (
          <div className="previewText">Please select an Image for Preview</div>
        )}
      </div>
    </form>
  );
}

export default Step1;
