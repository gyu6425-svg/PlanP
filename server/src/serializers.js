export function toFavorite(row) {
  return {
    id: row.id,
    itemId: row.item_id,
    itemType: row.item_type,
    categoryLabel: row.category_label,
    title: row.title,
    subtitle: row.subtitle ?? '',
    price: row.price ?? '',
    policy: row.policy ?? '',
    image: row.image ?? '',
    brand: row.brand ?? '',
    href: row.href ?? '',
    createdAt: row.created_at,
    payload: row.payload ? JSON.parse(row.payload) : null,
  };
}

export function toSurveyResult(row) {
  return {
    id: row.id,
    cityCode: row.city_code,
    answers: JSON.parse(row.answers),
    resultType: row.result_type ?? '',
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

export function toBookingClick(row) {
  return {
    id: row.id,
    userId: row.user_id ?? null,
    cityCode: row.city_code,
    itemType: row.item_type,
    itemId: row.item_id ?? '',
    itemTitle: row.item_title,
    platform: row.platform,
    href: row.href,
    sectionLabel: row.section_label ?? '',
    createdAt: row.created_at,
  };
}

export function toRecentView(row) {
  return {
    id: row.id,
    itemId: row.item_id,
    itemType: row.item_type,
    categoryLabel: row.category_label,
    title: row.title,
    subtitle: row.subtitle ?? '',
    price: row.price ?? '',
    policy: row.policy ?? '',
    image: row.image ?? '',
    brand: row.brand ?? '',
    href: row.href ?? '',
    createdAt: row.viewed_at,
    viewedAt: row.viewed_at,
    payload: row.payload ? JSON.parse(row.payload) : null,
  };
}
