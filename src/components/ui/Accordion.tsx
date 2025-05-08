import React, { useState } from "react";
import { BiPlus } from "react-icons/bi";
import { IoIosArrowDown } from "react-icons/io";
import { MdOutlineDragIndicator } from "react-icons/md";

interface AccordionProps {
  title: string;
  children: React.ReactNode;
}

export default function Accordion({ title, children }: AccordionProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-t border-gray-200">
      <button
        className="w-full px-4 py-5 text-left group flex justify-between items-center hover:bg-gray-100 cursor-grab transition-colors duration-300"
        onClick={() => setIsOpen(!isOpen)}
      >
       
        <span className={`font-semibold ${isOpen ? "text-blue-600" : "text-gray-400"} transition-colors duration-300 flex items-center gap-2`}>  <MdOutlineDragIndicator />{title}</span>
        <span className="text-gray-400 group-hover:text-blue-600 rounded-full border border-gray-400 group-hover:border-blue-600 p-2">
          {isOpen ? <IoIosArrowDown /> : <BiPlus />}
        </span>
      </button>
      {isOpen && <div className="px-4 py-2">{children}</div>}
    </div>
  );
}
