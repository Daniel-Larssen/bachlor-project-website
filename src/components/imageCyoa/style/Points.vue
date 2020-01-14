<template>
  <v-dialog scrollable v-model="dialog" max-width="800px" @click:outside="cleanCurrentComponent">
    <v-card>
      <v-card-title class="headline">Point Types</v-card-title>

      <v-card-text>
        <v-container>
          <v-col v-for="(point, index) in pointTypes" :key="point.index">
            <v-row>
              <v-col>
                <v-text-field hide-details v-model="point.id" label="Id" filled></v-text-field>
              </v-col>
              <v-col>
                <v-text-field hide-details v-model="point.name" label="Name" filled></v-text-field>
              </v-col>
              <v-col>
                <v-text-field hide-details v-model="point.startingSum" label="Starting Sum" filled></v-text-field>
              </v-col>

              <v-btn class="py-0" hide-details @click="deletePointsType(index, pointTypes)">Delete</v-btn>
            </v-row>
          </v-col>
        </v-container>
      </v-card-text>

      <v-card-actions>
        <v-col cols="6">
          <v-btn color="green darken-1" text @click="createNewPointType">Create new Point Type</v-btn>
        </v-col>
        <v-col cols="6">
          <v-btn color="green darken-1" text @click="cleanCurrentComponent">Close</v-btn>
        </v-col>
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
    pointTypes() {
      return this.$store.state.app.pointTypes;
    }
  },
  methods: {
    cleanCurrentComponent() {
      this.$emit("cleanCurrentComponent", "");
    },
    createNewPointType() {
      // Creates the id
      var text = "";
      var charset = "abcdefghijklmnopqrstuvwxyz0123456789";
      for (var i = 0; i < 2; i++)
        text += charset.charAt(Math.floor(Math.random() * charset.length));

      this.$store.commit({
        type: "addNewPointType",
        id: text,
        name: "Name",
        startingSum: 0
      });
    },
    deletePointsType() {
      this.$store.commit("deletePointType", this.pointTypes);
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


