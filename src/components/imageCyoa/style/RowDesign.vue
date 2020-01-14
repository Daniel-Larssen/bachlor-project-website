<template>
  <v-dialog v-model="dialog" max-width="1000px" @click:outside="cleanCurrentComponent">
    <v-card>
      <v-card-title class="headline">Row Design</v-card-title>

      <v-card-text>
        <v-container>
          <v-row>
            <v-col>
              <v-col class="py-0">Margin and Padding</v-col>

              <v-text-field v-model="styling.rowMargin" label="Text Margin" suffix="px" filled></v-text-field>
              <v-text-field
                v-model="styling.rowTextPadding"
                label="Text Padding"
                suffix="px"
                filled
              ></v-text-field>
              <v-text-field
                v-model="styling.rowBodyMarginSides"
                label="Left and Right Margin"
                filled
                suffix="px"
              >px</v-text-field>
              <v-text-field
                v-model="styling.rowBodyMarginTop"
                label="Top Margin"
                suffix="px"
                filled
              ></v-text-field>
              <v-text-field
                v-model="styling.rowBodyMarginBottom"
                label="Bottom Margin"
                suffix="px"
                filled
              ></v-text-field>
            </v-col>

            <v-col>
              <v-checkbox
                v-model="styling.rowDropShadowIsOn"
                hide-details
                label="Drop Shadow"
                class="auto shrink mt-n3"
              ></v-checkbox>

              <v-text-field
                v-model="styling.rowDropShadowH"
                label="Horizontal Shadow"
                suffix="px"
                filled
              ></v-text-field>
              <v-text-field
                v-model="styling.rowDropShadowV"
                label="Vertical Shadow"
                suffix="px"
                filled
              ></v-text-field>
              <v-text-field
                v-model="styling.rowDropShadowBlur"
                label="Shadow Blur"
                suffix="px"
                filled
              ></v-text-field>
              <v-text-field
                v-model="styling.rowDropShadowSpread"
                label="Shadow Spread"
                suffix="px"
                filled
              ></v-text-field>
            </v-col>

            <v-col>
              <v-col cols="12" class="py-0">Shadow Color</v-col>
              <v-color-picker class="mx-auto" v-model="styling.rowDropShadowColor"></v-color-picker>
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


