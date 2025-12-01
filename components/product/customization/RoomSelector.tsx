'use client';

import Image from 'next/image';
import { Room } from '@/types/product';

interface RoomSelectorProps {
  rooms: Room[];
  selectedRoom: string | null;
  onRoomChange: (roomId: string) => void;
}

const RoomSelector = ({ rooms, selectedRoom, onRoomChange }: RoomSelectorProps) => {
  return (
    <div className="flex flex-col gap-4">
      <h3 className="text-base font-medium text-[#3a3a3a]">Choose Your Room</h3>
      
      <div className="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-3">
        {rooms.map((room) => (
          <button
            key={room.id}
            onClick={() => onRoomChange(room.id)}
            className={`flex flex-col items-center gap-2 p-3 rounded border transition-all ${
              selectedRoom === room.id
                ? 'border-[#00473c] bg-[#f5fffd]'
                : 'border-[#e0e0e0] hover:border-[#00473c]'
            }`}
          >
            <div className="w-12 h-12 flex items-center justify-center">
              <Image
                src={room.icon}
                alt={room.name}
                width={40}
                height={40}
                className="object-contain"
              />
            </div>
            <span className="text-xs text-[#3a3a3a] text-center leading-tight">{room.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default RoomSelector;
