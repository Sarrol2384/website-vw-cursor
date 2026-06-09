"use server";

import {
  deleteFaq,
  deletePricing,
  deleteService,
  upsertFaq,
  upsertPricing,
  upsertService,
} from "./admin";

export async function saveServiceAction(data: Record<string, unknown>) {
  return upsertService({
    id: data.id as string | undefined,
    title: data.title as string,
    description: (data.description as string) || null,
    icon: (data.icon as string) || null,
    sort_order: Number(data.sort_order ?? 0),
    published: Boolean(data.published),
  });
}

export async function savePricingAction(data: Record<string, unknown>) {
  return upsertPricing({
    id: data.id as string | undefined,
    name: data.name as string,
    price_from_zar: Number(data.price_from_zar ?? 0),
    price_note: (data.price_note as string) || null,
    features: (data.features as string[]) ?? [],
    recommended: Boolean(data.recommended),
    sort_order: Number(data.sort_order ?? 0),
  });
}

export async function saveFaqAction(data: Record<string, unknown>) {
  return upsertFaq({
    id: data.id as string | undefined,
    question: data.question as string,
    answer: data.answer as string,
    category: (data.category as string) || null,
    sort_order: Number(data.sort_order ?? 0),
  });
}

export { deleteService, deletePricing, deleteFaq };
