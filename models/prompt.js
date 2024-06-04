import { Schema, model, models } from "mongoose";

const PromptSchema = new Schema(
  {
    creator: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true, // Ensure every prompt has a creator
    },
    prompt: {
      type: String,
      required: [true, "Prompt is required."],
    },
    tag: {
      type: String,
      required: [true, "Tag is required."],
    },
  },
  {
    timestamps: true, // Add timestamps for createdAt and updatedAt
  }
);

// Ensure the creator field is indexed
PromptSchema.index({ creator: 1 });

const Prompt = models.Prompt || model("Prompt", PromptSchema);

export default Prompt;
