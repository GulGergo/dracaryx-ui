import React, { useRef, useState } from 'react';
import styles from './UploadForm.module.css';

export default function UploadForm() {
  const [dragActive, setDragActive] = useState(false);
  const [file, setFile] = useState(null);
  const inputRef = useRef();

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFile(e.dataTransfer.files[0]);
    }
  };

  const handleChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleButtonClick = () => {
    inputRef.current.click();
  };

  return (
    <>
      <form className={styles.uploadForm}>
        <div style={{
          marginBottom: 28,
          background: 'none',
          color: '#fff',
          textAlign: 'left',
          borderRadius: 12,
          padding: 0,
          marginLeft: 32,
        }}>
          <div style={{ display: 'flex', alignItems: 'center', fontWeight: 700, fontSize: 22, marginBottom: 10, gap: 8 }}>
            <span role="img" aria-label="info">🖼️</span> How It Works:
          </div>
          <ol style={{ margin: 0, paddingLeft: 70, fontSize: 17, color: '#fff', fontWeight: 500 }}>
            <li style={{ marginBottom: 6 }}><b>Select your device model</b></li>
            <li style={{ marginBottom: 6 }}><b>Upload your design or image</b></li>
            <li style={{ marginBottom: 6 }}><b>Adjust position, scale, and rotation directly on the case</b></li>
            <li style={{ marginBottom: 6 }}><b>Preview your final result</b></li>
            <li style={{ marginBottom: 0 }}><b>Add to cart & we take care of the rest</b></li>
          </ol>
        </div>
        <div
          className={dragActive ? `${styles.dropArea} ${styles.dragActive}` : styles.dropArea}
          onDragEnter={handleDrag}
          onDragOver={handleDrag}
          onDragLeave={handleDrag}
          onDrop={handleDrop}
          onClick={handleButtonClick}
        >
          {file ? 'File selected: ' + file.name : 'Drag & Drop your image here or click to choose'}
          <input
            type="file"
            accept="image/*"
            ref={inputRef}
            style={{ display: 'none' }}
            onChange={handleChange}
          />
        </div>
        {file && <div className={styles.fileName}>{file.name}</div>}
        <button type="button" className={styles.button} onClick={handleButtonClick}>
          Choose File
        </button>
        <div className="customcase-belowtext" style={{ marginTop: 64, textAlign: 'center', color: '#F3F6FB', fontSize: 17, fontWeight: 400 }}>
          Because your device deserves armor as legendary as its owner.<br/>
          🛒 Craft yours now and become part of the Dracaryx legacy.
        </div>
      </form>
    </>
  );
} 