const { profiles } = require("../data/profiles");

function listProfiles({ per_page = 10, page = 1 }) {
  const sorted = profiles.slice().sort((a, b) => a.id.localeCompare(b.id));
  const totalItems = sorted.length;
  const totalPages = Math.ceil(totalItems / per_page);
  let currentPage = Number(page);
  if (!Number.isFinite(currentPage) || currentPage < 1) currentPage = 1;
  if (currentPage > totalPages) currentPage = totalPages;
  const startIndex = (currentPage - 1) * per_page;
  const endIndex = startIndex + per_page;
  const data = sorted.slice(startIndex, endIndex);
  return {
    data,
    pagination: {
      current_page: currentPage,
      per_page,
      total_pages: totalPages,
      total_items: totalItems,
      next_page: currentPage < totalPages ? currentPage + 1 : null,
      prev_page: currentPage > 1 ? currentPage - 1 : null,
      hasMore: currentPage < totalPages,
    },
  };
}

module.exports = { listProfiles };
