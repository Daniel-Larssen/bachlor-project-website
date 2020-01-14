<template>
  <v-dialog v-model="dialog" max-width="600px" @click:outside="cleanCurrentComponent">
    <v-card>
      <v-card-title class="headline">Images</v-card-title>

      <v-card-text>
        <v-container>
          <v-row>
            <v-col class="col-6">
              Rows
              <v-text-field
                v-model="styling.rowImageBorderRadius"
                label="Rounded Row Images"
                suffix="%"
                filled
              ></v-text-field>
              <v-text-field
                v-model="styling.rowImageWidth"
                label="Width Row Images"
                suffix="%"
                filled
              ></v-text-field>
            </v-col>
            <v-col class="col-6">
              Objects
              <v-text-field
                v-model="styling.objectImageBorderRadius"
                label="Rounded Object Images"
                suffix="%"
                filled
              ></v-text-field>
              <v-text-field
                v-model="styling.objectImageWidth"
                label="Width Object Images"
                suffix="%"
                filled
              ></v-text-field>
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
    // Collects styling from Store.
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


