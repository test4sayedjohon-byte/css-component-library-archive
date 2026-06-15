/**
 * General-purpose utility functions for data transformation
 */

/**
 * Transforms a CSV string into an array of objects
 * @param {string} csv - Raw CSV content
 * @returns {Array<Object>}
 */
function transformCSV(csv) {
  const lines = csv.trim().split('\n');
  const headers = lines[0].split(',').map(h => h.trim());
  return lines.slice(1).map(line => {
    const values = line.split(',');
    return headers.reduce((obj, header, idx) => {
      obj[header] = (values[idx] || '').trim();
      return obj;
    }, {});
  });
}

/**
 * Normalizes a JSON object by removing null values and trimming strings
 * @param {Object|Array} data
 * @returns {Object|Array}
 */
function normalizeJSON(data) {
  if (Array.isArray(data)) {
    return data.map(normalizeJSON).filter(item => item !== null);
  }
  if (typeof data === 'object' && data !== null) {
    return Object.fromEntries(
      Object.entries(data)
        .filter(([, v]) => v !== null && v !== undefined)
        .map(([k, v]) => [k, typeof v === 'string' ? v.trim() : normalizeJSON(v)])
    );
  }
  return data;
}

module.exports = { transformCSV, normalizeJSON };
