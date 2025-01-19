export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      epics: {
        Row: {
          createdAt: string
          description: string | null
          id: number
          ownerId: number | null
          projectId: number
          title: string
          updatedAt: string | null
        }
        Insert: {
          createdAt?: string
          description?: string | null
          id?: number
          ownerId?: number | null
          projectId: number
          title: string
          updatedAt?: string | null
        }
        Update: {
          createdAt?: string
          description?: string | null
          id?: number
          ownerId?: number | null
          projectId?: number
          title?: string
          updatedAt?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "epics_projectId_fkey"
            columns: ["projectId"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
        ]
      }
      projects: {
        Row: {
          createdAt: string
          description: string
          groupId: number
          id: number
          ownerId: string
          title: string
        }
        Insert: {
          createdAt?: string
          description?: string
          groupId: number
          id?: number
          ownerId: string
          title: string
        }
        Update: {
          createdAt?: string
          description?: string
          groupId?: number
          id?: number
          ownerId?: string
          title?: string
        }
        Relationships: []
      }
      stories: {
        Row: {
          createdAt: string
          description: string | null
          epicId: number
          id: number
          ownerId: number
          title: string
          updatedAt: string | null
        }
        Insert: {
          createdAt?: string
          description?: string | null
          epicId: number
          id?: number
          ownerId: number
          title: string
          updatedAt?: string | null
        }
        Update: {
          createdAt?: string
          description?: string | null
          epicId?: number
          id?: number
          ownerId?: number
          title?: string
          updatedAt?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "stories_epicId_fkey"
            columns: ["epicId"]
            isOneToOne: false
            referencedRelation: "epics"
            referencedColumns: ["id"]
          },
        ]
      }
      tasks: {
        Row: {
          assigneeId: number | null
          createdAt: string
          description: string | null
          epicId: number | null
          estimation: number | null
          id: number
          ownerId: number
          projectId: number | null
          status: string | null
          storyId: number | null
          title: string
          updatedAt: string | null
        }
        Insert: {
          assigneeId?: number | null
          createdAt?: string
          description?: string | null
          epicId?: number | null
          estimation?: number | null
          id?: number
          ownerId: number
          projectId?: number | null
          status?: string | null
          storyId?: number | null
          title: string
          updatedAt?: string | null
        }
        Update: {
          assigneeId?: number | null
          createdAt?: string
          description?: string | null
          epicId?: number | null
          estimation?: number | null
          id?: number
          ownerId?: number
          projectId?: number | null
          status?: string | null
          storyId?: number | null
          title?: string
          updatedAt?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "tasks_epicId_fkey"
            columns: ["epicId"]
            isOneToOne: false
            referencedRelation: "epics"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "tasks_projectId_fkey"
            columns: ["projectId"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "tasks_storyId_fkey"
            columns: ["storyId"]
            isOneToOne: false
            referencedRelation: "stories"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
