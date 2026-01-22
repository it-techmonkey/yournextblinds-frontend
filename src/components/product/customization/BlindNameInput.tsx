'use client';

interface BlindNameInputProps {
  value: string | null;
  onChange: (value: string) => void;
}

const BlindNameInput = ({ value, onChange }: BlindNameInputProps) => {
  return (
    <input
      type="text"
      value={value || ''}
      onChange={(e) => onChange(e.target.value)}
      placeholder="Ex: West Wall"
      className="w-full border-2 border-gray-300 rounded-lg p-3 bg-white text-[#3a3a3a] font-medium placeholder:text-gray-400 focus:outline-none focus:border-[#00473c] transition-colors"
    />
  );
};

export default BlindNameInput;
