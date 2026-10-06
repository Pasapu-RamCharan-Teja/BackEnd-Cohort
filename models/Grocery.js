const mongoose = require("mongoose");

const grocerySchema = new mongoose.Schema({
    item: {
        type: String,
        required: true,
        trim: true
    },
    quantity: {
        type: Number,
        required: true,
        min: 1,
        max: 100
    },
    category: {
        type: String,
        enum: ["veg", "fruit", "dairy", "snacks", "other"],
        default: "other"
    },
    bought: {
        type: Boolean,
        default: false
    },
    dueDate: {
        type: Date
    }
}, {
    timestamps: true
});

module.exports = mongoose.model("Grocery", grocerySchema, "groceries");