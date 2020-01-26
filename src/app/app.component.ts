import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  HostListener,
  Input,
  OnDestroy,
  OnInit
} from "@angular/core";
// import { EventBus } from "../../../event-bus/event-bus.js";
// declare const EventBus: any;

@Component({
  // selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit, OnDestroy {
  @Input() numTimesCustButtonClicked: number = 0;

  public changeDetectorRef: ChangeDetectorRef;
  public numTimesCustButtonClickedProp: number = 999;
  // public eventBus: EventBus;

  custButtonState = {
    numTimesCustButtonClicked: 0
  };

  constructor(changeDetectorRef: ChangeDetectorRef) {
    this.changeDetectorRef = changeDetectorRef;
  }
  // constructor(changeDetectorRef: ChangeDetectorRef, eventBus: EventBus) {
  //   this.changeDetectorRef = changeDetectorRef;
  //   this.eventBus = eventBus;
  // }

  ngOnInit() {
    // this.eventBus.register(
    //   "custButtonClickedCustomEventFromBusListener",
    //   this.custButtonClickedCustomEventFromBusListener
    // );
    // EventBus.register(
    //   "custButtonClickedCustomEventFromBusListener",
    //   this.custButtonClickedCustomEventFromBusListener
    // );
    // @ts-ignore
    window.EventBus.register(
      "custButtonClickedCustomEventFromBusListener",
      this.custButtonClickedCustomEventFromBusListener
    );
    window.addEventListener(
      "custButtonClickedCustomEvent",
      this.custButtonClickedCustomEventListener,
      true
    );
  }

  custButtonClickedCustomEventListener = (event: any) => {
    if (event.detail && event.detail.numTimesCustButtonClicked)
      this.custButtonState = {
        ...this.custButtonState,
        ["numTimesCustButtonClicked"]: event.detail.numTimesCustButtonClicked
      };
    this.changeDetectorRef.detectChanges();
  };

  custButtonClickedCustomEventFromBusListener = (event: any) => {
    console.log("custButtonClickedCustomEventFromBusListener().event: ", event);
  };

  // ngOnChanges(changes: { [token: string]: SimpleChange }) {
  //   // check the object "changes" for new data
  //   console.log("token ngOnChanges=" + this.token);
  // }

  ngOnDestroy(): void {
    window.removeEventListener(
      "custButtonClickedCustomEvent",
      this.custButtonClickedCustomEventListener,
      true
    );
  }

  // @HostListener("custButtonClicked", ["$event.target"])
  // onCustButtonClicked(elm: any) {
  //   console.log(elm); // element that triggered event, in this case HTMLUnknownElement
  //   console.log("custButtonClicked triggered");
  // }
  @HostListener("document:custButtonClicked", ["$event"])
  onCustButtonClicked(event: any) {
    console.log(event);
    console.log(
      `event.numTimesCustButtonClicked: `,
      event.numTimesCustButtonClicked
    );
    console.log("custButtonClicked triggered");
    this.numTimesCustButtonClickedProp = event.numTimesCustButtonClicked;
  }

  showUpdatedNumTimesCustButtonClicked(numTimesCustButtonClicked: number) {
    console.log(
      'showUpdatedNumTimesCustButtonClicked"().numTimesCustButtonClicked: ',
      numTimesCustButtonClicked
    );
    this.numTimesCustButtonClicked = numTimesCustButtonClicked;
  }
}
