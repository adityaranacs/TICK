import { defineAbility } from "@casl/ability"
import type { AppAbility } from "@/lib/casl/types"

export function useAbility(): AppAbility {
  return defineAbility((can) => {
    can("read", "Dashboard")
    can("manage", "User")
    // Add other permissions here
  }) as AppAbility
}
