const { listProfiles } = require("../services/profilesService");

function getProfiles(req, res, next) {
  try {
    const per_pageRaw = req.query.per_page;
    const pageRaw = req.query.page;
    let per_page = Number(per_pageRaw) || 10;
    let page = Number(pageRaw) || 1;
    if (!Number.isFinite(per_page) || per_page <= 0) per_page = 10;
    if (!Number.isFinite(page) || page <= 0) page = 1;
    if (per_page > 50) per_page = 50;
    const result = listProfiles({ per_page, page });
    res.json(result);
  } catch (err) {
    next(err);
  }
}

module.exports = { getProfiles };