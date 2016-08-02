import React from 'react';


function App({children}) {
  return (
    <main>
      {children}
    </main>
  );
}

App.propTypes = {
  children: React.PropTypes.element
};

export default App;
