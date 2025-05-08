export class Skill {
  constructor(
    public name: string,
    public level: "beginner" | "intermediate" | "advanced" | "expert"
  ) {}
}
