const mongoose = require("mongoose");
var Schema = mongoose.Schema;

var todoSchema = new Schema({
  "id": {
    "type" : String,
    "unique" : true // prevent duplicating id value
  },
  "title" : String,
  "description" : String
  },
  {versionKey : false}
);

let todo;
let db = mongoose.createConnection("mongodb://lists:alclsth1@ds341825.mlab.com:41825/todolist", 
    { useNewUrlParser: true,
      useCreateIndex: true, }
);
db.on('error', (err) => {
    console.log(err);
});
db.once('open', () => {
    todo = db.model("lists", todoSchema); // put -s
    console.log('Connected Database');
});

module.exports.getData = () => {
    return new Promise((resolve, reject) => {
        todo.find({}).sort({ id : 0 }).then((data) => {
            resolve(data);
        }).catch((err) => {
            reject(err);
        })
    })
};

module.exports.addData = (data) => {
    return new Promise((resolve, reject) => {
        todo.create(data).then(() => { // without exec()
            resolve();
        }).catch((err) => {
            reject(err);
        })
    })
};

module.exports.updateData = (pramId, data) => {
    return new Promise((resolve, reject) => {
        todo.updateOne(
            {id : pramId},
            {$set : 
                {title : data.title, description : data.description}
            }).exec().then(() => {
                resolve();
            }).catch((err) => {
                reject(err);
        })
    })
};

module.exports.deleteData = (paramId) => {
    return new Promise((resolve, reject) => {
        todo.deleteOne({id : paramId}).exec().then(() => {
            resolve();
        }).catch((err) => {
            reject(err);
        })
    })
};