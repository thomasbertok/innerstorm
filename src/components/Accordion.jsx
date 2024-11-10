import { useAppContext } from "@/context/AppContext";
import { ArrowDown } from "lucide-react";
import { useEffect, useState } from "react";

const TRIGGER_WIDTH = 1024;

const Accordion = ({ children }) => {
  const { isAccordionOpen, setAccordionOpen } = useAppContext();
  const [accordionOn, setAccordionOn] = useState(window.innerWidth < TRIGGER_WIDTH);

  const onResize = () => {
    setAccordionOn(window.innerWidth < TRIGGER_WIDTH);
  };

  useEffect(() => {
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("resize", onResize);
    };
  }, []);

  const toggleAccordion = () => {
    setAccordionOpen(!isAccordionOpen);
    console.log("toggleAccordion", isAccordionOpen);
  };
  return (
    <div className={`accordion ${isAccordionOpen ? "open" : ""}`}>
      <div className="accordion-content">{children}</div>

      {accordionOn && (
        <div className={`accordion-button ${isAccordionOpen ? "open" : ""}`}>
          <ArrowDown onClick={toggleAccordion} className="accordion-toggle" />
        </div>
      )}
    </div>
  );
};

export default Accordion;
