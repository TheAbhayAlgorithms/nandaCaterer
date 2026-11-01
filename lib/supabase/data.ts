import { createClient } from "./server";
import { menuCategories, MenuCategory, Dish } from "@/data/menu";
import { galleryImages, GalleryImage } from "@/data/gallery";

export const revalidate = 300; // 5-minute fallback revalidation

/**
 * Fetch all visible menu categories for the public site.
 * Falls back to hardcoded data/menu.ts if Supabase is not configured or fails.
 */
export async function getPublicMenuCategories(): Promise<MenuCategory[]> {
  try {
    const supabase = await createClient();
    if (!supabase) return menuCategories;

    const { data: dbCategories, error } = await supabase
      .from("menu_categories")
      .select("id, slug, name, sort_order, is_visible")
      .eq("is_visible", true)
      .order("sort_order", { ascending: true });

    if (error || !dbCategories || dbCategories.length === 0) {
      return menuCategories;
    }

    // Merge with hardcoded metadata (group, tagline, image, sections)
    return dbCategories.map((dbCat) => {
      const fallback = menuCategories.find((c) => c.slug === dbCat.slug);
      return {
        slug: dbCat.slug,
        title: dbCat.name,
        group: fallback?.group || "Specialty Menu",
        tagline: fallback?.tagline || `Authentic ${dbCat.name} prepared by master chefs.`,
        image: fallback?.image || "https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&w=1200&q=80",
        sections: fallback?.sections || [],
      };
    });
  } catch (err) {
    console.error("Error fetching public menu categories:", err);
    return menuCategories;
  }
}

/**
 * Fetch a single menu category and its visible dishes.
 * Falls back to hardcoded data/menu.ts if Supabase is not configured or fails.
 */
export async function getPublicMenuCategory(slug: string): Promise<MenuCategory | null> {
  const fallback = menuCategories.find((c) => c.slug === slug) || null;

  try {
    const supabase = await createClient();
    if (!supabase) return fallback;

    const { data: dbCategory, error: catError } = await supabase
      .from("menu_categories")
      .select("id, slug, name, sort_order, is_visible")
      .eq("slug", slug)
      .eq("is_visible", true)
      .single();

    if (catError || !dbCategory) {
      return fallback;
    }

    const { data: dbDishes, error: dishError } = await supabase
      .from("menu_items")
      .select("id, name, description, type, image_url, is_popular, sort_order, is_visible")
      .eq("category_id", dbCategory.id)
      .eq("is_visible", true)
      .order("sort_order", { ascending: true });

    if (dishError || !dbDishes || dbDishes.length === 0) {
      return fallback;
    }

    const mappedDishes: Dish[] = dbDishes.map((item) => ({
      name: item.name,
      description: item.description || undefined,
      type: (item.type as "veg" | "non-veg") || undefined,
      image: item.image_url || undefined,
      isPopular: Boolean(item.is_popular),
    }));

    // If fallback had multiple named sections, distribute or preserve structure
    const sections =
      fallback && fallback.sections.length > 0
        ? [
            {
              title: fallback.sections[0].title || "Chef Selections",
              dishes: mappedDishes,
            },
          ]
        : [
            {
              title: "All Offerings",
              dishes: mappedDishes,
            },
          ];

    return {
      slug: dbCategory.slug,
      title: dbCategory.name,
      group: fallback?.group || "Specialty Menu",
      tagline: fallback?.tagline || `Authentic ${dbCategory.name} prepared by master chefs.`,
      image: fallback?.image || "https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&w=1200&q=80",
      sections,
    };
  } catch (err) {
    console.error(`Error fetching category '${slug}':`, err);
    return fallback;
  }
}

/**
 * Fetch popular signature dishes.
 * Falls back to hardcoded popular dishes if Supabase is not configured.
 */
export async function getPublicPopularDishes(): Promise<Dish[]> {
  try {
    const supabase = await createClient();
    if (!supabase) {
      return menuCategories.flatMap((c) => c.sections.flatMap((s) => s.dishes)).filter((d) => d.isPopular);
    }

    const { data: dbDishes, error } = await supabase
      .from("menu_items")
      .select("id, name, description, type, image_url, is_popular")
      .eq("is_popular", true)
      .eq("is_visible", true)
      .order("sort_order", { ascending: true })
      .limit(12);

    if (error || !dbDishes || dbDishes.length === 0) {
      return menuCategories.flatMap((c) => c.sections.flatMap((s) => s.dishes)).filter((d) => d.isPopular);
    }

    return dbDishes.map((d) => ({
      name: d.name,
      description: d.description || undefined,
      type: (d.type as "veg" | "non-veg") || undefined,
      image: d.image_url || undefined,
      isPopular: true,
    }));
  } catch (err) {
    console.error("Error fetching popular dishes:", err);
    return menuCategories.flatMap((c) => c.sections.flatMap((s) => s.dishes)).filter((d) => d.isPopular);
  }
}

/**
 * Fetch visible gallery images.
 * Falls back to hardcoded data/gallery.ts if Supabase is not configured or fails.
 */
export async function getPublicGalleryImages(): Promise<GalleryImage[]> {
  try {
    const supabase = await createClient();
    if (!supabase) return galleryImages;

    const { data: dbImages, error } = await supabase
      .from("gallery_images")
      .select("id, image_url, alt_text, caption, category, sort_order, is_visible")
      .eq("is_visible", true)
      .order("sort_order", { ascending: true });

    if (error || !dbImages || dbImages.length === 0) {
      return galleryImages;
    }

    return dbImages.map((img) => {
      let src = img.image_url;
      if (
        src?.includes("1599488615731-7e5c2823ff28") ||
        img.caption?.toLowerCase().includes("mithai") ||
        img.caption?.toLowerCase().includes("halwa") ||
        img.caption?.toLowerCase().includes("sweet")
      ) {
        src = "/images/sweets.jpg";
      } else if (
        img.caption?.toLowerCase().includes("pasta") ||
        img.alt_text?.toLowerCase().includes("pasta")
      ) {
        src = "/images/live-pasta-station.jpg";
      } else if (
        img.caption?.toLowerCase().includes("mocktail") ||
        img.caption?.toLowerCase().includes("cocktail") ||
        img.caption?.toLowerCase().includes("welcome drink") ||
        src?.includes("1470225620780")
      ) {
        src = "/images/signature-mocktails.jpg";
      } else if (
        img.caption?.toLowerCase().includes("gujarati") ||
        img.caption?.toLowerCase().includes("kathiyawadi") ||
        img.alt_text?.toLowerCase().includes("gujarati") ||
        img.alt_text?.toLowerCase().includes("thali") ||
        src?.includes("1544077960")
      ) {
        src = "/images/gujarati-kathiyawadi.jpg";
      } else if (
        img.caption?.toLowerCase().includes("dessert buffet") ||
        img.caption?.toLowerCase().includes("pastry tier") ||
        img.alt_text?.toLowerCase().includes("dessert table") ||
        src?.includes("1578474846511")
      ) {
        src = "/images/dessert-buffet.jpg";
      }
      return {
        id: img.id,
        src: src || "/images/sweets.jpg",
        alt: img.alt_text || "Nanda Caterers Banquet Celebration",
        title: img.caption || "Celebration Feast",
        category: (img.category as GalleryImage["category"]) || "Weddings",
      };
    });
  } catch (err) {
    console.error("Error fetching public gallery images:", err);
    return galleryImages;
  }
}

