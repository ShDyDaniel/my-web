import { getCategoryOneHeroImages, getImageSystemRootWorkItems } from "@/lib/image-system";
import Landing from "@/uicomponents/Landing";

export default function Home() {
  const imageSystemWorkItems = getImageSystemRootWorkItems();
  const categoryOneHeroImages = getCategoryOneHeroImages();

  return (
    <Landing
      imageSystemWorkItems={imageSystemWorkItems}
      categoryOneHeroImages={categoryOneHeroImages}
    />
  );
}
