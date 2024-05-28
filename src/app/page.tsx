import { SignedIn, SignedOut } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { getMyImages } from "~/server/queries";
import ImagesClient from "./_components/imagesClient";
import { type ImagesType } from "~/server/db/schema";

export const dynamic = "force-dynamic";

// const images = await db.query.images.findMany({
//   orderBy: (model, { desc }) => desc(model.id),
// });

async function Images({
  width,
  scale = 0,
  move = true,
  moveTimeMs = 0,
}: {
  width: number;
  scale?: number;
  move?: boolean;
  moveTimeMs?: number;
}) {
  const images = await getMyImages();

  return (
    <ImagesClient
      width={width}
      images={images}
      scale={scale}
      move={move}
      moveTimeMs={moveTimeMs}
    />
  );
}

function ImagesContainer({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-wrap items-start justify-center gap-4">
      {children}
    </div>
  );
}

export default async function HomePage() {
  return (
    <div className="">
      <SignedOut>
        <p className="flex-1 text-center">Please, sign in</p>
      </SignedOut>
      <SignedIn>
        <ImagesContainer>
          <Images width={500} scale={-0.505} move={false} moveTimeMs={100} />
          <Images width={450} />
          <Images width={350} move={false} />
          <Images width={350} />
        </ImagesContainer>
        {/* <Image alt="test" src="/test.jpg" width={400} height={300} /> */}
      </SignedIn>
    </div>
  );
}
// import { SignedIn, SignedOut } from "@clerk/nextjs";
// import Image from "next/image";
// import Link from "next/link";
// import { getMyImages } from "~/server/queries";

// export const dynamic = "force-dynamic";

// // const images = await db.query.images.findMany({
// //   orderBy: (model, { desc }) => desc(model.id),
// // });
// async function Images() {
//   const images = await getMyImages();
//   // console.log(images);
//   return (
//     <div className="relative mx-auto  grid max-w-[70%] auto-rows-max grid-cols-gallery justify-center gap-x-3 gap-y-3 py-3">
//       {/* <div className="flex flex-wrap justify-center gap-4 p-4"> */}
//       {images.map((image, index) => (
//         <Link key={image.id} href={`/img/${image.id}`}>
//           <div
//             key={image.id}
//             className="relative h-64 overflow-hidden rounded-xl border-2 border-violet-500"
//           >
//             <Image
//               style={{ objectFit: "cover", border: "1px solid red" }}
//               // width={192}
//               sizes="(min-width: 2980px) calc(10vw - 53px), (min-width: 2620px) calc(10vw - 15px), (min-width: 2240px) calc(11.67vw - 15px), (min-width: 1860px) 13.89vw, (min-width: 1500px) calc(18.24vw - 28px), (min-width: 1140px) calc(23.53vw - 19px), (min-width: 760px) calc(35vw - 17px), (min-width: 420px) calc(70vw - 17px), calc(18vw + 191px)"
//               // height={192}
//               fill={true}
//               src={image.url}
//               alt={image.name}
//             />
//           </div>
//         </Link>
//       ))}
//       {/* <Image
//         alt="test"
//         src="/test.jpg"
//         width={400}
//         height={300}
//         className="fixed left-10 top-40"
//       /> */}
//     </div>
//   );
// }
// export default async function HomePage() {
//   return (
//     <div className="">
//       <SignedOut>
//         <p className="flex-1 text-center">Please, sign in</p>
//       </SignedOut>
//       <SignedIn>
//         <Images />
//         {/* <Image alt="test" src="/test.jpg" width={400} height={300} /> */}
//       </SignedIn>
//     </div>
//   );
// }
