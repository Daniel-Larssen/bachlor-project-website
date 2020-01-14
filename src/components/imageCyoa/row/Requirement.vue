<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" max-width="600px" @click:outside="cleanCurrentComponent">
      <v-card>
        <v-card-title class="headline">Create Requirement</v-card-title>

        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-btn
                  type="button"
                  class="btn"
                  @click="addNewRequired(row.requireds, 'points', true)"
                  style="color:black"
                >'More or equal to' point requirement</v-btn>
              </v-col>

              <v-col cols="12" pa="4">
                <v-btn
                  type="button"
                  class="btn"
                  @click="addNewRequired(row.requireds, 'id', true)"
                  style="color:black"
                >Add selected object requirement</v-btn>
              </v-col>
              <v-col cols="12">
                <v-btn
                  type="button"
                  class="btn"
                  @click="addNewRequired(row.requireds, 'points', false)"
                  style="color:black"
                >'Less Than' Point Requirement</v-btn>
              </v-col>
              <v-col cols="12">
                <v-btn
                  type="button"
                  class="btn"
                  @click="addNewRequired(row.requireds, 'id', false)"
                  style="color:black"
                >Add non-selected object requirement</v-btn>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" text @click="cleanCurrentComponent">Close</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
export default {
  props: {
    row: Object
  },
  data: function() {
    return {
      currentComponent: "",
      dialog: true
    };
  },
  components: {},
  methods: {
    cleanCurrentComponent() {
      this.$emit("cleanCurrentComponent", "");
    },
    // The Method that will create a new has-requirement in a object.
    addNewRequired(object, type, required) {
      object.push({
        required: required,
        id: "",
        type: type,
        reqId: "",
        reqPoints: 0
      });
    }
  }
};
</script>
