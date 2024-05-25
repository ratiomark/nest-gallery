import { Modal } from "~/app/_components/modal";
import FullPageImage from "~/components/full-image-page/full-image-page";

export default async function ImageModal({
  params: { id: imageId },
}: {
  params: { id: string };
}) {
  const idAsNumber = parseInt(imageId);
  if (isNaN(idAsNumber)) throw new Error("Invalid image ID");
  return (
    <Modal>
      <FullPageImage imageId={idAsNumber} />
    </Modal>
  );
}
