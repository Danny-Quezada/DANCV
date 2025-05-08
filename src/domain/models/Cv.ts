
import { Education } from "./Education";
import { PersonalInformation } from "./PersonalInformation";
import { Skill } from "./Skill";
import { Summary } from "./Summary";
import { WorkExperience } from "./WorkExperience";
    export class Cv {
  constructor(
    public personalInformation: PersonalInformation,
    public skills: Skill[],
    public workExperiences: WorkExperience[],
    public education: Education[],
    public summary: Summary 
  ) {}
}



