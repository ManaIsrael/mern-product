const mongoose = require("mongoose");
const productSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User"
    },
    title: {
        type: String,
        required: [true, "title required"],
    },
    description: {
        type: String,
        required:[true, "description required"],
    },
},
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("Product", productSchema)