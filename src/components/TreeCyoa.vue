<template>
  <v-app id="inspire">
    <v-navigation-drawer v-model="drawer" app clipped>
      <v-list dense>
        <v-list-item link @click="isFileOpen = 'diary'">
          <v-list-item-action>
            <v-icon>mdi-book-open-outline</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Project Diary</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item link @click="isFileOpen = 'file'">
          <v-list-item-action>
            <v-icon>mdi-file-multiple-outline</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Files</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item link @click="isFileOpen = 'other'">
          <v-list-item-action>
            <v-icon>mdi-delete-outline</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Other</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar app clipped-left>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-toolbar-title>Daniel Larssen's Project Page</v-toolbar-title>
    </v-app-bar>

    <v-content>
      <v-container v-if="isFileOpen == 'diary'" fluid class="pt-0">
        <v-row>
          <v-col v-for="input in inputs" :key="input.index" cols="4">
            <v-card class="mt-0">
              <v-card-text class="pb-0 headline" v-html="input.title"></v-card-text>
              <v-card-text class="pb-0 subtitle" v-html="input.date"></v-card-text>

              <v-card-actions class="mt-n12">
                <v-spacer></v-spacer>

                <v-btn icon @click="input.showText = !input.showText">
                  <v-icon>{{ show ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
                </v-btn>
              </v-card-actions>

              <v-expand-transition>
                <div v-show="input.showText">
                  <v-divider></v-divider>

                  <v-card-text v-html="input.text"></v-card-text>
                </div>
              </v-expand-transition>
            </v-card>
          </v-col>

          <v-col cols="4"></v-col>
          <v-col cols="4"></v-col>
          <v-col cols="4"></v-col>
          <v-col cols="4"></v-col>
          <v-col cols="4"></v-col>
          <v-col cols="4"></v-col>
        </v-row>
      </v-container>

      <v-container v-if="isFileOpen == 'file'" fluid class="pt-0">
        <v-row>
          <v-col v-for="input in files" :key="input.index" cols="4">
            <v-card class="mt-0">
              <v-card-text class="pb-0 headline" v-html="input.title"></v-card-text>
              <v-card-text class="pb-0 subtitle" v-html="input.date"></v-card-text>

              <v-card-actions class="mt-n12">
                <v-spacer></v-spacer>

                <v-btn icon @click="input.showText = !input.showText">
                  <v-icon>{{ show ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
                </v-btn>
              </v-card-actions>

              <v-expand-transition>
                <div v-show="input.showText">
                  <v-divider></v-divider>

                  <a></a>
                  <v-card-text v-html="input.text"></v-card-text>
                </div>
              </v-expand-transition>
            </v-card>
          </v-col>
        </v-row>
      </v-container>

      <v-container v-if="isFileOpen == 'other'" fluid class="pt-0">
        <v-row>
          <v-col cols="4" align-self="center">
            <v-card elevation="12">
              <iframe
                class="ml-12 pl-12"
                src="http://free.timeanddate.com/countdown/i7414tql/n3697/cf100/cm0/cu3/ct0/cs0/ca0/co1/cr1/ss0/cacfff/cpcfff/pc424242/tcfbd9e8/fn2/fs110/szw320/szh135/tatTime%20Until%20Project%20End/tacfff/tptProject%20Was%20Finished/tpcfff/iso2020-05-25T14:00:00"
                allowtransparency="true"
                frameborder="0"
                width="320"
                height="135"
              ></iframe>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-content>

    <v-footer app>
      <span style="font-size:10px;" class="pa-0">Last updated 25.05.2020</span>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  props: {
    source: String
  },
  data: () => ({
    drawer: null,
    show: false,
    isFileOpen: "diary",
    inputs: [
      {
        showText: false,
        title: "Project Kick-off",
        text:
          "The project kick-off was today, and we were given information about the plan forwards, I've worked " + 
          "on and finished the Project outline, then I made this repository and placed it on Render. Writing" +
          " the outline gave me a better idea of what I want to achieve while developing the project. I also " + 
          "got confirmation that I could write the documentation in English and that I can do the project solo." +
          " <br><br>Tomorrow I will continue on the Website and begin working on the project description.",
        date: "14/01-2020"
      },
      {
        showText: false,
        title: "Project Outline Delivered",
        text:
          "Project outline was delivered today, not much more to say about it.",
        date: "16/01-2020"
      },
      {
        showText: false,
        title: "Project Description Delivered",
        text:
          "The project description has been delivered, both it and the outline can be found in 'Files'.",
        date: "23/01-2020"
      },
      {
        showText: false,
        title: "Project Milestone One Presentation",
        text:
          "Added the first presentation to 'Files', and the first phase is more or less over, will create the viewer and post the alpha near the end of the week.",
        date: "03/02-2020"
      },
      {
        showText: false,
        title: "Project Milestone Two Presentation",
        text:
          "Added the second presentation to 'Files', and the first phase is more or less over, will work on updating the website to make it more user friendly and post the Beta soon.",
        date: "03/02-2020"
      },
      {
        showText: false,
        title: "Project Milestone Three Presentation",
        text:
          "Added the third presentation to 'Files'.",
        date: "29/04-2020"
      },
      {
        showText: false,
        title: "Viewer and Desktop Application",
        text:
          "Added it to files if you want to check them out, the rar-file holds the unpacked version, the website build, the viewer, and the exe-version.",
        date: "25/05-2020"
      },
      {
        showText: false,
        title: "Project Report is delivered",
        text:
          "Added it to 'Files'.",
        date: "25/05-2020"
      },
    ],
    files: [
      {
        showText: false,
        title: "Project Outline",
        text: '<a href="https://1drv.ms/w/s!AvO53xzZqujui3_r_mV8n76vxZPL?e=pFlZ3j">Project Outline</a>',
        date: ""
      },
      {
        showText: false,
        title: "Project Description",
        text: '<a href="https://1drv.ms/w/s!AvO53xzZqujujALq3SGa21wesz-g?e=Io3CCl">Project Description</a>',
        date: ""
      },
      {
        showText: false,
        title: "First Presentation",
        text: '<a href="https://docs.google.com/presentation/d/1Nv5AHlIQu1A9WgvnBtMERYS89gc985TU_sMofWY-kdM/edit?usp=sharing">First Presentation</a>',
        date: ""
      },
      {
        showText: false,
        title: "Second Presentation",
        text: '<a href="https://docs.google.com/presentation/d/1UBaFMmFQMg99WruYlMTFOasMB8BXKHWpmLeeswgnS9M/edit?usp=sharing">Second Presentation</a>',
        date: ""
      },
      {
        showText: false,
        title: "Third Presentation",
        text: '<a href="https://docs.google.com/presentation/d/1z4xxR_-zzsA9pSvkwjp1-3IxBTRe082IP0OAkFfOHJI/edit?usp=sharing">Third Presentation</a>',
        date: ""
      },
      {
        showText: false,
        title: "Desktop Application and Viewer",
        text: '<a href="https://mega.nz/file/ii5BiA6B#TC6FdZd_TjfFw8Tj4vhEqlwjZJo5i1PPI_A99D89sKQ">Desktop Application and Viewert<a>',
        date: ""
      },
      {
        showText: false,
        title: "Full Project Report",
        text: '<a href="https://1drv.ms/w/s!AvO53xzZqujujQP2MDyYuIh5t6No?e=vUrE53">Full Project Report<a>',
        date: ""
      }
    ]
  }),
  created() {
    this.$vuetify.theme.dark = true;
  }
};
</script>