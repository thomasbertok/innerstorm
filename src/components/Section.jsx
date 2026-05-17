import PropTypes from "prop-types";
import Logo from "@/components/Logo";

/**
 * wrapper component for each fullpage section
 * sectionName - name of the section
 * withLogo - show logo
 * glass - show glass
 * className - additional class names
 * wallpaper - background image
 */

const Section = ({ children, sectionName, withLogo = false, glass = false, className = "", wallpaper }) => {
  return (
    <div
      className={`section screen ${sectionName} ${glass ? "" : className}`}
      style={{ backgroundImage: `url(${wallpaper})` }}>
      {withLogo && <Logo className="section-logo" />}
      {glass && <div className={`glass section-content ${className}`}>{children}</div>}
      {!glass && children}
    </div>
  );
};

Section.propTypes = {
  children: PropTypes.node.isRequired,
  sectionName: PropTypes.string.isRequired,
  withLogo: PropTypes.bool,
  glass: PropTypes.bool,
  className: PropTypes.string,
  wallpaper: PropTypes.string,
};

export default Section;
