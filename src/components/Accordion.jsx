import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { ArrowDown } from "lucide-react";

const TRIGGER_WIDTH = 1024;

const Accordion = ({ children, className }) => {
  const [isAccordionOpen, setAccordionOpen] = useState(false);
  const [accordionOn, setAccordionOn] = useState(false);

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
  };

  return (
    <div className={`accordion ${className} ${isAccordionOpen ? "open" : ""}`}>
      <div className="accordion-content">{children}</div>

      {accordionOn && (
        <div className={`accordion-button ${isAccordionOpen ? "open" : ""}`}>
          <ArrowDown onClick={toggleAccordion} className="accordion-toggle" />
        </div>
      )}
    </div>
  );
};

Accordion.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

Accordion.defaultProps = {
  className: "",
};

export default Accordion;
