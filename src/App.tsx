import { AnimatePresence, motion, Reorder } from "framer-motion";
import type { ReactElement } from "react";
import Accordion from "./components/ui/Accordion";
import PersonalInformationForm from "./components/forms/PersonalInformationForm";
import SkillsForm from "./components/forms/SkillsForm";
import WorkExperienceForm from "./components/forms/WorkExperienceForm";
import EducationForm from "./components/forms/EducationForm";
import SummaryForm from "./components/forms/SummaryForm";
import { useState, useEffect } from "react";
import { MdPreview } from "react-icons/md";
import CVPreview from "./components/sections/CVPreview";
import userStore from "./appcore/services/UserStore";
import ZoomWrapper from "./components/ui/ZoomWrapper";
import TemplatesForm from "./components/forms/TemplatesForm";
import { useTranslation } from "react-i18next";


interface AccordionItem {
  id: string;
  title: string;
  component: ReactElement;
}



function App() {
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const { accordionOrder, setAccordionOrder } = userStore();
  const { t, i18n } = useTranslation();

  const buildAccordionItems = (): AccordionItem[] => [
    {
      id: "summary",
      title: t("Information.Summary"),
      component: <SummaryForm />,
    },
    {
      id: "education",
      title: t("Information.Education"),
      component: <EducationForm />,
    },
    {
      id: "personal",
      title: t("Information.Personal Information"),
      component: <PersonalInformationForm />,
    },
    {
      id: "skills",
      title: t("Information.Skills"),
      component: <SkillsForm />,
    },
    {
      id: "work",
      title: t("Information.Experience"),
      component: <WorkExperienceForm />,
    },
    {
      id: "template",
      title: t("Information.Templates"),
      component: <TemplatesForm />,
    },
  ];

  const [items, setItems] = useState<AccordionItem[]>(() => {
    const defaultItems = buildAccordionItems();
    return accordionOrder
      .sort((a, b) => a.order - b.order)
      .map((order) => defaultItems.find((item) => item.id === order.id)!);
  });

  useEffect(() => {
    const defaultItems = buildAccordionItems();
    const newItems = accordionOrder
      .sort((a, b) => a.order - b.order)
      .map((order) => defaultItems.find((item) => item.id === order.id)!);
    setItems(newItems);
  }, [i18n.language]);

  const handleReorder = (newItems: AccordionItem[]) => {
    setItems(newItems);
    const newOrder = newItems.map((item, index) => ({
      id: item.id,
      order: index,
    }));
    setAccordionOrder(newOrder);
  };

  return (
    <div className="flex flex-row h-[100dvh] overflow-y-auto md:overflow-hidden relative">
      <section className="w-full overflow-y-auto md:w-1/2">
        <Reorder.Group axis="y" values={items} onReorder={handleReorder}>
          {items.map((item) => (
            <Reorder.Item
              key={item.id}
              value={item}
              whileDrag={{ zIndex: 1 }}
            >
              <motion.div
                layout
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <Accordion title={item.title}>{item.component}</Accordion>
              </motion.div>
            </Reorder.Item>
          ))}
        </Reorder.Group>
      </section>

      <section className="hidden md:flex w-1/2 h-[100dvh] overflow-auto justify-center items-center">
        <ZoomWrapper>
          <CVPreview />
        </ZoomWrapper>
      </section>

      <AnimatePresence mode="popLayout">
        {isPreviewOpen && (
          <motion.section
            initial={{ opacity: 0, y: "100%" }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: "100%" }}
            transition={{ duration: 0.3 }}
            className="w-full md:w-1/2 absolute z-10 h-full bg-neutral-800 flex items-center justify-center"
          >
            <ZoomWrapper>
              <CVPreview />
            </ZoomWrapper>
          </motion.section>
        )}
      </AnimatePresence>

      <button
        className="absolute bottom-5 left-5 h-15 w-15 md:hidden justify-center items-center flex z-20 bg-blue-500 rounded-full"
        onClick={() => setIsPreviewOpen(!isPreviewOpen)}
      >
        <MdPreview className="w-7 h-7 text-white" />
      </button>
    </div>
  );
}

export default App;
