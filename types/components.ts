export type ProgressSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl'
export type ProgressColor = 'primary' | 'secondary' | 'neutral' | 'error' | 'warning' | 'success'

export interface BaseProgressProps {
  label: string
  value: number
  size?: ProgressSize
  color?: ProgressColor
  justifyStart?: boolean
  justifyEnd?: boolean
  justifyBetween?: boolean
}
