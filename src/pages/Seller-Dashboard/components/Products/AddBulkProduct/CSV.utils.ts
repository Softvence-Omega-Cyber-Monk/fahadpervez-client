/* eslint-disable @typescript-eslint/no-explicit-any */
import { Product } from "@/types/Product";
import { toast } from "react-hot-toast";

// --- Validation helper ---
export const validateProduct = ({
  product,
  allProducts,
  existingProducts = [],
}: {
  product: Product;
  allProducts: Product[];
  existingProducts?: Product[];
}) => {
  const issues: { type: "error" | "warning" ; message: string }[] = [];

  // --- SKU Validation ---
  if (!product.productSKU?.trim()) {
    issues.push({ type: "error", message: "Missing product SKU" });
  } else {
    const skuRegex = /^[A-Za-z0-9-_]+$/;
    if (!skuRegex.test(product.productSKU)) {
      issues.push({
        type: "error",
        message:
          "Invalid SKU format. Only letters, numbers, dashes, or underscores allowed.",
      });
    }

    // --- Duplicate SKU within uploaded CSV ---
    // Only mark duplicates AFTER the first occurrence
    const skuOccurrences = allProducts.filter(
      (p) => p.productSKU === product.productSKU
    );
    const firstIndex = allProducts.findIndex(
      (p) => p.productSKU === product.productSKU
    );

    const currentIndex = allProducts.indexOf(product);
    if (skuOccurrences.length > 1 && currentIndex !== firstIndex) {
      issues.push({ type: "warning", message: "Duplicate SKU detected in CSV" });
    }

    // --- Duplicate SKU in existing database ---
    const duplicateInDB = existingProducts.some(
      (p) => p.productSKU === product.productSKU
    );
    if (duplicateInDB) {
      issues.push({ type: "warning", message: "SKU already exists in database" });
    }
  }

  // --- Product Name Validation ---
  if (!product.productName?.trim()) {
    issues.push({ type: "error", message: "Missing product name" });
  }

  // --- Stock Validation ---
  const stockValue = Number(product.stock);
  if (isNaN(stockValue) || stockValue < 0) {
    issues.push({ type: "error", message: "Invalid stock value" });
  }

  // --- Price Validation ---
  const priceValue = Number(product.pricePerUnit);
  if (isNaN(priceValue) || priceValue <= 0) {
    issues.push({ type: "error", message: "Invalid product price" });
  }

  return issues;
};


// --- CSV Parser ---
export const parseCSV = (
  text: string,
  categories: { _id: string; categoryName: string }[] = [],
  allProducts: Product[]
): (Product & { issues?: { type: "error" | "warning"; message: string }[]; status?: string })[] => {
  try {
    const lines = text.split("\n").filter((l) => l.trim());
    if (lines.length === 0) throw new Error("CSV file is empty or invalid");

    const headers = lines[0].split(",").map((h) => h.trim());
    const products: Product[] = [];

    for (let i = 1; i < lines.length; i++) {
      const values = lines[i].split(",").map((v) => v.trim().replace(/^"|"$/g, ""));
      const product: Record<string, any> = {};

      headers.forEach((h, idx) => {
        product[h] = values[idx] || "";
      });

      // Convert numerics
      product.stock = Number(product.stock) || 0;
      product.pricePerUnit = Number(product.pricePerUnit) || 0;
      product.specialPrice = product.specialPrice ? Number(product.specialPrice) : undefined;

      // Convert dates
      const parseDate = (dateStr?: string) => {
        if (!dateStr) return undefined;
        const date = new Date(dateStr);
        return isNaN(date.getTime()) ? undefined : date.toISOString().split("T")[0];
      };
      product.specialPriceStartingDate = parseDate(product.specialPriceStartingDate);
      product.specialPriceEndingDate = parseDate(product.specialPriceEndingDate);

      // Category matching
      if (categories.length && product.productCategory) {
        const match = categories.find(
          (c) =>
            c.categoryName?.toLowerCase() === product.productCategory?.toLowerCase() ||
            c._id === product.productCategory
        );
        if (match) product.productCategory = match._id;
      }

      products.push(product as Product);
    }

    // --- Validation phase ---
    const validated = products.map((p) => {
      const issues = validateProduct({ product: p, allProducts });
      const status = issues.some((i) => i.type === "error")
        ? "error"
        : issues.some((i) => i.type === "warning")
        ? "warning"
        : "valid";
      return { ...p, issues, status };
    });

    // --- Toast notifications ---
    const errorSKUs = validated
      .filter((p) => p.issues?.some((i) => i.type === "error"))
      .map((p) => p.productSKU);

    if (errorSKUs.length > 0) {
      toast.error(`Invalid or duplicate SKU(s) detected: ${[...new Set(errorSKUs)].join(", ")}`);
    }

    return validated;
  } catch (error: any) {
    console.error("CSV Parsing Error:", error);
    toast.error("CSV parsing failed. Please check your file format.");
    return [
      {
        productName: "",
        productCategory: "",
        productSKU: "",
        companyName: "",
        gender: "",
        availableSize: "",
        productDescription: "",
        stock: 0,
        currency: "",
        pricePerUnit: 0,
        weight: 0,
        issues: [{ type: "error", message: error.message || "Unknown parsing error" }],
        status: "error",
      } as Product & { issues: { type: "error" | "warning"; message: string }[]; status: string },
    ];
  }
};
