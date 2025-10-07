import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useNavigate } from "react-router-dom"

export function CMSEditPage() {
 const navigate = useNavigate()
  return (
    <div className="min-h-screen bg-background p-6 bg-white rounded-2xl">
      <div className="mx-auto ">
        {/* Header */}
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <a href="/admin-dashboard/cms" className="text-blue-600 font-medium">CMS</a>
            <span>{">"}</span>
            <span className="text-foreground">Edit Page</span>
          </div>
          <select className="rounded-md border border-input bg-background px-3 py-1.5 text-sm">
            <option>English</option>
          </select>
        </div>

        {/* Form */}
        <div className="space-y-6">
          <h2 className="text-lg font-medium">Description & SEO</h2>

          {/* Content Field */}
          <div className="space-y-2">
            <Label htmlFor="content">Content</Label>
            <div className="relative">
              <Textarea
                id="content"
                className="min-h-[120px] resize-none bg-blue-50/50 pr-10"
                defaultValue="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
              />
            </div>
          </div>

          {/* Main Title */}
          <div className="space-y-2">
            <Label htmlFor="main-title">Main Title</Label>
            <Input id="main-title" className="bg-blue-50/50" defaultValue="The Walt Disney Company" />
          </div>

          {/* URL Key and Meta Keywords */}
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="url-key">URL Key</Label>
              <Input id="url-key" className="bg-blue-50/50" defaultValue="Newproduct" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="meta-keywords">Meta Keywords</Label>
              <Input id="meta-keywords" className="bg-blue-50/50" defaultValue="USA" />
            </div>
          </div>

          {/* Meta Description */}
          <div className="space-y-2">
            <Label htmlFor="meta-description">Meta Description</Label>
            <Textarea
              id="meta-description"
              className="min-h-[120px] resize-none bg-blue-50/50"
              defaultValue="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
            />
          </div>

          {/* Action Buttons */}
          <div className="flex justify-between pt-4">
            <Button variant="outline" className="min-w-[120px] bg-transparent"
            onClick={()=>navigate("/admin-dashboard/cms")}
            >
              Back
            </Button>
            <Button className="min-w-[120px] bg-blue-600 hover:bg-blue-700 text-white">Save changes</Button>
          </div>
        </div>
      </div>
    </div>
  )
}
