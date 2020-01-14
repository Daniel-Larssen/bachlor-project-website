<template>

    <v-dialog v-model="dialog" max-width="1200px" @click:outside="cleanCurrentComponent">
      <v-card>
        <v-card-title class="headline">Text</v-card-title>
        <v-card-text>
          <v-container>
            <v-row>

              <v-col cols="3">
                Row Title
                <v-text-field v-model="styling.rowTitle" label="Title" filled></v-text-field>
                <v-text-field v-model="styling.rowTitleTextSize" label="Text Size" filled>%</v-text-field>
                <v-color-picker
                  class="mx-auto"
                  v-model="styling.rowTitleColor"
                ></v-color-picker>
              </v-col>

              <v-col cols="3">
                Row Text
                <v-text-field v-model="styling.rowText" label="Title" filled></v-text-field>
                <v-text-field v-model="styling.rowTextTextSize" label="Text Size" filled></v-text-field>
                <v-color-picker
                  class="mx-auto"
                  v-model="styling.rowTextColor"
                ></v-color-picker>
              </v-col>

              <v-col cols="3">
                Object Title
                <v-text-field v-model="styling.objectTitle" label="Title" filled></v-text-field>
                <v-text-field v-model="styling.objectTitleTextSize" label="Text Size" filled></v-text-field>
                <v-color-picker
                  class="mx-auto"
                  v-model="styling.objectTitleColor"
                ></v-color-picker>
                
              </v-col>

              <v-col cols="3" >
                Object Text
                <v-text-field v-model="styling.objectText" label="Title" filled></v-text-field>
                <v-text-field v-model="styling.objectTextTextSize" label="Text Size" filled></v-text-field>
                <v-color-picker
                  class="mx-auto"
                  v-model="styling.objectTextColor"
                ></v-color-picker>
              </v-col>
     
            </v-row>
          </v-container>
        </v-card-text>

        <v-card-actions>
          <v-btn color="green darken-1" text @click="cleanCurrentComponent">Close</v-btn>
        </v-card-actions>

      </v-card>
    </v-dialog>

</template>

<script>
export default {
  data: function() {
    return {
      dialog: true
    };
  },
  computed: {
    styling() {
      return this.$store.state.app.styling;
    }
  },
  methods: {
    cleanCurrentComponent() {
      this.$emit("cleanCurrentComponent", "");
    }
  }
};
</script>

<style scoped>
.btn {
  margin: 5px;
  font-size: small;
}

.row {
  padding: 10px;
}

/* Important part */
.modal-dialog {
  overflow-y: initial !important;
}
.modal-body {
  max-height: calc(100vh - 100px);
  overflow-y: auto;
}

@media (min-width: 768px) {
  .modal-xl {
    width: 90%;
    max-width: 1200px;
  }
}
</style>


