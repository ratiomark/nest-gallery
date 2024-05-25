import { getMyImage } from "~/server/queries";

export default async function FullPageImage(props: { imageId: number }) {
  const image = await getMyImage(props.imageId);
  return <img src={image.url} className="w-96" />;
}
