import { auth } from "@clerk/nextjs/server";
import { request } from "https";
import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";
import { metadata } from "~/app/layout";
import { db } from "~/server/db";
import { images } from "~/server/db/schema";
import sizeOf from "image-size";
import { type ISizeCalculationResult } from "image-size/dist/types/interface";

const f = createUploadthing();

function getImageSize(url: string): Promise<ISizeCalculationResult> {
  return new Promise((resolve, reject) => {
    let totalBytes = 0; // Счетчик для подсчета общего количества загруженных байтов

    const requestObj = request(url, (response) => {
      const chunks: Buffer[] = [];
      response.on("data", (chunk: Buffer) => {
        chunks.push(chunk);
        totalBytes += chunk.length; // Прибавляем размер текущего чанка к общему количеству байтов

        try {
          const dimensions = sizeOf(Buffer.concat(chunks));
          console.log(
            `Общее количество загруженных данных: ${totalBytes / 1024} КБ`,
          ); // Выводим количество загруженных данных в КБ
          resolve(dimensions);
          response.destroy(); // Прекращаем скачивание данных после успешного определения размеров
        } catch (error) {
          // Пока не накоплено достаточно данных для определения размеров, ошибка будет генерироваться
        }
      });

      response.on("error", (error) => {
        console.error(`Ошибка при загрузке данных: ${error}`);
        reject(error);
      });
    });

    requestObj.end();
  });
}

// FileRouter for your app, can contain multiple FileRoutes
export const ourFileRouter = {
  // Define as many FileRoutes as you like, each with a unique routeSlug
  imageUploaderCustomName: f({
    image: { maxFileSize: "4MB", maxFileCount: 10 },
  })
    // Set permissions and file types for this FileRoute
    .middleware(async ({ req }) => {
      // console.log(req);
      // await req.arrayBuffer().then((buffer) => {
      //   console.log(sizeOf(Buffer.concat(buffer)));
      // });
      // This code runs on your server before upload
      // С помощью clerk мы можем получить информацию о пользователе и использовать ее в дальнейшем
      const user = auth();

      // If you throw, the user will not be able to upload
      if (!user.userId) throw new UploadThingError("Unauthorized");

      // Whatever is returned here is accessible in onUploadComplete as `metadata`
      return { userId: user.userId };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      // Сюда попадает информация о файле после его загрузки, то есть metadata в даном случае это userId переданный в middleware
      // request
      // This code RUNS ON YOUR SERVER after upload
      console.log("Upload complete for userId:", metadata.userId);
      const { width, height } = await getImageSize(file.url);
      const ratio = width! / height!;
      console.log("width", width);
      console.log("height", height);
      console.log("ratio", ratio);
      await db.insert(images).values({
        url: file.url,
        name: file.name,
        userId: metadata.userId,
        width,
        height,
      });

      // .then((dimensions) => console.log(dimensions))
      // .catch((error) =>
      //   console.error("Error getting image dimensions:", error),
      // );
      console.log("file", file);
      console.log("file name", file.name);
      console.log("file type", file.type);
      console.log("file size", file.size);
      console.log("file url", file.url);

      // !!! Whatever is returned here is sent to the clientside `onClientUploadComplete` callback
      return { uploadedBy: metadata.userId };
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
