<template>
  <v-app>
    <v-row v-if="currentComponent==''" style="text-align:center;">
      <v-dialog persistent  v-model="dialog" max-width="500px">
        <v-card>
          <v-card-title class="headline">Choose Type Of Interactive Fiction</v-card-title>

          <v-card-text>
            <v-container>
              <v-row>
                <v-col>
                  <v-btn
                    @click="currentComponent = 'appImageCyoa'"
                    style="color:black"
                  >Open Image-cyoa Creator</v-btn>
                </v-col>
                <v-col>
                  <v-btn disabled
                    @click="currentComponent = 'appGroup'"
                    style="color:black"
                  >Open Standard-cyoa Creator</v-btn>
                </v-col>
                <v-col>
                  <v-btn disabled
                    @click="currentComponent = 'appGroup'"
                    style="color:black"
                  >Open Map-cyoa Creator</v-btn>
                </v-col>
              </v-row>
            </v-container>
          </v-card-text>

        </v-card>
      </v-dialog>
    </v-row>

    <!-- This is the holder that holds the design, save and load-component -->
    <component :is="currentComponent" @cleanCurrentComponent="currentComponent = $event"></component>
  </v-app>
</template>

<script>
import ImageCyoa from "./components/ImageCyoa.vue";
import TreeCyoa from "./components/TreeCyoa.vue";

export default {
  data: function() {
    return {
      currentComponent: "",
      dialog: true
    };
  },
  components: {
    appImageCyoa: ImageCyoa,
    appTreeCyoa: TreeCyoa
  },
  computed: {},
  methods: {}
};
</script>

<style>
button {
  width: 100%;
}

.nopadding {
  padding: 0 !important;
  margin: 0 !important;
}

/* ------------------- The Style Options -------------------- */
/* Makes space between the row of objects and the row details */
.objectRow {
  padding-top: 10px;
}

img {
  padding-right: 0px !important;
  padding-left: 0px !important;
  width: 100%;
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

div.col-md-12 {
  text-align: center;
  padding-top: 10px;
  padding-bottom: 10px;
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
