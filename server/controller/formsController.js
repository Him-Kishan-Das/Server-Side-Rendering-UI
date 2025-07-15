import Forms from "../models/Forms.js";

export const getFormsByServiceId = async (req, res) => {
  try {
    const { service_id } = req.params;

    if (!service_id) {
      return res
        .status(400)
        .json({ message: "Service ID is required in the URL." });
    }

    const numericServiceId = Number(service_id);
    if (isNaN(numericServiceId)) {
      return res
        .status(400)
        .json({ message: "Service ID must be a valid number." });
    }

    const forms = await Forms.find({ service_id: numericServiceId });

    if (forms.length === 0) {
      return res
        .status(404)
        .json({ message: "No forms found for this service ID." });
    }

    res.status(200).json(forms);
  } catch (error) {
    console.error("Error fetching forms by service ID:", error);
    res.status(500).json({ message: "Server error while fetching forms." });
  }
};
