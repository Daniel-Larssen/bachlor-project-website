<template>
  
    <v-dialog v-model="dialog" max-width="1000px" @click:outside="cleanCurrentComponent">
      <v-card>
        <v-card-title class="headline">Objects</v-card-title>

        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="3">
              <picture-input
                ref="pictureInput"
                :hideChangeButton="true"
                removeButtonClass="v-btn v-btn--contained theme--light v-size--default"
                :removable="true"
                :zIndex="0"
                :crop="false"
   
                @change="onImageChange"
                @remove="onImageRemoval"
                :prefill="row.image"
                :custom-strings="{
                            upload: '<h1>Error!</h1>',
                            drag: 'Upload Image'
                        }"
              ></picture-input>

              <v-btn @click="cropImage" class="mb-2">
                Crop Image
              </v-btn>

              <v-text-field class=" mt-2" hide-details v-model="aspectHeight" filled label="Height Aspect"></v-text-field>
              <v-text-field class="mb-2" hide-details v-model="aspectWidth" filled label="Width Aspect"></v-text-field>

              <v-btn @click="ChangeAspect" >
                Change Aspect
              </v-btn>

              </v-col>

              <!-- TODO: Place an advanced-image-cropper here. -->
              <v-col cols="9">
                <cropper
                classname="cropper"
                ref="cropper"
                :src="row.image"
                :stencil-props="{
                  aspectRatio: aH/aW
                }"
                ></cropper>
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
// The component used to upload and Blob-ify an image.
import PictureInput from "vue-picture-input";

// Used to crop the image.
import { Cropper } from 'vue-advanced-cropper'

export default {
  props: {
    row: Object
  },
  data: function() {
    return {
      dialog: true,
      aspectHeight: this.row.defaultAspectHeight,
      aspectWidth: this.row.defaultAspectWidth,
      aH: this.row.defaultAspectHeight,
      aW: this.row.defaultAspectWidth
    };
  },
  components: {
    PictureInput,
    Cropper
  },
  computed: {
    // Collects styling from Store.
    styling() {
      return this.$store.state.app.styling;
    }
  },
  methods: {

    deleteEvent: function(index, array) {
      array.splice(index, 1);
    },
    onImageChange(image) {
      console.log(image);
      this.row.image = image;
      this.rowWasChanged();

      if (this.$refs.pictureInput.image) {
        console.log("Picture loaded.");
      } else {
        console.log("FileReader API not supported: use the <form>, Luke!");
      }
    },
    onImageRemoval() {
      this.row.image = "";
      this.rowWasChanged();
    },

    cleanCurrentComponent() {
      this.$emit("cleanCurrentComponent", "");
    },
    // Updates the list of activateds.
    rowWasChanged() {
      this.$emit("rowWasChanged", this.row);
    },
    cropImage() {
			const {coordinates, canvas} = this.$refs.cropper.getResult();
			this.coordinates = coordinates;
			// You able to do different manipulations at a canvas
			// but there we just get a cropped image
			this.row.image = canvas.toDataURL();
    },
    ChangeAspect() {
      this.aH = this.aspectHeight;
      this.aW = this.aspectWidth;
      this.row.defaultAspectWidth = this.aspectWidth;
      this.row.defaultAspectHeight = this.aspectHeight;
    }
  }
};
</script>

<style scoped>
.btn {
  margin: 5px;
  font-size: small;
}

.cropper {
	width: 100%;
	background: #DDD;
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


