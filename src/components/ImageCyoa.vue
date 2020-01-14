<template>
  <div style="text-align:center;" :style="background">
    <!-- Nav Bar -->
    <nav class="navbar navbar-light bg-dark">
      <v-row align="center">
        <v-col class="text-center">
          <v-btn small @click="createNewRow" style="color:black">New Row</v-btn>
        </v-col>

        <v-col class="text-center">
          <v-btn small @click="currentComponent='appRowList'"  style="color:black">Row List</v-btn>
        </v-col>

        <v-col class="text-center">
          <v-btn small @click="currentComponent='appFeature'" style="color:black">Features</v-btn>
        </v-col>

        <!-- Button that opens up the component where the users can design the style of the cyoa. -->
        <v-col class="text-center">
          <v-btn small @click="currentComponent='appDesign'" style="color:black">Modify Design</v-btn>
        </v-col>

        <v-col class="text-center">
          <v-btn small @click="currentComponent='appLoad'" style="color:black">Save/Load Project</v-btn>
        </v-col>
      </v-row>
    </nav>

    <!-- Navbar that holds the score, shows only if the  -->
    <v-bottom-navigation v-if="app.pointTypes.length > 0" fixed>
      <v-col
        v-for="score in app.pointTypes"
        :key="score.index"
      >{{ score.name }}: {{ score.startingSum }}</v-col>
    </v-bottom-navigation>

    <!-- This is the holder that holds the design, save and load-component -->
    <component :is="currentComponent" @cleanCurrentComponent="currentComponent = $event"></component>

    <div v-for="row in app.rows" :key="row.index">
      <!-- Shows here one of the rows. -->

      <v-toolbar class="grey ma-2 lighten-2">
        <v-toolbar-title v-html="row.title"></v-toolbar-title>

        <v-spacer></v-spacer>

        <v-tooltip bottom open-delay="1000">
          <template v-slot:activator="{ on }">
            <v-btn icon v-on="on">
              <v-icon
                v-if="!row.isEditModeOn"
                @click="row.isEditModeOn = !row.isEditModeOn"
              >mdi-wrench</v-icon>
              <v-icon v-else @click="row.isEditModeOn = !row.isEditModeOn">mdi-keyboard-backspace</v-icon>
            </v-btn>
          </template>
          <span v-if="!row.isEditModeOn">Edit Row</span>
          <span v-else>Preview</span>
        </v-tooltip>

        <v-tooltip bottom open-delay="1000">
          <template v-slot:activator="{ on }">
            <v-btn icon v-on="on">
              <v-icon @click="deleteRow(row)">mdi-delete-forever</v-icon>
            </v-btn>
          </template>
          <span>Delete Row</span>
        </v-tooltip>

        <v-tooltip bottom open-delay="1000">
          <template v-slot:activator="{ on }">
            <v-btn icon v-on="on">
              <v-icon @click="moveRowUp(row)">mdi-chevron-up</v-icon>
            </v-btn>
          </template>
          <span>Move Row Up</span>
        </v-tooltip>

        <v-tooltip bottom open-delay="1000">
          <template v-slot:activator="{ on }">
            <v-btn icon v-on="on">
              <v-icon @click="moveRowDown(row)">mdi-chevron-down</v-icon>
            </v-btn>
          </template>
          <span>Move Row Down</span>
        </v-tooltip>
      </v-toolbar>

      <app-Row :row="row" :isEditModeOnAll="app.isEditModeOnAll" @rowWasChanged="row = $event"></app-Row>
    </div>
  </div>
</template>

<script>
import Row from "./imageCyoa/Row.vue";
import Load from "./imageCyoa/storage/Load.vue";
import Design from "./imageCyoa/Design.vue";
import Feature from "./imageCyoa/Feature.vue";
import RowList from "./imageCyoa/RowList.vue";

export default {
  data: function() {
    return {
      currentComponent: ""
    };
  },
  components: {
    // One of the row components
    appRow: Row,
    appDesign: Design,
    appLoad: Load,
    appFeature: Feature,
    appRowList: RowList
  },
  computed: {
    // Computes the styles for the title-text and the under-text
    background() {
      return (
        'background-image: url("' +
        this.app.styling.backgroundImage +
        '");' +
        "background-color: " +
        this.app.styling.backgroundColor +
        ";"
      );
    },
    //
    app() {
      return this.$store.state.app;
    }
  },
  methods: {
    // The Method that will create a new row.
    createNewRow() {
      // Creates the id
      var text = "";
      var charset = "abcdefghijklmnopqrstuvwxyz0123456789";
      for (var i = 0; i < 4; i++)
        text += charset.charAt(Math.floor(Math.random() * charset.length));

      this.app.rows.push({
        id: text,
        title: "The Row",
        titleText:
          "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
        objectWidth: "col-md-3",
        image: "",
        template: "1",
        defaultAspectWidth: 1,      // The default width and height for cropper aspect.
        defaultAspectHeight: 1,     // The default height for cropper aspect.
        allowedChoices: 0, // Allowed choices in the array.
        currentChoices: 0, // Current selected choices in the array.
        requireds: [],
        isEditModeOn: false,
        isRequirementOpen: false,
        objects: []
      });
    },
    // Deletes a row after its index is found.
    deleteRow(row) {
      this.$store.commit("deleteRow", row);
    },
    moveRowUp(row) {
      let index = this.app.rows.indexOf(row);
      if (index > 0) {
        let el = this.app.rows[index];
        this.$set(this.app.rows, index, this.app.rows[index - 1]);
        this.$set(this.app.rows, index - 1, el);
      }
    },
    moveRowDown(row) {
      let index = this.app.rows.indexOf(row);
      if (index !== -1 && index < this.app.rows.length - 1) {
        let el = this.app.rows[index];
        this.$set(this.app.rows, index, this.app.rows[index + 1]);
        this.$set(this.app.rows, index + 1, el);
      }
    }
  }
};
</script>

<style>
.nopadding {
  padding: 0 !important;
  margin: 0 !important;
}

/* ------------------- The Style Options -------------------- */
/* Makes space between the row of objects and the row details */

img {
  padding-right: 0px !important;
  padding-left: 0px !important;
  width: 100%;
}

body {
  padding-bottom: 20px;
}

div.root {
  margin: 50px;
}

.w-20 {
  -webkit-box-flex: 0;
  -ms-flex: 0 0 20% !important;
  flex: 0 0 20% !important;
  max-width: 20%;
}

.w-14 {
  -webkit-box-flex: 0;
  -ms-flex: 0 0 14.28% !important;
  flex: 0 0 14.28% !important;
  max-width: 14.28%;
}

.w-12 {
  -webkit-box-flex: 0;
  -ms-flex: 0 0 12.5% !important;
  flex: 0 0 12.5% !important;
  max-width: 12.5%;
}

.w-11 {
  -webkit-box-flex: 0;
  -ms-flex: 0 0 11.11% !important;
  flex: 0 0 11.11% !important;
  max-width: 11.11%;
}

.w-10 {
  -webkit-box-flex: 0;
  -ms-flex: 0 0 10% !important;
  flex: 0 0 10% !important;
  max-width: 10%;
}

.w-9 {
  -webkit-box-flex: 0;
  -ms-flex: 0 0 9.09% !important;
  flex: 0 0 9.09% !important;
  max-width: 9.09%;
}

/* When something is pressed and activated */
.active {
  background-color: lightgreen;
}

.zeroPadding {
  padding: 0px !important;
}

select {
  margin-bottom: 5px;
}

.form-control {
  margin-top: 0 !important;
}

div.col-md-2 {
  text-align: center;
}

div.col5 {
  text-align: center;
  width: 20%;
}

div.col-md-6 {
  text-align: center;
}

div.col-md-3 {
  text-align: center;
}

/* Border around the objects, will be toggable */
div.border {
  border: 1px solid #ccc;
}

p {
  text-align: left;
}

h1 {
  text-align: center;
}

/* To keep the lows beautiful and on same size*/
.row.display-flex {
  display: flex;
  flex-wrap: wrap;
}
.row.display-flex > [class*="col-"] {
  display: flex;
  flex-direction: column;
}

/********************* Header *************************/
.header {
  padding: 10px;
  background: #555;
  color: #f1f1f1;
  width: 100%;
}

.sticky {
  position: fixed;
  top: 0;

  z-index: 99999;
}

/********************* /Header *************************/
</style>
