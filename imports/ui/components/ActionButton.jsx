import React from 'react'

/*
  the component ActionButton will render the buttons responsible 
  for performing action like add product quantityt, 
  finish purchase and new purchase button. Before 
  this component creation a <button> tag was created.
    function => represents the function that will be called in the parent component.
    style => represents the classes responsible for stylizing the componen.
    desc => represents the description displayed to the use.
*/

export default props => (
       <button onClick={props.function} className={props.style}>  
                {props.desc}
        </button> 
)