import PropTypes from 'prop-types';

export default function Section({ index, title, description, children }) {
  return (
    <section className="section">
      <header className="section-head">
        <span className="section-index">{index}</span>
        <div>
          <h3>{title}</h3>
          {description && <p className="muted">{description}</p>}
        </div>
      </header>
      <div className="section-body">{children}</div>
    </section>
  );
}

Section.propTypes = {
  index: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  children: PropTypes.node,
};
