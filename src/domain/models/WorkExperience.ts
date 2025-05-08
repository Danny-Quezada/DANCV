export class WorkExperience {
  constructor(
    public company: string,
    public position: string,
    public startDate: Date,
    public endDate: Date | null,
    public description: string,
    public type: "full-time" | "part-time" | "freelance" | "volunteer" | "internship"
  ) {}
}
