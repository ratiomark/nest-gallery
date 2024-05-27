"use client";
import Link from "next/link";

import NextImage from "next/image";
import { type ImagesType } from "~/server/db/schema";

function getRandomInt(min = 50, max = 250): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export default function ImagesClient({
  width,
  images,
  scale = 0,
  move = true,
}: {
  width: number;
  images: ImagesType[];
  scale?: number;
  move?: boolean;
}) {
  const containerStyle = {
    width: `${width}px`,
  };

  const imageStyle = {
    width: "100%",
    height: "auto",
  };

  const distance = getRandomInt(150, 450);
  const duration = distance * 60;
  const direction = Math.random() > 0.5 ? "up" : "down";
  const animationName = `move-${direction}-${distance}-all`;
  const moveAnimationName = `move-${direction}-${distance}`;
  const scaleAnimationName = `scale-${direction}-${distance}`;
  // React.useEffect(() => {
  let keyframes = `
      @keyframes ${animationName} {
        0% { transform: translateY(0); }
        10% { transform: translateY(0); } /* Задержка на начальной позиции */
        33% { transform: translateY(${direction === "up" ? "-" : ""}${distance}px); }
        66% { transform: translateY(${direction === "up" ? "" : "-"}${distance}px); }
        90% { transform: translateY(0); } /* Возвращаемся на начальную позицию */
        100% { transform: translateY(0); } /* Задержка на начальной позиции */
      }
    `;

  if (scale !== 0) {
    keyframes = `
        @keyframes ${animationName} {
          0% { transform: translateY(0) scale(1); }
          10% { transform: translateY(0) scale(1); } /* Задержка на начальной позиции */
          33% { transform: translateY(${direction === "up" ? "-" : ""}${distance}px) scale(${1 + scale}); }
          66% { transform: translateY(${direction === "up" ? "" : "-"}${distance}px) scale(${1 + scale}); }
          90% { transform: translateY(0) scale(1); } /* Возвращаемся на начальную позицию */
          100% { transform: translateY(0) scale(1); } /* Задержка на начальной позиции */
        }
      `;
  }
  const moveKeyframes = `
      @keyframes ${moveAnimationName} {
        0% { transform: translateY(0); }
        10% { transform: translateY(0); } /* Задержка на начальной позиции */
        33% { transform: translateY(${direction === "up" ? "-" : ""}${distance}px); }
        66% { transform: translateY(${direction === "up" ? "" : "-"}${distance}px); }
        90% { transform: translateY(0); } /* Возвращаемся на начальную позицию */
        100% { transform: translateY(0); } /* Задержка на начальной позиции */
      }
    `;

  const scaleKeyframes = `
      @keyframes ${scaleAnimationName} {
        0%, 100% { transform: scale(1); }
        50% { transform: scale(${1 + scale}); }
      }
    `;

  const styleSheet = document?.styleSheets[0];
  if (styleSheet) {
    styleSheet.insertRule(keyframes, styleSheet.cssRules.length);
    move && styleSheet.insertRule(moveKeyframes, styleSheet.cssRules.length);
    scale && styleSheet.insertRule(scaleKeyframes, styleSheet.cssRules.length);
  }

  const allAnimation = `${animationName} ${duration + 2000}ms infinite`;
  const moveAnimation = `${moveAnimationName} ${duration + 2000}ms infinite`;
  const scaleAnimation = `${scaleAnimationName} ${duration}ms infinite`;

  return (
    <div
      style={{
        animation: `${allAnimation}`,
        // animation: `${moveAnimationName} ${duration + 2000}ms infinite, ${scale > 0 ? `${scaleAnimationName} ${duration}ms infinite` : ""}`,
        // animation: `${moveAnimationName} ${duration + 2000}ms infinite, ${scale > 0 ? `${scaleAnimationName} ${duration}ms infinite` : ''}`,
      }}
    >
      <div
        className="grid auto-rows-[10px]  py-3"
        style={
          {
            // animation: `${moveAnimation}`,
            // animation: `${moveAnimationName} ${duration + 2000}ms infinite, ${scale > 0 ? `${scaleAnimationName} ${duration}ms infinite` : ""}`,
            // animation: `${moveAnimationName} ${duration + 2000}ms infinite, ${scale > 0 ? `${scaleAnimationName} ${duration}ms infinite` : ''}`,
          }
        }
        // style={{
        //   animation: `

        // 	${scale > 0 ? `scaleAnimation ${duration}ms infinite` : ""},
        // 	${animationName} ${duration + 2000}ms infinite`, // Увеличиваем длительность для учета задержек
        // }}
      >
        {images.map(
          (image) => (
            <ImageContainer key={image.id} image={image} width={width} />
          ),
          // <Link key={image.id} href={`/img/${image.id}`}>
          //   <div
          //     className="overflow-hidden rounded-xl border-2 border-violet-500"
          //     style={{
          //       ...containerStyle,
          //       // animation:
          //       // scale > 0 ? `scaleAnimation ${duration}ms infinite` : undefined,
          //     }}
          //   >
          //     <NextImage
          //       src={image.url}
          //       alt={image.name}
          //       // layout="responsive"
          //       width={width}
          //       height={width}
          //       style={imageStyle}
          //     />
          //   </div>
          // </Link>
        )}
      </div>
    </div>
  );
}

import React from "react";
import { cn } from "~/components/lib/utils";

interface ImageContainerProps {
  image: ImagesType;
  containerStyle?: React.CSSProperties;
  width: number;
}
export function ImageContainer({
  image,
  containerStyle,
  width,
}: ImageContainerProps) {
  const widthHeightRation = image.height / image.width;
  const galleryHeight = Math.ceil(width * widthHeightRation);
  const imageSpans = Math.ceil(galleryHeight / 10) + 1;
  return (
    <div
      className={cn("justify-self-center ")}
      style={{
        ...containerStyle,
        width,
        gridRowEnd: `span ${imageSpans}`,
        // animation:
        // scale > 0 ? `scaleAnimation ${duration}ms infinite` : undefined,
      }}
    >
      <Link className="" href={`/img/${image.id}`}>
        <div
          className={cn(
            " overflow-hidden rounded-xl border-2 border-violet-500",
          )}
          // style={{
          //   ...containerStyle,
          //   width,
          //   gridRowEnd: `span ${imageSpans}`,
          //   // animation:
          //   // scale > 0 ? `scaleAnimation ${duration}ms infinite` : undefined,
          // }}
        >
          <NextImage
            src={image.url}
            alt={image.name}
            width={width}
            height={image.height}
            // sizes={`${width}px`}
          />
        </div>
      </Link>
    </div>
  );
}

// export default function ImagesClient({
//   width,
//   images,
// }: {
//   width: number;
//   images: ImagesType[];
// }) {
//   // console.log(images);
//   const containerStyle = {
//     width: `${width}px`,
//     // margin: "0 auto", // Центрируем контейнер
//   };

//   const imageStyle = {
//     width: "100%", // Ширина изображения равна ширине контейнера
//     height: "auto", // Автоматическая высота для сохранения соотношения сторон
//   };
//   const distance = getRandomInt(50, 250);
//   const duration = distance * 30; // Длительность пропорциональна расстоянию
//   const direction = Math.random() > 0.5 ? "up" : "down";
//   const animationName = `move-${direction}`;
//   const keyframes = `
//           @keyframes ${animationName} {
//             0% { transform: translateY(0); }
//             50% { transform: translateY(${direction === "up" ? "-" : ""}${distance}px); }
//             100% { transform: translateY(0); }
//           }
//         `;
//   const styleSheet = document?.styleSheets[0];
//   styleSheet?.insertRule(keyframes, styleSheet.cssRules.length);
//   return (
//     <div
//       className="grid gap-2 py-3"
//       style={{
//         ...containerStyle,
//         animation: `${animationName} ${duration}ms infinite`,
//       }}
//     >
//       {images.map((image) => {
//         return (
//           <Link key={image.id} href={`/img/${image.id}`}>
//             <div
//               // key={image.id}
//               className="overflow-hidden rounded-xl border-2 border-violet-500"
//               style={{
//                 ...containerStyle,
//               }}
//             >
//               <Image
//                 src={image.url}
//                 alt={image.name}
//                 layout="responsive"
//                 width={width}
//                 height={width} // Это значение будет игнорироваться, так как height: 'auto'
//                 style={imageStyle}
//               />
//             </div>
//           </Link>
//         );
//       })}
//     </div>
//   );
// }
