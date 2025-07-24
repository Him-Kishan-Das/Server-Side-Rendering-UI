import Application from "../models/Applications.js";

export const saveStepByNumber = async (req, res) => {
  try {
    const { user_id, service_id, formData } = req.body;
    let { stepNumber } = req.params;

    if (!user_id || !service_id || !formData || !stepNumber) {
      return res.status(400).json({ error: "Missing user_id, service_id, formData, or stepNumber" });
    }

    const stepIndex = parseInt(stepNumber) - 1;

    let application = await Application.findOne({ user_id, service_id });

    if (!application) {
      // New application with steps initialized
      const steps = [];
      steps[stepIndex] = formData;

      application = new Application({
        user_id,
        service_id,
        status: "draft",
        steps,
      });
    } else {
      // Update specific step
      if (!Array.isArray(application.steps)) {
        application.steps = [];
      }
      application.steps[stepIndex] = formData;
    }

    await application.save();

    res.status(200).json({ message: `Step ${stepNumber} saved successfully`, application });
  } catch (error) {
    console.error("Error saving step:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};


export const submitForm = async (req, res) => {
    try {
      const { user_id, service_id } = req.body;
  
      const application = await Application.findOne({ user_id, service_id });
  
      if (!application) {
        return res.status(404).json({ error: "Application not found" });
      }
  
      application.status = "submitted";
      await application.save();
  
      res.status(200).json({ message: "Form submitted successfully", application });
    } catch (error) {
      console.error("Submit form error:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  };
  

  export const getUserApplication = async (req, res) => {
    try {
      const { user_id, service_id } = req.query;
  
      const application = await Application.findOne({ user_id, service_id });
  
      if (!application) {
        return res.status(404).json({ error: "No application found" });
      }
  
      res.status(200).json(application);
    } catch (error) {
      console.error("Get application error:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  };
  

  export const getStepByNumber = async (req, res) => {
    try {
      const { user_id, service_id } = req.query;
      const { stepNumber } = req.params;
  
      if (!user_id || !service_id || !stepNumber) {
        return res.status(400).json({ error: "Missing user_id, service_id, or stepNumber" });
      }
  
      const stepIndex = parseInt(stepNumber) - 1;
  
      const application = await Application.findOne({ user_id, service_id });
  
      if (!application || !application.steps || !application.steps[stepIndex]) {
        return res.status(404).json({ error: `No data found for step ${stepNumber}` });
      }
  
      res.status(200).json({
        step: stepNumber,
        formData: application.steps[stepIndex]
      });
  
    } catch (error) {
      console.error("Error getting step data:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  };
  