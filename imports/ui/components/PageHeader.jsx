// Framework
import React from 'react';

export const PageHeader = () =>
  <div className='page-header'>
    <div className='left-arrow'>
      <img src={'../images/left_arrow.png'} alt='this arrow does nothing'></img>
    </div>
    <div className='page-number'>1 of 3</div>
    <h1 className='page-title'>How many items would <br/> you like to return? </h1>
  </div>;

export default PageHeader;
