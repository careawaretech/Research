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
          updated_at: string
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
          updated_at?: string
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
          updated_at?: string
          website_url?: string | null
        }
        Relationships: []
      }
      collaboration_opportunities: {
        Row: {
          button_text: string | null
          button_url: string | null
          created_at: string
          description: string
          display_order: number
          id: string
          program_name: string
          updated_at: string
        }
        Insert: {
          button_text?: string | null
          button_url?: string | null
          created_at?: string
          description: string
          display_order?: number
          id?: string
          program_name: string
          updated_at?: string
        }
        Update: {
          button_text?: string | null
          button_url?: string | null
          created_at?: string
          description?: string
          display_order?: number
          id?: string
          program_name?: string
          updated_at?: string
        }
        Relationships: []
      }
      content_categories: {
        Row: {
          created_at: string
          description: string | null
          id: string
          name: string
          parent_id: string | null
          slug: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: string
          name: string
          parent_id?: string | null
          slug: string
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: string
          name?: string
          parent_id?: string | null
          slug?: string
        }
        Relationships: [
          {
            foreignKeyName: "content_categories_parent_id_fkey"
            columns: ["parent_id"]
            isOneToOne: false
            referencedRelation: "content_categories"
            referencedColumns: ["id"]
          },
        ]
      }
      content_pages: {
        Row: {
          allow_comments: boolean | null
          allow_indexing: boolean | null
          author_id: string | null
          content: string | null
          created_at: string
          excerpt: string | null
          featured: boolean | null
          featured_image_url: string | null
          focus_keywords: string[] | null
          id: string
          meta_description: string | null
          meta_title: string | null
          page_order: number | null
          page_type: string
          parent_page_id: string | null
          publish_date: string | null
          show_in_navigation: boolean | null
          slug: string
          status: string | null
          template: string | null
          title: string
          updated_at: string
        }
        Insert: {
          allow_comments?: boolean | null
          allow_indexing?: boolean | null
          author_id?: string | null
          content?: string | null
          created_at?: string
          excerpt?: string | null
          featured?: boolean | null
          featured_image_url?: string | null
          focus_keywords?: string[] | null
          id?: string
          meta_description?: string | null
          meta_title?: string | null
          page_order?: number | null
          page_type: string
          parent_page_id?: string | null
          publish_date?: string | null
          show_in_navigation?: boolean | null
          slug: string
          status?: string | null
          template?: string | null
          title: string
          updated_at?: string
        }
        Update: {
          allow_comments?: boolean | null
          allow_indexing?: boolean | null
          author_id?: string | null
          content?: string | null
          created_at?: string
          excerpt?: string | null
          featured?: boolean | null
          featured_image_url?: string | null
          focus_keywords?: string[] | null
          id?: string
          meta_description?: string | null
          meta_title?: string | null
          page_order?: number | null
          page_type?: string
          parent_page_id?: string | null
          publish_date?: string | null
          show_in_navigation?: boolean | null
          slug?: string
          status?: string | null
          template?: string | null
          title?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "content_pages_parent_page_id_fkey"
            columns: ["parent_page_id"]
            isOneToOne: false
            referencedRelation: "content_pages"
            referencedColumns: ["id"]
          },
        ]
      }
      content_revisions: {
        Row: {
          content: string | null
          created_at: string
          id: string
          page_id: string
          revised_by: string | null
          revision_note: string | null
          title: string
        }
        Insert: {
          content?: string | null
          created_at?: string
          id?: string
          page_id: string
          revised_by?: string | null
          revision_note?: string | null
          title: string
        }
        Update: {
          content?: string | null
          created_at?: string
          id?: string
          page_id?: string
          revised_by?: string | null
          revision_note?: string | null
          title?: string
        }
        Relationships: [
          {
            foreignKeyName: "content_revisions_page_id_fkey"
            columns: ["page_id"]
            isOneToOne: false
            referencedRelation: "content_pages"
            referencedColumns: ["id"]
          },
        ]
      }
      content_tags: {
        Row: {
          created_at: string
          id: string
          name: string
          slug: string
        }
        Insert: {
          created_at?: string
          id?: string
          name: string
          slug: string
        }
        Update: {
          created_at?: string
          id?: string
          name?: string
          slug?: string
        }
        Relationships: []
      }
      customer_activity: {
        Row: {
          activity_type: string
          created_at: string
          customer_id: string | null
          description: string
          id: string
          metadata: Json | null
        }
        Insert: {
          activity_type: string
          created_at?: string
          customer_id?: string | null
          description: string
          id?: string
          metadata?: Json | null
        }
        Update: {
          activity_type?: string
          created_at?: string
          customer_id?: string | null
          description?: string
          id?: string
          metadata?: Json | null
        }
        Relationships: [
          {
            foreignKeyName: "customer_activity_customer_id_fkey"
            columns: ["customer_id"]
            isOneToOne: false
            referencedRelation: "customers"
            referencedColumns: ["id"]
          },
        ]
      }
      customers: {
        Row: {
          acquisition_channel: string | null
          address_line1: string | null
          address_line2: string | null
          avatar_url: string | null
          city: string | null
          country: string | null
          created_at: string
          customer_type: string | null
          email: string
          full_name: string | null
          id: string
          last_order_date: string | null
          lifetime_value: number | null
          phone: string | null
          state: string | null
          total_orders: number | null
          updated_at: string
          user_id: string | null
          zip_code: string | null
        }
        Insert: {
          acquisition_channel?: string | null
          address_line1?: string | null
          address_line2?: string | null
          avatar_url?: string | null
          city?: string | null
          country?: string | null
          created_at?: string
          customer_type?: string | null
          email: string
          full_name?: string | null
          id?: string
          last_order_date?: string | null
          lifetime_value?: number | null
          phone?: string | null
          state?: string | null
          total_orders?: number | null
          updated_at?: string
          user_id?: string | null
          zip_code?: string | null
        }
        Update: {
          acquisition_channel?: string | null
          address_line1?: string | null
          address_line2?: string | null
          avatar_url?: string | null
          city?: string | null
          country?: string | null
          created_at?: string
          customer_type?: string | null
          email?: string
          full_name?: string | null
          id?: string
          last_order_date?: string | null
          lifetime_value?: number | null
          phone?: string | null
          state?: string | null
          total_orders?: number | null
          updated_at?: string
          user_id?: string | null
          zip_code?: string | null
        }
        Relationships: []
      }
      grant_progress_steps: {
        Row: {
          completed: boolean | null
          created_at: string
          description: string | null
          display_order: number
          id: string
          logo_path: string | null
          logo_url: string | null
          status: string
          step_title: string
          updated_at: string
        }
        Insert: {
          completed?: boolean | null
          created_at?: string
          description?: string | null
          display_order?: number
          id?: string
          logo_path?: string | null
          logo_url?: string | null
          status?: string
          step_title: string
          updated_at?: string
        }
        Update: {
          completed?: boolean | null
          created_at?: string
          description?: string | null
          display_order?: number
          id?: string
          logo_path?: string | null
          logo_url?: string | null
          status?: string
          step_title?: string
          updated_at?: string
        }
        Relationships: []
      }
      how_it_works_cards: {
        Row: {
          created_at: string
          description: string | null
          display_order: number
          icon_url: string | null
          id: string
          is_active: boolean
          title: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          display_order?: number
          icon_url?: string | null
          id?: string
          is_active?: boolean
          title: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          description?: string | null
          display_order?: number
          icon_url?: string | null
          id?: string
          is_active?: boolean
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      media_library: {
        Row: {
          alt_text: string | null
          category: string
          created_at: string | null
          file_name: string
          file_path: string
          file_size: number | null
          file_type: string
          file_url: string
          id: string
          page_slug: string | null
          updated_at: string | null
        }
        Insert: {
          alt_text?: string | null
          category?: string
          created_at?: string | null
          file_name: string
          file_path: string
          file_size?: number | null
          file_type: string
          file_url: string
          id?: string
          page_slug?: string | null
          updated_at?: string | null
        }
        Update: {
          alt_text?: string | null
          category?: string
          created_at?: string | null
          file_name?: string
          file_path?: string
          file_size?: number | null
          file_type?: string
          file_url?: string
          id?: string
          page_slug?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      order_items: {
        Row: {
          created_at: string
          id: string
          order_id: string
          price: number
          product_id: string
          quantity: number
          total: number
        }
        Insert: {
          created_at?: string
          id?: string
          order_id: string
          price: number
          product_id: string
          quantity: number
          total: number
        }
        Update: {
          created_at?: string
          id?: string
          order_id?: string
          price?: number
          product_id?: string
          quantity?: number
          total?: number
        }
        Relationships: [
          {
            foreignKeyName: "order_items_order_id_fkey"
            columns: ["order_id"]
            isOneToOne: false
            referencedRelation: "orders"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "order_items_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
        ]
      }
      orders: {
        Row: {
          created_at: string
          customer_id: string
          discount: number | null
          id: string
          notes: string | null
          order_number: string
          shipping: number | null
          shipping_address_line1: string | null
          shipping_address_line2: string | null
          shipping_city: string | null
          shipping_country: string | null
          shipping_state: string | null
          shipping_zip: string | null
          status: string | null
          subtotal: number
          tax: number | null
          total: number
          tracking_number: string | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          customer_id: string
          discount?: number | null
          id?: string
          notes?: string | null
          order_number: string
          shipping?: number | null
          shipping_address_line1?: string | null
          shipping_address_line2?: string | null
          shipping_city?: string | null
          shipping_country?: string | null
          shipping_state?: string | null
          shipping_zip?: string | null
          status?: string | null
          subtotal: number
          tax?: number | null
          total: number
          tracking_number?: string | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          customer_id?: string
          discount?: number | null
          id?: string
          notes?: string | null
          order_number?: string
          shipping?: number | null
          shipping_address_line1?: string | null
          shipping_address_line2?: string | null
          shipping_city?: string | null
          shipping_country?: string | null
          shipping_state?: string | null
          shipping_zip?: string | null
          status?: string | null
          subtotal?: number
          tax?: number | null
          total?: number
          tracking_number?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "orders_customer_id_fkey"
            columns: ["customer_id"]
            isOneToOne: false
            referencedRelation: "customers"
            referencedColumns: ["id"]
          },
        ]
      }
      page_categories: {
        Row: {
          category_id: string
          page_id: string
        }
        Insert: {
          category_id: string
          page_id: string
        }
        Update: {
          category_id?: string
          page_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "page_categories_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "content_categories"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "page_categories_page_id_fkey"
            columns: ["page_id"]
            isOneToOne: false
            referencedRelation: "content_pages"
            referencedColumns: ["id"]
          },
        ]
      }
      page_sections: {
        Row: {
          button_text: string | null
          button_url: string | null
          content: string | null
          created_at: string
          id: string
          image_url: string | null
          metadata: Json | null
          page_id: string
          section_order: number
          section_type: string
          subtitle: string | null
          title: string | null
          updated_at: string
        }
        Insert: {
          button_text?: string | null
          button_url?: string | null
          content?: string | null
          created_at?: string
          id?: string
          image_url?: string | null
          metadata?: Json | null
          page_id: string
          section_order?: number
          section_type: string
          subtitle?: string | null
          title?: string | null
          updated_at?: string
        }
        Update: {
          button_text?: string | null
          button_url?: string | null
          content?: string | null
          created_at?: string
          id?: string
          image_url?: string | null
          metadata?: Json | null
          page_id?: string
          section_order?: number
          section_type?: string
          subtitle?: string | null
          title?: string | null
          updated_at?: string
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
      page_tags: {
        Row: {
          page_id: string
          tag_id: string
        }
        Insert: {
          page_id: string
          tag_id: string
        }
        Update: {
          page_id?: string
          tag_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "page_tags_page_id_fkey"
            columns: ["page_id"]
            isOneToOne: false
            referencedRelation: "content_pages"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "page_tags_tag_id_fkey"
            columns: ["tag_id"]
            isOneToOne: false
            referencedRelation: "content_tags"
            referencedColumns: ["id"]
          },
        ]
      }
      products: {
        Row: {
          category: string
          compare_at_price: number | null
          cost: number | null
          created_at: string
          description: string | null
          featured: boolean | null
          id: string
          image_url: string | null
          images: string[] | null
          inventory_quantity: number | null
          is_active: boolean | null
          name: string
          price: number
          sku: string | null
          specifications: Json | null
          tags: string[] | null
          updated_at: string
        }
        Insert: {
          category: string
          compare_at_price?: number | null
          cost?: number | null
          created_at?: string
          description?: string | null
          featured?: boolean | null
          id?: string
          image_url?: string | null
          images?: string[] | null
          inventory_quantity?: number | null
          is_active?: boolean | null
          name: string
          price: number
          sku?: string | null
          specifications?: Json | null
          tags?: string[] | null
          updated_at?: string
        }
        Update: {
          category?: string
          compare_at_price?: number | null
          cost?: number | null
          created_at?: string
          description?: string | null
          featured?: boolean | null
          id?: string
          image_url?: string | null
          images?: string[] | null
          inventory_quantity?: number | null
          is_active?: boolean | null
          name?: string
          price?: number
          sku?: string | null
          specifications?: Json | null
          tags?: string[] | null
          updated_at?: string
        }
        Relationships: []
      }
      publications: {
        Row: {
          abstract: string | null
          authors: string[]
          badges: string[] | null
          citation_count: number | null
          citation_text: string | null
          created_at: string | null
          doi: string | null
          featured: boolean | null
          id: string
          journal: string
          pdf_path: string | null
          pdf_url: string | null
          project_link: string | null
          tags: string[] | null
          title: string
          updated_at: string | null
          year: number
        }
        Insert: {
          abstract?: string | null
          authors: string[]
          badges?: string[] | null
          citation_count?: number | null
          citation_text?: string | null
          created_at?: string | null
          doi?: string | null
          featured?: boolean | null
          id?: string
          journal: string
          pdf_path?: string | null
          pdf_url?: string | null
          project_link?: string | null
          tags?: string[] | null
          title: string
          updated_at?: string | null
          year: number
        }
        Update: {
          abstract?: string | null
          authors?: string[]
          badges?: string[] | null
          citation_count?: number | null
          citation_text?: string | null
          created_at?: string | null
          doi?: string | null
          featured?: boolean | null
          id?: string
          journal?: string
          pdf_path?: string | null
          pdf_url?: string | null
          project_link?: string | null
          tags?: string[] | null
          title?: string
          updated_at?: string | null
          year?: number
        }
        Relationships: []
      }
      research_metrics: {
        Row: {
          auto_sync_enabled: boolean | null
          citation_count: number
          created_at: string
          h_index: number | null
          id: string
          total_publications: number
          updated_at: string
        }
        Insert: {
          auto_sync_enabled?: boolean | null
          citation_count?: number
          created_at?: string
          h_index?: number | null
          id?: string
          total_publications?: number
          updated_at?: string
        }
        Update: {
          auto_sync_enabled?: boolean | null
          citation_count?: number
          created_at?: string
          h_index?: number | null
          id?: string
          total_publications?: number
          updated_at?: string
        }
        Relationships: []
      }
      section_content: {
        Row: {
          created_at: string
          id: string
          section_key: string
          subtitle: string | null
          title: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          id?: string
          section_key: string
          subtitle?: string | null
          title: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          id?: string
          section_key?: string
          subtitle?: string | null
          title?: string
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
          publication_count: number | null
          title: string
          updated_at: string
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
          publication_count?: number | null
          title: string
          updated_at?: string
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
          publication_count?: number | null
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          created_at: string
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string
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
      generate_order_number: { Args: never; Returns: string }
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
      is_admin: { Args: { _user_id: string }; Returns: boolean }
      track_customer_activity: {
        Args: {
          _activity_type: string
          _customer_id: string
          _description: string
          _metadata?: Json
        }
        Returns: string
      }
    }
    Enums: {
      app_role: "admin" | "customer" | "editor" | "viewer"
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
      app_role: ["admin", "customer", "editor", "viewer"],
    },
  },
} as const
