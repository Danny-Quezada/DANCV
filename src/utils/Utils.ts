
export const formatDate = (date: Date | string | null | undefined) => {
    if (!date) return "Present";

    try {
      let dateObject: Date;

      if (date instanceof Date) {
        dateObject = date;
      } else if (typeof date === "string") {
        dateObject = new Date(date);
        if (isNaN(dateObject.getTime())) {
          return date;
        }
      } else {
        return "Invalid Date";
      }

      return dateObject.toLocaleDateString("es-ES", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    } catch (error) {
      console.error("Error formatting date:", error);
      return "Invalid Date";
    }
  };