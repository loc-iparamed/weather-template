const ToggleSwitch = ({label, isOn, onToggle, disabled = false}) => {
  return (
    <div className="flex items-center justify-between py-3 opacity-100">
      <span className={`text-gray-300 ${disabled ? 'opacity-50' : ''}`}>
        {label}
      </span>
      <button
        className={`
          relative inline-flex items-center h-6 rounded-full w-11 transition-colors focus:outline-none
          ${isOn ? 'bg-indigo-600' : 'bg-gray-600'}
          ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
        `}
        onClick={e => {
          if (!disabled) onToggle(e);
        }}
        disabled={disabled}>
        <span
          className={`
            inline-block size-4 transform transition-transform bg-white rounded-full
            ${isOn ? 'translate-x-6' : 'translate-x-1'}
          `}
        />
      </button>
    </div>
  );
};

export default ToggleSwitch;
