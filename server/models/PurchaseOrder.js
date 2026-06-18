const mongoose = require("mongoose");

const purchaseOrderSchema = new mongoose.Schema({
  poDate: {
    type: Date,
    required: true
  },
  poNumber: {
    type: String,
    required: true
  },
  customerName: {
    type: String,
    required: true
  },
  supplierName: {
    type: String,
    required: true
  },
  qty: {
    type: Number,
    required: true
  },
  leadTimeWeeks: {
    type: Number,
    required: true
  },
  advanceReleaseDate: {
    type: Date,
    required: true
  },
  dueDate: {
  type: Date,
  required: true
},

committedDispatchDate: {
  type: Date
},

actualDispatchDate: {
  type: Date
},
  advanceAmount: {
    type: Number
  },
  quotedWeight: {
    type: Number
  },

actualWeight: {
  type: Number
}
}, {
  timestamps: true
});

module.exports = mongoose.model(
  "PurchaseOrder",
  purchaseOrderSchema
);