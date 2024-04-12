//  * MODEL
const Notes = require('../model/notesModel')

const addNotes = async (req, res) => {
  const { notes } = req.body
  if(!notes){
    res.status(401).json({message: 'Please add text'})
  }
  const goal = await Notes.create({
    text: notes
  })
  if(goal){
    res.status(200).json(goal)
  }else{
    res.status(500).json({message: false})
  }
}

module.exports = { addNotes }