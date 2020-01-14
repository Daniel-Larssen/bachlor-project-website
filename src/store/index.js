import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    /**
     * This is the large object that holds the data of the current CYOA,
     */
    app: {
      // If an object is activated
      isEditModeOnAll: true,      // If the editmode is open.
      isStyleOpen: false,         // If the style is open.
      isPointsOpen: false,        // If the points is open.
      isChoicesOpen: false,       // If the choice is open.
      isDesignOpen: false,
      activated: [],              // The array that holds the id's of the selected objects.
      rows: [],                   // The rows that the user have been created.
      pointTypes: [],             // The pointtypes that the user have created.
      variables: [],              // The variables that the user have created.

      // The styling that has to be done in the row.
      styling: {

        // Font for the text.
        rowTitle: "Times New Roman",          // The font for the row-titles.
        rowText: "Times New Roman",           // The font for the row-under-text.
        objectTitle: "Times New Roman",       // The font for the object-titles.
        objectText: "Times New Roman",        // The font for the object-under-text.

        // Size for the text.
        rowTitleTextSize: 200, rowTextTextSize: 100,
        objectTitleTextSize: 200, objectTextTextSize: 100,

        // Colors for the text.
        rowTitleColor: "000000", rowTextColor: "000000",
        objectTitleColor: "000000", objectTextColor: "000000",

        // Background image and color.
        backgroundImage: "", rowBackgroundImage: "", objectBackgroundImage: "",
        backgroundColor: "#FFFFFFFF", objectBgColor: "#FFFFFFFF", rowBgColor: "#FFFFFFFF",

        // Boolean that says if the row or object-color will be viewed.
        rowBgColorIsOn: false, objectBgColorIsOn: false,

        // Image radius and width
        rowImageBorderRadius: 0, objectImageBorderRadius: 0,
        objectImageWidth: 100, rowImageWidth: 100,

        // Margin and padding
        objectMargin: 0, rowMargin: 0,
        rowTextPadding: 10, objectTextPadding: 10,

        rowBodyMarginTop: 25, rowBodyMarginBottom: 25,
        rowBodyMarginSides: 25,

        // Style Drop Shadow Object
        objectDropShadowH: 0, objectDropShadowV: 0,
        objectDropShadowSpread: 0, objectDropShadowBlur: 0,
        objectDropShadowColor: "grey", objectDropShadowIsOn: false,

        // Style Drop Shadow Row
        rowDropShadowH: 0, rowDropShadowV: 0,
        rowDropShadowSpread: 0, rowDropShadowBlur: 0,
        rowDropShadowColor: "grey", rowDropShadowIsOn: false,

        // Selected Filter 
        selFilterBlurIsOn: false, selFilterBlur: 0,
        selFilterBrightIsOn: false, selFilterBright: 100,
        selFilterContIsOn: false, selFilterCont: 100,
        selFilterGrayIsOn: false, selFilterGray: 0,
        selFilterHueIsOn: false, selFilterHue: 0,
        selFilterInvertIsOn: false, selFilterInvert: 0,
        selFilterOpacIsOn: false, selFilterOpac: 100,
        selFilterSaturIsOn: false, selFilterSatur: 1,
        selFilterSepiaIsOn: false, selFilterSepia: 0,
        selBgColorIsOn: true, selFilterBgColor: "#70FF7EFF",

        // Required Filter 
        reqFilterBlurIsOn: false, reqFilterBlur: 0,
        reqFilterBrightIsOn: false, reqFilterBright: 100,
        reqFilterContIsOn: false, reqFilterCont: 100,
        reqFilterGrayIsOn: false, reqFilterGray: 0,
        reqFilterHueIsOn: false, reqFilterHue: 0,
        reqFilterInvertIsOn: false, reqFilterInvert: 0,
        reqFilterOpacIsOn: true, reqFilterOpac: 50,
        reqFilterSaturIsOn: false, reqFilterSatur: 1,
        reqFilterSepiaIsOn: false, reqFilterSepia: 0,
        reqBgColorIsOn: false, reqFilterBgColor: "#FFFFFFFF",
        reqFilterVisibleIsOn: true, // Add later

      },
    }
  },
  getters: {
    rowTitle: state => {
      return (
        'font-family: "' +
        state.app.styling.rowTitle +
        '";' +
        "font-size: " +
        state.app.styling.rowTitleTextSize +
        "%;" +
        "color: " +
        state.app.styling.rowTitleColor +
        ";"
      );
    },
    // Computes the styles for the title-text and the under-text
    rowBody: state => {
      return (
        "margin-top: " +
        state.app.styling.rowBodyMarginTop +
        "px;" +
        "margin-left: " +
        state.app.styling.rowBodyMarginSides +
        "px;" +
        "margin-right: " +
        state.app.styling.rowBodyMarginSides +
        "px;" +
        "margin-bottom:" +
        state.app.styling.rowBodyMarginBottom +
        "px;"
      );
    },
    rowText: state => {
      return (
        'font-family: "' +
        state.app.styling.rowText +
        '";' +
        "font-size: " +
        state.app.styling.rowTextTextSize +
        "%;" +
        "color: " +
        state.app.styling.rowTextColor +
        ";" +
        "padding: " +
        state.app.styling.rowTextPadding +
        "px;"
      );
    },
    rowBackground: state => {
      let style =
        'background-image: url("' +
        state.app.styling.rowBackgroundImage +
        '");' +
        (state.app.styling.rowBgColorIsOn
          ? "background-color: " + state.app.styling.rowBgColor + ";"
          : "") +
        "margin:" +
        state.app.styling.rowMargin +
        "px; ";

      if (state.app.styling.rowDropShadowIsOn) {
        style +=
          "filter: drop-shadow(" +
          state.app.styling.rowDropShadowH +
          "px " +
          state.app.styling.rowDropShadowV +
          "px " +
          state.app.styling.rowDropShadowBlur +
          "px " +
          state.app.styling.rowDropShadowColor +
          ");";
      }

      return style;
    },
    rowImage: state => {
      return (
        "border-radius: " +
        state.app.styling.rowImageBorderRadius +
        "%;" +
        "width: " +
        state.app.styling.rowImageWidth +
        "%;"
      );
    }
  },
  mutations: {
    // Saves the app, used in Load.vue to collect from json-files.
    loadApp(state, n) {
      state.app = n;
    },
    // Creates a new point-type, done in Points.vue
    addNewPointType(state, pointType) {
      state.app.pointTypes.push({
        id: pointType.id,
        name: pointType.name,
        startingSum: pointType.startingSum
      });
    },
    // Creates a new point-type, done in Points.vue
    addNewVariable(state, variable) {
      state.app.variables.push({
        id: variable.id,
        isTrue: variable.isTrue,
      });
    },
    // Delete's a row after its index is found, used in Row.vue.
    deleteRow(state, row) {
      state.app.rows.splice(state.app.rows.indexOf(row), 1);
    },
    deletePointType(state, pointType) {
      state.app.pointTypes.splice(state.app.pointTypes.indexOf(pointType), 1);
    },
    deleteVariable(state, variable) {
      state.app.variables.splice(state.app.variables.indexOf(variable), 1);
    }
  },
  actions: {
  },
  modules: {
  }
})
