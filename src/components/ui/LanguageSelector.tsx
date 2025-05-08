import { useEffect, useState } from "react";
import i18next from "i18next";
import { useTranslation } from "react-i18next";

type languageOption = { language: string; code: string };

const languageOptions: languageOption[] = [
  {
    language: "English",
    code: "en",
  },

  { language: "Español", code: "es" },
];

const LanguageSelector = () => {
  const [language, setLanguage] = useState(i18next.language);

  const { i18n,t } = useTranslation();

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedLanguage = e.target.value;
    setLanguage(selectedLanguage);
    i18next.changeLanguage(selectedLanguage);
  };

  useEffect(() => {
    document.body.dir = i18n.dir();
  }, [i18n, i18n.language]);

  return (
    <span>
      <label htmlFor="language" className="block text-sm font-medium text-gray-700 mb-1">
        {t("Traduction")}
        <span className="text-red-500 ml-1">*</span>
        </label>
      <select
        id="language"
        value={language}
        onChange={handleLanguageChange}
        className="p-2 border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50
      "
      >
        {languageOptions.map(({ language, code }, key) => (
          <option value={code} key={key}>
            {language}
          </option>
        ))}
      </select>
    </span>
  );
};

export default LanguageSelector;
