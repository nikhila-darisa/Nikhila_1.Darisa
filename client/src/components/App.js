import React, { Fragment } from 'react';
import '../App.css'
import DisplayStories from './displayStories/displaystories'
import AddQuery from './AddTopic/addQuery'
function App() {
  return (
    <Fragment>
      <div className="row">
        <div className="col-sm-3">
        </div>
        <div className="col-sm-6">
          <DisplayStories />
        </div>
        <div className="col-sm-3">
        </div>
      </div>
      <AddQuery />
    </Fragment>
  )
}

export default App;
