import { NgModule, SkipSelf, Optional } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";
import { HeaderComponent } from "./header/header.component";
import { FooterComponent } from "./footer/footer.component";
import { SidebarComponent } from "./sidebar/sidebar.component";
import { SharedModule } from "../shared/shared.module";
import { MatIconRegistry } from "@angular/material";
import { DomSanitizer } from "@angular/platform-browser";
import { loadSvgResource } from "../utils/svg.util";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { ServicesModule } from '../services/services.module';
import "../utils/debug.util";


@NgModule({
  declarations: [HeaderComponent, FooterComponent, SidebarComponent],
  imports: [
    HttpClientModule,
    SharedModule,
    ServicesModule.forRoot(),
    BrowserAnimationsModule
  ],
  exports: [HeaderComponent, FooterComponent, SidebarComponent],
  providers: [
    {provide: 'BASE_CONFIG', useValue: {
      uri: 'http://localhost:3000'
    }}
  ]
})
export class CoreModule {
  constructor(
    @Optional() @SkipSelf() parent: CoreModule,
    ir: MatIconRegistry,
    ds: DomSanitizer
  ) {
    // @SkipSelf will get rid of this circular infinite loop
    if (parent) {
      throw new Error("module already exist, don't need to reload");
    }
    loadSvgResource(ir, ds);
  }
}
