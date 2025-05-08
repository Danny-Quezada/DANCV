import { useTranslation } from "react-i18next";
import { IoMdPhonePortrait } from "react-icons/io";
import { MdEmail } from "react-icons/md";
import { TbWorld } from "react-icons/tb";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import userStore from "../../appcore/services/UserStore";

export default function ProfessionalTemplate() {
  const { t, i18n } = useTranslation();
  const { user } = userStore();
  const currentLang = i18n.language;

  return (
    <article className="flex w-full pl-5 pt-4 gap-5">
      <div className="w-45 flex flex-col gap-5">
        <img
          src={user.cv.personalInformation.image}
          className="w-45 h-45 rounded-3xl"
          alt={t("Personal Information")}
        />
        <div className="w-45 flex flex-col gap-4 text-sm">
          <p className="break-words">
            <MdEmail className="text-orange-700" />
            {user.cv.personalInformation.email}
          </p>
          <p className="break-words">
            <IoMdPhonePortrait className="text-orange-700" />
            {user.cv.personalInformation.phone}
          </p>
          <a className="break-words">
            <TbWorld className="text-orange-700" />
            {user.cv.personalInformation.website}
          </a>
          {user.cv.personalInformation.linkedin && (
            <p className="break-words">
              <FaLinkedin className="text-orange-700" />
              {user.cv.personalInformation.linkedin}
            </p>
          )}
          {user.cv.personalInformation.github && (
            <p className="break-words">
              <FaGithub className="text-orange-700" />
              {user.cv.personalInformation.github}
            </p>
          )}
        </div>
        <div>
          <h3 className="uppercase text-orange-700 font-serif">
            {t("Information.Skills")}
          </h3>
          <hr className="text-orange-700" />
          <div>
            <ul className="list-disc pl-4">
              {user.cv.skills.map((skill, index) => (
                <li className="space-x-44 mt-4" key={skill.name + index}>
                  {skill.name}
                  {"    "}
                  <span
                    className={`${
                      skill.level === "intermediate"
                        ? "text-orange-700"
                        : skill.level === "advanced"
                        ? "text-green-700"
                        : "text-blue-700"
                    } text-xs`}
                  >
                    {t(`Level.${skill.level}`)}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="w-[calc(100%-11.25rem)] h-full flex flex-col gap-5">
        <div className="h-45 bg-orange-700 p-2 space-y-2">
          <h2 className="font-bold text-3xl text-white">
            {user.cv.personalInformation.name}
          </h2>
          <p className="text-white font-sans">{user.cv.summary.summary}</p>
        </div>

        <div className="pr-4">
          <h3 className="text-3xl font-serif text-orange-700 uppercase mb-3">
            {t("Information.Experience")}
          </h3>
          <hr className="text-orange-700" />
          {user.cv.workExperiences.map((work, index) => (
            <div key={work.company + index} className="mb-6">
              <h3 className="font-semibold flex justify-between text-orange-700">
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


        <div className="pr-4">
          <h3 className="text-3xl font-serif uppercase mb-3 text-orange-700">
            {t("Information.Education")}
          </h3>
          <hr className="text-orange-700" />
          {user.cv.education.map((education, index) => (
            <div key={education.degree + index} className="mb-6">
              <h3 className="font-semibold flex justify-between text-orange-700">
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
