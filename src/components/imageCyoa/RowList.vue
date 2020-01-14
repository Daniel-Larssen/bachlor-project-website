<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" max-width="600px" @click:outside="cleanCurrentComponent">
      <v-card>
        <v-card-title class="headline">Rows</v-card-title>

        <v-list>
          <v-list-group
            v-for="(row, index) in app.rows"
            :key="index"
            :prepend-icon="row.action"
            no-action
          >

            <template v-slot:activator>
              <v-list-item-content>
                <!-- Show title if there is one, elsewise show the id. -->
                <v-list-item-title v-html="row.title != '' ? index+1 +'. '+row.title : index+1 +'. '+ row.id"></v-list-item-title>
                <v-list-item-subtitle></v-list-item-subtitle>
              </v-list-item-content>
              <v-list-item-action>
                <v-btn icon @click.stop="moveRowDown(row)">
                  <v-icon color="grey lighten-1">mdi-chevron-down</v-icon>
                </v-btn>
              </v-list-item-action>
              <v-list-item-action>
                <v-btn icon @click.stop="moveRowUp(row)">
                  <v-icon color="grey lighten-1">mdi-chevron-up</v-icon>
                </v-btn>
              </v-list-item-action>
            </template>

            <v-list-item v-for="(object, index) in row.objects" :key="index">
              <v-list-item-content>
                <v-list-item-title v-html="index+1 +'. '+object.title"></v-list-item-title>
                <v-list-item-subtitle></v-list-item-subtitle>
              </v-list-item-content>
              <v-list-item-action>
                <v-btn icon @click.stop="moveObjectDown(row, object)">
                  <v-icon color="grey lighten-1">mdi-chevron-down</v-icon>
                </v-btn>
              </v-list-item-action>
              <v-list-item-action>
                <v-btn icon @click.stop="moveObjectUp(row, object)">
                  <v-icon color="grey lighten-1">mdi-chevron-up</v-icon>
                </v-btn>
              </v-list-item-action>
            </v-list-item>

          </v-list-group>
        </v-list>

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
      row: Object,
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
    cleanCurrentComponent() {
      this.$emit("cleanCurrentComponent", "");
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
    },
    // Will move the object up one in the array that holds it.
    moveObjectUp(row, object) {
      let index = row.objects.indexOf(object);
      if (index > 0) {
        let el = row.objects[index];
        this.$set(row.objects, index, row.objects[index - 1]);
        this.$set(row.objects, index - 1, el);
      }
    },
    // Will move the object down one in the array that holds it.
    moveObjectDown(row, object) {
      let index = row.objects.indexOf(object);
      if (index !== -1 && index < row.objects.length - 1) {
        let el = row.objects[index];
        this.$set(row.objects, index, row.objects[index + 1]);
        this.$set(row.objects, index + 1, el);
      }
    },
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
