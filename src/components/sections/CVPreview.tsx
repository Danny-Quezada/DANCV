import { useRef } from "react";
import { useReactToPrint } from "react-to-print";
import { MdPrint } from "react-icons/md";
import sections from "../PDFtemplates/interfaceSection";
import userStore from "../../appcore/services/UserStore";

const CVPreview = () => {
  const { template } = userStore();
  const contentRef = useRef<HTMLDivElement>(null);

  const reactToPrintFn = useReactToPrint({ contentRef });
  return (
    <div>
      <div
        ref={contentRef}
        style={{
          background: "white",
          width: "794px", // 21cm
          height: "1123px", // 29.7cm
          pageBreakAfter: "always",
        }}
      >
        {sections.sections.find((section) => section.id === template)?.content}
      </div>
      <button
        onClick={() => reactToPrintFn()}
        className="relative z-200 bg-blue-500 rounded-full text-3xl text-white shadow-lg cursor-pointer hover:bg-blue-600 transition duration-200 w-15 h-15 flex items-center  justify-center bottom-5 right-0"
      >
        <MdPrint />
      </button>
    </div>
  );
};

export default CVPreview;
