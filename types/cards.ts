export interface WidgetProps {
    title: string
    value: string | number
    percentageChange: number
    changeType: 'increase' | 'decrease'
    iconName: string
    iconColor?: string
    iconBgColor?: string
}

export type UiColor =
    | 'neutral'
    | 'primary'
    | 'secondary'
    | 'success'
    | 'info'
    | 'warning'
    | 'error'
    | 'violet'
    | 'orange'
    | 'purple'
export interface ActivityCardProps {
    title: string
    description: string
    timeAgo: string
    typeColor: UiColor
    loading?: boolean
}

export type PriorityLevel = 'High' | 'Medium' | 'Low'
export interface QueueCardProps {
    name: string
    priority: PriorityLevel
    date: string
    icon: string
}

export interface StatCardProps {
    icon: string
    iconColor: string
    label: string
    value: string
}

export type SystemPriority = 'high' | 'medium' | 'low'
export type SystemStatus = 'active' | 'in progress' | 'planning' | 'completed'
export interface SystemCardProps {
  system: string
  entity: string
  budget: string
  priority: SystemPriority
  status: SystemStatus
  deadline: string
  icon?: string
  forceShow?: boolean
  hideToggle?: boolean
}