import Link from "next/link";
import { db } from "~/server/db";

const mockUrls = [
  "https://utfs.io/f/6cb30949-5960-4c7e-bd6a-c784426ae74c-55thdc.jpg",
  "https://utfs.io/f/3b8cf2c5-86d2-4928-9802-4e563cb31b64-6zu18p.jpg",
  "https://utfs.io/f/f3996c6e-39e3-4cd4-919f-098fbe422c71-8zi6l8.jpg",
  "https://utfs.io/f/3dca3c93-8a5c-4267-bafa-3ae5f4b24d86-9i8y4i.jpg",
  "https://utfs.io/f/723eaffc-77a2-45c4-a4af-c664f1acf0c0-ha3syo.jpg",
];

const mockImages = mockUrls.map((url, index) => ({
  id: index + 1,
  url,
}));

export default async function HomePage() {
  const posts = await db.query.posts.findMany();
  console.log(posts);
  return (
    <main className="">
      <div className="flex flex-wrap gap-4">
        {posts.map((post) => (
          <div key={post.id}>{post.name}</div>
        ))}
        {[...mockImages, ...mockImages, ...mockImages].map((image, index) => (
          <div key={index} className="w-48">
            <img src={image.url} alt="image" />
          </div>
        ))}
      </div>
      Hello
    </main>
  );
}
