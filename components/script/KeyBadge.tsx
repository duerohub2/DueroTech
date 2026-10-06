import { Badge } from '@/components/ui/Badge';
import { KEY_STATUSES } from '@/lib/constants';
import type { KeyStatus } from '@/types';

export function KeyBadge({ status }: { status: KeyStatus }) {
  const found = KEY_STATUSES.find((k) => k.value === status);
  if (!found) return null;

  return (
    <Badge color={found.color} textColor="#1F1F1F">
      {found.label}
    </Badge>
  );
}
