import React, { useState } from 'react'

function Palette() {
  const [colors, setColors] = useState(['FFFFFF', 'FFFFFF'])
  return (
    <div className="palette">
      {colors.map((el) => (
        <div>{el}</div>
      ))}
    </div>
  )
}

export default Palette
