import { useForm } from "react-hook-form";
import { Education } from "../../domain/models/Education";
import userStore from "../../appcore/services/UserStore";
import { useState } from "react";
import { FaTrash } from "react-icons/fa";
import Input from "../ui/Input";
import { useTranslation } from "react-i18next";

interface EducationFormData {
  school: string;
  degree: string;
  startDate: string;
  endDate: string | null;
  description: string;
  location: string;
}

export default function EducationForm() {
  const {t}=useTranslation();
  const { user, updateEducation } = userStore();
  const [education, setEducation] = useState<Education[]>(user.cv.education);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<EducationFormData>({
    defaultValues: {
      school: "",
      degree: "",
      startDate: "",
      endDate: null,
      description: "",
      location: "",
    },
  });

  const onSubmit = (data: EducationFormData) => {
    const newEducation = new Education(
      data.school,
      data.degree,
      new Date(data.startDate),
      data.endDate ? new Date(data.endDate) : null,
      data.description,
      data.location
    );
    const updatedEducation = [...education, newEducation];
    setEducation(updatedEducation);
    updateEducation(updatedEducation);
    reset();
  };

  const removeEducation = (index: number) => {
    const updatedEducation = education.filter((_, i) => i !== index);
    setEducation(updatedEducation);
    updateEducation(updatedEducation);
  };

  return (
    <div className="space-y-4">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <Input
            label={t("Education.School")}
            type="text"
            required
            error={errors.school}
            {...register("school", { required: "School is required" })}
          />

          <Input
            label={t("Education.Degree")}
            type="text"
            required
            error={errors.degree}
            {...register("degree", { required: "Degree is required" })}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <Input
            label={t("Education.Start Date")}
            type="date"
            required
            error={errors.startDate}
            {...register("startDate", { required: "Start date is required" })}
          />

          <Input
            label={t("Education.End Date")}
            type="date"
            error={errors.endDate}
            {...register("endDate")}
          />
        </div>

        <Input
          label={t("Education.Location")}
          type="text"
          required
          error={errors.location}
          {...register("location", { required: "Location is required" })}
        />

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {t("Education.Description")}
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
          {t("Education.Button")}
        </button>
      </form>

      <div className="space-y-2">
        <h3 className="text-lg font-medium text-gray-900">Your Education</h3>
        {education.length === 0 ? (
          <p className="text-gray-500">No education history added yet.</p>
        ) : (
          <div className="space-y-4">
            {education.map((edu, index) => (
              <div key={index} className="p-4 bg-gray-50 rounded-lg space-y-2">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium text-lg">{edu.degree}</h4>
                    <p className="text-gray-600">{edu.school}</p>
                  </div>
                  <button
                    onClick={() => removeEducation(index)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <FaTrash />
                  </button>
                </div>
                <div className="text-sm text-gray-500">
                  {new Date(edu.startDate).toLocaleDateString()} -{" "}
                  {edu.endDate
                    ? new Date(edu.endDate).toLocaleDateString()
                    : "Present"}
                </div>
                <div className="text-sm text-gray-500">{edu.location}</div>
                <p className="text-gray-700 whitespace-pre-wrap">
                  {edu.description}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
