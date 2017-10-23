<template>
  <v-layout align-content-center justify-center>
    <v-flex md6>
  <v-form v-model="valid" ref="form" lazy-validation>
    <v-text-field
      label="Keyword"
      v-model="keyword"
    ></v-text-field>
    <v-select
      v-model="campus"
      label="Campus"
      chips
      tags
      :items="campus_list"
    ></v-select>
    <v-select
      v-model="subject"
      label="Subject"
      chips
      tags
      :items="subject_list"
    ></v-select>

    <v-text-field
      label="Course Number"
      v-model="c_number"
    ></v-text-field>

   <v-select
      v-model="attribute"
      label="Attribute"
      chips
      tags
      :items="attribute_list"
    ></v-select>

    <v-checkbox
      label="Open sections only?"
      v-model="checkbox"
    ></v-checkbox>
    <v-btn
      @click="submit"
      :disabled="!valid"
    >
      submit
    </v-btn>
    <v-btn @click="clear">clear</v-btn>
  </v-form>
</v-flex>
</v-layout>
</template>

<script>
  export default {
    data: () => ({
      valid: true,
      keyword: '',
      campus: '',
      subject: '',
      c_number: '',
      attribute: '',
      select: null,
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
    methods: {
      submit () {
        if (this.$refs.form.validate()) {
          // Native form submission is not yet supported
          axios.post('/api/submit', {
            name: this.name,
            email: this.email,
            select: this.select,
            checkbox: this.checkbox
          })
        }
      },
      clear () {
        this.$refs.form.reset()
      }
    }
  }
</script>
