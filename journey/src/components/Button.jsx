// button.jsx - estilizacao basica
import React from 'react'

export default function Button({ children, ...props }) {
  return (
    <button
      {...props}
      style={{
        cursor: 'pointer',
        borderRadius: 999,
        padding: '12px 28px',
        background: '#3b2fb8',
        color: 'white',
        border: 'none',
        fontWeight: 700,
      }}
    >
      {children}
    </button>
  )
}
