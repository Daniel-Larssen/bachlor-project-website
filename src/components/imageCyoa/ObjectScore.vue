<template>
  <v-col class="pa-0">
    <!-- Will only show when the Boolean isEditModeOn is true. -->
    <v-row class="pt-0" v-if="isEditModeOn">
      <v-col class="pb-0">
        <v-select
          :items="app.pointTypes"
          v-model="score.id"
          item-text="name"
          item-value="id"
          filled
          label="Template"
        ></v-select>
        <v-text-field class="my-n3" filled v-model="score.value" label="Value"></v-text-field>
      </v-col>

      <!-- Where the user places inn the value the object will cost/give -->
      <v-col class="pb-0">
        <v-text-field filled v-model="score.beforeText" label="Text Before"></v-text-field>
        <v-text-field filled class="my-n3" v-model="score.afterText" label="Text After"></v-text-field>
      </v-col>
    </v-row>
  
    <!-- Preview -->
    <v-col v-else-if="score.showScore" class=" pa-0">{{ score.beforeText }} {{ score.value }} {{ score.afterText }}</v-col>
  </v-col>
</template>

<script>
export default {
  props: {
    score: Object,
    isEditModeOn: Boolean,
    app: Object
  },
  data: function() {
    return {};
  },
  methods: {
    // Removes a object from a array, the parameter is the objects index and the array that holds it.
    deleteEvent: function(index, array) {
      array.splice(index, 1);
    },
    // Updates the object.
    updateObject() {
      this.$emit("scoreWasChanged", this.score);
    },
    // Collects the name from the Select, and places it in the score's name.
    changedOption(event) {
      this.score.name =
        event.target.options[event.target.options.selectedIndex].text;
    }
  }
};
</script>

<style scoped>
.btn {
  margin: 5px;
  font-size: small;
}

select {
  margin-top: 5px;
}

.row {
  padding: 10px;
}
</style>


