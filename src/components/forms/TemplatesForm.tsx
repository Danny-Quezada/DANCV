import { useTranslation } from "react-i18next";
import userStore from "../../appcore/services/UserStore";
import sections from "../PDFtemplates/interfaceSection";
import LanguageSelector from "../ui/LanguageSelector";
export default function TemplatesForm() {
  const { template, setTemplate } = userStore();
  const { t } = useTranslation();
  return (
    <div className="flex flex-col gap-5">
      <LanguageSelector />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {sections.sections.map((section) => (
          <label
            key={section.id}
            htmlFor={section.id}
            className={`border rounded-lg p-4 cursor-pointer transition-all duration-200 shadow-sm hover:shadow-md ${
              template === section.id
                ? "ring-2 ring-blue-500 border-blue-500"
                : "border-gray-300"
            }`}
          >
            <div className="flex flex-col items-center space-y-2">
              <img
                src={section.image}
                alt={section.title}
                className="w-35 h-50  rounded-md"
              />
              <p className="text-sm font-medium text-center text-gray-800">
                {t(`Templates.${section.id}`)}
              </p>
              <input
                type="radio"
                name="template"
                id={section.id}
                value={section.id}
                checked={template === section.id}
                onChange={(e) => setTemplate(e.target.value)}
                className="hidden"
              />
            </div>
          </label>
        ))}
      </div>
    </div>
  );
}
