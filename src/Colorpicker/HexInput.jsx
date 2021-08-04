import React, { useEffect, useState, useRef } from 'react'
import CopyButton from './CopyButton'
import './HexInput.scss'

function HexInput(props) {
  const { hue, saturation, value, hsvToHex, setHsv } = props
  const [hex, setHex] = useState('FF0000')
  const [focused, setFocused] = useState(false)
  const inputRef = useRef(null)

  useEffect(() => {
    window.addEventListener('mousedown', handleClickOutside)
    return () => {
      window.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])
  useEffect(() => {
    if (!focused) {
      setHex(hsvToHex(hue, saturation, value))
    }
  }, [focused, hsvToHex, hue, saturation, value])

  function test(e) {
    const value = e.target.value
    setHex(value)
    if (value.length === 3 || value.length === 6) {
      setHsv(value)
    }
  }

  function handleClickOutside(e) {
    if (!inputRef.current.contains(e.target)) {
      inputRef.current.blur()
      setFocused(false)
    }
  }
  return (
    <div className="hex">
      <label className="hex__label">HEX</label>
      <input
        onChange={test}
        value={hex}
        ref={inputRef}
        onFocus={() => setFocused(true)}
        className="hex__input"
      ></input>
      <CopyButton value={hex} className="hex__focus" />
    </div>
  )
}

export default HexInput
