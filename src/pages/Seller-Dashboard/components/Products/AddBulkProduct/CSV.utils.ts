
import { Product } from "@/types/Product";

export const validateProduct = ({ product, allProducts }: { product: Product; allProducts: Product[] }) => {
  const issues: { type: "error" | "warning"; message: string }[] = [];

  if (!product.productSKU?.trim()) issues.push({ type: "error", message: "Missing SKU" });

  if (product.productSKU) {
    const dup = allProducts.filter((p) => p.productSKU === product.productSKU);
    if (dup.length > 1) issues.push({ type: "warning", message: "Duplicate SKU" });
  }

  if (!product.productName?.trim()) issues.push({ type: "error", message: "Missing name" });

  if (isNaN(Number(product.stock)) || Number(product.stock) < 0)
    issues.push({ type: "error", message: "Invalid stock" });

  if (isNaN(Number(product.pricePerUnit)) || Number(product.pricePerUnit) <= 0)
    issues.push({ type: "error", message: "Invalid price" });

  return issues;
};

export const parseCSV = (
  
  text: string,
  categories: { _id: string; categoryName: string }[] = [],
  allProducts: Product[] = []
): Product[] => {
  const lines = text.split("\n").filter((l) => l.trim());
  const headers = lines[0].split(",").map((h) => h.trim());
  const products: Product[] = [];
  

  for (let i = 1; i < lines.length; i++) {
    const values = lines[i].split(",").map((v) => v.trim().replace(/^"|"$/g, ""));
    const product: any = {};

    headers.forEach((h, idx) => {
      product[h] = values[idx] || "";
    });

    // --- Convert numeric fields ---
    if (product.stock) product.stock = Number(product.stock);
    if (product.pricePerUnit) product.pricePerUnit = Number(product.pricePerUnit);
    if (product.specialPrice) product.specialPrice = Number(product.specialPrice);

    if (product.productSKU) {
    // Duplicate in CSV
    const dupInCSV = allProducts.filter((p) => p.productSKU === product.productSKU);
    if (dupInCSV.length > 1) issues.push({ type: "warning", message: "Duplicate SKU in CSV" });

    // Duplicate in database
    const dupInDB = existingProducts.some((p) => p.productSKU === product.productSKU);
    if (dupInDB) issues.push({ type: "warning", message: "SKU already exists in database" });
  }

    // --- Convert date fields to ISO format (YYYY-MM-DD) ---
    if (product.specialPriceStartingDate) {
      const date = new Date(product.specialPriceStartingDate);
      if (!isNaN(date.getTime())) {
        product.specialPriceStartingDate = date.toISOString().split("T")[0];
      } else {
        product.specialPriceStartingDate = undefined;
      }
    }

    if (product.specialPriceEndingDate) {
      const date = new Date(product.specialPriceEndingDate);
      if (!isNaN(date.getTime())) {
        product.specialPriceEndingDate = date.toISOString().split("T")[0];
      } else {
        product.specialPriceEndingDate = undefined;
      }
    }

    // --- Map productCategory to category _id ---
    if (categories.length && product.productCategory) {
      const category = categories.find(
        (item) =>
          item.categoryName.toLowerCase() === product.productCategory.toLowerCase()
      );
      if (category) product.productCategory = category._id;
    }

    products.push(product as Product);
  }

  // --- Validate each product ---
  products.forEach((p) => {
    const issues = validateProduct({ product: p, allProducts: products });
    (p as any).issues = issues;
    (p as any).status = issues.some((i) => i.type === "error")
      ? "error"
      : issues.some((i) => i.type === "warning")
      ? "warning"
      : "valid";
  });

  return products;
};


