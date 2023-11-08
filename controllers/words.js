import express from "express";
import Lexicon from "../models/lexicon.js";

const wordsRouter = express.Router();

wordsRouter.get('/', (request, response) => {
  Lexicon
      .find({})
      .then(words => {
        response.json(words)
      })
  });

  wordsRouter.get("/:id", (request, response, next) => {
    Lexicon.findById(request.params.id)
      .then(word => {
        if (word) {
          response.json(word);
        } else {
          response.status(404).end();
        }
      })
      .catch(error => next(error));
  });
  
  wordsRouter.delete("/:id", (request, response, next) => {
    Lexicon.findByIdAndDelete(request.params.id)
      .then(() => {
        response.status(204).end();
      })
      .catch(error => next(error));
  });
 
  wordsRouter.post('/', (request, response) => {
    const word = new Lexicon(request.body)
  
    word
      .save()
      .then(result => {
        response.status(201).json(result)
      })
  });

  wordsRouter.put("/:id", (request, response, next) => {
    const body = request.body;
  
    const word = {
      geoword: body.geoword,
      ironword: body.ironword,
    };
  
    Lexicon.findByIdAndUpdate(request.params.id, word, { new: true })
      .then(updatedWord => {
        response.json(updatedWord);
      })
      .catch(error => next(error));
  });  

export default wordsRouter;