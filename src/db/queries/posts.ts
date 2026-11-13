import type { Post } from "@prisma/client";
import { db } from "@/db";

export type PostWithData = Post & {
  topic: { slug: string };
  user: { name: string | null };
  _count: { comments: number };
};

// Alternative type def
// export type PostWithData1 = Awaited<
//   ReturnType<typeof fetchPostsBySlug>
// >[number];

export async function fetchPostsBySlug(slug: string): Promise<PostWithData[]> {
  return await db.post.findMany({
    where: {
      topic: { slug },
    },
    include: {
      topic: { select: { slug: true } },
      user: { select: { name: true } },
      _count: { select: { comments: true } },
    },
  });
}

export function fetchTopPosts() {}
