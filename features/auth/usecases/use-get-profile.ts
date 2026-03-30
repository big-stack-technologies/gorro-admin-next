import type { AuthProfile } from "@/features/auth/types"
import { useQuery, UseQueryResult } from "@tanstack/react-query"
import { getProfileAction } from "@/features/auth/actions"
import { QUERY_KEYS } from "@/lib/query-keys"

export function useGetProfile(): UseQueryResult<AuthProfile, Error> {
  return useQuery({
    queryKey: QUERY_KEYS.session,
    queryFn: getProfileAction,
  })
}
