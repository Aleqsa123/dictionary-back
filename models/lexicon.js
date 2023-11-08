import mongoose from "mongoose";

const lexiconSchema = new mongoose.Schema({
    geoword: String,
    ironword: String
  })

  lexiconSchema.set("toJSON", {
    transform: (document, returnedObject) => {
      returnedObject.id = returnedObject._id.toString();
      delete returnedObject._id;
      delete returnedObject.__v;
    }
  });  
  
  const Lexicon = mongoose.model('Lexicon', lexiconSchema);

  export default Lexicon;