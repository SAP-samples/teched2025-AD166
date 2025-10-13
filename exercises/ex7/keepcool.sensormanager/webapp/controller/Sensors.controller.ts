import BaseController from "./BaseController";
import MessageToast from "sap/m/MessageToast";
import Filter from "sap/ui/model/Filter";
import JSONModel from "sap/ui/model/json/JSONModel";
import ListBinding from "sap/ui/model/ListBinding";
import { IconTabBar$SelectEvent } from "sap/m/IconTabBar";
import { Threshold } from "../model/formatter";
import FilterOperator from "sap/ui/model/FilterOperator";
import Control from "sap/ui/core/Control";
import Dialog from "@ui5/webcomponents/dist/Dialog";
import Page from "sap/m/Page";
import List from "@ui5/webcomponents/dist/List";
import ListItemStandard from "@ui5/webcomponents/dist/ListItemStandard";
import { ListItemBase$PressEvent } from "sap/m/ListItemBase";

/**
 * @namespace keepcool.sensormanager.controller
 */
export default class Sensors extends BaseController {
	public onInit(): void {
		this.getSensorModel().dataLoaded().then(async () => {
			const resourceBundle = await this.getResourceBundle();
			MessageToast.show(resourceBundle.getText("msgSensorDataLoaded"), {
				closeOnBrowserNavigation: false
			});
		}).catch(function(oErr: Error){
			MessageToast.show(oErr.message, {
				closeOnBrowserNavigation: false
			});
		});
	}

	public getSensorModel(): JSONModel {
		return (this.getOwnerComponent().getModel("sensorModel") as JSONModel);
	}

	private customFilters: Filter[] = [];
	private statusFilters: Filter[] = [];

	onSensorSelect(event: IconTabBar$SelectEvent): void {

		const listBinding = this.getView()?.byId("sensorsList")?.getBinding("items") as ListBinding;
		const key = event.getParameter("key");

		if (key === "Cold") {
			this.statusFilters = [new Filter("temperature", FilterOperator.LT, Threshold.Warm, false)];
		} else if (key === "Warm") {
			this.statusFilters = [new Filter("temperature", FilterOperator.BT, Threshold.Warm, Threshold.Hot)];
		} else if (key === "Hot") {
			this.statusFilters = [new Filter("temperature", FilterOperator.GT, Threshold.Hot, false)];
		} else {
			this.statusFilters = [];
		}

		listBinding.filter(this.statusFilters.concat(this.customFilters));
	}

	private dialogPromise: Promise<Dialog>;

	onCustomerSelect(): void{
		if(!(this.dialogPromise instanceof Promise)) {
			this.dialogPromise = this.loadFragment({
				name: "keepcool.sensormanager.view.CustomerSelectDialog"
			}).then((control: Control|Control[]) => (control instanceof Array ? control[0] : control) as Dialog);
		}

		this.dialogPromise.then((dialog: Dialog) => {
			const page = this.byId("sensors") as Page;
			page.addContent(dialog);
			dialog.setOpen(true);
		}).catch((err: Error) => {
			MessageToast.show(err.message);
		});
	}

	onCustomerSelectConfirm(): void {
		const selectCustomersList = this.byId("selectCustomers") as List;
		const listItems = selectCustomersList.getListItems() as ListItemStandard[];
		const selectedItems = listItems.filter(item => item.getSelected());

		this.customFilters = selectedItems.map(function(item: ListItemStandard) {
			return new Filter("customer", FilterOperator.EQ, item.getText());
		});

		const listBinding = this.getView()?.byId("sensorsList")?.getBinding("items") as ListBinding;
		listBinding.filter(this.customFilters.concat(this.statusFilters));

		this.dialogPromise.then((dialog: Dialog) => {
			dialog.setOpen(false);
		});
	}

	onCustomerSelectCancel(): void {
		this.dialogPromise.then((dialog: Dialog) => {
			dialog.setOpen(false);
		});
	}

	navToSensorStatus(event: ListItemBase$PressEvent): void {
		const sensorIndex = (event.getSource() as Control).getBindingContext("sensorModel")?.getProperty("index") as number;
		this.navTo("sensorStatus", {index: sensorIndex});
	}
}
