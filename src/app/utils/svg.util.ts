import { MatIconRegistry } from "@angular/material";
import { DomSanitizer } from "@angular/platform-browser";

export const loadSvgResource = (ir: MatIconRegistry, ds: DomSanitizer) => {
  const imgDir = "assets/img";
  const sideBarDir = `${imgDir}/sidebar`;
  const dayDir = `${imgDir}/days`;
  const avatarDir = `${imgDir}/avatar`;
  ir.addSvgIconSetInNamespace(
    "avatars",
    ds.bypassSecurityTrustResourceUrl(`${avatarDir}/avatars.svg`)
  );
  ir.addSvgIcon(
    "day",
    ds.bypassSecurityTrustResourceUrl(`${sideBarDir}/day.svg`)
  );
  ir.addSvgIcon(
    "month",
    ds.bypassSecurityTrustResourceUrl(`${sideBarDir}/month.svg`)
  );
  ir.addSvgIcon(
    "project",
    ds.bypassSecurityTrustResourceUrl(`${sideBarDir}/project.svg`)
  );
  ir.addSvgIcon(
    "projects",
    ds.bypassSecurityTrustResourceUrl(`${sideBarDir}/projects.svg`)
  );
  ir.addSvgIcon(
    "week",
    ds.bypassSecurityTrustResourceUrl(`${sideBarDir}/week.svg`)
  );

  const days = Array.from({ length: 31 }, (v, k) => k + 1);
  days.forEach(d =>
    ir.addSvgIcon(
      `day${d}`,
      ds.bypassSecurityTrustResourceUrl(`${dayDir}/day${d}.svg`)
    )
  );
};
