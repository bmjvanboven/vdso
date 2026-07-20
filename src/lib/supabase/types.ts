export type BadgeStatus = 'wordt_verwacht' | 'net_binnen' | 'beschikbaar' | 'bijna_weg' | 'gereserveerd' | 'verkocht'

export interface CarSpecs {
  kleur?: string
  interieur?: string
  brandstof?: string
  transmissie?: string
  carrosserie?: string
  btw_verrekenbaar?: boolean
  datum?: string
  kenmerken?: Record<string, string[]>   // { "Exterieur": [...], "Interieur": [...] }
}

export interface Car {
  id: string
  merk: string
  model: string
  jaar: number
  pk: number
  kmstand: number
  prijs: number
  badge_status: BadgeStatus
  fotos: string[]
  omschrijving: string | null
  specs: CarSpecs | null
  is_visible: boolean
  sort_order: number
  created_at: string
}

export interface Settings {
  id: number
  phone: string
  adres: string
  openingstijden: string
  preview_mode: boolean
}

export interface Database {
  public: {
    Tables: {
      cars: {
        Row: Car
        Insert: Omit<Car, 'id' | 'created_at'>
        Update: Partial<Omit<Car, 'id' | 'created_at'>>
        Relationships: []
      }
      settings: {
        Row: Settings
        Insert: Omit<Settings, 'id'>
        Update: Partial<Omit<Settings, 'id'>>
        Relationships: []
      }
    }
    Views: Record<string, never>
    Functions: Record<string, never>
    Enums: Record<string, never>
    CompositeTypes: Record<string, never>
  }
}

export const BADGE_LABELS: Record<BadgeStatus, string> = {
  wordt_verwacht: 'Wordt verwacht',
  net_binnen: 'Net binnen',
  beschikbaar: 'Beschikbaar',
  bijna_weg: 'Bijna weg',
  gereserveerd: 'Gereserveerd',
  verkocht: 'Verkocht',
}
