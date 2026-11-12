import { paths } from "@/paths";
import { db } from "@/db";
import { notFound } from "next/navigation";
import { Chip } from "@heroui/react";
import Link from "next/link";

export default async function TopicList() {
  const topics = await db.topic.findMany();

  if (!topics) {
    notFound();
  }

  const renderedTopics = topics.map((topic) => {
    return (
      <div key={topic.slug}>
        <Link href={paths.topicShow(topic.slug)}>
          <Chip color="warning" variant="primary">
            {topic.slug}
          </Chip>
        </Link>
      </div>
    );
  });

  return <div className="flex flex-row gap-2 flex-wrap">{renderedTopics}</div>;
}
