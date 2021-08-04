import React, { useState, useEffect, useRef } from 'react'
import { FiCheck, FiCopy } from 'react-icons/fi'

function CopyButton(props) {
  const { value, className } = props
  const [copied, setCopied] = useState(false)
  const prevCopiedRef = useRef()

  useEffect(() => {
    prevCopiedRef.current = copied
  }, [copied])
  const prevCopied = prevCopiedRef.current

  useEffect(() => {
    if (prevCopied) {
      setCopied(false)
    }
  }, [prevCopied, value])

  function copyText() {
    navigator.clipboard.writeText(value)
    setCopied(true)
  }

  return (
    <div
      className={className}
      style={{ lineHeight: 0, margin: 0 }}
      onClick={() => copyText()}
    >
      {copied ? (
        <FiCheck style={{ display: 'block' }} />
      ) : (
        <FiCopy style={{ display: 'block' }} />
      )}
    </div>
  )
}
export default CopyButton
