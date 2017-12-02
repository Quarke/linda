const db = require('../../db');

module.exports.get_classes = (data, resolve, reject) => {
    console.log(data)

    let keyword = data.query.keyword
    let crn = data.query.crn
    let attribute = data.query.attribute
    let building = data.query.building
    let subject = data.query.subject
    let query_str = ""
    let select_array = [`SELECT * FROM class`]
    let where_array = []
    let var_str = ""
    if(keyword) {
      var_str = `(description LIKE '%${keyword}%' OR title LIKE '%${keyword}%')`
      where_array.push(var_str)
    }
    if(crn) {
      var_str = `class.crn = '${crn}'`
      where_array.push(var_str)
    }
    if(attribute) {
      select_array.push(`class_attributes`)
      var_str = `class_attributes.attr_code = '${attribute}' AND class_attributes.crn = class.crn`
      where_array.push(var_str)
    }
    if(building) {
      select_array.push(`class_meeting`)
      var_str = `class.crn = class_meeting.class_crn AND class_meeting.building = '${building}'`
      where_array.push(var_str)
    }
    if(subject) {
      select_array.push(`subject`)
      var_str = `class.subject = '${subject}' AND class.subject = subject.abbreviation`
      where_array.push(var_str)
    }

    query_str = select_array.join(", ")
    query_str += " WHERE "
    query_str += where_array.join(" AND ")

    console.log(query_str)

    if(query_str.length > 0){
      console.log(query_str)
        db.query(query_str, [], (res) => {
          resolve(res)
      })
    }
    else {
      resolve("No returns")
    }
}
