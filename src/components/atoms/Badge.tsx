interface BadgeProps {
  children: React.ReactNode
  variant?: 'default' | 'primary' | 'success' | 'warning' | 'danger'
  className?: string
}

export default function Badge({
  children,
  variant = 'default',
  className = '',
}: BadgeProps) {
  const variantStyles = {
    default: 'bg-gray-700 text-gray-100',
    primary: 'bg-primary text-white',
    success: 'bg-green-700 text-white',
    warning: 'bg-yellow-700 text-white',
    danger: 'bg-red-700 text-white',
  }

  return (
    <span
      className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${variantStyles[variant]} ${className}`}
    >
      {children}
    </span>
  )
}
