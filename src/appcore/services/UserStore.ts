import { create } from "zustand";
import { User } from "../../domain/models/User";
import { Summary } from "../../domain/models/Summary";
import { PersonalInformation } from "../../domain/models/PersonalInformation";
import { Cv } from "../../domain/models/Cv";
import { Skill } from "../../domain/models/Skill";
import { WorkExperience } from "../../domain/models/WorkExperience";
import { Education } from "../../domain/models/Education";
import { persist } from "zustand/middleware";
interface AccordionOrder {
  id: string;
  order: number;
}

interface UserState {
  user: User;
  template: string;
  setTemplate: (template: string) => void;
  accordionOrder: AccordionOrder[];
  setUser: (user: User) => void;
  setAccordionOrder: (order: AccordionOrder[]) => void;
  updatePersonalInformation: (personalInformation: PersonalInformation) => void;
  updateSkills: (skills: Skill[]) => void;
  updateWorkExperiences: (workExperiences: WorkExperience[]) => void;
  updateEducation: (education: Education[]) => void;
  updateSummary: (summary: Summary) => void;
  createCV: () => void;
}

const createEmptyUser = (): User => {
  return new User(
    "",
    "",
    "",
    "",
    new Date(),
    new Date(),
    new Cv(
      new PersonalInformation(
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        ""
      ),
      [],
      [],
      [],
      new Summary("")
    )
  );
};

const createUpdatedUser = (
  currentUser: User,
  updates: Partial<{
    personalInformation: PersonalInformation;
    skills: Skill[];
    workExperiences: WorkExperience[];
    education: Education[];
    summary: Summary;
  }>
): User => {
  const { cv } = currentUser;
  return new User(
    currentUser.id,
    currentUser.name,
    currentUser.email,
    currentUser.password,
    currentUser.createdAt,
    new Date(),
    new Cv(
      updates.personalInformation ?? cv.personalInformation,
      updates.skills ?? cv.skills,
      updates.workExperiences ?? cv.workExperiences,
      updates.education ?? cv.education,
      updates.summary ?? cv.summary
    )
  );
};

const userStore = create<UserState>()(
  persist(
    (set) => ({
      user: createEmptyUser(),
      accordionOrder: [
        { id: "summary", order: 0 },
        { id: "education", order: 1 },
        { id: "personal", order: 2 },
        { id: "skills", order: 3 },
        { id: "work", order: 4 },
        { id: "template", order: 5 },
      ],
      template: "SimpleTemplate",
      setTemplate: (template) => set({ template }),
      setUser: (user) => set({ user }),
      setAccordionOrder: (accordionOrder) => set({ accordionOrder }),

      updatePersonalInformation: (personalInformation) =>
        set((state) => ({
          user: createUpdatedUser(state.user, { personalInformation }),
        })),

      updateSkills: (skills) =>
        set((state) => ({
          user: createUpdatedUser(state.user, { skills }),
        })),

      updateWorkExperiences: (workExperiences) =>
        set((state) => ({
          user: createUpdatedUser(state.user, { workExperiences }),
        })),

      updateEducation: (education) =>
        set((state) => ({
          user: createUpdatedUser(state.user, { education }),
        })),

      updateSummary: (summary) =>
        set((state) => ({
          user: createUpdatedUser(state.user, { summary }),
        })),

      createCV: () =>
        set((state) => ({
          user: createUpdatedUser(state.user, {}),
        })),
    }),
    {
      name: "user-storage", // unique name for localStorage key
      merge: (persistedState, currentState) => {
        const state = persistedState as UserState;

        // Reparsear fechas
        const reparsedWorkExperiences = state.user.cv.workExperiences.map(
          (exp) => ({
            ...exp,
            startDate: new Date(exp.startDate),
            endDate: exp.endDate ? new Date(exp.endDate) : null,
          })
        );

        const reparsedEducation = state.user.cv.education.map((edu) => ({
          ...edu,
          startDate: new Date(edu.startDate),
          endDate: edu.endDate ? new Date(edu.endDate) : null,
        }));

        return {
          ...currentState,
          ...state,
          user: {
            ...state.user,
            createdAt: new Date(state.user.createdAt),
            updatedAt: new Date(state.user.updatedAt),
            cv: {
              ...state.user.cv,
              workExperiences: reparsedWorkExperiences,
              education: reparsedEducation,
            },
          },
        };
      },
    }
  )
);

export default userStore;
