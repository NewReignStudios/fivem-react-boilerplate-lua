import { useState } from 'react';
import Modal from '../Modal/Modal';
import './About.css';

import { licenses } from './licenses';

const Info = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentLicense, setCurrentLicense] = useState(licenses[0]);
  return (
    <div className="info-container">
      {licenses.map((license, index) => {
        return (
          <div
            key={index}
            className="info-license"
            onClick={() => {
                setCurrentLicense(license);
                setIsModalOpen(true)
            }}
          >
            <h2>{license.header}</h2>
          </div>
        );
      })}
      <Modal open={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <div>
          <h1 className="info-modal-header">{currentLicense.header}</h1>
            <p className="info-modal-body">{currentLicense.body}</p>
          <button
            className="modal-button modal-button-close"
            onClick={() => setIsModalOpen(false)}
          >
            Close
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default Info;
