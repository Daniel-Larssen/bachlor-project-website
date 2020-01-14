<template>
  <span>
    <!-- Will only show when the Boolean isEditModeOn is true. -->

    <v-row v-if="isEditModeOn">
      <v-card class="ma-1 my-n2" outlined>
        <!-- v-btn that creates a new required in the object -->
        <v-row class="mb-n8">
          <v-col cols="3" class="pt-6">
            <v-tooltip bottom open-delay="1000">
              <template v-slot:activator="{ on }">
                <v-btn icon v-on="on">
                  <v-icon x-large @click="moveObjectUp()">mdi-chevron-left</v-icon>
                </v-btn>
              </template>
              <span>Move Left</span>
            </v-tooltip>
          </v-col>

          <!-- Shows the id of the user -->
          <v-col cols="6">
            <v-text-field hide-details v-model="object.id" label="Object Id" filled></v-text-field>
          </v-col>

          <v-col cols="3" class="pt-6">
            <v-tooltip bottom open-delay="1000">
              <template v-slot:activator="{ on }">
                <v-btn icon v-on="on">
                  <v-icon x-large @click="moveObjectDown()">mdi-chevron-right</v-icon>
                </v-btn>
              </template>
              <span>Move Right</span>
            </v-tooltip>
          </v-col>
        </v-row>

        <!-- The  of Image -->
        <v-col cols="12" class="px-10">
          <v-col>
            <v-img
              @click="currentComponent='appImageUpload'"
              max-height="175"
              contain
              :src="object.image"
            ></v-img>
          </v-col>
          <v-btn
            class="mb-2"
            @click="currentComponent='appImageUpload'"
            style="color:black"
          >Change Image</v-btn>
        </v-col>

        <v-col cols="12" class="pb-0">
          <v-text-field class="mb-n3" v-model="object.title" label="Object Title" filled></v-text-field>
          <v-textarea filled v-model="object.text" label="Object Text"></v-textarea>
        </v-col>

        <v-row class="pt-0">
          <v-col cols="12" class="mt-n6 mb-n8">
            <v-select
              hide-details
              class="pb-4"
              :items="templates"
              v-model="object.template"
              item-text="text"
              item-value="value"
              filled
              label="Template"
            ></v-select>
            <v-select
              :items="options"
              v-model="object.objectWidth"
              item-text="text"
              item-value="value"
              filled
              label="Object Width"
            ></v-select>
          </v-col>

          <v-col>
            <v-btn
              class="mb-2"
              @click="currentComponent='appRequirement'"
              style="color:black"
            >Requirement</v-btn>

            <!-- Adds a addon to the object -->
            <v-btn @click="createNewAddon()" style="color:black">Add-on</v-btn>
          </v-col>

          <v-col>
            <!-- Adds a score to the object -->
            <v-btn class="mb-2" @click="createNewScore()" style="color:black">Score</v-btn>

            <!-- v-btn that creates a new required in the object -->
            <v-btn @click="deleteObject()" style="color:black">Delete</v-btn>
          </v-col>
        </v-row>

        <v-expansion-panels multiple accordion>
          <v-expansion-panel>
            <v-expansion-panel-header>Scores: {{ object.scores.length }}</v-expansion-panel-header>
            <v-expansion-panel-content>
              <!-- Lists up the scores that the object holds. -->
              <v-col
                cols="12"
                class="pa-0"
                v-for="(score, index) in object.scores"
                :key="score.index"
              >
                <ObjectScore
                  :isEditModeOn="isEditModeOn"
                  :app="app"
                  :score="score"
                  @scoreWasChanged="score = $event"
                ></ObjectScore>

                <v-row class="py-0">
                  <v-col cols="6" class="py-0 d-flex justify-center">
                    <v-checkbox
                      v-model="score.showScore"
                      label="Show Score?"
                      class="justify-center shrink mr-2 mt-0"
                    ></v-checkbox>
                  </v-col>
                  <v-col cols="6" class="py-0">
                    <v-btn @click="deleteEvent(index, object.scores)" style="color:black">Delete</v-btn>
                  </v-col>
                </v-row>
              </v-col>
            </v-expansion-panel-content>
          </v-expansion-panel>

          <v-expansion-panel>
            <v-expansion-panel-header>Addons: {{ object.addons.length }}</v-expansion-panel-header>
            <v-expansion-panel-content>
              <!-- Lists up the addons that the object holds. -->
              <v-col
                cols="12"
                class="pa-0"
                v-for="(addon, index) in object.addons"
                :key="addon.index"
              >
                <ObjectAddon
                  :isEditModeOn="isEditModeOn"
                  :addon="addon"
                  @addonWasChanged="addon = $event"
                ></ObjectAddon>
                <v-btn
                  class="mt-n4"
                  @click="deleteEvent(index, object.addons)"
                  style="color:black"
                >Delete</v-btn>
              </v-col>
            </v-expansion-panel-content>
          </v-expansion-panel>

          <v-expansion-panel>
            <v-expansion-panel-header>Requirements: {{ object.requireds.length }}</v-expansion-panel-header>
            <v-expansion-panel-content>
              <!-- Shows the requirements, allows the user to delete or change its id -->
              <v-row class="pa-0">
                <v-col
                  cols="6"
                  class="pa-2"
                  v-for="(required, index) in object.requireds"
                  :key="required.index"
                >
                  <v-card>
                    <span v-if="required.type=='id'">
                      <!-- Input for the id of the object that is required to be active. n === 2 ? 'Aligned flex item' : 'Flex item' -->
                      <v-text-field
                        hide-details
                        v-model="required.reqId"
                        :label="required.required ? 'Selected Id' : 'Not Selected Id'"
                        filled
                      ></v-text-field>
                      <v-btn
                        @click="deleteEvent(index, object.requireds)"
                        class="pa-0"
                        style="color:black"
                      >Delete</v-btn>
                    </span>

                    <span v-else>
                      <v-select
                        hide-details
                        :items="app.pointTypes"
                        v-model="required.reqId"
                        item-text="name"
                        item-value="id"
                        filled
                        label="Point Type"
                      ></v-select>

                      <v-text-field
                        hide-details
                        v-model="required.reqPoints"
                        :label="required.required ? 'More Than' : 'Less Than'"
                        filled
                      ></v-text-field>

                      <v-btn
                        @click="deleteEvent(index, object.requireds)"
                        style="color:black"
                      >Delete</v-btn>
                    </span>
                  </v-card>
                </v-col>
              </v-row>
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>
      </v-card>
    </v-row>

    <!-- Preview and templates -->
    <span
      class="row zeroPadding"
      :style="objectBackground"
      v-else-if="checkRequiredsRow()"
      @click="activateObject()"
    >
      <!-- Template 1 - Picture on top. -->
      <span class="mb-0" v-if="object.template == 1">
        <img :style="objectImage" :src="object.image" />

        <h3 class="col-12 mb-0" :style="objectTitle" v-html="object.title"></h3>

        <!-- Lists up all of the Scores added to the object. -->
        <v-col class="py-0" v-for="score in object.scores" :key="score.index">
          <ObjectScore
            v-if="score.showScore"
            :isEditModeOn="isEditModeOn"
            :score="score"
            @scoreWasChanged="score = $event"
          ></ObjectScore>
        </v-col>

        <!-- The text of the object. -->
        <p
          class="my-0"
          style="white-space: pre-line;"
          v-if="object.text !== ''"
          :style="objectText"
        >{{ object.text }}</p>

        <!-- Lists up the addons that the object holds. -->
        <v-col v-for="addon in object.addons" :key="addon.index">
          <ObjectAddon
            :isEditModeOn="isEditModeOn"
            :addon="addon"
            @addonWasChanged="addon = $event"
          ></ObjectAddon>
        </v-col>
      </span>

      <!-- Template 2 - Picture on left side. -->
      <span class="row nopadding mb-0" v-else-if="object.template == 2">
        <!-- The object choice in the preview. -->
        <span class="col nopadding">
          <img :style="objectImage" :src="object.image" />
        </span>

        <span class="col">
          <h3 :style="objectTitle" v-html="object.title"></h3>

          <!-- Lists up all of the Scores added to the object. -->
          <div v-for="score in object.scores" :key="score.index">
            <ObjectScore
              :isEditModeOn="isEditModeOn"
              :score="score"
              @scoreWasChanged="score = $event"
            ></ObjectScore>
          </div>

          <!-- The text of the object. -->
          <p style="white-space: pre-line;" :style="objectText">{{ object.text }}</p>
        </span>

        <!-- Lists up the addons that the object holds. -->
        <div v-for="addon in object.addons" :key="addon.index">
          <ObjectAddon
            :isEditModeOn="isEditModeOn"
            :addon="addon"
            @addonWasChanged="addon = $event"
          ></ObjectAddon>
        </div>
      </span>

      <!-- Template 3 - Picture on right side. -->
      <span class="row nopadding mb-0" v-else-if="object.template == 3">
        <span class="col">
          <h3 :style="objectTitle" v-html="object.title"></h3>

          <!-- Lists up all of the Scores added to the object. -->
          <div v-for="score in object.scores" :key="score.index">
            <ObjectScore
              :isEditModeOn="isEditModeOn"
              :score="score"
              @scoreWasChanged="score = $event"
            ></ObjectScore>
          </div>

          <!-- The text of the object. -->
          <p style="white-space: pre-line;" :style="objectText">{{ object.text }}</p>
        </span>

        <!-- The object choice in the preview. -->
        <span class="col nopadding">
          <img :style="objectImage" :src="object.image" />
        </span>

        <!-- Lists up the addons that the object holds. -->
        <div v-for="addon in object.addons" :key="addon.index">
          <ObjectAddon
            :isEditModeOn="isEditModeOn"
            :addon="addon"
            @addonWasChanged="addon = $event"
          ></ObjectAddon>
        </div>
      </span>
    </span>

    <!-- This is the holder that holds the requirement-component -->
    <component
      :is="currentComponent"
      :row="object"
      :object="row"
      @rowWasChanged="object = $event"
      @cleanCurrentComponent="currentComponent = $event"
    ></component>
  </span>
</template>

<script>
import PictureInput from "vue-picture-input";
// The Addon under objects.
import ObjectAddon from "./ObjectAddon.vue";
// The Score under objects.
import ObjectScore from "./ObjectScore.vue";
// Holds the buttons for adding requirements.
import AppRequirement from "./row/Requirement.vue";
// Image Upload.
import AppImageUpload from "./ImageUpload.vue";

export default {
  props: {
    object: Object,
    objects: Array,
    isEditModeOn: Boolean,
    activated: Array,
    row: Object
  },
  data: function() {
    return {
      options: [
        { text: "Row", value: "" },
        { text: "1", value: "col-md-12" },
        { text: "2", value: "col-md-6" },
        { text: "3", value: "col-md-4" },
        { text: "4", value: "col-md-3" },
        { text: "5", value: "w-20" },
        { text: "6", value: "col-md-2" },
        { text: "7", value: "w-14" },
        { text: "8", value: "w-12" },
        { text: "9", value: "w-11" },
        { text: "10", value: "w-10" },
        { text: "11", value: "w-9" },
        { text: "12", value: "col-md-1" }
      ],
      templates: [
        { text: "Image top", value: "1" },
        { text: "Image left", value: "2" },
        { text: "Image right", value: "3" }
      ],
      // The current opened component in the row.
      currentComponent: ""
    };
  },
  components: {
    PictureInput,
    ObjectAddon,
    ObjectScore,
    AppRequirement,
    AppImageUpload
  },
  computed: {
    // Used to decide the font of the objects title and text.
    objectTitle() {
      return (
        'font-family: "' +
        this.app.styling.objectTitle +
        '";' +
        "font-size: " +
        this.app.styling.objectTitleTextSize +
        "%;" +
        "color: " +
        this.app.styling.objectTitleColor +
        ";"
      );
    },
    objectText() {
      return (
        'font-family: "' +
        this.app.styling.objectText +
        '";' +
        "font-size: " +
        this.app.styling.objectTextTextSize +
        "%;" +
        "color: " +
        this.app.styling.objectTextColor +
        ";" +
        "padding: " +
        this.app.styling.objectTextPadding +
        "px;"
      );
    },
    // Used on the div that holds the preview of the object.
    objectBackground() {
      // Styles the color of the background, margin and selected color if selected.
      let style =
        (this.object.isActive && this.app.styling.selBgColorIsOn
          ? ""
          : 'background-image: url("' +
            this.app.styling.objectBackgroundImage +
            '");background-size: auto;') +
        (this.app.styling.objectBgColorIsOn
          ? "background-color: " + this.app.styling.objectBgColor + " ;"
          : "") +
        "margin:" +
        this.app.styling.objectMargin +
        "px; " +
        (this.object.isActive && this.app.styling.selBgColorIsOn
          ? "background-color: " +
            this.app.styling.selFilterBgColor +
            " !important;"
          : "");

      // Styles here the drop-shadow.
      style += "filter: ";

      if (this.app.styling.objectDropShadowIsOn) {
        style +=
          "drop-shadow(" +
          this.app.styling.objectDropShadowH +
          "px " +
          this.app.styling.objectDropShadowV +
          "px " +
          this.app.styling.objectDropShadowBlur +
          "px " +
          this.app.styling.objectDropShadowColor +
          ")";
        // TODO checkbox for the dropshadow color
      }

      // Needs to check if the object have all of the requireds.
      let hasRequireds = this.checkRequireds();

      // If the object is selected.
      if (this.object.isActive && hasRequireds) {
        style += this.app.styling.selFilterBlurIsOn
          ? "blur(" + this.app.styling.selFilterBlur + "px)"
          : "";
        style += this.app.styling.selFilterBrightIsOn
          ? "brightness(" + this.app.styling.selFilterBright + "%)"
          : "";
        style += this.app.styling.selFilterContIsOn
          ? "contrast(" + this.app.styling.selFilterCont + "%)"
          : "";
        style += this.app.styling.selFilterGrayIsOn
          ? "grayscale(" + this.app.styling.selFilterGray + "%)"
          : "";
        style += this.app.styling.selFilterHueIsOn
          ? "hue-rotate(" + this.app.styling.selFilterHue + "deg)"
          : "";
        style += this.app.styling.selFilterInvertIsOn
          ? "invert(" + this.app.styling.selFilterInvert + "%)"
          : "";
        style += this.app.styling.selFilterOpacIsOn
          ? "opacity(" + this.app.styling.selFilterOpac + "%)"
          : "";
        style += this.app.styling.selFilterSaturIsOn
          ? "saturate(" + this.app.styling.selFilterSatur + ")"
          : "";
        style += this.app.styling.selFilterSepiaIsOn
          ? "sepia(" + this.app.styling.selFilterSepia + "%)"
          : "";
      } else {
        // If the object does not have alle of the conditions.
        if (!hasRequireds) {
          style += this.app.styling.reqFilterBlurIsOn
            ? "blur(" + this.app.styling.reqFilterBlur + "px)"
            : "";
          style += this.app.styling.reqFilterBrightIsOn
            ? "brightness(" + this.app.styling.reqFilterBright + "%)"
            : "";
          style += this.app.styling.reqFilterContIsOn
            ? "contrast(" + this.app.styling.reqFilterCont + "%)"
            : "";
          style += this.app.styling.reqFilterGrayIsOn
            ? "grayscale(" + this.app.styling.reqFilterGray + "%)"
            : "";
          style += this.app.styling.reqFilterHueIsOn
            ? "hue-rotate(" + this.app.styling.reqFilterHue + "deg)"
            : "";
          style += this.app.styling.reqFilterInvertIsOn
            ? "invert(" + this.app.styling.reqFilterInvert + "%)"
            : "";
          style += this.app.styling.reqFilterOpacIsOn
            ? "opacity(" + this.app.styling.reqFilterOpac + "%)"
            : "";
          style += this.app.styling.reqFilterSaturIsOn
            ? "saturate(" + this.app.styling.reqFilterSatur + ")"
            : "";
          style += this.app.styling.reqFilterSepiaIsOn
            ? "sepia(" + this.app.styling.reqFilterSepia + "%)"
            : "";

          style += this.app.styling.reqBgColorIsOn
            ? ";background-color: " +
              this.app.styling.reqFilterBgColor +
              " !important"
            : ";background-color: " +
              this.app.styling.objectBgColor +
              " !important";
          // Turns the object inactive and removes the id from the activated-array.
          if (this.object.isActive) {
            this.turnInactive();
          }
        }
      }

      style += ";";

      return style;
    },
    // Used on the img in the object.
    objectImage() {
      return (
        "border-radius: " +
        this.app.styling.objectImageBorderRadius +
        "%;" +
        "width: 100%;"
      );
    },
    app() {
      return this.$store.state.app;
    }
  },
  watch: {
    object: {
      handler() {
        this.updateObject();
      },
      deep: true
    }
  },
  methods: {
    // Collects the id from the Select, and places it in the required's id.
    changedOption(event) {
      this.required.id =
        event.target.templates[event.target.templates.selectedIndex].text;
    },
    // Turns the object inactive and removes it from the activated-array.
    turnInactive() {
      this.object.isActive = false;
      this.activated.splice(this.activated.indexOf(this.object.id), 1);
    },
    // The Method that will create a new row.
    createNewAddon() {
      this.object.addons.push({
        id: "",
        title: "The Addon",
        text:
          "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.",
        template: "",
        image: ""
      });
      console.log(this.object.addons);
    },
    // The Method that creates new score.
    createNewScore() {
      this.object.scores.push({
        id: "",
        value: 0,
        type: "",
        beforeText: "Cost:",
        afterText: " Points",
        showScore: true // Shows the score if the checkbox is pressed.
      });
    },
    // The Method that will create a new has-requirement in a object.
    addNewRequired(object, type) {
      object.push({
        required: true,
        id: "",
        type: type,
        reqId: "",
        reqPoints: 0
      });
    },
    // The Method that will create a new not-requirement in a object.
    addNewRefused(object, type) {
      object.push({
        required: false,
        id: "",
        type: type,
        reqId: "",
        reqPoints: 0
      });
    },
    // Removes a object from a array, the parameter is the objects index and the array that holds it.
    deleteEvent: function(index, array) {
      array.splice(index, 1);
    },
    onImageChange(image) {
      console.log(image);
      this.object.image = image;

      if (this.$refs.pictureInput.image) {
        console.log("Picture loaded.");
      } else {
        console.log("FileReader API not supported: use the <form>, Luke!");
      }
    },
    onImageRemoval() {
      this.object.image = "";
    },
    // Will move the object up one in the array that holds it.
    moveObjectUp() {
      let index = this.objects.indexOf(this.object);
      if (index > 0) {
        let el = this.objects[index];
        this.$set(this.objects, index, this.objects[index - 1]);
        this.$set(this.objects, index - 1, el);
      }
    },
    // Will move the object down one in the array that holds it.
    moveObjectDown() {
      let index = this.objects.indexOf(this.object);
      if (index !== -1 && index < this.objects.length - 1) {
        let el = this.objects[index];
        this.$set(this.objects, index, this.objects[index + 1]);
        this.$set(this.objects, index + 1, el);
      }
    },
    // Deletes a row after the index is found.
    deleteObject() {
      this.objects.splice(this.objects.indexOf(this.object), 1);
    },

    // Checks if the id's and points allow this object to be selected.
    // TODO: Shorten this whole method down, merge the if's.
    checkRequireds() {
      // If the object has requireds that have yet to be selected.
      // Needs to run trough all the requireds
      for (var i = 0; i < this.object.requireds.length; i++) {
        // This happens when the object is of the type that will set HAS-requirement
        if (this.object.requireds[i].required) {
          // Is NOT in the array, is of type 'id'.
          if (
            !this.activated.includes(this.object.requireds[i].reqId) &&
            this.object.requireds[i].type == "id"
          )
            return false;
          // If the type of reqyired is'Points'
          else if (this.object.requireds[i].type == "points")
            // Needs to run trough all the requireds to check for points.
            for (let i = 0; i < this.object.requireds.length; i++) {
              // Needs to run trough all the requireds
              for (let o = 0; o < this.app.pointTypes.length; o++) {
                // Is in the array and is of requiredf type 'points'.
                if (
                  this.object.requireds[i].reqId == this.app.pointTypes[o].id &&
                  this.object.requireds[i].type == "points"
                ) {
                  // If there is more points than the
                  if (
                    this.object.requireds[i].reqPoints >
                    this.app.pointTypes[o].startingSum
                  ) {
                    return false;
                  }
                }
              }
            }
        }

        // This happens when the object is of the type that will set NOT-requirement

        if (!this.object.requireds[i].required) {
          // Is NOT in the array, is of type 'id'.
          if (
            this.activated.includes(this.object.requireds[i].reqId) &&
            this.object.requireds[i].type == "id"
          )
            return false;
          // If the type of reqyired is'Points'
          else if (this.object.requireds[i].type == "points")
            // Needs to run trough all the requireds to check for points.
            for (let i = 0; i < this.object.requireds.length; i++) {
              // Needs to run trough all the requireds
              for (let o = 0; o < this.app.pointTypes.length; o++) {
                // Is in the array and is of requiredf type 'points'.
                if (
                  this.object.requireds[i].reqId == this.app.pointTypes[o].id &&
                  this.object.requireds[i].type == "points"
                ) {
                  // If there is more points than the
                  if (
                    this.object.requireds[i].reqPoints <=
                    this.app.pointTypes[o].startingSum
                  ) {
                    return false;
                  }
                }
              }
            }
        }
      }
      return true;
    },
    // Checks if the id's and points allow this row to be selected.
    // TODO: This is in row too, should do something to only need one.
    // Checks if the id's and points allow this row to be selected.
    checkRequiredsRow() {
      // If the row has requireds that have yet to be selected.
      // Needs to run trough all the requireds

      for (var i = 0; i < this.row.requireds.length; i++) {
        // Is in the array.

        if (this.row.requireds[i].required) {
          if (
            !this.app.activated.includes(this.row.requireds[i].reqId) &&
            this.row.requireds[i].type == "id"
          )
            return false;
          // The Requirment is a minimum sum of points.
          else
            for (let i = 0; i < this.row.requireds.length; i++) {
              // Needs to run trough all the pointtypes
              for (let o = 0; o < this.app.pointTypes.length; o++) {
                // Is in the array and is of requiredf type 'points'.
                if (
                  this.row.requireds[i].reqId == this.app.pointTypes[o].id &&
                  this.row.requireds[i].type == "points"
                ) {
                  // If there is more points than the
                  if (
                    this.row.requireds[i].reqPoints <
                    this.app.pointTypes[o].startingSum
                  ) {
                    return false;
                  }
                }
              }
            }
        }

        // This happens when the object is of the type that will set NOT-requirement

        if (!this.row.requireds[i].required) {
          // Is NOT in the array, is of type 'id'.
          if (
            this.app.activated.includes(this.row.requireds[i].reqId) &&
            this.row.requireds[i].type == "id"
          )
            return false;
          // The requirement is a maximum amoun of points.
          else if (this.row.requireds[i].type == "points")
            // Needs to run trough all the requireds to check for points.
            for (let i = 0; i < this.row.requireds.length; i++) {
              // Needs to run trough all the requireds
              for (let o = 0; o < this.app.pointTypes.length; o++) {
                // Is in the array and is of requiredf type 'points'.
                if (
                  this.row.requireds[i].reqId == this.app.pointTypes[o].id &&
                  this.row.requireds[i].type == "points"
                ) {
                  // If there is more points than the
                  if (
                    this.row.requireds[i].reqPoints >=
                    this.app.pointTypes[o].startingSum
                  ) {
                    return false;
                  }
                }
              }
            }
        }
      }
      return true;
    },

    // When someone clicks on a object this process needs to happen.
    // 1. Change the isActivated in the object.
    // 2. Filter is added outside.
    // 3. Need to check if the rows allowedChoices is surpassed.
    // 4. Checks the requireds is in the activated-arrray.
    // 4. Checks scores and handles it.
    activateObject() {
      let hasRequireds = this.checkRequireds();

      // Will here run trugh al the scores, and check if there is enough
      // 1. Find the type of points and how many there is.
      // 2. take the points off, or add.

      // If hasRequireds is true, and currentchoices is not above allowedChoices.
      if (
        hasRequireds &&
        (this.row.currentChoices < this.row.allowedChoices ||
          this.row.allowedChoices == 0)
      ) {
        // If the array does not have this id-from before of.
        if (!this.activated.includes(this.object.id)) {
          // Adds the object-id into the

          for (var o = 0; o < this.object.scores.length; o++) {
            // Goes trough all of the scores and check which is fits.
            for (var x = 0; x < this.app.pointTypes.length; x++) {
              if (this.app.pointTypes[x].id == this.object.scores[o].id) {
                this.app.pointTypes[x].startingSum -= this.object.scores[
                  o
                ].value;
              }
            }
          }

          this.activated.push(this.object.id);
          this.row.currentChoices += 1;
        } else {
          for (let i = 0; i < this.object.scores.length; i++) {
            // Goes trough all of the scores and check which is fits.
            for (let x = 0; x < this.app.pointTypes.length; x++) {
              if (this.app.pointTypes[x].id == this.object.scores[i].id) {
                this.app.pointTypes[x].startingSum += parseInt(
                  this.object.scores[i].value
                );
              }
            }
          }

          // Delete the id from the activated array
          this.activated.splice(this.activated.indexOf(this.object.id), 1);
          this.row.currentChoices -= 1;
        }

        // Switches the isActive and updates the object.
        this.object.isActive = !this.object.isActive;
        this.updateActivated();

        // If the object.id is in the activated-array, but required is not there.
        // Turns the object off after removing the points.
      } else if (this.activated.includes(this.object.id)) {
        // Removes this id from the activated array.
        this.activated.splice(this.activated.indexOf(this.object.id), 1);

        for (let i = 0; i < this.object.scores.length; i++) {
          // Goes trough all of the scores and check which is fits.
          for (let x = 0; x < this.app.pointTypes.length; x++) {
            if (this.app.pointTypes[x].id == this.object.scores[i].id) {
              this.app.pointTypes[x].startingSum += parseInt(
                this.object.scores[i].value
              );
            }
          }
        }

        // Switches the isActive and updates the object.
        this.object.isActive = !this.object.isActive;
        this.updateActivated();
        this.row.currentChoices -= 1;
      } else {
        // Does not have the required, nothing happens.
      }
    },

    // Updates the the props in the object.
    updateObject() {
      this.$emit("objectWasChanged", this.object);
    },
    // Updates the list of activateds.
    updateActivated() {
      this.$emit("activatedWasChanged", this.activated);
    }
  }
};
</script>

<style scoped>
.btn {
  margin-top: 5px;
  margin-bottom: 5px;
  font-size: small;
}

.row {
  padding: 10px;
}

h3 {
  text-align: center;
}

.active {
  -webkit-filter: grayscale(100%);
  filter: grayscale(100%);
}
</style>


