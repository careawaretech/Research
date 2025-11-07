export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.5"
  }
  public: {
    Tables: {
      academic_partners: {
        Row: {
          created_at: string
          description: string | null
          display_order: number
          id: string
          institution_name: string
          logo_path: string | null
          logo_url: string | null
          website_url: string | null
        }
        Insert: {
          created_at?: string
          description?: string | null
          display_order?: number
          id?: string
          institution_name: string
          logo_path?: string | null
          logo_url?: string | null
          website_url?: string | null
        }
        Update: {
          created_at?: string
          description?: string | null
          display_order?: number
          id?: string
          institution_name?: string
          logo_path?: string | null
          logo_url?: string | null
          website_url?: string | null
        }
        Relationships: []
      }
      collaboration_opportunities: {
        Row: {
          created_at: string
          description: string
          display_order: number
          id: string
          opportunity_type: string
          requirements: string | null
          title: string
        }
        Insert: {
          created_at?: string
          description: string
          display_order?: number
          id?: string
          opportunity_type: string
          requirements?: string | null
          title: string
        }
        Update: {
          created_at?: string
          description?: string
          display_order?: number
          id?: string
          opportunity_type?: string
          requirements?: string | null
          title?: string
        }
        Relationships: []
      }
      content_pages: {
        Row: {
          content: Json | null
          created_at: string
          id: string
          meta_description: string | null
          page_slug: string
          title: string
          updated_at: string
        }
        Insert: {
          content?: Json | null
          created_at?: string
          id?: string
          meta_description?: string | null
          page_slug: string
          title: string
          updated_at?: string
        }
        Update: {
          content?: Json | null
          created_at?: string
          id?: string
          meta_description?: string | null
          page_slug?: string
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      diverse_technology_applications: {
        Row: {
          background_color: string | null
          border_color: string | null
          bullet_points: Json | null
          created_at: string
          description: string | null
          display_order: number
          icon_type: string | null
          icon_url: string | null
          id: string
          lucide_icon_name: string | null
          subtitle: string | null
          text_color: string | null
          title: string
          visible: boolean | null
        }
        Insert: {
          background_color?: string | null
          border_color?: string | null
          bullet_points?: Json | null
          created_at?: string
          description?: string | null
          display_order?: number
          icon_type?: string | null
          icon_url?: string | null
          id?: string
          lucide_icon_name?: string | null
          subtitle?: string | null
          text_color?: string | null
          title: string
          visible?: boolean | null
        }
        Update: {
          background_color?: string | null
          border_color?: string | null
          bullet_points?: Json | null
          created_at?: string
          description?: string | null
          display_order?: number
          icon_type?: string | null
          icon_url?: string | null
          id?: string
          lucide_icon_name?: string | null
          subtitle?: string | null
          text_color?: string | null
          title?: string
          visible?: boolean | null
        }
        Relationships: []
      }
      grant_progress_steps: {
        Row: {
          completion_date: string | null
          created_at: string
          description: string
          display_order: number
          id: string
          logo_path: string | null
          logo_url: string | null
          status: string
          title: string
        }
        Insert: {
          completion_date?: string | null
          created_at?: string
          description: string
          display_order?: number
          id?: string
          logo_path?: string | null
          logo_url?: string | null
          status: string
          title: string
        }
        Update: {
          completion_date?: string | null
          created_at?: string
          description?: string
          display_order?: number
          id?: string
          logo_path?: string | null
          logo_url?: string | null
          status?: string
          title?: string
        }
        Relationships: []
      }
      how_it_works_cards: {
        Row: {
          created_at: string
          description: string
          display_order: number
          icon_path: string | null
          icon_url: string | null
          id: string
          step_number: number
          title: string
        }
        Insert: {
          created_at?: string
          description: string
          display_order?: number
          icon_path?: string | null
          icon_url?: string | null
          id?: string
          step_number: number
          title: string
        }
        Update: {
          created_at?: string
          description?: string
          display_order?: number
          icon_path?: string | null
          icon_url?: string | null
          id?: string
          step_number?: number
          title?: string
        }
        Relationships: []
      }
      media_library: {
        Row: {
          alt_text: string | null
          category: string
          created_at: string
          display_order: number | null
          file_name: string
          file_path: string
          file_size: number
          file_type: string
          file_url: string
          folder_thumbnail_url: string | null
          id: string
          page_slug: string | null
        }
        Insert: {
          alt_text?: string | null
          category: string
          created_at?: string
          display_order?: number | null
          file_name: string
          file_path: string
          file_size: number
          file_type: string
          file_url: string
          folder_thumbnail_url?: string | null
          id?: string
          page_slug?: string | null
        }
        Update: {
          alt_text?: string | null
          category?: string
          created_at?: string
          display_order?: number | null
          file_name?: string
          file_path?: string
          file_size?: number
          file_type?: string
          file_url?: string
          folder_thumbnail_url?: string | null
          id?: string
          page_slug?: string | null
        }
        Relationships: []
      }
      page_sections: {
        Row: {
          content: Json
          created_at: string
          display_order: number
          id: string
          page_id: string | null
          section_type: string
        }
        Insert: {
          content?: Json
          created_at?: string
          display_order?: number
          id?: string
          page_id?: string | null
          section_type: string
        }
        Update: {
          content?: Json
          created_at?: string
          display_order?: number
          id?: string
          page_id?: string | null
          section_type?: string
        }
        Relationships: [
          {
            foreignKeyName: "page_sections_page_id_fkey"
            columns: ["page_id"]
            isOneToOne: false
            referencedRelation: "content_pages"
            referencedColumns: ["id"]
          },
        ]
      }
      publications: {
        Row: {
          abstract: string | null
          authors: string[] | null
          created_at: string
          doi: string | null
          id: string
          journal: string | null
          publication_date: string | null
          tags: string[] | null
          title: string
          url: string | null
        }
        Insert: {
          abstract?: string | null
          authors?: string[] | null
          created_at?: string
          doi?: string | null
          id?: string
          journal?: string | null
          publication_date?: string | null
          tags?: string[] | null
          title: string
          url?: string | null
        }
        Update: {
          abstract?: string | null
          authors?: string[] | null
          created_at?: string
          doi?: string | null
          id?: string
          journal?: string | null
          publication_date?: string | null
          tags?: string[] | null
          title?: string
          url?: string | null
        }
        Relationships: []
      }
      research_hub_categories: {
        Row: {
          bg_gradient: string
          border_color: string | null
          color: string
          created_at: string
          description: string
          display_order: number
          icon_type: string | null
          icon_url: string | null
          id: string
          lucide_icon_name: string | null
          paper_count: number
          text_color: string | null
          title: string
        }
        Insert: {
          bg_gradient: string
          border_color?: string | null
          color?: string
          created_at?: string
          description: string
          display_order?: number
          icon_type?: string | null
          icon_url?: string | null
          id?: string
          lucide_icon_name?: string | null
          paper_count?: number
          text_color?: string | null
          title: string
        }
        Update: {
          bg_gradient?: string
          border_color?: string | null
          color?: string
          created_at?: string
          description?: string
          display_order?: number
          icon_type?: string | null
          icon_url?: string | null
          id?: string
          lucide_icon_name?: string | null
          paper_count?: number
          text_color?: string | null
          title?: string
        }
        Relationships: []
      }
      research_hub_collections: {
        Row: {
          background_image: string | null
          created_at: string
          description: string
          display_order: number
          features: Json | null
          id: string
          paper_count: number
          title: string
        }
        Insert: {
          background_image?: string | null
          created_at?: string
          description: string
          display_order?: number
          features?: Json | null
          id?: string
          paper_count?: number
          title: string
        }
        Update: {
          background_image?: string | null
          created_at?: string
          description?: string
          display_order?: number
          features?: Json | null
          id?: string
          paper_count?: number
          title?: string
        }
        Relationships: []
      }
      research_hub_featured_papers: {
        Row: {
          author: string
          badges: Json | null
          category: string | null
          comments: string
          created_at: string
          description: string
          display_order: number
          id: string
          image_url: string | null
          pdf_url: string | null
          show_in_hero: boolean | null
          title: string
          views: string
          year: string
        }
        Insert: {
          author: string
          badges?: Json | null
          category?: string | null
          comments?: string
          created_at?: string
          description: string
          display_order?: number
          id?: string
          image_url?: string | null
          pdf_url?: string | null
          show_in_hero?: boolean | null
          title: string
          views?: string
          year: string
        }
        Update: {
          author?: string
          badges?: Json | null
          category?: string | null
          comments?: string
          created_at?: string
          description?: string
          display_order?: number
          id?: string
          image_url?: string | null
          pdf_url?: string | null
          show_in_hero?: boolean | null
          title?: string
          views?: string
          year?: string
        }
        Relationships: []
      }
      research_hub_latest_papers: {
        Row: {
          author: string
          badges: Json | null
          category: string | null
          comments: string
          created_at: string
          description: string
          display_order: number
          id: string
          image_url: string | null
          pdf_url: string | null
          show_in_hero: boolean | null
          title: string
          views: string
          year: string
        }
        Insert: {
          author: string
          badges?: Json | null
          category?: string | null
          comments?: string
          created_at?: string
          description: string
          display_order?: number
          id?: string
          image_url?: string | null
          pdf_url?: string | null
          show_in_hero?: boolean | null
          title: string
          views?: string
          year: string
        }
        Update: {
          author?: string
          badges?: Json | null
          category?: string | null
          comments?: string
          created_at?: string
          description?: string
          display_order?: number
          id?: string
          image_url?: string | null
          pdf_url?: string | null
          show_in_hero?: boolean | null
          title?: string
          views?: string
          year?: string
        }
        Relationships: []
      }
      research_hub_trending_topics: {
        Row: {
          border_color: string
          color: string
          created_at: string
          display_order: number
          growth: string
          icon_type: string | null
          icon_url: string | null
          id: string
          lucide_icon_name: string | null
          paper_count: number
          rank: number
          text_color: string
          title: string
        }
        Insert: {
          border_color?: string
          color?: string
          created_at?: string
          display_order?: number
          growth: string
          icon_type?: string | null
          icon_url?: string | null
          id?: string
          lucide_icon_name?: string | null
          paper_count?: number
          rank: number
          text_color?: string
          title: string
        }
        Update: {
          border_color?: string
          color?: string
          created_at?: string
          display_order?: number
          growth?: string
          icon_type?: string | null
          icon_url?: string | null
          id?: string
          lucide_icon_name?: string | null
          paper_count?: number
          rank?: number
          text_color?: string
          title?: string
        }
        Relationships: []
      }
      research_metrics: {
        Row: {
          created_at: string
          description: string | null
          display_order: number
          id: string
          metric_name: string
          metric_value: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          display_order?: number
          id?: string
          metric_name: string
          metric_value: string
        }
        Update: {
          created_at?: string
          description?: string | null
          display_order?: number
          id?: string
          metric_name?: string
          metric_value?: string
        }
        Relationships: []
      }
      section_content: {
        Row: {
          content: Json
          created_at: string
          id: string
          section_key: string
          updated_at: string
        }
        Insert: {
          content?: Json
          created_at?: string
          id?: string
          section_key: string
          updated_at?: string
        }
        Update: {
          content?: Json
          created_at?: string
          id?: string
          section_key?: string
          updated_at?: string
        }
        Relationships: []
      }
      team_members: {
        Row: {
          affiliation: string | null
          biography: string | null
          created_at: string
          display_order: number
          id: string
          name: string
          photo_path: string | null
          photo_url: string | null
          publication_count: number
          title: string
        }
        Insert: {
          affiliation?: string | null
          biography?: string | null
          created_at?: string
          display_order?: number
          id?: string
          name: string
          photo_path?: string | null
          photo_url?: string | null
          publication_count?: number
          title: string
        }
        Update: {
          affiliation?: string | null
          biography?: string | null
          created_at?: string
          display_order?: number
          id?: string
          name?: string
          photo_path?: string | null
          photo_url?: string | null
          publication_count?: number
          title?: string
        }
        Relationships: []
      }
      universal_security_compliance: {
        Row: {
          background_color: string | null
          border_color: string | null
          bullet_points: Json | null
          created_at: string
          description: string | null
          display_order: number
          icon_type: string | null
          icon_url: string | null
          id: string
          lucide_icon_name: string | null
          subtitle: string | null
          text_color: string | null
          title: string
          visible: boolean | null
        }
        Insert: {
          background_color?: string | null
          border_color?: string | null
          bullet_points?: Json | null
          created_at?: string
          description?: string | null
          display_order?: number
          icon_type?: string | null
          icon_url?: string | null
          id?: string
          lucide_icon_name?: string | null
          subtitle?: string | null
          text_color?: string | null
          title: string
          visible?: boolean | null
        }
        Update: {
          background_color?: string | null
          border_color?: string | null
          bullet_points?: Json | null
          created_at?: string
          description?: string | null
          display_order?: number
          icon_type?: string | null
          icon_url?: string | null
          id?: string
          lucide_icon_name?: string | null
          subtitle?: string | null
          text_color?: string | null
          title?: string
          visible?: boolean | null
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          created_at: string | null
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
    }
    Enums: {
      app_role: "admin" | "moderator" | "user"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["admin", "moderator", "user"],
    },
  },
} as const
