const mongoose = require("mongoose");
const productSchema = mongoose.Schema({
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