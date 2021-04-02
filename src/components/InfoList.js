import React from 'react';

function InfoListElem(props) {
  return <p key={props.id}>
    <span className="fw-semi-bold pr-2">{props.first}:</span>
    {props.second}
  </p>
}

function InfoList(props) {
  return props.info.map((pair, i) => {
    return <div key={pair + i}>
      <InfoListElem first={pair[0]} second={pair[1]}/>
    </div>
  })
}

export default InfoList;