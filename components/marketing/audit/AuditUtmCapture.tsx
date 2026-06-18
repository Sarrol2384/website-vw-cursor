"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import {
  captureUtmFromSearchParams,
  storeUtmParams,
} from "@/lib/audit/session";

export function AuditUtmCapture() {
  const searchParams = useSearchParams();

  useEffect(() => {
    const params = captureUtmFromSearchParams(searchParams);
    storeUtmParams(params);
  }, [searchParams]);

  return null;
}
