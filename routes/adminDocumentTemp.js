const express = require("express");
const router = express.Router();
const multer = require("multer");
const DocumentTemplate = require("../models/adminDocumentTemp");

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "./uploads");
  },
  filename: (req, file, callback) => {
    callback(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

// Save template
router.post("/template/add", upload.single("file"), (req, res) => {
  const file = new DocumentTemplate({
    documentType: req.body.documentType,
    otherType: req.body.otherType,
    description: req.body.description,
    files: req.file.originalname,
  });

  file
    .save()
    .then(() => res.json("success"))
    .catch((err) => res.status(400).json(`Error: ${err}`));
});

// Get all templates
router.get("/template/getAll", (req, res) => {
  DocumentTemplate.find().exec((err, documentTemp) => {
    if (err) {
      return res.status(400).json({
        error: err,
      });
    }
    return res.status(200).json({
      success: true,
      exsitingDocumentTemp: documentTemp,
    });
  });
});

// Get a template by ID
router.get("/document/get/:id", (req, res) => {
  let documentID = req.params.id;

  DocumentTemplate.findById(documentID, (err, document) => {
    if (err) {
      return res.status(400).json({ success: false, err });
    }
    return res.status(200).json({
      success: true,
      document,
    });
  });
});

// Update a template
router.put("/document/update/:id", (req, res) => {
  DocumentTemplate.findByIdAndUpdate(
    req.params.id,
    {
      $set: req.body,
    },
    (err, document) => {
      if (err) {
        return res.status(400).json({ error: err });
      }
      return res.status(200).json({
        success: "Update Successfully",
      });
    }
  );
});

// Delete a template
router.delete("/document/delete/:id", (req, res) => {
  DocumentTemplate.findByIdAndRemove(req.params.id).exec(
    (err, deletedDocument) => {
      if (err)
        return res.status(400).json({
          message: "Deleted unsuccesful",
          err,
        });

      return res.json({
        message: "Deleted Succesfull",
        deletedDocument,
      });
    }
  );
});

module.exports = router;
