import React from 'react';


function ContentHeader({section, title}) {
  return (
    <header className="content-header">
      <div className="g-row g-cont">
        <div className="g-col">
          <div className="content-header__section">{section} /</div>
          <h1 className="content-header__title">{title}</h1>
        </div>
      </div>
    </header>
  );
}

ContentHeader.propTypes = {
  section: React.PropTypes.string.isRequired,
  title: React.PropTypes.string.isRequired
};

export default ContentHeader;
