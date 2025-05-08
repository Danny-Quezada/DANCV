import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { PersonalInformation } from "../../domain/models/PersonalInformation";
import userStore from "../../appcore/services/UserStore";
import Input from "../ui/Input";
import { MdDelete } from "react-icons/md";

const UploadAndDisplayImage = () => {
  const { user, updatePersonalInformation } = userStore();

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const imageUrl = URL.createObjectURL(file);

    updatePersonalInformation({
      ...user.cv.personalInformation,
      image: imageUrl,
    });
  };

  const handleRemoveImage = () => {
    updatePersonalInformation({
      ...user.cv.personalInformation,
      image: "",
    });
  };

  return (
    <div className="flex items-center gap-2 w-full justify-center">
      {user.cv.personalInformation.image ? (
        <div className="flex flex-col items-center gap-2">
          <img
            className="w-30 h-30 rounded-md border border-gray-300 object-cover"
            alt="Selected"
            src={user.cv.personalInformation.image}
          />
          <button
            className="bg-red-500 text-white px-4 py-2 rounded-md"
            onClick={handleRemoveImage}
          >
            <MdDelete className="w-6 h-6" />
          </button>
        </div>
      ) : (
        <input
          className="bg-gray-100 w-30 h-30 rounded-md border border-gray-300 p-1"
          type="file"
          accept="image/*"
          onChange={handleImageChange}
        />
      )}
    </div>
  );
};

export default function PersonalInformationForm() {
  const { t } = useTranslation();
  const { user, updatePersonalInformation } = userStore();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PersonalInformation>({
    defaultValues: user.cv.personalInformation || {
      name: "",
      email: "",
      phone: "",
      address: "",
      city: "",
      state: "",
      zip: "",
      country: "",
      website: "",
      github: "",
      linkedin: "",
      twitter: "",
      image: "",
    },
  });

  const urlPattern = {
    value: /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/,
    message: t("Please enter a valid URL"),
  };

  const handleFieldChange = (
    field: keyof PersonalInformation,
    value: string
  ) => {
    const currentData = user.cv.personalInformation;
    updatePersonalInformation(
      new PersonalInformation(
        field === "name" ? value : currentData.name,
        field === "email" ? value : currentData.email,
        field === "phone" ? value : currentData.phone,
        field === "address" ? value : currentData.address,
        field === "city" ? value : currentData.city,
        field === "state" ? value : currentData.state,
        field === "zip" ? value : currentData.zip,
        field === "country" ? value : currentData.country,
        field === "website" ? value : currentData.website,
        field === "github" ? value : currentData.github,
        field === "linkedin" ? value : currentData.linkedin,
        field === "twitter" ? value : currentData.twitter,
        field === "image" ? value : currentData.image
      )
    );
  };

  return (
    <form onSubmit={handleSubmit(() => {})} className="space-y-2">
      <h2 className="text-lg font-bold">{t("Information.Personal Information")}</h2>
      <UploadAndDisplayImage />
      <Input
        label={t("Personal Information.Name")}
        type="text"
        required
        error={errors.name}
        {...register("name", { required: "Name is required" })}
        onChange={(e) => handleFieldChange("name", e.target.value)}
      />

      <Input
        label={t("Personal Information.Email")}
        type="email"
        required
        error={errors.email}
        {...register("email", {
          required: t("Email is required"),
          pattern: {
            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
            message: "Invalid email address",
          },
        })}
        onChange={(e) => handleFieldChange("email", e.target.value)}
      />

      <Input
        label={t("Personal Information.Phone")}
        type="tel"
        required
        error={errors.phone}
        {...register("phone", { required: "Phone is required" })}
        onChange={(e) => handleFieldChange("phone", e.target.value)}
      />

      <Input
        label={t("Personal Information.Address")}
        type="text"
        required
        error={errors.address}
        {...register("address", { required: "Address is required" })}
        onChange={(e) => handleFieldChange("address", e.target.value)}
      />

      <div className="grid grid-cols-2 gap-4">
        <Input
          label={t("Personal Information.City")}
          type="text"
          required
          error={errors.city}
          {...register("city", { required: "City is required" })}
          onChange={(e) => handleFieldChange("city", e.target.value)}
        />

        <Input
          label={t("Personal Information.State")}
          type="text"
          required
          error={errors.state}
          {...register("state", { required: "State is required" })}
          onChange={(e) => handleFieldChange("state", e.target.value)}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <Input
          label={t("Personal Information.Postal Code")}
          type="text"
          required
          error={errors.zip}
          {...register("zip", { required: "ZIP code is required" })}
          onChange={(e) => handleFieldChange("zip", e.target.value)}
        />

        <Input
          label={t("Personal Information.Country")}
          type="text"
          required
          error={errors.country}
          {...register("country", { required: "Country is required" })}
          onChange={(e) => handleFieldChange("country", e.target.value)}
        />
      </div>

      <Input
        label={"WebSite"}
        type="url"
        error={errors.website}
        {...register("website", { pattern: urlPattern })}
        onChange={(e) => handleFieldChange("website", e.target.value)}
      />

      <div className="grid grid-cols-3 gap-4">
        <Input
          label={"Github"}
          type="url"
          error={errors.github}
          {...register("github", { pattern: urlPattern })}
          onChange={(e) => handleFieldChange("github", e.target.value)}
        />

        <Input
          label={"LinkedIn"}
          type="url"
          error={errors.linkedin}
          {...register("linkedin", { pattern: urlPattern })}
          onChange={(e) => handleFieldChange("linkedin", e.target.value)}
        />

        <Input
          label={"Twitter"}
          type="url"
          error={errors.twitter}
          {...register("twitter", { pattern: urlPattern })}
          onChange={(e) => handleFieldChange("twitter", e.target.value)}
        />
      </div>
    </form>
  );
}
