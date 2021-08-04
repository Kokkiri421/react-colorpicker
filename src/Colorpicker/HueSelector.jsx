import React, { useEffect, useState, useRef } from 'react'
import './Selector.scss'
import './HueSelector.scss'

function HueSelector(props) {
  const { hue, setHue, hsvToHex } = props
  const [progress, setProgress] = useState(0)
  const [color, setColor] = useState('FF0000')
  const [isMouseDown, setIsMouseDown] = useState(false)
  const [isScrolling, setIsScrolling] = useState(false)
  const hueBar = useRef(null)
  const markStyle = {
    '--progress': `${progress}%`,
    '--color': `#${color}`,
  }

  useEffect(() => {
    const hueBarRef = hueBar.current
    hueBarRef.addEventListener('mousedown', mouseDown)
    hueBarRef.addEventListener('mousedown', changeProgress)
    hueBarRef.addEventListener('touchstart', mouseDown)
    hueBarRef.addEventListener('touchstart', changeProgress)
    hueBarRef.addEventListener('wheel', scrollHue)
    window.addEventListener('mouseup', mouseUp)
    window.addEventListener('touchend', mouseUp)
    return () => {
      hueBarRef.removeEventListener('mousedown', mouseDown)
      hueBarRef.removeEventListener('touchstart', mouseDown)
      hueBarRef.removeEventListener('mousedown', changeProgress)
      hueBarRef.removeEventListener('wheel', scrollHue)
      window.removeEventListener('mouseup', mouseUp)
      window.removeEventListener('touchend', mouseUp)
    }
  }, [])

  useEffect(() => {
    const hueBarRef = hueBar.current
    if (isMouseDown) {
      window.addEventListener('mousemove', changeProgress)
      hueBarRef.addEventListener('touchmove', changeProgress)
    } else {
      window.removeEventListener('mousemove', changeProgress)
    }
    return () => {
      window.removeEventListener('mousemove', changeProgress)
    }
  }, [isMouseDown])

  useEffect(() => {
    const h = Math.round(progress * 36) / 10
    if (isMouseDown || isScrolling) {
      setHue(h)
    }
    setColor(hsvToHex(h, 100, 100))
  }, [isScrolling, isMouseDown, hsvToHex, setHue, progress])

  useEffect(() => {
    if (!isMouseDown) {
      setProgress(hue / 3.6)
    }
  }, [isMouseDown, hue])

  function mouseDown(e) {
    e.preventDefault()
    setIsMouseDown(true)
  }

  function mouseUp() {
    setIsMouseDown(false)
  }

  function changeProgress(e) {
    const rect = hueBar.current.getBoundingClientRect()
    if (e.type === 'touchmove' || e.type === 'touchstart') {
      setProgress(
        (
          Math.min(
            Math.max(e.targetTouches[0].clientX - rect.left, 0) / rect.width,
            1
          ) * 100
        ).toFixed(2)
      )
    } else {
      setProgress(
        (
          Math.min(Math.max(e.clientX - rect.left, 0) / rect.width, 1) * 100
        ).toFixed(2)
      )
    }
  }

  function scrollHue(e) {
    setIsScrolling(true)
    e.preventDefault()
    setProgress((prev) => Math.min(Math.max(prev - e.deltaY / 360, 0), 100))
    setIsScrolling(false)
  }

  return (
    <div className="selector hue-selector" ref={hueBar}>
      <div className="selector__background hue-selector__background"></div>
      <div
        className="selector__select-mark hue-selector__select-mark"
        style={markStyle}
      ></div>
    </div>
  )
}

export default HueSelector
