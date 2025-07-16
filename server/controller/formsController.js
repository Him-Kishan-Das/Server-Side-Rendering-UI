import Forms from "../models/Forms.js";

export const getForms = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    const totalForms = await Forms.countDocuments({});

    const forms = await Forms.find({})
      .sort({ created_at: -1 })
      .skip(skip)
      .limit(limit);

    const totalPages = Math.ceil(totalForms / limit);
    const hasNextPage = page < totalPages;
    const hasPreviousPage = page > 1;

    res.status(200).json({
      success: true,
      count: forms.length,
      totalForms,
      totalPages,
      currentPage: page,
      formsPerPage: limit,
      hasNextPage,
      hasPreviousPage,
      data: forms
    });
  } catch (error) {
    console.error("Error: ", error);
  }
};

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
