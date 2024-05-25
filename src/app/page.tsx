import { SignedIn, SignedOut } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { getMyImages } from "~/server/queries";

export const dynamic = "force-dynamic";

// const images = await db.query.images.findMany({
//   orderBy: (model, { desc }) => desc(model.id),
// });
async function Images() {
  const images = await getMyImages();
  // console.log(images);
  return (
    <div className="flex flex-wrap justify-center gap-4 p-4">
      {images.map((image, index) => (
        <div key={image.id} className="flex  flex-col">
          <Link href={`/img/${image.id}`}>
            <Image
              style={{ objectFit: "contain" }}
              width={192}
              height={192}
              src={image.url}
              alt={image.name}
            />
          </Link>
          {/* <p>{image.name}</p> */}
        </div>
      ))}
    </div>
  );
}
export default async function HomePage() {
  return (
    <div className="flex flex-wrap gap-4">
      <SignedOut>
        <p className="flex-1 text-center">Please, sign in</p>
      </SignedOut>
      <SignedIn>
        <Images />
      </SignedIn>
    </div>
  );
}
