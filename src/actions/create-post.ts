"use server";

import type { Post } from "@prisma/client";
import { z } from "zod";
import { db } from "@/db";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { paths } from "@/paths";
import { revalidatePath } from "next/cache";

const CreatePostSchema = z.object({
  title: z.string().min(3),
  content: z.string().min(10),
});

interface CreatePostFormState {
  errors: {
    title?: string[];
    content?: string[];
    _form?: string[];
  };
}

export async function createPost(
  slug: string,
  formState: CreatePostFormState,
  formData: FormData,
): Promise<CreatePostFormState> {
  const result = CreatePostSchema.safeParse({
    title: formData.get("title"),
    content: formData.get("content"),
  });

  if (!result.success) {
    return {
      errors: z.flattenError(result.error).fieldErrors,
    };
  }

  const session = await auth();
  if (!session || !session.user || !session.user.id) {
    return {
      errors: {
        _form: ["You must be signed in to do this"],
      },
    };
  }

  const topic = await db.topic.findFirst({
    where: {
      slug,
    },
  });

  if (!topic) {
    return {
      errors: {
        _form: ["Can not find the topic"],
      },
    };
  }

  let post: Post;
  try {
    post = await db.post.create({
      data: {
        title: result.data.title,
        content: result.data.content,
        userId: session.user.id,
        topicId: topic.id,
      },
    });
  } catch (error: unknown) {
    if (error instanceof Error) {
      return {
        errors: {
          _form: [error.message],
        },
      };
    } else {
      return {
        errors: {
          _form: ["something went wrong"],
        },
      };
    }
  }

  // TODO: revalidate topic show page.
  revalidatePath(paths.topicShow(slug));
  redirect(paths.postShow(slug, post.id));

  return {
    errors: {},
  };
}
