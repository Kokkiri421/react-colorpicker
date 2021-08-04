import React, { useEffect, useState, useRef } from 'react'
import './Selector.scss'
import './SVSelector.scss'

function SVSelector(props) {
  const { hue, saturation, setSaturation, value, setValue, hsvToHex } = props
  const [color, setColor] = useState('ff0000')
  const [markColor, setMarkColor] = useState('ff0000')
  const [x, setX] = useState(100)
  const [y, setY] = useState(0)
  const [isMouseDown, setIsMouseDown] = useState(false)
  const svBar = useRef(null)

  const markStyle = {
    '--x': `${x}%`,
    '--y': `${y}%`,
    '--color': `#${markColor}`,
  }
  const bgStyle = {
    '--color': `#${color}`,
  }

  useEffect(() => {
    const svBarRef = svBar.current
    svBarRef.addEventListener('mousedown', mouseDown)
    svBarRef.addEventListener('mousedown', changeProgress)
    svBarRef.addEventListener('touchstart', mouseDown)
    svBarRef.addEventListener('touchstart', changeProgress)
    window.addEventListener('mouseup', mouseUp)
    window.addEventListener('touchend', mouseUp)

    return () => {
      svBarRef.removeEventListener('mousedown', mouseDown)
      svBarRef.removeEventListener('mousedown', changeProgress)
      svBarRef.removeEventListener('touchstart', mouseDown)
      svBarRef.removeEventListener('touchstart', changeProgress)
      window.removeEventListener('mouseup', mouseUp)
      window.removeEventListener('touchend', mouseUp)
    }
  }, [])

  useEffect(() => {
    const svBarRef = svBar.current
    if (isMouseDown) {
      window.addEventListener('mousemove', changeProgress)
      svBarRef.addEventListener('touchmove', changeProgress)
    } else {
      window.removeEventListener('mousemove', changeProgress)
    }
    return () => {
      window.removeEventListener('mousemove', changeProgress)
    }
  }, [isMouseDown])

  useEffect(() => {
    setColor(hsvToHex(hue, 100, 100))
    setMarkColor(hsvToHex(hue, saturation, value))
  }, [hsvToHex, hue, saturation, value])

  useEffect(() => {
    if (isMouseDown) {
      setSaturation(x)
      setValue(100 - y)
    }
  }, [isMouseDown, setSaturation, x, setValue, y])

  useEffect(() => {
    if (!isMouseDown) {
      setX(saturation)
      setY(100 - value)
    }
  }, [isMouseDown, saturation, value])

  function mouseDown(e) {
    e.preventDefault()
    setIsMouseDown(true)
  }

  function mouseUp() {
    setIsMouseDown(false)
  }

  function changeProgress(e) {
    const rect = svBar.current.getBoundingClientRect()
    if (e.type === 'touchmove' || e.type === 'touchstart') {
      setX(
        Math.min(
          Math.max(e.targetTouches[0].clientX - rect.left, 0) / rect.width,
          1
        ) * 100
      )
      setY(
        Math.min(
          Math.max(e.targetTouches[0].clientY - rect.top, 0) / rect.height,
          1
        ) * 100
      )
    } else {
      setX(Math.min(Math.max(e.clientX - rect.left, 0) / rect.width, 1) * 100)
      setY(Math.min(Math.max(e.clientY - rect.top, 0) / rect.height, 1) * 100)
    }
  }

  return (
    <div className="selector sv-selector" ref={svBar}>
      <div
        className="selector__background sv-selector__background"
        style={bgStyle}
      ></div>
      <div
        className="selector__select-mark sv-selector__select-mark"
        style={markStyle}
      ></div>
    </div>
  )
}

export default SVSelector
