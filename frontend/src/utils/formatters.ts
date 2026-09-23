/**
 * Utility function to format numbers using Indian Numbering System (en-IN).
 * Examples:
 *  2413920 -> "24,13,920"
 *  2145087 -> "21,45,087"
 *  318015  -> "3,18,015"
 *  68013   -> "68,013"
 *  18      -> "18"
 */
export const formatIndianNumber = (val: number | undefined | null): string => {
  if (val === undefined || val === null || isNaN(val)) return '0';
  return new Intl.NumberFormat('en-IN').format(val);
};
