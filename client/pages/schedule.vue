<template>
  <v-layout align-content-center justify-center>
    <v-flex md12>
      <v-stepper non-linear>
        <v-stepper-header>
          <v-stepper-step step="1" editable>Create class queries</v-stepper-step>
          <v-divider></v-divider>
          <v-stepper-step step="2" editable>View and add filters</v-stepper-step>
          <v-divider></v-divider>
          <v-stepper-step step="3" editable>Browse Schedules</v-stepper-step>
        </v-stepper-header>

        <v-stepper-items>
          <v-stepper-content step="1">
            <v-card color="lighten-1" class="mb-5">
               <form>
                <v-text-field
                  label="Minimum course number"
                  v-model="min_cnum"
                ></v-text-field>
                <v-text-field
                  label="Maximum course number"
                  v-model="max_cnum"
                ></v-text-field>
                <br>
                <v-select
                  label="Select"
                  v-bind:items="subject_list"
                  v-model="active_subj"
                  multiple
                  chips
                  hint="Select Subjects"
                  persistent-hint
                ></v-select>
                <v-select
                  label="Select"
                  v-bind:items="attribute_list"
                  v-model="active_attr"
                  multiple
                  chips
                  hint="Select Attributes"
                  persistent-hint
                ></v-select>

                <v-btn @click="submit" color="green">Add</v-btn>
                <v-btn @click="clear" color="red">Clear</v-btn>
              </form>
              
            </v-card>
            
          </v-stepper-content>
          <v-stepper-content step="2">
            <v-card color="lighten-1" class="mb-5">  
               <v-layout row wrap>
                <v-flex xs11 sm5>
                  <v-menu
                    lazy
                    :close-on-content-click="false"
                    v-model="menu1"
                    transition="scale-transition"
                    offset-y
                    full-width
                    :nudge-right="40"
                    max-width="290px"
                    min-width="290px"
                  >
                    <v-text-field
                      slot="activator"
                      label="Earliest Class Time"
                      v-model="min_time"
                      prepend-icon="access_time"
                      readonly
                    ></v-text-field>
                    <v-time-picker v-model="min_time" autosave format="24hr"></v-time-picker>
                  </v-menu>
                </v-flex>
                <v-spacer></v-spacer>
                <v-flex xs11 sm5>
                  <v-menu
                    lazy
                    :close-on-content-click="false"
                    v-model="menu2"
                    transition="scale-transition"
                    offset-y
                    full-width
                    :nudge-right="40"
                    max-width="290px"
                    min-width="290px"
                  >
                    <v-text-field
                      slot="activator"
                      label="Latest Class Time"
                      v-model="max_time"
                      prepend-icon="access_time"
                      readonly
                    ></v-text-field>
                    <v-time-picker v-model="max_time" autosave format="24hr"></v-time-picker>
                  </v-menu>
                </v-flex>
                <v-flex xs12 sm4 md4 pl-2>
                 <v-switch label="monday"
                    v-model="monday"
                    hide-details></v-switch>
                 <v-switch label="tuesday"
                    v-model="tuesday"
                    hide-details></v-switch>
                  <v-switch label="wednesday"
                    v-model="wednesday"
                    hide-details></v-switch>
                  <v-switch label="thursday"
                    v-model="thursday"
                    hide-details></v-switch>
                  <v-switch label="friday"
                    v-model="friday"
                    hide-details></v-switch>
                  <v-switch label="saturday"
                    v-model="saturday"
                    hide-details></v-switch>
                  <v-switch label="sunday"
                    v-model="sunday"
                    hide-details></v-switch>
                  </v-flex>
              </v-layout>
              <h2 v-if="queries.length == 0">No class queries</h2>
               <v-list two-line>
                <template v-for="(item, index) in queries">
                  <v-list-tile
                    avatar
                    ripple
                    :key="index"
                  >
                    <v-list-tile-content>
                      <v-list-tile-title>Subjects:{{ item.subjects.toString() }}</v-list-tile-title>
                      <v-list-tile-sub-title class="grey--text text--darken-4">Arritbutes: {{ item.attributes.toString() }}</v-list-tile-sub-title>
                      <v-list-tile-sub-title>Course Number Range: {{ item.min_cnum }} - {{item.max_cnum}}</v-list-tile-sub-title>
                    </v-list-tile-content>
                    <v-list-tile-action>
                      <v-btn color="red" @click="queries.splice(index, 1)"> Remove </v-btn>
                    </v-list-tile-action>
                  </v-list-tile>
                  <v-divider v-if="index + 1 < queries.length" :key="index"></v-divider>
                </template>
              </v-list>

              <v-btn color="green" v-if="queries.length != 0" @click="make_schedule_request().then(change_live_result)"> Submit </v-btn>
            </v-card>
          </v-stepper-content>
          
          <v-stepper-content step="3">
            <v-card color="lighten-1" class="mb-5">
              <v-expansion-panel expand>
                <v-expansion-panel-content v-for="(course, i) in live_result" :key="i">
                  <div slot="header">{{course.subject}}</div>
                  <v-card>
                    <v-card-title primary-title>
                      <div>
                        <h3 class="headline mb-0">{{course.title}}</h3>
                        <div>CRN: {{course.crn}}<br>Course Number: {{course.course_number}}</div>
                        <div>
                            <v-chip v-if="course.monday" color="green" text-color="white"> <v-avatar class="green darken-4">M</v-avatar>{{course.monday.start_time}}-{{course.monday.end_time}}</v-chip>
                            <v-chip v-if="course.tuesday" color="green" text-color="white"> <v-avatar class="green darken-4">Tu</v-avatar>{{course.tuesday.start_time}}-{{course.tuesday.end_time}}</v-chip>
                            <v-chip v-if="course.wednesday" color="green" text-color="white"> <v-avatar class="green darken-4">W</v-avatar>{{course.wednesday.start_time}}-{{course.wednesday.end_time}}</v-chip>
                            <v-chip v-if="course.thursday" color="green" text-color="white"> <v-avatar class="green darken-4">Th</v-avatar>{{course.thursday.start_time}}-{{course.thursday.end_time}}</v-chip>
                            <v-chip v-if="course.friday" color="green" text-color="white"> <v-avatar class="green darken-4">F</v-avatar>{{course.friday.start_time}}-{{course.friday.end_time}}</v-chip>
                            <v-chip v-if="course.saturday" color="green" text-color="white"> <v-avatar class="green darken-4">Sat</v-avatar>{{course.saturday.start_time}}-{{course.saturday.end_time}}</v-chip>
                            <v-chip v-if="course.sunday" color="green" text-color="white"> <v-avatar class="green darken-4">Sun</v-avatar>{{course.sunday.start_time}}-{{course.sunday.end_time}}</v-chip>
                        </div>
                      </div>
                    </v-card-title>
                    <v-card-text class="grey lighten-3">{{course.description}}</v-card-text>
                  </v-card>
                </v-expansion-panel-content>
              </v-expansion-panel>
              <div class="text-xs-center">
                <v-pagination :length="results.length" v-model="page" :total-visible="10"></v-pagination>
              </div>
            </v-card>
          </v-stepper-content>
        </v-stepper-items>
      </v-stepper>
    </v-flex>
</v-layout>
</template>

<script>
  import feathers from '@/api/index.js'
  import { validationMixin } from 'vuelidate'
  import { required, maxLength, email } from 'vuelidate/lib/validators'

  export default {
    data: () => ({
      page: 1,
      min_time: null,
      max_time: null,
      menu1: false,
      menu2: false,
      modal2: false,
      queries: [],
      max_cnum: '',
      min_cnum: '',
      active_attr: [],
      active_subj: [],
      attribute_list: [],
      subject_list: [],
      select: null,
      checkbox: false,
      e1: 0,
      monday: true,
      tuesday: true,
      wednesday: true,
      thursday: true,
      friday: true,
      saturday: false,
      sunday: false,
      live_index: 0,
      live_result: null,
      results: []
    }),
    asyncData (context) {
      // contact the backend service for {} [] {} = all ] logs
      return feathers.service( 'database' ).get(["class", "subject", "attributes"])
      .then( ( resp ) => {
        return { 
          attribute_list: resp.attributes.rows.map(n => n.attr_code),
          subject_list: resp.subjects.rows.map(n => n.abbreviation),
          campus_list: resp.buildings.rows.map(n => n.name)
        }
      })
      .catch( err => {
        console.log(err)
      })
    },
    methods: {
      getThings: function( item ) {
        return feathers.service( 'database' ).find( { query: {'keyword': this.keyword, 'building': this.campus, 'subject': this.subject, 'crn': this.crn, 'attribute': this.attribute}} )
        .then( ( resp ) => {
          console.log(resp.rows[0])
          this.resp = resp || "No results"
          return { 
            resp: resp
          }
        })
        .catch( err => {
          console.log(err)
        })
      },
      check: function(){
        console.log(this.resp)
      },

      change_live_result (shift){
        console.log("in ze method")
        console.log(this.results)
        console.log(this.live_index)
        if(!Number.isInteger(shift)) {
          shift = 0
          this.live_index = 0
        }
        if(this.results && this.results.length > 0){
          this.live_index = shift;
          console.log(this.live_index)

          this.live_index = this.live_index <= 0 ? 0 : this.live_index >= this.results.legnth - 1 ? this.results.legnth - 1 : this.live_index;

          console.log(this.live_index)

          let curr_result = this.results[this.live_index]
          this.live_result = curr_result
          console.log(this.live_result)
        }
      },
      submit () {
        let new_query = {
          'min_cnum': this.min_cnum,
          "max_cnum": this.max_cnum,
          "subjects": this.active_subj,
          "attributes": this.active_attr
        }
        this.queries.push(new_query)
      },
      clear () {
        this.min_cnum = ''
        this.max_cnum = ''
        this.active_subj = []
        this.active_attr = []
      },
      make_schedule_request ( ) {
        let self = this
        return feathers.service( 'database' ).create( { queries: this.queries, monday: this.monday, tuesday: this.tuesday, wednesday: this.wednesday, thursday: this.thursday, friday: this.friday, saturday: this.saturday, sunday: this.sunday, min_time: this.min_time, max_time: this.max_time} )
        .then( ( resp ) => {
          console.log(resp)
          resp.data = resp.data.filter(n => n)
          console.log(resp.data)
          self.results = resp.data
          return { 
            results: resp.data
          }
        })
        .catch( err => {
          console.log(err)
        })
      },
    },
    watch: {
      page: function (val) {
        this.live_index = val - 1
        this.change_live_result(val)
      }
    }
  }
</script>
