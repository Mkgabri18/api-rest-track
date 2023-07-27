const mongoose = require('mongoose')
const mongooseDelete = require("mongoose-delete")

const TracksScheme = new mongoose.Schema(
  {
    name: { type: String },
    album: { type: String },
    cover: {
      type: String,
      validate: {
        validator: (req) => {
          return true;
        },
        message: "ERROR_URL",
      },
    },
    artist: {
      name: { type: String },
      nickname: { type: String },
      nationality: { type: String }
    },
    duration: {
      start: { type: Number },
      end: { type:  Number }
    },
    mediaId: { type: mongoose.Types.ObjectId }
  },
  {
    timestamps: true,
    versionKey: false
  }
)

// Realacion TRACKS to storage
TracksScheme.statics.findAllData = function (name) {
  const joinData = this.aggregate([ // from tracks
    {
      $lookup: {
        from: "storages", // raltion with storage
        localField: "mediaId", // by field track
        foreignField: "_id", // on field storage
        as: "audio"  // as alias
      }
    },
    {
      $unwind: "$audio"
    }
  ])
  console.log("ind all", joinData)
  return joinData
}

TracksScheme.statics.findOneData = function (id) {
  const joinData = this.aggregate([ // from tracks
    {
      $match: {
        _id: mongoose.TypesOnjectId(id),
      },
    },
    {
      $lookup: {
        from: "storages", // raltion with storage
        localField: "mediaId", // by field track
        foreignField: "_id", // on field storage
        as: "audio"  // as alias
      }
    },
    {
      $unwind: "$audio"
    }
  ])
  console.log("ind all", joinData)
  return joinData
}

TracksScheme.plugin(mongooseDelete, {overrideMethods: "all"})
module.exports = mongoose.model("tracks", TracksScheme)