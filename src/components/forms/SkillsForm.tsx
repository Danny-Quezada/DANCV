import { useForm } from "react-hook-form";
import { Skill } from "../../domain/models/Skill";
import userStore from "../../appcore/services/UserStore";
import { useState } from "react";
import { FaTrash } from "react-icons/fa";
import { useTranslation } from "react-i18next";

interface SkillFormData {
  name: string;
  level: "beginner" | "intermediate" | "advanced" | "expert";
}

export default function SkillsForm() {
  const { t } = useTranslation();
  const { user, updateSkills } = userStore();
  const [skills, setSkills] = useState<Skill[]>(user.cv.skills);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<SkillFormData>({
    defaultValues: {
      name: "",
      level: "intermediate",
    },
  });

  const onSubmit = (data: SkillFormData) => {
    const newSkill = new Skill(data.name, data.level);
    const updatedSkills = [...skills, newSkill];
    setSkills(updatedSkills);
    updateSkills(updatedSkills);
    reset();
  };

  const removeSkill = (index: number) => {
    const updatedSkills = skills.filter((_, i) => i !== index);
    setSkills(updatedSkills);
    updateSkills(updatedSkills);
  };

  return (
    <div className="space-y-4">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {t("Skill.Skill")}
              <span className="text-red-500 ml-1">*</span>
            </label>
            <input
              type="text"
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              {...register("name", { required: "Skill name is required" })}
            />
            {errors.name && (
              <span className="text-sm text-red-500">
                {errors.name.message}
              </span>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {t("Skill.Proffiency level")}
              <span className="text-red-500 ml-1">*</span>
            </label>
            <select
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              {...register("level", {
                required: "Proficiency level is required",
              })}
            >
              <option value="beginner">{t("Level.beginner")}</option>
              <option value="intermediate">{t("Level.intermediate")}</option>
              <option value="advanced">{t("Level.advanced")}</option>
              <option value="expert">{t("Level.expert")}</option>
            </select>
            {errors.level && (
              <span className="text-sm text-red-500">
                {errors.level.message}
              </span>
            )}
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          {t("Skill.Button")}
        </button>
      </form>

      <div className="space-y-2">
        <h3 className="text-lg font-medium text-gray-900">
          {t("Skill.Subtitle")}
        </h3>
        {skills.length === 0 ? (
          <p className="text-gray-500">No skills added yet.</p>
        ) : (
          <div className="space-y-2">
            {skills.map((skill, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
              >
                <div>
                  <span className="font-medium">{skill.name}</span>
                  <span className="ml-2 text-sm text-gray-500">
                    ({t(`Level.${skill.level}`)})
                  </span>
                </div>
                <button
                  onClick={() => removeSkill(index)}
                  className="text-red-500 hover:text-red-700"
                >
                  <FaTrash />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
