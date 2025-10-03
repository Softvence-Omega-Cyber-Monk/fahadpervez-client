export interface StatCardTypes {
  title: string,
  value: number,
  status?:string,
  type?:string,
  currency?:string,
}

export interface StatCardProps {
    item:StatCardTypes
}