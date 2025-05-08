import ElegantTemplate from "./ElegantTemplate";
import ProfessionalTemplate from "./ProfessionalTemplate";
import SimpleTemplate from "./SimpleTemplate";
import ElegantImage from "../../assets/images/ElegantTemplate.png"
import SimpleImage from "../../assets/images/SimpleTemplate.png"
import ProfessionalImage from "../../assets/images/ProfessionalTemplate.png"
interface Section {
  id: string;
  title: string;
  image: string;
  content: React.ReactNode;
}

 const sections: Section[] = [
  {
    id: "ElegantTemplate",
    title: "Elegant Template",
    image: ElegantImage,
    content: <ElegantTemplate />,
  },
  {
    id: "SimpleTemplate",
    title: "Simple Template",
    image: SimpleImage,
    content: <SimpleTemplate />,
  },
  {
    id: "ProfessionalTemplate",
    title: "Professional Template",
    image: ProfessionalImage,
    content: <ProfessionalTemplate />,
  }
];

export default {  sections };
