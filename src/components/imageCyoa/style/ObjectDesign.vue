<template>
  <v-dialog v-model="dialog" max-width="600px" @click:outside="cleanCurrentComponent">
    <v-card>
      <v-card-title class="headline">Object Design</v-card-title>

      <v-card-text>
        <v-container>
          <v-row>
            <v-col cols="12" class="py-0">Margin and Padding</v-col>

            <v-col cols="6">
              <v-text-field hide-details v-model="styling.objectMargin" label="Margin" filled>px</v-text-field>
            </v-col>
            <v-col cols="6">
              <v-text-field
                hide-details
                v-model="styling.objectTextPadding"
                label="Padding"
                filled
              >px</v-text-field>
            </v-col>

            <v-col cols="12" class="py-0">
              <v-checkbox
                v-model="styling.objectDropShadowIsOn"
                hide-details
                label="Drop Shadow"
                class="auto shrink mr-2 mt-0"
              ></v-checkbox>
            </v-col>

            <v-col cols="6">
              <v-text-field v-model="styling.objectDropShadowH" label="Horizontal Shadow" filled>px</v-text-field>
              <v-text-field v-model="styling.objectDropShadowV" label="Vertical Shadow" filled>px</v-text-field>
            </v-col>

            <v-col cols="6">
              <v-text-field v-model="styling.objectDropShadowBlur" label="Shadow Blur" filled>px</v-text-field>
              <v-text-field
                hide-details
                v-model="styling.objectDropShadowSpread"
                label="Shadow Spread"
                filled
              >px</v-text-field>
            </v-col>

            <v-col cols="12" class="py-0">
              <v-color-picker class="mx-auto" v-model="styling.objectDropShadowColor"></v-color-picker>
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


