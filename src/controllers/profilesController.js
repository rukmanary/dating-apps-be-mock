const { listProfiles } = require("../services/profilesService");
const { query, validationResult } = require("express-validator");

const validatePagination = [
  query("per_page")
    .optional()
    .isInt({ min: 1, max: 50 })
    .withMessage("per_page must be an integer between 1 and 50"),
  query("page")
    .optional()
    .isInt({ min: 1 })
    .withMessage("page must be an integer ≥ 1"),
];

function getProfiles(req, res, next) {
  try {
    // Check validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }

    const per_pageRaw = req.query.per_page;
    const pageRaw = req.query.page;
    let per_page = Number(per_pageRaw) || 10;
    let page = Number(pageRaw) || 1;
    if (!Number.isFinite(per_page) || per_page <= 0) per_page = 10;
    if (!Number.isFinite(page) || page <= 0) page = 1;
    if (per_page > 50) per_page = 50;
    const result = listProfiles({ per_page, page });
    res.json({ success: true, ...result });
  } catch (err) {
    next(err);
  }
}

module.exports = { getProfiles, validatePagination };
