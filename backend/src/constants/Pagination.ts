import { decodeBase64, encodeBase64 } from "@src/util/base64";

type PaginationType = {
  take: number;
  cursor?: { id: string };
  skip?: 1;
};

export function cursorPagination(
  size: number,
  cursor?: string
): PaginationType {
  return {
    ...(cursor && { cursor: { id: decodeBase64(cursor) }, skip: 1 }),
    take: size,
  };
}

export function getNextPage<T extends { id: string }>(
  items: T[]
): string | undefined {
  if (items.length) {
    const last = items.at(-1) as T;
    return encodeBase64(last.id);
  }
}
