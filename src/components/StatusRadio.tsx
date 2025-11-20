'use client'

import { InputHTMLAttributes } from 'react'

interface StatusRadioProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label: string
  value: string
  checked: boolean
  onChange: (value: string) => void
}

export default function StatusRadio({
  label,
  value,
  checked,
  onChange,
  ...props
}: StatusRadioProps) {
  return (
    <label className="flex items-center gap-2 cursor-pointer hover:opacity-80 transition-opacity">
      <input
        type="radio"
        value={value}
        checked={checked}
        onChange={() => onChange(value)}
        className="w-4 h-4 cursor-pointer accent-purple-500"
        {...props}
      />
      <span className="text-xs text-gray-300 select-none">{label}</span>
    </label>
  )
}
