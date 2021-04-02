import React from 'react';

function InfoListElem(props) {
  return <tr key={props.id}>
      <td className="fw-semi-bold px-0 py-2">{props.first}</td>
      <td className="pl-2 py-2">{props.second}</td>
    </tr>
}

function InfoList(props) {
  return props.info.map((pair, i) => {
    return <InfoListElem first={pair[0]} second={pair[1]}/>
  })
}

export default InfoList;