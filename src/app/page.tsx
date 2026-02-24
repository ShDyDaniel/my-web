import { cookies } from "next/headers";
import { getCategoryOneHeroImages, getImageSystemRootWorkItems } from "@/lib/image-system";
import { getMaintenanceModeState } from "@/lib/maintenance-mode";
import Landing from "@/uicomponents/Landing";
import MaintenancePage from "@/uicomponents/MaintenancePage";

const MAINTENANCE_BYPASS_COOKIE = "ds-maintenance-bypass";

export default async function Home() {
  const [maintenanceState, cookieStore] = await Promise.all([
    getMaintenanceModeState(),
    Promise.resolve(cookies()),
  ]);

  const hasMaintenanceBypass = cookieStore.get(MAINTENANCE_BYPASS_COOKIE)?.value === "1";

  if (maintenanceState.enabled && !hasMaintenanceBypass) {
    return <MaintenancePage />;
  }

  const imageSystemWorkItems = getImageSystemRootWorkItems();
  const categoryOneHeroImages = getCategoryOneHeroImages();

  return (
    <Landing
      imageSystemWorkItems={imageSystemWorkItems}
      categoryOneHeroImages={categoryOneHeroImages}
    />
  );
}
