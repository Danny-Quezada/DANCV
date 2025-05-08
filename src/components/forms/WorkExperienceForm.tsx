import { useForm } from "react-hook-form";
import { WorkExperience } from "../../domain/models/WorkExperience";
import userStore from "../../appcore/services/UserStore";
import { useState } from "react";
import { FaTrash } from "react-icons/fa";
import Input from "../ui/Input";
import { useTranslation } from "react-i18next";

interface WorkExperienceFormData {
  company: string;
  position: string;
  startDate: string;
  endDate: string | null;
  description: string;
  type: "full-time" | "part-time" | "freelance" | "volunteer" | "internship";
}

export default function WorkExperienceForm() {
  const { t } = useTranslation();
  const { user, updateWorkExperiences } = userStore();
  const [workExperiences, setWorkExperiences] = useState<WorkExperience[]>(
    user.cv.workExperiences
  );

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<WorkExperienceFormData>({
    defaultValues: {
      company: "",
      position: "",
      startDate: "",
      endDate: null,
      description: "",
      type: "full-time",
    },
  });

  const onSubmit = (data: WorkExperienceFormData) => {
    const newWorkExperience = new WorkExperience(
      data.company,
      data.position,
      new Date(data.startDate),
      data.endDate ? new Date(data.endDate) : null,
      data.description,
      data.type
    );
    const updatedWorkExperiences = [...workExperiences, newWorkExperience];
    setWorkExperiences(updatedWorkExperiences);
    updateWorkExperiences(updatedWorkExperiences);
    reset();
  };

  const removeWorkExperience = (index: number) => {
    const updatedWorkExperiences = workExperiences.filter(
      (_, i) => i !== index
    );
    setWorkExperiences(updatedWorkExperiences);
    updateWorkExperiences(updatedWorkExperiences);
  };

  return (
    <div className="space-y-4">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <Input
            label={t("Experience.Company")}
            type="text"
            required
            error={errors.company}
            {...register("company", { required: "Company is required" })}
          />

          <Input
            label={t("Experience.Position")}
            type="text"
            required
            error={errors.position}
            {...register("position", { required: "Position is required" })}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <Input
            label={t("Experience.Start Date")}
            type="date"
            required
            error={errors.startDate}
            {...register("startDate", { required: "Start date is required" })}
          />

          <Input
            label={t("Experience.End Date")}
            type="date"
            error={errors.endDate}
            {...register("endDate")}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {t("Experience.EmploymentType")}
            <span className="text-red-500 ml-1">*</span>
          </label>
          <select
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            {...register("type", { required: "Employment type is required" })}
          >
            <option value="full-time">{t("EmploymentType.full-time")}</option>
            <option value="part-time">{t("EmploymentType.part-time")}</option>
            <option value="freelance">{t("EmploymentType.freelance")}</option>
            <option value="volunteer">{t("EmploymentType.volunteer")}</option>
            <option value="internship">{t("EmploymentType.internship")}</option>
          </select>
          {errors.type && (
            <span className="text-sm text-red-500">{errors.type.message}</span>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {t("Experience.Description")}
            <span className="text-red-500 ml-1">*</span>
          </label>
          <textarea
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            rows={4}
            {...register("description", {
              required: "Description is required",
            })}
          />
          {errors.description && (
            <span className="text-sm text-red-500">
              {errors.description.message}
            </span>
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          {t("Experience.Button")}
        </button>
      </form>

      <div className="space-y-2">
        <h3 className="text-lg font-medium text-gray-900">
          {t("Experience.Subtitle")}
        </h3>
        {workExperiences.length === 0 ? (
          <p className="text-gray-500">No work experiences added yet.</p>
        ) : (
          <div className="space-y-4">
            {workExperiences.map((experience, index) => (
              <div key={index} className="p-4 bg-gray-50 rounded-lg space-y-2">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium text-lg">
                      {experience.position}
                    </h4>
                    <p className="text-gray-600">{experience.company}</p>
                  </div>
                  <button
                    onClick={() => removeWorkExperience(index)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <FaTrash />
                  </button>
                </div>
                <div className="text-sm text-gray-500">
                  {new Date(experience.startDate).toLocaleDateString()} -{" "}
                  {experience.endDate
                    ? new Date(experience.endDate).toLocaleDateString()
                    : t("Information.Present")}
                </div>
                <div className="text-sm text-gray-500 capitalize">
                  {t(`EmploymentType.${experience.type}`)}
                </div>
                <p className="text-gray-700 whitespace-pre-wrap">
                  {experience.description}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
