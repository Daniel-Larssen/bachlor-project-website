<template>
  <div :style="rowBody">
    <v-card class="my-n2">
      <v-toolbar v-if="row.isEditModeOn" class="grey lighten-3" dense flat>
        <v-spacer></v-spacer>

        <v-tooltip bottom open-delay="1000">
          <template v-slot:activator="{ on }">
            <v-btn icon v-on="on">
              <v-icon @click="createNewObject(row)">mdi-file-plus</v-icon>
            </v-btn>
          </template>
          <span>Create New Object</span>
        </v-tooltip>

        <v-tooltip bottom open-delay="1000">
          <template v-slot:activator="{ on }">
            <v-btn icon v-on="on">
              <v-icon @click="currentComponent='appRequirement'">mdi-key-plus</v-icon>
            </v-btn>
          </template>
          <span>Create Requirement</span>
        </v-tooltip>
      </v-toolbar>

      <!-- First row of row-options -->
      <v-row mb-5 v-if="row.isEditModeOn">
        <!-- The upload of Image -->
     

          <!-- The  of Image -->
        <v-col cols="2" class="px-10">
          <v-col>
            <v-img
              @click="currentComponent='appImageUpload'"
              max-height="175"
              contain
              :src="row.image"
            ></v-img>
          </v-col>
          <v-btn
            class="mb-2"
            @click="currentComponent='appImageUpload'"
            style="color:black"
          >Change Image</v-btn>
        </v-col>
    

        <v-col cols="2">
          <v-select
            :items="templates"
            v-model="row.template"
            item-text="text"
            item-value="value"
            filled
            label="Template"
          ></v-select>

          <v-select
            :items="options"
            v-model="row.objectWidth"
            item-text="text"
            item-value="value"
            filled
            label="Objects Per Row"
          ></v-select>

          <v-text-field
            label="Allowed Choices"
            v-model="row.allowedChoices"
            placeholder="Placeholder"
            filled
          ></v-text-field>
        </v-col>

        <v-col cols="2">
          <v-text-field label="Row Title" v-model="row.title" placeholder="Placeholder" filled></v-text-field>

          <v-text-field label="Row Id" v-model="row.id" placeholder="Placeholder" filled></v-text-field>

          <v-text-field
            label="Selected Choices"
            v-model="row.currentChoices"
            placeholder="Placeholder"
            filled
          ></v-text-field>
        </v-col>

        <v-col>
          <v-textarea class="mr-3 pr-0" filled rows="11" label="Row Text" v-model="row.titleText"></v-textarea>
        </v-col>
      </v-row>

      <!-- Shows the requirements, allows the user to delete or change its id -->
      <v-row v-if="row.isEditModeOn">
        <v-col cols="3" v-for="(required, index) in row.requireds" :key="required.index">
          <v-card>
            <span v-if="required.type=='id'">
              <!-- Input for the id of the object that is required to be active. n === 2 ? 'Aligned flex item' : 'Flex item' -->
              <v-text-field
                hide-details
                v-model="required.reqId"
                :label="required.required ? 'Selected Id' : 'Not Selected Id'"
                filled
              ></v-text-field>
              <v-btn @click="deleteEvent(index, row.requireds)" style="color:black">Delete</v-btn>
            </span>

            <span v-else>
              <v-select
                hide-details
                :items="pointTypes"
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
              <v-btn @click="deleteEvent(index, row.requireds)" style="color:black">Delete</v-btn>
            </span>
          </v-card>
        </v-col>
      </v-row>
    </v-card>

    <!-- Preview and editable objects -->
    <span>
      <!-- The templates of the preview, show if !isEditModeOn and all requireds is selected. -->
      <div :style="rowBackground" v-if="!row.isEditModeOn && checkRequireds()">
        <!-- The div that will show of the preview -->
        <div class="col nopadding" v-if="row.template == 1">
          <img :style="rowImage" :src="row.image" />
          <h2 :style="rowTitle" class="mb-0" v-html="row.title" v-if="row.title !== ''"></h2>
          <p :style="rowText" class="mb-0" v-html="row.titleText" v-if="row.titleText !== ''"></p>
        </div>

        <!-- The div that will show of the preview -->
        <div class="row nopadding" v-if="row.template == 2">
          <div class="col-6 nopadding">
            <h2 :style="rowTitle" class="mb-0" v-html="row.title" v-if="row.title !== ''"></h2>
            <p :style="rowText" class="mb-0" v-html="row.titleText" v-if="row.titleText !== ''"></p>
          </div>
          <div class="col-6 nopadding">
            <img :style="rowImage" :src="row.image" />
          </div>
        </div>

        <!-- The div that will show of the preview -->
        <div class="row nopadding" v-if="row.template == 3">
          <div class="col-6 nopadding">
            <img :style="rowImage" :src="row.image" />
          </div>
          <div class="col-6 nopadding">
            <h2 :style="rowTitle" class="mb-0" v-html="row.title" v-if="row.title !== ''"></h2>
            <p :style="rowText" class="mb-0" v-html="row.titleText" v-if="row.titleText !== ''"></p>
          </div>
        </div>

        <!-- The div that will show of the preview -->
        <div class="col nopadding" v-if="row.template == 4">
          <h2 :style="rowTitle" class="mb-0" v-if="row.title !== ''">>{{ row.title}}</h2>
          <p :style="rowText" class="mb-0" v-html="row.titleText" v-if="row.titleText !== ''"></p>
          <img :style="rowImage" :src="row.image" />
        </div>
      </div>

      <!-- Where the object-components are created. -->
      <!-- If objectWidth in the object is empty, use the row.objectWidth -->
      <div class="display-flex row objectRow">
        <span
          :class="object.objectWidth == '' ? row.objectWidth : object.objectWidth"
          class="nopadding"
          v-for="object in row.objects"
          :key="object.index"
        >
          <AppObject
            :isEditModeOn="row.isEditModeOn"
            :activated="activated"
            :checkRequiredsRow="checkRequireds"
            :object="object"
            :row="row"
            :objects="row.objects"
            @objectWasChanged="object = $event"
            @activatedWasChanged="$store.state.app.activated = $event"
          ></AppObject>
        </span>
      </div>
    </span>

    <!-- This is the holder that holds the requirement-component -->
    <component
      :is="currentComponent"
      :row="row"
      @rowWasChanged="row = $event"
      @cleanCurrentComponent="currentComponent = $event"
    ></component>
  </div>
</template>

<script>
// The Picture Upload Component.
import PictureInput from "vue-picture-input";
// The List Objects.
import AppObject from "./Object.vue";
// Holds the buttons for adding requirements.
import AppRequirement from "./row/Requirement.vue";

import AppImageUpload from "./ImageUpload.vue";


export default {
  props: {
    row: Object
  },
  data: function() {
    return {
      // The select that decides how many objects will stand side by side.
      options: [
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
      // The select that decides the template of the row.
      templates: [
        { text: "Image Top", value: "1" },
        { text: "Image Right", value: "2" },
        { text: "Image Left", value: "3" }, // 5 per row.
        { text: "Image Bottom", value: "4" }
      ],
      // Is edit mode on for this row?
      isEditModeOn: true,
      // The current opened component in the row.
      currentComponent: ""
    };
  },
  components: {
    PictureInput,
    AppObject,
    AppRequirement,
    AppImageUpload
  },
  computed: {
    // Computes the styles for the title-text and the under-text
    // Collects styling from Store, where it is builded.
    rowTitle() {
      return this.$store.getters.rowTitle;
    },
    rowBody() {
      return this.$store.getters.rowBody;
    },
    rowText() {
      return this.$store.getters.rowText;
    },
    rowBackground() {
      return this.$store.getters.rowBackground;
    },
    rowImage() {
      return this.$store.getters.rowImage;
    },
    rows() {
      return this.$store.state.app.rows;
    },
    pointTypes() {
      return this.$store.state.app.pointTypes;
    },
    activated() {
      return this.$store.state.app.activated;
    }
  },
  methods: {
    // TODO Is mutating outside of store
    // Changes the stored image when a image is uploaded.
    // Creates a new object in the row.
    createNewObject() {
      // Creates the id
      var text = "";
      var charset = "abcdefghijklmnopqrstuvwxyz0123456789";
      for (var i = 0; i < 4; i++)
        text += charset.charAt(Math.floor(Math.random() * charset.length));

      this.row.objects.push({
        id: text,
        title: "The Object",
        text:
          "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
        image: "",
        template: 1,
        objectWidth: "",
        isActive: false,
        requireds: [], // Holds the required's.
        addons: [], // Holds the created addons.
        scores: [] // Holds the created scores.
      });
    },
    // Checks if the id's and points allow this row to be selected.
    checkRequireds() {
      // If the row has requireds that have yet to be selected.
      // Needs to run trough all the requireds

      for (var i = 0; i < this.row.requireds.length; i++) {
        // Is in the array.

        if (this.row.requireds[i].required) {
          if (
            !this.activated.includes(this.row.requireds[i].reqId) &&
            this.row.requireds[i].type == "id"
          )
            return false;
          // The Requirment is a minimum sum of points.
          else
            for (let i = 0; i < this.row.requireds.length; i++) {
              // Needs to run trough all the pointtypes
              for (let o = 0; o < this.pointTypes.length; o++) {
                // Is in the array and is of requiredf type 'points'.
                if (
                  this.row.requireds[i].reqId == this.pointTypes[o].id &&
                  this.row.requireds[i].type == "points"
                ) {
                  // If the points in the point-type is more than the starting-sum.
                  if (
                    this.row.requireds[i].reqPoints <
                    this.pointTypes[o].startingSum
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
            this.activated.includes(this.row.requireds[i].reqId) &&
            this.row.requireds[i].type == "id"
          )
            return false;
          // The requirement is a maximum amoun of points.
          else if (this.row.requireds[i].type == "points")
            // Needs to run trough all the requireds to check for points.
            for (let i = 0; i < this.row.requireds.length; i++) {
              // Needs to run trough all the requireds
              for (let o = 0; o < this.pointTypes.length; o++) {
                // Is in the array and is of requiredf type 'points'.
                if (
                  this.row.requireds[i].reqId == this.pointTypes[o].id &&
                  this.row.requireds[i].type == "points"
                ) {
                  // If the required points is more or equal to the starting-sum
                  if (
                    this.row.requireds[i].reqPoints >=
                    this.pointTypes[o].startingSum
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
    // Removes a object from a array, the parameter is the objects index and the array that holds it.
    deleteEvent: function(index, array) {
      array.splice(index, 1);
    },
    onImageChange(image) {
      this.row.image = image;
    },
    onImageRemoval() {
      this.row.image = "";
    }
  }
};
</script>

<style scoped>
.btn {
  margin-bottom: 5px;
}

.margin {
  margin-top: 5px;
  margin-bottom: 5px;
}
</style>


