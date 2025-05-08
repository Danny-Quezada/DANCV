import React, { useEffect, useRef, useState } from "react";
import { IoIosAdd } from "react-icons/io";
import { FaMinus } from "react-icons/fa6";
import { RiResetLeftLine } from "react-icons/ri";

const ZoomWrapper = ({ children }: { children: React.ReactNode }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(0.65);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  useWheelZoom(containerRef, setScale);

  const handleMouseDown = (e: React.MouseEvent) => {
    const startX = e.clientX;
    const startY = e.clientY;
    const startOffset = { ...offset };

    const onMouseMove = (moveEvent: MouseEvent) => {
      setOffset({
        x: startOffset.x + (moveEvent.clientX - startX),
        y: startOffset.y + (moveEvent.clientY - startY),
      });
    };

    const onMouseUp = () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
    };

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);
  };

  return (
    <div className="relative w-full h-full bg-gray-300">
      <div
        ref={containerRef}
        onMouseDown={handleMouseDown}
        className="w-full h-full overflow-hidden cursor-grab active:cursor-grabbing"
      >
        <div
          style={{
            transform: `translate(${offset.x}px, ${offset.y}px) scale(${scale})`,
            transformOrigin: "top left",
            transition: "transform 0.1s ease-out",
          }}
        >
          {children}
        </div>
      </div>

      {/* Zoom Controls */}
      <div className="absolute bottom-5 right-5 flex flex-col gap-2 bg-white shadow-lg rounded p-2 z-100 ">
        <button
          onClick={() => setScale((prev) => Math.min(prev + 0.1, 2))}
          className="w-8 h-8 bg-green-500 text-white text-xl hover:bg-green-600 rounded-full flex items-center justify-center cursor-pointer"
        >
          <IoIosAdd />
        </button>
        <button
          onClick={() => setScale((prev) => Math.max(prev - 0.1, 0.3))}
          className="w-8 h-8  bg-red-500 text-white text-xs hover:bg-red-600 rounded-full flex items-center justify-center cursor-pointer"
        >
          <FaMinus />
        </button>
        <button
          onClick={() => {
            setScale(0.64);
            setOffset({ x: 0, y: 0 });
          }}
          className="w-8 h-8 bg-gray-500 text-white text-xs  hover:bg-gray-600 rounded-full flex items-center justify-center cursor-pointer"
        >
          <RiResetLeftLine />
        </button>
      </div>
    </div>
  );
};

export default ZoomWrapper;

function useWheelZoom(
  ref: React.RefObject<HTMLElement | null>,
  setScale: React.Dispatch<React.SetStateAction<number>>
) {
  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (e.ctrlKey) {
        e.preventDefault();
        setScale((prev: number) => {
          let newScale = prev - e.deltaY * 0.001;
          newScale = Math.max(0.3, Math.min(newScale, 2));
          return newScale;
        });
      }
    };

    const node = ref.current;
    if (node) {
      node.addEventListener("wheel", handleWheel, { passive: false });
    }

    return () => {
      if (node) node.removeEventListener("wheel", handleWheel);
    };
  }, [ref, setScale]);
}
