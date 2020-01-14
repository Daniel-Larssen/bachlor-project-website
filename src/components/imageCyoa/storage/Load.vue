<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" max-width="600px" @click:outside="cleanCurrentComponent">
      <v-card>
        <v-card-title class="headline">Settings</v-card-title>

        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                 <v-file-input
                    v-model="files"
                    hide-details
                    label="Load Project"
                    @change="uploadFile"
                    multiple
                    placeholder="Select your project"
                    prepend-icon="mdi-paperclip"
                    outlined
                    :show-size="1000"
                  >
                    <template v-slot:selection="{ index, text }">
                      <v-chip
                        v-if="index < 2"
                        dark
                        label
                        small
                      >
                        {{ text }}
                      </v-chip>
                    </template>
                  </v-file-input>
              </v-col>


              <v-col cols="12">
                <v-btn @click="saveFile('project.json')" style="color:black">Save Project</v-btn>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" text @click="cleanCurrentComponent">Close</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>

export default {
  data: function() {
    return {
      files: [],
      dialog: true
    };
  },
  components: {},
  computed: {
    app() {
      return this.$store.state.app;
    }
  },
  methods: {
    // Loads the file when the file input is changed.
    uploadFile() {
    console.log(this.files[0]);
    var reader = new FileReader();
    reader.onload =  () => {
      //console.log('hello', JSON.parse(reader.result));
      this.$store.commit("loadApp", JSON.parse(reader.result));
    };
    reader.readAsText(this.files[0]);
  },
    cleanCurrentComponent() {
      this.$emit("cleanCurrentComponent", "");
    },
    // Saves the app-object down to a JSON-file.
    saveFile(filename) {
      const data = JSON.stringify(this.app);
      const blob = new Blob([data], { type: "text/plain" });
      const e = document.createEvent("MouseEvents"),
        a = document.createElement("a");
      a.download = filename;
      a.href = window.URL.createObjectURL(blob);
      a.dataset.downloadurl = ["text/json", a.download, a.href].join(":");
      e.initEvent(
        "click",
        true,
        false,
        window,
        0,
        0,
        0,
        0,
        0,
        false,
        false,
        false,
        false,
        0,
        null
      );
      a.dispatchEvent(e);
    }
    
  }
};
</script>

<style>
v-btn {
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
