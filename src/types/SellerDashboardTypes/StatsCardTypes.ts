export interface StatType {
  type:"up" | "down" | "warning" | "success" | "error" | "info" | "check" | "box" | "plus" | "alert" | string,
}

export interface StatCardTypes {
  title: string
  value: number
  status?: string
  type?: StatType["type"]
  currency?: string
  icon?: string
  iconColor?: string
  buttonText?: string
  buttonAction?: () => void
}

export interface StatCardProps {
  item: StatCardTypes
}
