"use client"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Eye, Pencil, Trash2, ChevronLeft, ChevronRight } from "lucide-react"
import { useNavigate } from "react-router-dom"



const pages = [
  { id: 89, title: "Home Page", url: "http://www.statholdings.com" },
  { id: 79, title: "Shop", url: "http://www.treequote.com" },
  { id: 59, title: "Supplement", url: "http://www.dambase.com" },
  { id: 69, title: "Product Details", url: "http://www.codehow.com" },
  { id: 49, title: "Cart", url: "http://www.isielectrics.com" },
  { id: 99, title: "Payment", url: "http://www.zencorporation.com" },
  { id: 89, title: "Refund Policy", url: "http://www.toughzap.com" },
  { id: 79, title: "Return Policy", url: "http://www.konmatfix.com" },
  { id: 69, title: "M:Items Conditions", url: "http://www.labdrill.com" },
  { id: 89, title: "Terms of Use", url: "http://www.warephase.com" },
]

export function CMSTable() {
    const navigate = useNavigate()
  return (
    <div className="min-h-screen bg-background p-6 bg-white rounded-2xl">
      <div className="">
        <h1 className="mb-6 text-2xl font-bold">CMS PAGES</h1>

        {/* Desktop Table View */}
        <div className="hidden sm:block overflow-x-auto rounded-lg border border-border bg-card">
          <table className="w-full">
            <thead className="bg-muted/50">
              <tr className="border-b border-border">
                <th className="w-12 p-4">
                  <Checkbox />
                </th>
                <th className="p-4 text-left text-sm font-medium text-muted-foreground">ID</th>
                <th className="p-4 text-left text-sm font-medium text-muted-foreground">Page Title</th>
                <th className="p-4 text-left text-sm font-medium text-muted-foreground">URL Key</th>
                <th className="p-4 text-left text-sm font-medium text-muted-foreground">Action</th>
              </tr>
            </thead>
            <tbody>
              {pages.map((page, index) => (
                <tr key={index} className="border-b border-border transition-colors hover:bg-muted/30">
                  <td className="p-4">
                    <Checkbox />
                  </td>
                  <td className="p-4 text-sm">{page.id}</td>
                  <td className="p-4 text-sm">{page.title}</td>
                  <td className="p-4 text-sm text-muted-foreground">{page.url}</td>
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <button
                        className="rounded p-1.5 text-blue-600 transition-colors hover:bg-blue-50"
                        aria-label="View"
                      >
                        <Eye className="h-4 w-4" />
                      </button>
                      <button
                        onClick={()=>navigate("/admin-dashboard/edit-page")}
                        className="rounded p-1.5 text-blue-600 transition-colors hover:bg-blue-50"
                        aria-label="Edit"
                      >
                        <Pencil className="h-4 w-4" />
                      </button>
                      <button
                        className="rounded p-1.5 text-red-600 transition-colors hover:bg-red-50"
                        aria-label="Delete"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile Card View */}
        <div className="grid grid-cols-1 gap-4 sm:hidden">
          {pages.map((page, index) => (
            <div key={index} className="space-y-4 rounded-lg border border-border bg-card p-4">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-4">
                  <Checkbox />
                  <div>
                    <p className="font-semibold">{page.title}</p>
                    <p className="truncate text-sm text-muted-foreground">{page.url}</p>
                  </div>
                </div>
                <div className="text-sm text-muted-foreground">ID: {page.id}</div>
              </div>
              <div className="flex items-center justify-end gap-2 border-t border-border pt-3">
                <button
                  className="rounded p-1.5 text-blue-600 transition-colors hover:bg-blue-50"
                  aria-label="View"
                >
                  <Eye className="h-4 w-4" />
                </button>
                <button
                  onClick={() => navigate("/admin-dashboard/edit-page")}
                  className="rounded p-1.5 text-blue-600 transition-colors hover:bg-blue-50"
                  aria-label="Edit"
                >
                  <Pencil className="h-4 w-4" />
                </button>
                <button
                  className="rounded p-1.5 text-red-600 transition-colors hover:bg-red-50"
                  aria-label="Delete"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className="mt-4 flex items-center justify-between">
          <p className="text-sm text-muted-foreground">Showing 1 to 10 of 111 CMS</p>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="icon" className="h-8 w-8 bg-transparent">
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="sm" className="h-8 w-8 bg-primary text-primary-foreground">
              1
            </Button>
            <Button variant="outline" size="sm" className="h-8 w-8 bg-transparent">
              2
            </Button>
            <Button variant="outline" size="sm" className="h-8 w-8 bg-transparent">
              3
            </Button>
            <Button variant="outline" size="icon" className="h-8 w-8 bg-transparent">
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
