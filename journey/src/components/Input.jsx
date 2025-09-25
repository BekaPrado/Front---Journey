// input.jsx - componente simples reutilizavel
import React from 'react'

export default function Input({ label, ...props }) {
  return (
    <label style={{display:'block', marginBottom:12}}>
      {label && <div style={{fontSize:12, marginBottom:6}} className="small">{label}</div>}
      <input {...props} style={{width:'100%', boxSizing:'border-box'}} />
    </label>
  )
}
