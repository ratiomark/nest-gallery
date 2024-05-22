import Link from "next/link";
import { db } from "~/server/db";

export const dynamic = "force-dynamic";

// const images = await db.query.images.findMany({
//   orderBy: (model, { desc }) => desc(model.id),
// });
export default async function HomePage() {
  const images = await db.query.images.findMany({
    orderBy: (model, { desc }) => desc(model.id),
  });
  // console.log(images);
  return (
    <main className="">
      <div className="flex flex-wrap gap-4">
        {[...images, ...images, ...images].map((image, index) => (
          <div key={index} className="flex w-48 flex-col">
            <img src={image.url} alt="image" />
            <p>{image.name}</p>
          </div>
        ))}
      </div>
    </main>
  );
}
