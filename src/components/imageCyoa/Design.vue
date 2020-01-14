<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" max-width="600px" @click:outside="cleanCurrentComponent">
      <v-card>
        <v-card-title class="headline">Design</v-card-title>

        <v-card-text>
          <v-container>
            <v-row>
              <v-tooltip right open-delay="1000">
                <template v-slot:activator="{ on }">
                  <v-col cols="12">
                    <v-btn
                      v-on="on"
                      @click="currentComponent = 'appFilter'"
                      style="color:black"
                    >Manage Filters</v-btn>
                  </v-col>
                </template>
                <span>Here you can change the filters for choices that are selected<br> and the one's you dont have the requirements for.</span>
              </v-tooltip>

              <v-tooltip right open-delay="1000">
                <template v-slot:activator="{ on }">
                  <v-col cols="12">
                    <v-btn
                      v-on="on"
                      @click="currentComponent = 'appText'"
                      style="color:black"
                    >Manage Text</v-btn>
                  </v-col>
                </template>
                <span>Here you can change the size, font and <br>color of the text on titles and text.</span>
              </v-tooltip>

              <v-tooltip right open-delay="1000">
                <template v-slot:activator="{ on }">
                  <v-col cols="12">
                    <v-btn
                      v-on="on"
                      @click="currentComponent = 'appImage'"
                      style="color:black"
                    >Manage Images</v-btn>
                  </v-col>
                </template>
                <span>Here you can change the margin and padding<br> of images on rows and objects.</span>
              </v-tooltip>

              <v-tooltip right open-delay="1000">
                <template v-slot:activator="{ on }">
                  <v-col cols="12">
                    <v-btn
                      v-on="on"
                      @click="currentComponent = 'appBackground'"
                      style="color:black"
                    >Manage Background</v-btn>
                  </v-col>
                </template>
                <span>Here you can change the color and place images in <br>the background of rows, choices and the whole project.</span>
              </v-tooltip>

              <v-tooltip right open-delay="1000">
                <template v-slot:activator="{ on }">
                  <v-col cols="12">
                    <v-btn
                      v-on="on"
                      @click="currentComponent = 'appRowDesign'"
                      style="color:black"
                    >Manage Rows</v-btn>
                  </v-col>
                </template>
                <span>Here you can change the margin,<br> padding and drop-shadow on rows.</span>
              </v-tooltip>

              <v-tooltip right open-delay="1000">
                <template v-slot:activator="{ on }">
                  <v-col cols="12">
                    <v-btn
                      v-on="on"
                      @click="currentComponent = 'appObjectDesign'"
                      style="color:black"
                    >Manage Objects</v-btn>
                  </v-col>
                </template>
                <span>Here you can change the margin, <br>padding and drop-shadow on rows.</span>
              </v-tooltip>
            </v-row>
          </v-container>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" text @click="cleanCurrentComponent">Close</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <component
      v-bind:is="currentComponent"
      :currentComponent="currentComponent"
      @cleanCurrentComponent="currentComponent = $event"
    ></component>
  </v-row>
</template>

<script>
import Filter from "./style/Filter.vue";
import Text from "./style/Text.vue";
import Image from "./style/Image.vue";
import Background from "./style/Background.vue";
import ObjectDesign from "./style/ObjectDesign.vue";
import RowDesign from "./style/RowDesign.vue";

export default {
  data: function() {
    return {
      currentComponent: "",
      dialog: true
    };
  },
  components: {
    appFilter: Filter,
    appText: Text,
    appImage: Image,
    appBackground: Background,
    appObjectDesign: ObjectDesign,
    appRowDesign: RowDesign
  },
  methods: {
    cleanCurrentComponent() {
      this.$emit("cleanCurrentComponent", "");
    }
  }
};
</script>

<style>
</style>
