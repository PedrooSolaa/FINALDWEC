interface RatingProps {
  value: number
  max?: number
  className?: string
}

export default function Rating({ value, max = 10, className = '' }: RatingProps) {
  const percentage = (value / max) * 100

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <div className="w-12 h-12 rounded-full border-4 border-primary flex items-center justify-center relative">
        <div
          className="absolute inset-0 rounded-full border-4 border-primary"
          style={{
            borderRightColor: 'transparent',
            borderTopColor: 'transparent',
            borderBottomColor: 'transparent',
            transform: `rotate(${(percentage / 100) * 360}deg)`,
          }}
        />
        <span className="text-white font-bold text-sm relative z-10">{value.toFixed(1)}</span>
      </div>
      <span className="text-gray-400 text-sm">/{max}</span>
    </div>
  )
}
