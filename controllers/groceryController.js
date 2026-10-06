const Grocery = require("../models/Grocery");

exports.getGroceries = async (req, res, next) => {
    try {
        let filter = {};

        if (req.query.category) {
            filter.category = req.query.category;
        }

        let query = Grocery.find(filter);

        if (req.query.sort === "quantity") {
            query = query.sort({ quantity: 1 });
        }

        const groceries = await query;
        res.status(200).json(groceries);
    } catch(err) {
        next(err);
    }
}

exports.getPendingGroceries = async (req, res, next) => {
    try {
        const groceries = await Grocery.find({ bought: false });
        res.status(200).json(groceries);
    } catch(err) {
        next(err);
    }
}

exports.getGrocery = async (req, res, next) => {
    try {
        const id = req.params.id;
        const grocery = await Grocery.findById(id);

        if (!grocery) {
            return res.status(404).json({
                message: "Grocery not found"
            });
        }

        res.status(200).json(grocery);
    } catch(err) {
        next(err);
    }
}

exports.createGrocery = async (req, res, next) => {
    try {
        const grocery = await Grocery.create(req.body);
        res.status(201).json(grocery);
    } catch(err) {
        next(err);
    }
}

exports.updateGrocery = async (req, res, next) => {
    try {
        const id = req.params.id;
        const grocery = await Grocery.findByIdAndUpdate(id, req.body, {
            returnDocument: "after",
            runValidators: true
        });

        if (!grocery) {
            return res.status(404).json({
                message: "Grocery not found"
            });
        }

        res.status(200).json(grocery);
    } catch(err) {
        next(err);
    }
}

exports.deleteGrocery = async (req, res, next) => {
    try {
        const id = req.params.id;
        const grocery = await Grocery.findByIdAndDelete(id);

        if (!grocery) {
            return res.status(404).json({
                message: "Grocery not found"
            });
        }

        res.status(200).json({
            message: "Grocery deleted successfully"
        });
    } catch(err) {
        next(err);
    }
}