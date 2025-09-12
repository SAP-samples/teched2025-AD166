# Exercise 9 - Migrate Existing App to Latest Best Practices using UI5 Linter

## Overview

In this exercise, we assume there is an existing UI5 app developed several years ago. This app has been extended from time to time but never checked for the usage of deprecated APIs. The goal is to modernize the app and migrate it to the latest best practices using the UI5 Linter.

UI5 Linter is a static code analysis tool specifically designed for UI5 applications. It helps to detect various issues such as:

- Usage of deprecated UI5 libraries
- Usage of deprecated UI5 framework APIs
- Usage of global variables
- Possible Content Security Policy (CSP) violations
- Deprecated component and manifest configurations

Additionally, UI5 Linter provides detailed information to support solving these issues. For some issues, there is also an auto-fix option. For more information, please refer to the [UI5 Linter README](https://github.com/SAP/ui5-linter/).

## Exercise 9.1 - How to Use UI5 Linter

1. Download the App
   - Download the [existing TODO app](todo.sample.app/) from the `ex9/todo.sample.app/` directory.

2. Install Dependencies
   - Navigate to the app directory and run the following command to install the necessary dependencies:

    > ```sh
    > npm install
    > ```

3. Check the App
   - Run the linter to check the app for issues:

    > ```sh
    > npm run lint
    > ```

   - You should see an output similar to the one below, which lists the findings grouped by the files containing the issues. Additionally, you will receive a brief description of each issue.

    > ```sh
    > UI5 linter report:
    >
    > /HT005/exercises/ex9/todo.sample.app/ui5.yaml
    > error Use of deprecated library 'sap.ui.commons'  no-deprecated-library
    >
    > /HT005/exercises/ex9/todo.sample.app/webapp/Component.js
    > warning Component does not specify that it uses the descriptor via the manifest.json file  async-component-flags
    >
    > /HT005/exercises/ex9/todo.sample.app/webapp/controller/App.controller.js
    > error Deprecated access of enum pseudo module 'sap/ui/core/BarColor'  no-pseudo-modules
    > error Access of global variable 'sap' (sap.ui.model.json.JSONModel)  no-globals
    > error Call to deprecated function 'control' (avatarDOM.control)  no-deprecated-api
    > error Use of deprecated property 'tap' of class 'Button'  no-deprecated-api
    > error Access of global variable 'sap' (sap.ui.getCore)  no-globals
    > error Call to deprecated function 'getCore' (sap.ui.getCore)  no-deprecated-api
    > error Call to deprecated function 'byId' of class 'Core'  no-deprecated-api
    >
    > /HT005/exercises/ex9/todo.sample.app/webapp/view/App.view.xml
    > error Import of deprecated module 'sap/f/Avatar'  no-deprecated-api
    >
    > /HT005/exercises/ex9/todo.sample.app/webapp/view/Demo.view.xml
    > error Fatal error: Unknown namespace demo for tag App in resource /resources/sap/ui/demo/todo/view/Demo.view.xml  parsing-error
    >
    > 11 problems (10 errors, 1 warnings)
    > Run "ui5lint --fix" to resolve all auto-fixable problems
    >
    > 1 fatal errors
    >
    > Note: Use "ui5lint --details" to show more information about the findings
    > ```

4. Get Detailed Information
   - For more detailed information regarding each issue, run:

    > ```sh
    > npm run lint-detailed
    > ```

   - In addition to the standard linter output, you will receive much more detailed information describing the causes of the issues, along with supplementary documentation to help you address and resolve them.

    > ```sh
    > UI5 linter report:
    >
    > /HT005/exercises/ex9/todo.sample.app/ui5.yaml
    > error Use of deprecated library 'sap.ui.commons'  no-deprecated-library
    >
    > /HT005/exercises/ex9/todo.sample.app/webapp/Component.js
    > warning Component does not specify that it uses the descriptor via the manifest.json file. Details: A manifest.json has been found in the same directory as the component. Although it will be used at runtime automatically, this should still be expressed in the metadata of the component class (https://ui5.sap.com/#/topic/0187ea5e2eff4166b0453b9dcc8fc64f).  async-component-flags
    >
    > /HT005/exercises/ex9/todo.sample.app/webapp/controller/App.controller.js
    > error Deprecated access of enum pseudo module 'sap/ui/core/BarColor'. Details: Migrating Access to Pseudo Modules (https://ui5.sap.com/#/topic/00737d6c1b864dc3ab72ef56611491c4)  no-pseudo-modules
    > error Access of global variable 'sap' (sap.ui.model.json.JSONModel). Details: Do not use global variables to access UI5 modules or APIs. See Best Practices for Developers (https://ui5.sap.com/#/topic/28fcd55b04654977b63dacbee0552712)  no-globals
    > error Call to deprecated function 'control' (avatarDOM.control). Details: since 1.106, use sap.ui.core.Element.closestTo instead.  no-deprecated-api
    > error Use of deprecated property 'tap' of class 'Button'. Details: (since 1.20) - replaced by `press` event  no-deprecated-api
    > error Access of global variable 'sap' (sap.ui.getCore). Details: Do not use global variables to access UI5 modules or APIs. See Best Practices for Developers (https://ui5.sap.com/#/topic/28fcd55b04654977b63dacbee0552712)  no-globals
    > error Call to deprecated function 'getCore' (sap.ui.getCore). Details: (since 1.118) - Please require 'sap/ui/core/Core' instead and use the module export directly without using 'new'.  no-deprecated-api
    > error Call to deprecated function 'byId' of class 'Core'. Details: (since 1.119) - Please use Element.getElementById (https://ui5.sap.com/1.120/#/api/sap.ui.core.Element)instead.  no-deprecated-api
    >
    > /HT005/exercises/ex9/todo.sample.app/webapp/view/App.view.xml
    > error Import of deprecated module 'sap/f/Avatar'. Details: (since 1.73) - Use the sap.m.Avatar (https://ui5.sap.com/1.120/#/api/sap.m.Avatar) instead.  no-deprecated-api
    >
    > /HT005/exercises/ex9/todo.sample.app/webapp/view/Demo.view.xml
    > error Fatal error: Unknown namespace demo for tag App in resource /resources/sap/ui/demo/todo/view/Demo.view.xml. Details: Check the source file for syntax errors  parsing-error
    >
    > 11 problems (10 errors, 1 warnings)
    > Run "ui5lint --fix" to resolve all auto-fixable problems
    >
    > 1 fatal errors
    > ```

5. Try Auto-Fix
   - Some issues can be fixed automatically. Run the following command to attempt to fix these issues:

    > ```sh
    > npm run lint-auto-fix
    > ```

   - You should notice that some of the issues are already resolved automatically.

    > [!NOTE]
    > While the UI5linter initially offered automatic fixes only for issues of the type 'no-globals', the latest version has expanded its capabilities to address certain deprecations, such as those from the sap/ui/core/Core and sap/ui/core/Configuration API. This enhancement helps streamline the process of updating your code to comply with the latest standards and best practices.
    >
    > However, please note that not all findings may be automatically fixable and could still require manual intervention. Further issue types are under development and will be addressed in future updates. Always review the automatic fixes to ensure they align with your project requirements.

## Exercise 9.2 - Resolve All UI5 Linter Findings

In the previous step, several issues were identified by the UI5 Linter. Keep in mind that resolving one issue can sometimes address multiple findings. For instance, using `sap.ui.getCore()` can result in two findings: one for the global usage of `sap.ui.getCore` and another for utilizing the deprecated API `getCore`.

Your task is to fix all the issues reported by the UI5 Linter, making use of the UI5 Linter tool and the provided documentation for guidance.

This exercise will help you understand common UI5 coding practices and ensure that your code adheres to the best practices and standards of the framework.

Below is a detailed list of all detected issues, along with instructions on how to resolve them.

1. ***todo.sample.app/ui5.yaml***
   - Use of deprecated library `sap.ui.commons`

      <details>
      <summary>Show solution</summary>

      The library `sap.ui.commons` is deprecated and does not need to be included in this application since it is not being used. If there were any controls from this library in use, you should replace them with similar controls from a currently supported library.

      - Remove the reference to `sap.ui.commons` from your ui5.yaml file.
      - If necessary, replace any controls from `sap.ui.commons` with equivalent controls from a current library.

      ***todo.sample.app/ui5.yaml***

      > ```yaml
      > specVersion: '4.0'
      > metadata:
      > name: openui5-sample-app
      > type: application
      > framework:
      > name: OpenUI5
      > version: "1.134.0"
      > libraries:
      >    - name: sap.f
      >    - name: sap.m
      >    - name: sap.ui.core
      >    - name: themelib_sap_horizon
      > server:
      > customMiddleware:
      >    - name: "@ui5/middleware-code-coverage"
      >       afterMiddleware: compression
      >       configuration:
      >       excludePatterns:
      >          - "resources/"
      >          - "test/"
      > ```

      </details>

2. ***todo.sample.app/webapp/Component.js***
   - Component does not specify that it uses the descriptor via the manifest.json file.

      <details>
      <summary>Show solution</summary>

      It is considered a best practice to explicitly specify the manifest within the component metadata. Although the manifest.json file found in the same directory as the component will be used automatically at runtime, defining it in the metadata further ensures clarity and maintainability.

      After applying the suggested fixes, you will need to lint the project. You will notice that the initial warning has disappeared, but a new error appears, stating: "Component is not configured for asynchronous loading." This issue can be resolved by implementing the marker interface for asynchronous content creation.

      ***todo.sample.app/webapp/Component.js***

      > ```js
      > sap.ui.define([
      >     "sap/ui/core/UIComponent",
      >     "sap/ui/core/ComponentSupport",
      >     "sap/m/DatePicker"
      > ], (
      >     UIComponent,
      >     ComponentSupport,
      >     DatePicker
      > ) => {
      >     "use strict";
      >     const dti = new DatePicker();
      >     return UIComponent.extend("sap.ui.demo.todo.Component", {
      >          metadata: {
      >             manifest: "json",
      >             interfaces: ["sap.ui.core.IAsyncContentCreation"],
      >          }
      >     });
      > });
      > ```

      </details>

   - Deprecated access of enum pseudo module `sap/ui/core/BarColor`

      <details>
      <summary>Show solution</summary>

      In future releases, the use of pseudo modules, such as those for enumerations, will be discontinued. Instead, you will need to add a dependency to the corresponding library to which the enum belongs and adjust your usage accordingly. While there is already an autofix in place for issues where the module was used via the global namespace (e.g., sap.ui.core.BarColor), this autofix does not apply if the module was used via dependency. An autofix to migrate the usage via dependency is expected to be available soon.

      - ***Identify the Pseudo Module***: Determine which pseudo module (e.g., `sap/ui/core/BarColor`) is currently in use.
      - ***Add the Corresponding Library Dependency***: Replace the dependency to `sap/ui/core/BarColor` with `sap/ui/core/library`.
      - ***Adjust the Code Usage***: Update your code to reference the enum directly from the exported object of the library.

      ***todo.sample.app/webapp/controller/App.controller.js***

      > ```js
      > sap.ui.define([
      >    "sap/ui/Device",
      >    "sap/ui/core/mvc/Controller",
      >    "sap/ui/model/Filter",
      >    "sap/ui/model/FilterOperator",
      >    "sap/ui/model/json/JSONModel",
      >    "sap/base/strings/formatMessage",
      >    "sap/ui/core/library",
      >    "sap/ui/demo/todo/util/Helper",
      >    "sap/ui/thirdparty/jquery",
      > ], (
      >    Device,
      >    Controller,
      >    Filter,
      >    FilterOperator,
      >    JSONModel,
      >    formatMessage,
      >    CoreLibrary,
      >    Helper,
      >    jQuery,
      > ) => {
      >    "use strict";
      >
      >    return Controller.extend("sap.ui.demo.todo.controller.App", {
      >
      >       onInit() {
      >          this.aSearchFilters = [];
      >          this.aTabFilters = [];
      >          this.BarColor = CoreLibrary.BarColor;
      >
      >          this.getView().setModel(new JSONModel({
      >             isMobile: Device.browser.mobile
      >          }), "view");
      >       },
      >
      >       ...
      >    });
      >
      > });
      > ```

      </details>

3. ***todo.sample.app/webapp/controller/App.controller.js***
   - Call to deprecated function `control` (avatarDOM.control)

      <details>
      <summary>Show solution</summary>

      Since the initial releases of UI5, various APIs have been introduced and subsequently deprecated because they are no longer necessary or have been superseded by newer, more efficient APIs. Although these deprecated APIs have not been removed in the past, they will be phased out in upcoming major releases. To ensure your code is future-proof, it is essential to adjust the usage of these deprecated APIs.

      One such change involves replacing the deprecated control API with the `sap.ui.core.Element.closestTo` method. Following the suggestions from the linter, you should make this adjustment to maintain compatibility and leverage the latest improvements in the UI5 framework.

      - As sugested by the linter replace the deprecated `control` API with `sap.ui.core.Element.closestTo`

      ***todo.sample.app/webapp/controller/App.controller.js***

      > ```js
      > sap.ui.define([
      >    "sap/ui/Device",
      >    "sap/ui/core/mvc/Controller",
      >    "sap/ui/model/Filter",
      >    "sap/ui/model/FilterOperator",
      >    "sap/ui/model/json/JSONModel",
      >    "sap/base/strings/formatMessage",
      >    "sap/ui/core/library",
      >    "sap/ui/core/Element",
      >    "sap/ui/demo/todo/util/Helper",
      >    "sap/ui/thirdparty/jquery",
      > ], (
      >    Device,
      >    Controller,
      >    Filter,
      >    FilterOperator,
      >    JSONModel,
      >    formatMessage,
      >    CoreLibrary,
      >    Element,
      >    Helper,
      >    jQuery,
      > ) => {
      >    "use strict";
      >
      >    return Controller.extend("sap.ui.demo.todo.controller.App", {
      >
      >       ...
      >
      >       onAfterRendering() {
      >          const avatarDOM = jQuery("#container-todo---app--avatar-profile");
      >          const avatarCtr = Element.closestTo(avatarDOM);
      >          avatarCtr.setSrc(Helper.resolvePath('./img/logo_ui5.png'));
      >          sap.ui.require(["sap/m/Button"], (Button) => {
      >             const clearBtn = new Button({
      >                id: "clearCompleted",
      >                enabled: "{/itemsRemovable}",
      >                icon: "sap-icon://delete",
      >                text: "{i18n>CLEAR_COMPLETED}",
      >                tap: this.onClearCompleted.bind(this),
      >             });
      >             this.byId("toolbar").addContent(clearBtn);
      >          });
      >       },
      >
      >       ...
      >    });
      >
      > });
      > ```

      </details>

   - Use of deprecated property `tap` of class `Button`.

      <details>
      <summary>Show solution</summary>

      Since the initial releases of UI5, various APIs have been introduced and subsequently deprecated because they are no longer necessary or have been superseded by newer, more efficient APIs. Although these deprecated APIs have not been removed in the past, they will be phased out in upcoming major releases. To ensure your code is future-proof, it is essential to adjust the usage of these deprecated APIs.

      One such change involves replacing the deprecated control event `tap` with the `press` event. Following the suggestions from the linter, you should make this adjustment to maintain compatibility and leverage the latest improvements in the UI5 framework.

      - As sugested by the linter replace the deprecated `tap` event with the `press` event

      ***todo.sample.app/webapp/controller/App.controller.js***

      > ```js
      > sap.ui.define([
      >    "sap/ui/Device",
      >    "sap/ui/core/mvc/Controller",
      >    "sap/ui/model/Filter",
      >    "sap/ui/model/FilterOperator",
      >    "sap/ui/model/json/JSONModel",
      >    "sap/base/strings/formatMessage",
      >    "sap/ui/core/library",
      >    "sap/ui/core/Element",
      >    "sap/ui/demo/todo/util/Helper",
      >    "sap/ui/thirdparty/jquery",
      > ], (
      >    Device,
      >    Controller,
      >    Filter,
      >    FilterOperator,
      >    JSONModel,
      >    formatMessage,
      >    CoreLibrary,
      >    Element,
      >    Helper,
      >    jQuery,
      > ) => {
      >    "use strict";
      >
      >    return Controller.extend("sap.ui.demo.todo.controller.App", {
      >
      >       ...
      >
      >       onAfterRendering() {
      >          const avatarDOM = jQuery("#container-todo---app--avatar-profile");
      >          const avatarCtr = Element.closestTo(avatarDOM);
      >          avatarCtr.setSrc(Helper.resolvePath('./img/logo_ui5.png'));
      >          sap.ui.require(["sap/m/Button"], (Button) => {
      >             const clearBtn = new Button({
      >                id: "clearCompleted",
      >                enabled: "{/itemsRemovable}",
      >                icon: "sap-icon://delete",
      >                text: "{i18n>CLEAR_COMPLETED}",
      >                press: this.onClearCompleted.bind(this),
      >             });
      >             this.byId("toolbar").addContent(clearBtn);
      >          });
      >       },
      >
      >       ...
      >    });
      >
      > });
      > ```

      </details>


4. ***todo.sample.app/webapp/view/App.view.xml***
   - Import of deprecated module 'sap/f/Avatar'.

      <details>
      <summary>Show solution</summary>

      Similar to previous issues involving API deprecations, the UI5 Linter also examines XML views and flags deprecated controls. In this instance, the linter has identified a deprecated control used in your XML view.
      - ***Replace the Control***: Locate the deprecated sap/f/Avatar control in your XML view and replace it with sap/m/Avatar. Also verify and adjust any properties, aggregations, or events used with the deprecated control to ensure they are compatible with the replacement control if needed.

      ***todo.sample.app/webapp/view/App.view.xml***

      > ```xml
      > <mvc:View xmlns:mvc="sap.ui.core.mvc" xmlns:core="sap.ui.core" xmlns="sap.m" xmlns:f="sap.f" controllerName="sap.ui.demo.todo.controller.App" displayBlock="true">
      >    <App>
      >       <Page>
      >          <customHeader>
      >             <f:ShellBar core:require="{ Helper: 'sap/ui/demo/todo/util/Helper' }" title="{i18n>TITLE}">
      >                <f:profile>
      >                   <m:Avatar id="avatar-profile" />
      >                </f:profile>
      >             </f:ShellBar>
      >          </customHeader>
      >          ...
      > </mvc:View>
      > ```

      </details>

5. ***todo.sample.app/webapp/view/Demo.view.xml***
   - Fatal error: Unknown namespace demo for tag App in resource /resources/sap/ui/demo/todo/view/Demo.view.xml.

      <details>
      <summary>Show solution</summary>

      The UI5 Linter has identified a syntax error in your demo.view.xml file due to an unknown namespace being used for the App control. Specifically, there is no App control within the demo namespace. This error likely occurred because the intended control is sap/m/App.

      - Locate the erroneous `demo:` namespace prefixed to the App control and Remove it since sap.m is the default namespace in this view.

      ***todo.sample.app/webapp/view/App.view.xml***

      > ```xml
      > <mvc:View xmlns:mvc="sap.ui.core.mvc" xmlns:core="sap.ui.core" xmlns="sap.m" xmlns:f="sap.f" controllerName="sap.ui.demo.todo.controller.App" displayBlock="true">
      >       <App>
      >       </App>
      > </mvc:View>
      > ```

      </details>

## Summary

This tutorial demonstrated the capabilities of the UI5 Linter in detecting common issues in SAPUI5 applications, offering insights to help automate migrations of existing code or identify areas needing updates to align with current best practices.

We addressed various issues such as the usage of global objects and deprecated APIs, or updating deprecated events like `tap` to `press`. We also managed dependencies correctly using `sap.ui.define` or `sap.ui.require.` Additionally, we resolved deprecated controls in XML views, replacing `sap/f/Avatar` with `sap/m/Avatar` and adjusting properties accordingly.

Furthermore, we fixed namespace errors in XML views by correcting the default sap.m namespace for the App control.

The UI5 Linter is a valuable tool for automating parts of the migration process, providing hints to identify and fix issues, and guiding you to relevant documentation on best practices. By leveraging the linter, you can ensure your SAPUI5 applications are up-to-date, maintainable, and aligned with the latest guidelines.

## Further Information

- UI5 Linter: https://github.com/SAP/ui5-linter
- Best Practices for Developers: https://ui5.sap.com/#/topic/28fcd55b04654977b63dacbee0552712
- Best Practices for Loading Modules: https://ui5.sap.com/#/topic/00737d6c1b864dc3ab72ef56611491c4
