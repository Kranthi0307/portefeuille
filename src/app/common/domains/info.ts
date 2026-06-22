import { Education } from "./education";
import { Experience } from "./experience";
import { Project } from "./project";
import { Skill } from "./skill";

export interface Info {
  message: string;
  data: {
    projects: Project[];
    skills: Skill[];
    experiences: Experience[];
    educations: Education[];
  }
}
