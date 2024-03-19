import React, { useState } from 'react';
import Step1 from './components/Step1';
import Step2 from './components/Step2';
import Success from './components/Success';
import "./App.css"

function App() {
  const [file, setFile] = useState('');
  const [imagePreviewUrl, setImagePreviewUrl] = useState('');
  const [activeTab, setActiveTab] = useState('Step 1');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [progress, setProgress] = useState(0);
  const [isValidFile, setIsValidFile] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);
  const [fact, setFact] = useState('');
  const [firstNameError, setFirstNameError] = useState('');
  const [lastNameError, setLastNameError] = useState('');
  const [emailError, setEmailError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("file Uploaded")
    resetFile();
  }
  
  const resetFile = () => {
    setFile('');
    setImagePreviewUrl('');
  }

  const handleImageChange = (e) => {
    e.preventDefault();
    let reader = new FileReader();
    let file = e.target.files[0];

    if (file && file.type === 'image/png') {
      setIsValidFile(true);
      setIsFormValid(true);
      reader.onloadend = () => {
        setFile(file);
        setImagePreviewUrl(reader.result);
      }
      reader.readAsDataURL(file);
    } else {
      // Display error message for invalid file format
      alert('Please upload a .png file');
      setIsValidFile(false);
      setFile('');
      setImagePreviewUrl('');
    }
  }

  const fetchCatFact = async () => {
    try {
      const response = await fetch('https://catfact.ninja/fact');
      const data = await response.json();
      setFact(data.fact);
    } catch (error) {
      console.error('Error fetching cat fact:', error);
    }
  }

  const handleNext = () => {
    if (activeTab === 'Step 1' && isValidFile) {
      setActiveTab('Step 2');
      setProgress(50);
      setIsFormValid(false);
    } else if (activeTab === 'Step 2') {
      setActiveTab('Success');
      setProgress(100);
      fetchCatFact();
    }
  }

  const handleFirstNameInputChange = (e) => {
    const value = e.target.value;
    setFirstName(value);
    validateForm();
  };

  const handleLastNameInputChange = (e) => {
    const value = e.target.value;
    setLastName(value);
    validateForm();
  };

  const handleEmailInputChange = (e) => {
    const value = e.target.value;
    setEmail(value);
    validateForm();
  };

  const validateForm = () => {
    const isValidFirstName = /^[A-Za-z ]{1,35}$/.test(firstName);
    const isValidLastName = /^[A-Za-z ]{1,35}$/.test(lastName);
    const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    setIsFormValid(isValidFirstName && isValidLastName && isValidEmail);
  }

  return (
   <div className='container'>
      <div className="previewComponent">
      <div className='tabProg'>
        <div className="tabs">
          <div className={`tab ${activeTab === 'Step 1' ? 'active' : ''}`} >
            Step 1
          </div>
          <div className={`tab ${activeTab === 'Step 2' ? 'active' : ''}`} >
            Step 2
          </div>
          <div className={`tab ${activeTab === 'Success' ? 'active' : ''}`} >
            Success
          </div>
        </div>
        <progress value={progress} max="100" className='progress' style={{color:'green'}}/>
      </div>
      {activeTab === 'Step 1' && (
        <Step1
          handleSubmit={handleSubmit}
          handleImageChange={handleImageChange}
          isValidFile={isValidFile}
          imagePreviewUrl={imagePreviewUrl}
        />
      )}
      {activeTab === 'Step 2' && (
        <Step2
          firstName={firstName}
          lastName={lastName}
          email={email}
          handleFirstNameInputChange={handleFirstNameInputChange}
          handleLastNameInputChange={handleLastNameInputChange}
          handleEmailInputChange={handleEmailInputChange}
        />
      )}
      {activeTab === 'Success' && (
        <Success
          firstName={firstName}
          lastName={lastName}
          email={email}
          fact={fact}
        />
      )}
      {activeTab !== 'Success' && (
        <button className="next" onClick={handleNext} disabled={!isValidFile || !isFormValid}>
          Next
        </button>
      )}
    </div>
   </div>
  );
}

export default App;
