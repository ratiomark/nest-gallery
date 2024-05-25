import { clerkClient } from "@clerk/nextjs/server";
import Image from "next/image";
import { getMyImage } from "~/server/queries";

export default async function FullPageImage(props: { imageId: number }) {
  const image = await getMyImage(props.imageId);
  const userInfo = await clerkClient.users.getUser(image.userId);
  return (
    <div className="flex h-full w-full items-center justify-center   dark:text-white">
      {/* <div className="flex h-full w-full items-center justify-center border-4 border-cyan-900  text-white"> */}
      <div className="flex h-full max-w-full basis-full items-center justify-center  	">
        {/* <div className="max-w-52"> */}
        <img
          src={image.url}
          className=" h-full object-contain object-center"
          // className="object-contain"
          alt={image.name}
        />
        {/* </div> */}
      </div>

      <div className="flex h-full max-w-[30%]  basis-[30%] flex-col border-l dark:border-slate-500">
        <div className="overflow-hidden  text-ellipsis whitespace-nowrap border-b p-4 text-lg dark:border-slate-500">
          {image.name}
        </div>
        <div className="flex flex-col gap-4 space-y-reverse p-4 ">
          <div className="">
            <div>Uploaded By:</div>
            <div>{userInfo.fullName ?? "unknown"}</div>
          </div>

          <div className="">
            <div>Created On:</div>
            <div>{image.createdAt.toLocaleDateString()}</div>
          </div>

          <div className="">
            <form
              action={async () => {
                "use server";
                // await deleteImage(idAsNumber);
              }}
            >
              {/* <Button type="submit" variant="destructive">
              Delete
            </Button> */}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
// import { getMyImage } from "~/server/queries";

// export default async function FullPageImage(props: { imageId: number }) {
//   const image = await getMyImage(props.imageId);

//   return (
//     <div className="flex h-full w-full min-w-0">
//       <div className="flex flex-shrink items-center justify-center">
//         <img src={image.url} className="flex-shrink object-cover " />
//       </div>

//       <div className="flex w-48 flex-shrink-0 flex-col">
//         <h1>{image.name}</h1>
//         <p>{image.createdAt.toLocaleDateString()}</p>
//       </div>
//     </div>
//   );
// }
