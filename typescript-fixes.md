# TypeScript Fixes Summary

## Error 1: Property 'role' does not exist on type 'never'
**File:** src/app/api/content/[slug]/route.ts:45

**Fix:** Add type annotation to Supabase query
```typescript
const { data: profile } = await supabase
  .from('profiles')
  .select('role')
  .eq('id', user.id)
  .single<Pick<UserProfile, 'role'>>();
