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

	private dialog: Promise<Dialog>;

	onCustomerSelect(): void{
		if(!(this.dialog instanceof Promise)) {
			this.dialog = this.loadFragment({
				name: "keepcool.sensormanager.view.CustomerSelectDialog"
			}).then((control: Control|Control[]) => (control instanceof Array ? control[0] : control) as Dialog);
		}

		this.dialog.then((dialog) => {
			const page = this.byId("sensors") as Page;
			page.addContent(dialog);
			dialog.setOpen(true);
		}).catch(function(err: Error){
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

		this.dialog.then((dialog) => {
			dialog.setOpen(false);
		});
	}

	onCustomerSelectCancel(): void {
		this.dialog.then((dialog) => {
			dialog.setOpen(false);
		});
	}
}
