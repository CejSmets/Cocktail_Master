import {Component, ViewChild} from '@angular/core';
import {IonTabs} from '@ionic/angular';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {
  @ViewChild('tabs') tabs: IonTabs;
  resetStackTabs = ['home', 'virtualBar'];
  constructor() {}


  handleTabClick = (event: MouseEvent) => {
    const { tab } = event.composedPath().find((element: any) =>
      element.tagName === 'ION-TAB-BUTTON') as EventTarget & { tab: string };
    // close stacks when switching tabs
    if (this.resetStackTabs.includes(tab) &&
      this.tabs.outlet.canGoBack(2, tab)) {
      event.stopImmediatePropagation();


      return this.tabs.outlet.pop(2, tab);
    }
    else if (this.resetStackTabs.includes(tab) &&
      this.tabs.outlet.canGoBack(1, tab)) {
      event.stopImmediatePropagation();


      return this.tabs.outlet.pop(1, tab);
    }
  };

  getSelectedTab(tabName: string): boolean {
    if (this.tabs === undefined) {
      return false;
    }
    return this.tabs.getSelected() === tabName;
  }
}
