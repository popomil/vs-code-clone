import React from 'react';
import toast from 'react-hot-toast';

const RunAndDebugIcon = () => {
  const showNotSupportedMessage = () => {
    toast.custom((t) => (
      <div
        className={`${
          t.visible ? 'animate-enter' : 'animate-leave'
        } bg-[#1e1e1e] text-[#f0f0f0] border border-[#3c3c3c] px-4 py-3 rounded shadow-lg flex items-center`}
        style={{
          fontFamily: 'var(--vscode-font-family)',
          fontSize: 'var(--vscode-font-size)'
        }}
      >
        <span className="mr-2 text-yellow-500">⚠</span>
        <span>Code language not supported or defined.</span>
      </div>
    ), {
      position: 'bottom-right',
      duration: 3000,
    });
  };

  return (
    <div className="flex justify-center items-center gap-2">
      <button 
        onClick={showNotSupportedMessage}
        className="p-1 hover:bg-[#2a2d2e] rounded transition-colors"
        aria-label="Run code"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polygon points="5 3 19 12 5 21 5 3"></polygon>
        </svg>
      </button>
      
      <button className="p-1 hover:bg-[#2a2d2e] rounded transition-colors">
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          width="20" 
          height="20" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="2" 
          strokeLinecap="round" 
          strokeLinejoin="round"
        >
          <line x1="12" y1="3" x2="12" y2="21" />
          <rect x="17" y="3" width="7" height="18" rx="2" />
          <rect x="2" y="3" width="7" height="18" rx="2" />
        </svg>
      </button>
      
      <button className="p-1 hover:bg-[#2a2d2e] rounded transition-colors">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="12" cy="12" r="1"></circle>
          <circle cx="19" cy="12" r="1"></circle>
          <circle cx="5" cy="12" r="1"></circle>
        </svg>
      </button>
    </div>
  );
};

export default RunAndDebugIcon;