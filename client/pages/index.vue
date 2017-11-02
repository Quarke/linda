<template>
  <v-layout align-content-center justify-center>
    <v-flex md4>
      <v-form v-model="valid" ref="form" lazy-validation>
        <v-text-field
          label="Keyword"
          v-model="keyword"
        ></v-text-field>
        <v-select
          v-model="campus"
          label="Campus"
          :items="campus_list"
        ></v-select>
        <v-select
          v-model="subject"
          label="Subject"
          :items="subject_list"
        ></v-select>

        <v-text-field
          label="CRN"
          v-model="crn"
        ></v-text-field>

       <v-select
          v-model="attribute"
          label="Attribute"
          :items="attribute_list"
        ></v-select>

       <!--  <v-checkbox
          label="Open sections only?"
          v-model="checkbox"
        ></v-checkbox> -->
        <v-btn
          @click="getThings"
          :disabled="!valid"
        >
          submit
        </v-btn>
        <v-btn
          @click="check"
          :disabled="!valid"
        >
          check
        </v-btn>
      </v-form>
    </v-flex>
    <v-flex md8>
       <v-data-table
        :headers="headers"
        :items="resp.rows"
        hide-actions
        item-key="name"
      >
        <template slot="items" scope="props">
          <tr @click="props.expanded = !props.expanded">
            <td>{{ props.item.title }}</td>
            <td class="text-xs-right">{{ props.item.course_number }}</td>
            <td class="text-xs-right">{{ props.item.crn }}</td>
            <td class="text-xs-right">{{ props.item.subject }}</td>
            <td class="text-xs-right">{{ props.item.credits }}</td>
          </tr>
        </template>
        <template slot="expand" scope="props">
          <p>here</p>
          <v-card flat>
            <v-card-text> This new text </v-card-text>
          </v-card>
        </template>
      </v-data-table>
    </v-flex>
</v-layout>
</template>

<script>
  import feathers from '@/api/index.js';
  export default {
    data: () => ({
      valid: true,
      headers: [
          {
            text: 'Title',
            align: 'left',
            value: 'title'
          },
          { text: 'Course Number', value: 'course_number' },
          { text: 'CRN', value: 'crn' },
          { text: 'Subject', value: 'subject' },
          { text: 'Credits', value: 'credit' },
        ],
      keyword: '',
      campus: '',
      subject: '',
      crn: '',
      attribute: '',
      select: null,
      resp: "No results",
      campus_list: [
        'Campus 1',
        'Campus 2',
        'Campus 3',
        'Campus 4'
      ],
      subject_list: [
        'Subject 1',
        'Subject 2',
        'Subject 3',
        'Subject 4'
      ],
      attribute_list: [
        'Subject 1',
        'Subject 2',
        'Subject 3',
        'Subject 4'
      ],
      checkbox: false
    }),
    asyncData (context) {
      // contact the backend service for {} [] {} = all ] logs
      return feathers.service( 'database' ).get(["class", "subject", "attributes"])
      .then( ( resp ) => {
        return { 
          attribute_list: [""].concat(resp.attributes.rows.map(n => n.attr_code)),
          subject_list: [""].concat(resp.subjects.rows.map(n => n.abbreviation)),
          campus_list: [""].concat(resp.buildings.rows.map(n => n.name))
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
      }
    }
  }
</script>
