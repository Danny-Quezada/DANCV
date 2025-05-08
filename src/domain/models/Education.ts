export class Education {
  constructor(
    public school: string,
    public degree: string,
    public startDate: Date,
    public endDate: Date | null,
    public description: string,
    public location: string,
  ) {}
}
