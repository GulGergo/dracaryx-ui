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
      <form className={styles.uploadForm} style={{ marginTop: -500 }}>
        <div style={{ width: '100%', minHeight: 260, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', margin: '0 auto' }}>
          <button type="button" className={styles.button} onClick={handleButtonClick}>
            Choose File
          </button>
          <div className="customcase-belowtext" style={{ marginTop: 20, textAlign: 'center', color: '#F3F6FB', fontSize: 17, fontWeight: 400 }}>
            Because your device deserves armor as legendary as its owner.<br />
            🛒 Craft yours now and become part of the Dracaryx legacy.
          </div>
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
      </form>
    </>
  );
} 