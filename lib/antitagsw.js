const fs = require('fs')
const path = './lib/antitagsw.json'
let data = []

if (fs.existsSync(path)) {
  data = JSON.parse(fs.readFileSync(path))
}

function save() {
  fs.writeFileSync(path, JSON.stringify(data, null, 2))
}

module.exports = {
  list: data,
  add: (jid) => {
    if (!data.includes(jid)) {
      data.push(jid)
      save()
    }
  },
  remove: (jid) => {
    const index = data.indexOf(jid)
    if (index !== -1) {
      data.splice(index, 1)
      save()
    }
  },
  isActive: (jid) => data.includes(jid)
}