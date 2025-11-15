export function formatPrice(price) {
  if (!price || isNaN(price)) return "0 DA";
  return `${Number(price).toLocaleString("fr-FR")} DA`;
}
