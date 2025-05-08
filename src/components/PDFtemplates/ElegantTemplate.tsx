import userStore from "../../appcore/services/UserStore";
import { TbWorld } from "react-icons/tb";
import { FaLinkedin, FaGithub } from "react-icons/fa";
import { useTranslation } from "react-i18next";

export default function ElegantTemplate() {
  const { user } = userStore();
  const { t, i18n } = useTranslation();
  const currentLang = i18n.language;

  return (
    <article className="flex w-full h-full">
      <div className="h-full w-80 bg-gray-700 flex flex-col gap-10">
        <img
          src={user.cv.personalInformation.image}
          className="w-80 h-80"
          alt="User's image"
        />
        <div className="p-4 flex flex-col gap-8">
          <div className="space-y-2">
            <h3 className="text-white text-2xl font-extralight uppercase">
              {t("Information.Summary")}
            </h3>
            <p className="text-gray-300 font-sans">{user.cv.summary.summary}</p>
          </div>
          <div className="space-y-2">
            <h3 className="text-white text-2xl font-extralight uppercase">
              {t("Information.Skills")}
            </h3>
            <div>
              <ul className="list-disc pl-5">
                {user.cv.skills.map((skill) => (
                  <li key={skill.name} className="text-gray-300">
                    {skill.name}
                    {"    "}
                    <span className="text-[10px] text-gray-400">
                      {t(`Level.${skill.level}`)}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div>
            <h3 className="text-white text-2xl font-extralight uppercase">
              {t("Information.Contact")}
            </h3>
            <div className="flex flex-col gap-2 mt-4">
              {user.cv.personalInformation.linkedin && (
                <p className="text-gray-300 flex items-center gap-2">
                  <FaLinkedin />
                  {user.cv.personalInformation.linkedin}
                </p>
              )}
              {user.cv.personalInformation.github && (
                <p className="text-gray-300 flex items-center gap-2">
                  <FaGithub />
                  {user.cv.personalInformation.github}
                </p>
              )}
              {user.cv.personalInformation.website && (
                <a
                  href={user.cv.personalInformation.website}
                  className="text-gray-300 flex items-center gap-2"
                >
                  <TbWorld />
                  {user.cv.personalInformation.website}
                </a>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="h-full w-[calc(794px-320px)] flex flex-col px-4 gap-10">
        <div className="mt-10 w-full flex justify-center">
          <div className="relative inline-block">
            <h2 className="relative z-10 text-2xl font-extrabold text-gray-900">
              {user.cv.personalInformation.name}
            </h2>
            <div className="absolute bottom-2 left-0 w-full h-1 bg-gray-200 z-0"></div>
          </div>
        </div>
        <div className="flex flex-col items-center w-full text-gray-400 text-center">
          <p>{user.cv.personalInformation.address}</p>
          <p>{user.cv.personalInformation.phone}</p>
          <p>
            {t("Information.email")}: {user.cv.personalInformation.email}
          </p>
        </div>

     
        <div>
          <h3 className="text-3xl font-light uppercase mb-3">
            {t("Information.Experience")}
          </h3>
          {user.cv.workExperiences.map((work, index) => (
            <div key={work.company + index} className="mb-6">
              <h3 className="font-semibold flex justify-between">
                {work.company}{" "}
                <span>
                  {work.startDate.toLocaleDateString(currentLang, {
                    year: "numeric",
                    month: "long",
                  })}{" "}
                  -{" "}
                  {work.endDate
                    ? work.endDate.toLocaleDateString(currentLang, {
                        year: "numeric",
                        month: "long",
                      })
                    : t("Information.Present")}
                </span>
              </h3>
              <h4 className="uppercase">{work.position}</h4>
              <p className="font-sans">{work.description}</p>
            </div>
          ))}
        </div>

       
        <div>
          <h3 className="text-3xl font-light uppercase mb-3">
            {t("Information.Education")}
          </h3>
          {user.cv.education.map((education, index) => (
            <div key={education.degree + index} className="mb-6">
              <h3 className="font-semibold flex justify-between">
                {education.degree}{" "}
                <span>
                  {education.startDate.toLocaleDateString(currentLang, {
                    year: "numeric",
                    month: "long",
                  })}{" "}
                  -{" "}
                  {education.endDate
                    ? education.endDate.toLocaleDateString(currentLang, {
                        year: "numeric",
                        month: "long",
                      })
                    : t("Information.Present")}
                </span>
              </h3>
              <h4 className="uppercase">{education.school}</h4>
              <p className="font-sans">{education.description}</p>
            </div>
          ))}
        </div>
      </div>
    </article>
  );
}
