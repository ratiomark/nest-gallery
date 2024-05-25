import FullPageImage from "~/components/full-image-page/full-image-page";

export default async function ImagePage({
  params: { id: imageId },
}: {
  params: { id: string };
}) {
  const idAsNumber = parseInt(imageId);
  if (isNaN(idAsNumber)) throw new Error("Invalid image ID");
  return <FullPageImage imageId={idAsNumber} />;
}
