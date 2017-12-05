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
                  label="Minimum course number"
                  v-model="max_cnum"
                ></v-text-field>
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

              <v-btn color="green" v-if="queries.length != 0" @click="make_schedule_request()"> Submit </v-btn>
            </v-card>
          </v-stepper-content>
          
          <v-stepper-content step="3">
            <v-card color="grey lighten-1" class="mb-5"></v-card>
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
      make_schedule_request: function( ) {
        return feathers.service( 'database' ).create( { queries: this.queries, monday: this.monday, tuesday: this.tuesday, wednesday: this.wednesday, thursday: this.thursday, friday: this.friday, saturday: this.saturday, sunday: this.sunday, min_time: this.min_time, max_time: this.max_time} )
        .then( ( resp ) => {
          this.resp = resp || "No results"
          return { 
            resp: resp
          }
        })
        .catch( err => {
          console.log(err)
        })
      },
    }
  }
</script>
