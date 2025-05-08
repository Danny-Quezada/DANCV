import { useTranslation } from "react-i18next";
import userStore from "../../appcore/services/UserStore";

export default function SimpleTemplate() {
  const { t, i18n } = useTranslation();
  const { user } = userStore();
  const currentLang = i18n.language;

  return (
    <article className="p-5 space-y-4">
      <div className="w-full flex flex-col justify-center items-center">
        <h2 className="font-bold">{user.cv.personalInformation.name}</h2>
        <h3>{user.cv.personalInformation.address}</h3>
      </div>
      <hr />
      <div>
        <h3>
          {t("Information.Nationality")}:{" "}
          <span>{user.cv.personalInformation.city}</span>
        </h3>
        <h3>
          {t("Information.Contact")}:{" "}
          <span>{user.cv.personalInformation.phone}</span>
        </h3>
        <h3>
          Email: <span>{user.cv.personalInformation.email}</span>
        </h3>
      </div>
      <hr />
      <div>
        <h3>
          WebSite:{"  "}
          <a href={user.cv.personalInformation.website}>
            {user.cv.personalInformation.website}
          </a>
        </h3>
        {user.cv.personalInformation.linkedin && (
          <h3>
            LinkedIn: <span>{user.cv.personalInformation.linkedin}</span>
          </h3>
        )}
        {user.cv.personalInformation.github && (
          <h3>
            GitHub: <span>{user.cv.personalInformation.github}</span>
          </h3>
        )}
      </div>
      <hr />
      <div>
        <h3 className="font-black">{t("Information.Summary")}</h3>
        <p>{user.cv.summary.summary}</p>
      </div>
      <hr />
      <div>
        <h3 className="font-black">{t("Information.Experience")}</h3>
        {user.cv.workExperiences.map((work, index) => (
          <div key={work.company + index} className="mb-2">
            <h3 className="font-semibold flex justify-between">
              {work.company}{" "}
              <span>
                {work.startDate.toLocaleDateString(currentLang, {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}{" "}
                -{" "}
                {work.endDate
                  ? work.endDate.toLocaleDateString(currentLang, {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })
                  : t("Information.Present")}
              </span>
            </h3>
            <h4>{work.position}</h4>
            <p>{work.description}</p>
          </div>
        ))}
      </div>
      <hr />
      <div>
        <h3 className="font-black">{t("Information.Education")}</h3>
        {user.cv.education.map((education, index) => (
          <div key={education.degree + index} className="mb-2">
            <h3 className="font-semibold flex justify-between">
              {education.location}{" "}
              <span>
                {education.startDate
                  ? education.startDate.toLocaleDateString(currentLang, {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })
                  : "Sin saber"}{" "}
                -{" "}
                {education.endDate
                  ? education.endDate.toLocaleDateString(currentLang, {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })
                  : t("Information.Present")}
              </span>
            </h3>
            <h4>{education.school}</h4>
            <p>{education.description}</p>
          </div>
        ))}
      </div>
      <hr />
      <div>
        <h3 className="font-black">{t("Information.Skills")}</h3>
        <div>
          <ul className="list-disc pl-5">
            {user.cv.skills.map((skill, index) => (
              <li className="space-x-44" key={skill.name + index}>
                {skill.name}
                {"    "}
                <span
                  className={`${
                    skill.level === "intermediate"
                      ? "text-orange-300"
                      : skill.level === "advanced"
                      ? "text-green-300"
                      : "text-blue-300"
                  }`}
                >
                  {t(`Level.${skill.level}`)}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <hr />
    </article>
  );
}
