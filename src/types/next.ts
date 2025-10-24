// src/types/next.ts
import { NextRequest } from 'next/server'

// Type helper untuk handle both sync dan async params
export type RouteContext<T = Record<string, string>> = {
  params: T | Promise<T>
}

// Helper function untuk extract params
export async function getParams<T>(params: T | Promise<T>): Promise<T> {
  return params instanceof Promise ? await params : params
}
