import { useState } from "react";
import { Upload, AlertCircle } from "lucide-react";
import { Product } from "@/types/Product";

const CSVProductUploader = () => {
  const [ setFile] = useState<File | null>(null);
  const [products, setProducts] = useState<
    (Product & { issues?: string[] ; status?: string })[]
  >([]);
  const [ setValidationStats] = useState({
    total: 0,
    valid: 0,
    warnings: 0,
    errors: 0,
  });
  const [currentPage] = useState(1);
  const [isDragging, setIsDragging] = useState(false);
  const itemsPerPage = 10;

  const requiredColumns = [
    "productName",
    "productCategory",
    "productSKU",
    "companyName",
    "gender",
    "availableSize",
    "productDescription",
    "stock",
    "currency",
    "pricePerUnit",
    "specialPrice",
    "specialPriceStartingDate",
    "specialPriceEndingDate",
    "mainImageUrl",
    "sideImageUrl",
    "sideImage2Url",
    "lastImageUrl",
    "videoUrl",
    "length",
    "width",
    "height",
    "weight",
  ];

  // ✅ Validate each product
  const validateProduct = ({
    product,
    allProducts,
  }: {
    product: Product;
    allProducts: Product[];
  }) => {
    const issues: { type: "error" | "warning"; message: string }[] = [];

    // Missing SKU
    if (!product.productSKU?.trim()) {
      issues.push({ type: "error", message: "Missing product SKU" });
    }

    // Duplicate SKU
    if (product.productSKU) {
      const duplicates = allProducts.filter(
        (p) => p.productSKU === product.productSKU
      );
      if (duplicates.length > 1) {
        issues.push({ type: "warning", message: "Duplicate SKU Found" });
      }
    }

    // Missing name
    if (!product.productName?.trim()) {
      issues.push({ type: "error", message: "Missing product name" });
    }

    // Invalid stock
    const stockValue = Number(product.stock);
    if (isNaN(stockValue) || stockValue < 0) {
      issues.push({ type: "error", message: "Invalid stock value" });
    }

    // Invalid price
    const priceValue = Number(product.pricePerUnit);
    if (isNaN(priceValue) || priceValue <= 0) {
      issues.push({ type: "error", message: "Invalid product price" });
    }

    return issues;
  };

  // ✅ Parse CSV into array of Product objects
  const parseCSV = (text: string): Product[] => {
    const lines = text.split("\n").filter((line) => line.trim());
    if (lines.length === 0) return [];

    const headerLine = lines[0];
    const headers = headerLine
      .split(",")
      .map((h) => h.trim().replace(/^"|"$/g, ""));

    const parsedProducts: Product[] = [];

    for (let i = 1; i < lines.length; i++) {
      const line = lines[i];
      if (!line.trim()) continue;

      const values: string[] = [];
      let currentValue = "";
      let insideQuotes = false;

      for (let j = 0; j < line.length; j++) {
        const char = line[j];
        if (char === '"') {
          insideQuotes = !insideQuotes;
        } else if (char === "," && !insideQuotes) {
          values.push(currentValue.trim().replace(/^"|"$/g, ""));
          currentValue = "";
        } else {
          currentValue += char;
        }
      }
      values.push(currentValue.trim().replace(/^"|"$/g, ""));

      const product: any = {};
      headers.forEach((header, index) => {
        product[header] = values[index] || "";
      });

      parsedProducts.push(product as Product);
    }

    // Validate
    parsedProducts.forEach((product) => {
      const issues = validateProduct({ product, allProducts: parsedProducts });
      (product as any).issues = issues;
      (product as any).status = issues.some((i) => i.type === "error")
        ? "error"
        : issues.some((i) => i.type === "warning")
        ? "warning"
        : "valid";
    });

    return parsedProducts;
  };

  // ✅ Handle file upload
  const handleFileUpload = (uploadedFile: File) => {
    if (!uploadedFile) return;
    setFile(uploadedFile);

    const reader = new FileReader();
    reader.onload = (e) => {
      const text = e.target?.result as string;
      const parsedProducts = parseCSV(text);
      setProducts(parsedProducts);

      const stats = {
        total: parsedProducts.length,
        valid: parsedProducts.filter((p: any) => p.status === "valid").length,
        warnings: parsedProducts.filter((p: any) => p.status === "warning")
          .length,
        errors: parsedProducts.filter((p: any) => p.status === "error").length,
      };
      setValidationStats(stats);
    };
    reader.readAsText(uploadedFile);
  };

  // ✅ Drag-and-drop
  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    const droppedFile = e.dataTransfer.files[0];
    if (
      droppedFile &&
      (droppedFile.type === "text/csv" || droppedFile.name.endsWith(".csv"))
    ) {
      handleFileUpload(droppedFile);
    } else {
      alert("Please upload a CSV file");
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) handleFileUpload(selectedFile);
  };

  // ✅ Render status badge
  const getStatusBadge = (product: any) => {
    if (product.status === "valid")
      return (
        <span className="px-2 py-1 bg-green-100 text-green-700 rounded text-xs font-medium">
          Valid
        </span>
      );
    if (product.status === "warning")
      return (
        <span className="px-2 py-1 bg-yellow-100 text-yellow-700 rounded text-xs font-medium">
          {product.issues.find((i: any) => i.type === "warning")?.message}
        </span>
      );
    return (
      <span className="px-2 py-1 bg-red-100 text-red-700 rounded text-xs font-medium">
        {product.issues.find((i: any) => i.type === "error")?.message}
      </span>
    );
  };

  const paginatedProducts = products.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
  const totalPages = Math.ceil(products.length / itemsPerPage);

  // ✅ Initial upload UI
  if (products.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 p-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
            <div className="flex items-start">
              <AlertCircle className="w-6 h-6 text-blue-600 mr-3 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  Before You Upload
                </h3>
                <p className="text-sm text-gray-700 mb-4">
                  Make sure your CSV file contains these exact columns:
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {requiredColumns.map((col, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 bg-white border border-gray-300 rounded text-xs text-gray-700"
                    >
                      {col}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div
            onDragOver={(e) => {
              e.preventDefault();
              setIsDragging(true);
            }}
            onDragLeave={() => setIsDragging(false)}
            onDrop={handleDrop}
            className={`border-2 border-dashed rounded-lg p-12 text-center transition-colors ${
              isDragging
                ? "border-blue-500 bg-blue-50"
                : "border-gray-300 bg-gray-50"
            }`}
          >
            <Upload className="w-16 h-16 mx-auto mb-4 text-gray-400" />
            <p className="text-lg text-gray-700 mb-2">
              Drag and drop your file here
            </p>
            <p className="text-sm text-gray-500 mb-6">
              or click to browse and select a file
            </p>
            <label htmlFor="file-upload" className="inline-block">
              <div className="px-6 py-3 bg-blue-600 text-white rounded-lg cursor-pointer hover:bg-blue-700 transition-colors">
                Browse File
              </div>
              <input
                id="file-upload"
                type="file"
                accept=".csv"
                onChange={handleFileInput}
                className="hidden"
              />
            </label>
          </div>
        </div>
      </div>
    );
  }

  // ✅ Display table of parsed data
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto bg-white rounded-lg shadow p-6">
        <div className="mb-4 flex justify-between">
          <h2 className="text-xl font-semibold">Validated Products</h2>
          <button
            onClick={() => {
              setProducts([]);
              setValidationStats({
                total: 0,
                valid: 0,
                warnings: 0,
                errors: 0,
              });
              setFile(null);
            }}
            className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700"
          >
            Upload New File
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-100 border-b">
              <tr>
                <th className="px-4 py-2 text-left">Name</th>
                <th className="px-4 py-2 text-left">SKU</th>
                <th className="px-4 py-2 text-left">Category</th>
                <th className="px-4 py-2 text-left">Price</th>
                <th className="px-4 py-2 text-left">Stock</th>
                <th className="px-4 py-2 text-left">Status</th>
              </tr>
            </thead>
            <tbody>
              {paginatedProducts.map((p, idx) => (
                <tr key={idx} className="border-b hover:bg-gray-50">
                  <td className="px-4 py-2">{p.productName}</td>
                  <td className="px-4 py-2">{p.productSKU}</td>
                  <td className="px-4 py-2">{p.productCategory}</td>
                  <td className="px-4 py-2">{p.pricePerUnit}</td>
                  <td className="px-4 py-2">{p.stock}</td>
                  <td className="px-4 py-2">{getStatusBadge(p)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default CSVProductUploader;
