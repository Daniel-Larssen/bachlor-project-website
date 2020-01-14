<template>
  <v-dialog v-model="dialog" max-width="1200px" @click:outside="cleanCurrentComponent">
    <v-card>
      <v-card-title class="headline">Backgrounds</v-card-title>

      <v-card-text>
        <v-container>
          <v-row align="center">
            <!-- Selected Object Filter -->
              <div class="modal-header">
                <h5 class="modal-title">Filter on Object that is selected</h5>
              </div>
              
              <v-row>
              <v-col>
                <v-checkbox
                  v-model="styling.selFilterBlurIsOn"
                  hide-details
                  class="auto shrink mr-2 mt-0"
                ></v-checkbox>
                <v-text-field v-model="styling.selFilterBlur" label="Blur" suffix="px" filled></v-text-field>

                <v-checkbox
                  v-model="styling.selFilterBrightIsOn"
                  hide-details
                  class="auto shrink mr-2 mt-0"
                ></v-checkbox>
                <v-text-field
                  v-model="styling.selFilterBright"
                  label="Brightness"
                  suffix="%"
                  filled
                ></v-text-field>
                <v-checkbox
                  v-model="styling.selFilterContIsOn"
                  hide-details
                  class="auto shrink mr-2 mt-0"
                ></v-checkbox>
                <v-text-field v-model="styling.selFilterCont" label="Contrast" suffix="%" filled></v-text-field>
              </v-col>

              <v-col>
                <v-checkbox
                  v-model="styling.selFilterHueIsOn"
                  hide-details
                  class="auto shrink mr-2 mt-0"
                ></v-checkbox>
                <v-text-field v-model="styling.selFilterHue" label="Hue-rotate" suffix="deg" filled></v-text-field>

                <v-checkbox
                  v-model="styling.selFilterInvertIsOn"
                  hide-details
                  class="auto shrink mr-2 mt-0"
                ></v-checkbox>
                <v-text-field v-model="styling.selFilterInvert" label="Invert" suffix="%" filled></v-text-field>
                <v-checkbox
                  v-model="styling.selFilterSepiaIsOn"
                  hide-details
                  class="auto shrink mr-2 mt-0"
                ></v-checkbox>
                <v-text-field v-model="styling.selFilterSepia" label="Sepia" suffix="%" filled></v-text-field>
              </v-col>

              <v-col>
                <v-checkbox
                  v-model="styling.selFilterOpacIsOn"
                  hide-details
                  class="auto shrink mr-2 mt-0"
                ></v-checkbox>
                <v-text-field v-model="styling.selFilterOpac" label="Opacity" suffix="%" filled></v-text-field>

                <v-checkbox
                  v-model="styling.selFilterSaturIsOn"
                  hide-details
                  class="auto shrink mr-2 mt-0"
                ></v-checkbox>
                <v-text-field v-model="styling.selFilterSatur" label="Saturate" suffix="%" filled></v-text-field>
                <v-checkbox
                  v-model="styling.selFilterGrayIsOn"
                  hide-details
                  class="auto shrink mr-2 mt-0"
                ></v-checkbox>
                <v-text-field v-model="styling.selFilterGray" label="Greyscale" suffix="%" filled></v-text-field>
              </v-col>

              <v-col>
                <v-checkbox
                  v-model="styling.selBgColorIsOn"
                  hide-details
                  label="Background Color"
                  class="auto shrink mr-2 mt-0"
                ></v-checkbox>
                <v-color-picker
                  class="mx-auto"
                  v-model="styling.selFilterBgColor"
                  :disabled="!styling.selBgColorIsOn"
                ></v-color-picker>
              </v-col>
              
            </v-row>

            <!-- Required Object Filter -->
            <div class="modal-header">
              <h5 class="modal-title">Filter on Object that is missing its required</h5>
            </div>

            <v-row>
              <v-col>
                <v-checkbox
                  v-model="styling.reqFilterBlurIsOn"
                  hide-details
                  class="auto shrink mr-2 mt-0"
                ></v-checkbox>
                <v-text-field v-model="styling.reqFilterBlur" label="Blur" suffix="px" filled></v-text-field>

                <v-checkbox
                  v-model="styling.reqFilterBrightIsOn"
                  hide-details
                  class="auto shrink mr-2 mt-0"
                ></v-checkbox>
                <v-text-field
                  v-model="styling.reqFilterBright"
                  label="Brightness"
                  suffix="%"
                  filled
                ></v-text-field>
                <v-checkbox
                  v-model="styling.reqFilterContIsOn"
                  hide-details
                  class="auto shrink mr-2 mt-0"
                ></v-checkbox>
                <v-text-field v-model="styling.reqFilterCont" label="Contrast" suffix="%" filled></v-text-field>
              </v-col>

              <v-col>
                <v-checkbox
                  v-model="styling.reqFilterHueIsOn"
                  hide-details
                  class="auto shrink mr-2 mt-0"
                ></v-checkbox>
                <v-text-field v-model="styling.reqFilterHue" label="Hue-rotate" suffix="deg" filled></v-text-field>

                <v-checkbox
                  v-model="styling.reqFilterInvertIsOn"
                  hide-details
                  class="auto shrink mr-2 mt-0"
                ></v-checkbox>
                <v-text-field v-model="styling.reqFilterInvert" label="Invert" suffix="%" filled></v-text-field>
                <v-checkbox
                  v-model="styling.reqFilterSepiaIsOn"
                  hide-details
                  class="auto shrink mr-2 mt-0"
                ></v-checkbox>
                <v-text-field v-model="styling.reqFilterSepia" label="Sepia" suffix="%" filled></v-text-field>
              </v-col>

              <v-col>
                <v-checkbox
                  v-model="styling.reqFilterOpacIsOn"
                  hide-details
                  class="auto shrink mr-2 mt-0"
                ></v-checkbox>
                <v-text-field v-model="styling.reqFilterOpac" label="Opacity" suffix="%" filled></v-text-field>

                <v-checkbox
                  v-model="styling.reqFilterSaturIsOn"
                  hide-details
                  class="auto shrink mr-2 mt-0"
                ></v-checkbox>
                <v-text-field v-model="styling.reqFilterSatur" label="Saturate" suffix="%" filled></v-text-field>
                <v-checkbox
                  v-model="styling.reqFilterGrayIsOn"
                  hide-details
                  class="auto shrink mr-2 mt-0"
                ></v-checkbox>
                <v-text-field v-model="styling.reqFilterGray" label="Greyscale" suffix="%" filled></v-text-field>
              </v-col>

              <v-col>
                <v-checkbox
                  v-model="styling.reqBgColorIsOn"
                  hide-details
                  label="Background Color"
                  class="auto shrink mr-2 mt-0"
                ></v-checkbox>
                <v-color-picker
                  class="mx-auto"
                  v-model="styling.reqFilterBgColor"
                  :disabled="!styling.reqBgColorIsOn"
                ></v-color-picker>
              </v-col>
            </v-row>
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


