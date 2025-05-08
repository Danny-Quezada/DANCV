import { useForm } from "react-hook-form";
import { Summary } from "../../domain/models/Summary";
import userStore from "../../appcore/services/UserStore";
import { useTranslation } from "react-i18next";

interface SummaryFormData {
  summary: string;
}

export default function SummaryForm() {
  const { t } = useTranslation();
  const { user, updateSummary } = userStore();

  const {
    register,
    formState: { errors },
  } = useForm<SummaryFormData>({
    defaultValues: {
      summary: user.cv.summary.summary || "",
    },
  });

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newSummary = e.target.value;
    updateSummary(new Summary(newSummary));
  };

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {t("Summary.Title")}
          <span className="text-red-500 ml-1">*</span>
        </label>
        <textarea
          className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          rows={6}
          placeholder="Write a brief summary of your professional background, key skills, and career objectives..."
          {...register("summary", { required: "Summary is required" })}
          onChange={handleChange}
        />
        {errors.summary && (
          <span className="text-sm text-red-500">{errors.summary.message}</span>
        )}
      </div>
    </div>
  );
}
