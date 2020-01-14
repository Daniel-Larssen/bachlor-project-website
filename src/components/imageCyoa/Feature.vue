<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" max-width="600px" @click:outside="cleanCurrentComponent">
      <v-card>
        <v-card-title class="headline">Features</v-card-title>

        <v-card-text>
          <v-container>
            <v-row>

                <v-col cols="12">
                  <v-btn
                    @click="currentComponent = 'appPoints'"
                    style="color:black"
                  >Manage Points</v-btn>
                </v-col>

                <v-col cols="12">
                  <v-btn
                    @click="currentComponent = 'appVariables'"
                    style="color:black"
                  >Manage Variables</v-btn>
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
    
    <component v-bind:is="currentComponent" :currentComponent="currentComponent" @cleanCurrentComponent="currentComponent = $event"></component>

  </v-row>
</template>

<script>
 
import appPoints from "./style/Points.vue";
import appVariables from "./style/Variables.vue";

export default {
  data: function() {
    return {
        currentComponent: "",
        dialog: true
    };
  },
  components: {
    appPoints,
    appVariables
  },
  methods: {
    cleanCurrentComponent() {
      this.$emit("cleanCurrentComponent", "");
    },
  }
};
</script>

<style>

</style>
