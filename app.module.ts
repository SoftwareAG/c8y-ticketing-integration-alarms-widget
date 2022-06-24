import { NgModule } from "@angular/core";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { RouterModule as NgRouterModule } from "@angular/router";
import { UpgradeModule as NgUpgradeModule } from "@angular/upgrade/static";
import { CoreModule, HOOK_COMPONENTS, RouterModule } from "@c8y/ngx-components";
import { DashboardUpgradeModule, UpgradeModule, HybridAppModule, UPGRADE_ROUTES } from "@c8y/ngx-components/upgrade";
import { ModalModule } from "ngx-bootstrap/modal";
import { AssetsNavigatorModule } from "@c8y/ngx-components/assets-navigator";
import { CockpitDashboardModule } from "@c8y/ngx-components/context-dashboard";
import { ReportsModule } from "@c8y/ngx-components/reports";
import { SensorPhoneModule } from "@c8y/ngx-components/sensor-phone";
import { CollapseModule } from "ngx-bootstrap/collapse";
import { CumulocityTicketingIntegrationAlarmsWidget } from './src/c8y-ticketing-integration-alarms-widget/c8y-ticketing-integration-alarms-widget.component';
import { CumulocityTicketingIntegrationAlarmsWidgetConfig } from './src/c8y-ticketing-integration-alarms-widget/c8y-ticketing-integration-alarms-widget.config.component';
import { TicketCommentModal } from "./src/c8y-ticketing-integration-alarms-widget/modal/ticket-comment-modal.component";
import { TicketIdReplacementPipe } from "./src/c8y-ticketing-integration-alarms-widget/pipe/TicketIdReplacementPipe";

@NgModule({
  imports: [
    BrowserAnimationsModule,
    RouterModule.forRoot(),
    NgRouterModule.forRoot([...UPGRADE_ROUTES], { enableTracing: false, useHash: true }),
    CoreModule.forRoot(),
    AssetsNavigatorModule,
    ReportsModule,
    NgUpgradeModule,
    DashboardUpgradeModule,
    CockpitDashboardModule,
    SensorPhoneModule,
    UpgradeModule,
    ModalModule,
    CollapseModule
  ],
  declarations: [
    CumulocityTicketingIntegrationAlarmsWidget, 
    CumulocityTicketingIntegrationAlarmsWidgetConfig,
    TicketCommentModal,
    TicketIdReplacementPipe
  ],
  entryComponents: [
    CumulocityTicketingIntegrationAlarmsWidget, 
    CumulocityTicketingIntegrationAlarmsWidgetConfig,
    TicketCommentModal
  ],
  providers: [{
    provide: HOOK_COMPONENTS,
    multi: true,
    useValue: [
      {
        id: 'global.presales.c8y.ticketing.integration.alarms.widget',
        label: 'Ticketing Integration Alarms',
        description: 'Depends on Ticketing Integration microservice. Shows active alarms related to a device and and allows to create tickets.',
        component: CumulocityTicketingIntegrationAlarmsWidget,
        configComponent: CumulocityTicketingIntegrationAlarmsWidgetConfig,
        previewImage: require("@widget-assets/img-preview.png"),
        data: {
          ng1: {
            options: { 
              noDeviceTarget: false, 
              deviceTargetNotRequired: false 
            }
          }
        }
      }
    ]
  }]
})
export class AppModule extends HybridAppModule {
  constructor(protected upgrade: NgUpgradeModule) {
    super();
  }
}
