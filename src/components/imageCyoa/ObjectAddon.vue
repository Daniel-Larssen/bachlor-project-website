<template>
  <span>
    <!-- Will only show when the Boolean isEditModeOn is true. -->
    <v-col v-if="isEditModeOn">
      <v-text-field v-model="addon.title"  filled label="Addon Title"></v-text-field>
      <v-textarea filled label="Addon Text" class="my-n3" v-model="addon.text"></v-textarea>
    </v-col>

    <!-- Preview -->
    <div v-else>
      <img :src="addon.image" />
      <h4>{{ addon.title }}</h4>
      <p>{{ addon.text }}</p>
    </div>
  </span>
</template>

<script>
export default {
  props: {
    addon: Object,
    isEditModeOn: Boolean
  },
  data: function() {
    return {};
  },

  methods: {
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
    // Updates the object.
    updateObject() {
      this.$emit("addonWasChanged", this.addon);
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
</style>


