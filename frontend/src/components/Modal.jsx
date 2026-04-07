import React from "react";
import { FiCheckCircle, FiAlertCircle, FiX } from "react-icons/fi";

const Modal = ({ isOpen, onClose, title, message, type = "info", onConfirm }) => {
  if (!isOpen) return null;

  const config = {
    success: {
      icon: <FiCheckCircle className="text-green-500" size={24} />,
      bg: "bg-green-100",
      btnClass: "bg-green-600 hover:bg-green-700",
    },
    error: {
      icon: <FiAlertCircle className="text-red-500" size={24} />,
      bg: "bg-red-100",
      btnClass: "bg-red-600 hover:bg-red-700",
    },
    confirm: {
      icon: <FiAlertCircle className="text-orange-500" size={24} />,
      bg: "bg-orange-100",
      btnClass: "bg-orange-600 hover:bg-orange-700",
    }
  };

  const currentConfig = config[type] || config.error;

  return (
    <>
      {/* Overlay Gelap */}
      <div 
        className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4 transition-opacity"
        onClick={onClose}
      >
        {/* Modal Box */}
        <div 
          className="bg-white rounded-2xl shadow-xl w-full max-w-sm p-6 transform transition-all animate-fade-in-up"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Tombol Close (X) di pojok */}
          {type !== "confirm" && (
            <button 
              onClick={onClose}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <FiX size={20} />
            </button>
          )}

          {/* Konten Modal */}
          <div className="flex flex-col items-center text-center mt-2">
            <div className={`p-3 rounded-full mb-4 ${currentConfig.bg}`}>
              {currentConfig.icon}
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">{title}</h3>
            <p className="text-sm text-gray-500 mb-6 leading-relaxed">
              {message}
            </p>

            {/* Tombol Aksi */}
            {type === "confirm" ? (
              <div className="flex gap-3 w-full">
                <button 
                  onClick={onClose}
                  className="flex-1 bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 font-medium py-2.5 rounded-lg text-sm transition-colors"
                >
                  Cancel
                </button>
                <button 
                  onClick={() => { onConfirm(); onClose(); }}
                  className={`flex-1 text-white font-medium py-2.5 rounded-lg text-sm transition-colors ${currentConfig.btnClass}`}
                >
                  Confirm
                </button>
              </div>
            ) : (
              <button 
                onClick={() => {
                  onClose();
                  if (onConfirm) onConfirm();
                }}
                className={`w-full text-white font-medium py-2.5 rounded-lg text-sm transition-colors ${currentConfig.btnClass}`}
              >
                Continue
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Modal;