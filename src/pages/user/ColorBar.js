import React from "react";
import s from './User.module.scss';

export function ColorBar({data}) {
  let sections = data.map((d, i) => (
    <div
      data-for={`color-bar-tooltip-${i}`}
      key={i}
      style={{
        backgroundColor: d.color,
        height: '100%',
        display: 'inline-block',
        width: `${100 / data.length}%`,
      }}>
    </div>
  ))
  return (
    <div className={s.colorBarSectionsContainer}>
      {sections}
    </div>
  )
}