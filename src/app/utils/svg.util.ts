import { MatIconRegistry } from "@angular/material";
import { DomSanitizer } from "@angular/platform-browser";

export const loadSvgResource = (ir: MatIconRegistry, ds: DomSanitizer) => {
  const imgDir = "assets/img";
  const sideBarDir = `${imgDir}/sidebar`;
  const dayDir = `${imgDir}/days`;
  const avatarDir = `${imgDir}/avatar`;
  const iconDir = `${imgDir}/icons`;
  ir.addSvgIconSetInNamespace(
    "avatars",
    ds.bypassSecurityTrustResourceUrl(`${avatarDir}/avatars.svg`)
  );
  ir.addSvgIcon(
    "day",
    ds.bypassSecurityTrustResourceUrl(`${sideBarDir}/day.svg`)
  );
  ir.addSvgIcon(
    "unassigned",
    ds.bypassSecurityTrustResourceUrl(`${avatarDir}/unassigned.svg`)
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
  ir.addSvgIcon(
    "move",
    ds.bypassSecurityTrustResourceUrl(`${iconDir}/move.svg`)
  );
  ir.addSvgIcon("add", ds.bypassSecurityTrustResourceUrl(`${iconDir}/add.svg`));
  ir.addSvgIcon(
    "delete",
    ds.bypassSecurityTrustResourceUrl(`${iconDir}/delete.svg`)
  );
  const days = Array.from({ length: 31 }, (v, k) => k + 1);
  days.forEach(d =>
    ir.addSvgIcon(
      `day${d}`,
      ds.bypassSecurityTrustResourceUrl(`${dayDir}/day${d}.svg`)
    )
  );
};
