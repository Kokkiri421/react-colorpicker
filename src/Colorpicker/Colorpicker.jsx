import React, { useState } from 'react'
import HexInput from './HexInput.jsx'
import HueSelector from './HueSelector.jsx'
import SVSelector from './SVSelector.jsx'

function Colorpicker() {
  const [hue, setHue] = useState(0)
  const [saturation, setSaturation] = useState(100)
  const [value, setValue] = useState(100)

  function hsvToHex(h, s, v) {
    const hi = Math.floor(h / 60) % 6
    const vmin = Math.round(((100 - s) * v) / 100)
    const a = Math.round(((v - vmin) * (h % 60)) / 60)
    const vinc = vmin + a
    const vdec = v - a

    switch (hi) {
      case 0:
        return `${Math.round(2.55 * v)
          .toString(16)
          .padStart(2, '0')}${Math.round(2.55 * vinc)
          .toString(16)
          .padStart(2, '0')}${Math.round(2.55 * vmin)
          .toString(16)
          .padStart(2, '0')}`
      case 1:
        return `${Math.round(2.55 * vdec)
          .toString(16)
          .padStart(2, '0')}${Math.round(2.55 * v)
          .toString(16)
          .padStart(2, '0')}${Math.round(2.55 * vmin)
          .toString(16)
          .padStart(2, '0')}`
      case 2:
        return `${Math.round(2.55 * vmin)
          .toString(16)
          .padStart(2, '0')}${Math.round(2.55 * v)
          .toString(16)
          .padStart(2, '0')}${Math.round(2.55 * vinc)
          .toString(16)
          .padStart(2, '0')}`
      case 3:
        return `${Math.round(2.55 * vmin)
          .toString(16)
          .padStart(2, '0')}${Math.round(2.55 * vdec)
          .toString(16)
          .padStart(2, '0')}${Math.round(2.55 * v)
          .toString(16)
          .padStart(2, '0')}`
      case 4:
        return `${Math.round(2.55 * vinc)
          .toString(16)
          .padStart(2, '0')}${Math.round(2.55 * vmin)
          .toString(16)
          .padStart(2, '0')}${Math.round(2.55 * v)
          .toString(16)
          .padStart(2, '0')}`
      case 5:
        return `${Math.round(2.55 * v)
          .toString(16)
          .padStart(2, '0')}${Math.round(2.55 * vmin)
          .toString(16)
          .padStart(2, '0')}${Math.round(2.55 * vdec)
          .toString(16)
          .padStart(2, '0')}`
      default:
        return '000000'
    }
  }

  function hexValidation(hex) {
    let r, g, b

    if (hex.length === 3) {
      r = parseInt(hex.substring(0, 1).repeat(2), 16)
      g = parseInt(hex.substring(1, 2).repeat(2), 16)
      b = parseInt(hex.substring(2, 3).repeat(2), 16)
    } else if (hex.length === 6) {
      r = parseInt(hex.substring(0, 2), 16)
      g = parseInt(hex.substring(2, 4), 16)
      b = parseInt(hex.substring(4, 6), 16)
    } else return false
    if (
      !Number.isInteger(r) ||
      !Number.isInteger(g) ||
      !Number.isInteger(b) ||
      r < 0 ||
      r > 256 ||
      g < 0 ||
      g > 256 ||
      b < 0 ||
      b > 256
    ) {
      return false
    }
    return [r, g, b]
  }
  function setHsv(hex) {
    if (hexToHsv(hex)) {
      const [h, s, v] = hexToHsv(hex)
      setHue(h)
      setSaturation(s)
      setValue(v)
    }
  }
  function hexToHsv(hex) {
    let h, s, v, r, g, b

    if (hexValidation(hex)) {
      ;[r, g, b] = hexValidation(hex)
    } else return

    r = r / 255
    g = g / 255
    b = b / 255

    const max = Math.max(r, g, b)
    const min = Math.min(r, g, b)
    s = max === 0 ? 0 : 1 - min / max
    v = max

    if (max === min) {
      h = 0
    } else if (max === r) {
      h = 60 * ((g - b) / (max - min)) + (g < b ? 360 : 0)
    } else if (max === g) {
      h = 60 * ((b - r) / (max - min)) + 120
    } else if (max === b) {
      h = 60 * ((r - g) / (max - min)) + 240
    }
    h = Math.round(h)
    s = Math.round(s * 100)
    v = Math.round(v * 100)

    return [h, s, v]
  }

  return (
    <div style={{ margin: '0 2rem' }}>
      <SVSelector
        hue={hue}
        saturation={saturation}
        value={value}
        setSaturation={setSaturation}
        setValue={setValue}
        hsvToHex={hsvToHex}
      />
      <HueSelector hue={hue} setHue={setHue} hsvToHex={hsvToHex} />
      <HexInput
        hue={hue}
        saturation={saturation}
        value={value}
        hsvToHex={hsvToHex}
        setHsv={setHsv}
      />
    </div>
  )
}

export default Colorpicker
