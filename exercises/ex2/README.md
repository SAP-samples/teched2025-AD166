[![solution](https://flat.badgen.net/badge/solution/available/green?icon=github)](keepcool.sensormanager)

# Exercise 2 - Basic UI5 Configuration and View Creation

In this exercise you'll add some content to your application. A new UI5 view showing multiple sensors will be the first part of your app.

## Exercise 2.1 - Adjusting Views

Easy-UI5 created two views for you: `App.view.xml` and `Main.view.xml`.

Let's take a look at the precreated view `App.view.xml` located under `keepcool.sensormanager/webapp/view/App.view.xml`.
Replace the content as following:

```xml
<mvc:View
	controllerName="keepcool.sensormanager.controller.App"
	xmlns:mvc="sap.ui.core.mvc"
	displayBlock="true"
	xmlns="sap.m">
	<Shell id="shell">
		<App id="app">
			<pages>
				<Page
					id="page"
					title="{i18n>appTitle}"/>
			</pages>
		</App>
	</Shell>
</mvc:View>
```

You just added an *App* control which has a *pages* aggregation. We will make use of this aggregation to add multiple pages for routing later on in this application.

1. Before we adjust the `Main.view.xml`, let's rename it to `Sensors.view.xml` to be more meaningful.

2. Now we'll add some content to your newly adjusted UI5 view. Let's start with an empty `sap.m.IconTabBar`.

	***keepcool.sensormanager/webapp/view/Sensors.view.xml***

	````xml
	<mvc:View
		controllerName="keepcool.sensormanager.controller.Sensors"
		xmlns:mvc="sap.ui.core.mvc"
		xmlns="sap.m"
		displayBlock="true">
		<Page
			id="sensors"
			title="{i18n>appTitle}">
			<content>
				<IconTabBar
					id="iconTabBar"
					class="sapUiResponsiveContentPadding">
					<content>
						<IllustratedMessage
							id="illustratedMessage"
							enableVerticalResponsiveness="true"
							illustrationType="sapIllus-EmptyList"/>
					</content>
				</IconTabBar>
			</content>
		</Page>
	</mvc:View>
	````

3. You'll see in the view, that it references a controller called `Sensors`. Alongside the views, Easy-UI5 also created a controller for each view. Therefore, we need to rename the `Main.controller.ts` to `Sensors.controller.ts` as well. The controller is located under `keepcool.sensormanager/webapp/controller`.

4. Additionally, we need to rename the class name of the controller from `Main` to `Sensors`.

	***keepcool.sensormanager/webapp/controller/Sensors.controller.ts***
	```ts
	import MessageBox from "sap/m/MessageBox";
	import BaseController from "./BaseController";

	/**
	 * @namespace keepcool.sensormanager.controller
	 */
	export default class Sensors extends BaseController {
		public sayHello(): void {
			MessageBox.show("Hello World!");
		}
	}
	```

## Exercise 2.2 - Add Dependencies

You will use several UI5 libraries like `sap.m` or `sap.f` in your application. The central point for configuring your UI5 application is the `manifest.json` file, which is located at `keepcool.sensormanager/webapp/manifest.json`. For the UI5 tooling it is also necessary, to add these libaries to the ui5.yaml as well.

1. Open the `manifest.json` file using the Explorer.
<br><br>
![](images/02_02_001.png)

2. Go to the section `sap.ui5`.
3. Replace the libraries in the `dependencies/libs` section. UI5 will take care of loading all the libraries listed here when your app is started.

    ***keepcool.sensormanager/webapp/manifest.json***

	````json
			"dependencies": {
				"minUI5Version": "1.140.0",
				"libs": {
					"sap.ui.core": {},
					"sap.m": {},
					"sap.f": {},
					"sap.ui.layout": {}
				}
			},
	````

4. Add the `sap.m`, `sap.f` and `sap.ui.layout` dependencies to the ui5.yaml

	***keepcool.sensormanager/ui5.yaml***

	```yaml
	framework:
	  ...
	  libraries:
	    - name: sap.f
	    - name: sap.ui.layout
	    - name: sap.m
	    - name: sap.ui.core
	    - name: themelib_sap_horizon
	```

> **Note:** Restart the UI5 tooling server
>
> After adjusting the ui5.yaml, make sure to restart the UI5 tooling server in your terminal, so the changes are applied. Stop the server by pressing `CTRL + C` in the terminal and then start the server again by executing `npm run start`.

## Exercise 2.3 - Enable Routing for Sensors.view.xml

UI5 comes with a powerful routing API that helps you control the state of your application efficiently. It takes care of displaying the desired UI5 view based on the given browser URL hash.

Let's adjust the `manifest.json` to enable the routing feature for your newly created view.

1. Open the `manifest.json` file.
2. Go to the section `sap.ui5`.
3. Replace all content inside the `routing` property with the following content:

	***keepcool.sensormanager/webapp/manifest.json***

	````json
			"routing": {
				"config": {
					"routerClass": "sap.m.routing.Router",
					"viewType": "XML",
					"path": "keepcool.sensormanager.view",
					"controlId": "app",
					"controlAggregation": "pages"
				},
				"routes": [
					{
						"pattern": "",
						"name": "sensors",
						"target": "sensors"
					}
				],
				"targets": {
					"sensors": {
						"viewId": "sensors",
						"viewName": "Sensors"
					}
				}
			}
	````

We changed the *routing* section in the sap.ui5 part of the descriptor. There are three subsections that define the routing and navigation structure of the app:

`config`

This section contains the global router configuration and default values that apply for all routes and targets. We define the router class that we want to use and where our views are located in the app. To load and display views automatically, we also specify which control is used to display the pages and what aggregation should be filled when a new page is displayed.

`routes`

Each route defines a name, a pattern, and one or more targets to navigate to when the route has been hit. The pattern is basically the URL part that matches to the route, we define two routes for our app. The first one is a default route that will show the overview page with the content from the previous steps, and the second is the detail route with the URL pattern detail that will show a new page.

`targets`

A target defines a view that is displayed, it is associated with one or more routes and it can also be displayed manually from within the app. Whenever a target is displayed, the corresponding view is loaded and shown in the app. In our app we simply define two targets with a view name that corresponds to the target name.

<br>

4. Open the tab with the application preview and reload it. The application is being updated, and you can see an empty `sap.m.IconTabBar` with an illustrated message.
  * [Optional] If you have closed the tab with the application preview accidentally, click the link `http://localhost:8080` in the terminal, afterwards select `index.html` in the new tab that will be opened.</ul>

<br><br>![](images/02_02_002.png)<br><br>

## Summary

You've now enabled routing for your application and prepared your application for further development. Stay tuned!

Continue to [Exercise 3 - Show Sensor Content](../ex3/README.md).


## Further Information

* UI5 Demokit: https://ui5.sap.com/
* Views in UI5: https://ui5.sap.com/#/topic/91f27e3e6f4d1014b6dd926db0e91070
* Routing in UI5: https://ui5.sap.com/#/topic/3d18f20bd2294228acb6910d8e8a5fb5
* SAP Fiori 3: https://experience.sap.com/fiori-design-web/sap-fiori/#sap-fiori-3
