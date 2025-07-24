import mongoose from "mongoose";

const ApplicationSchema = new mongoose.Schema(
  {
    service_id: {
      type: Number,
      required: true,
      index: true,
    },
    user_id: {
      type: String,
      required: true,
      index: true,
    },
    status: {
      type: String,
      required: true,
      enum: ["draft", "submitted", "approved", "rejected"],
      default: "draft",
    },
    formName: {
      type: String,
    },
    steps: {
      type: [mongoose.Schema.Types.Mixed], // Changed to an array of mixed types
      default: [], // Changed default to an empty array
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Application", ApplicationSchema);