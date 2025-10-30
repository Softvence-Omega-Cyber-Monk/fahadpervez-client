import { baseApi } from "@/Redux/BaseApi";

const shipmentApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Get all shipment companies with pagination
    getAllShipments: builder.query({
      query: ({ page = 1, limit = 10 }) => ({
        url: `/shipment?page=${page}&limit=${limit}`,
      }),
      providesTags: ["SHIPMENTS"],
    }),

    // Get all active shipment companies
    getActiveShipments: builder.query({
      query: () => `/shipment/active`,
      providesTags: ["SHIPMENTS"],
    }),

    // Get shipment company by ID
    getShipmentById: builder.query({
      query: ({ id }) => `/shipment/${id}`,
    }),

    // Get shipment company by code
    getShipmentByCode: builder.query({
      query: ({ code }) => `/shipment/code/${code}`,
    }),

    // Add a new shipment company
    addShipment: builder.mutation({
      query: (data) => ({
        url: `/shipment`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["SHIPMENTS"],
    }),

    // Update a shipment company by ID
    updateShipment: builder.mutation({
      query: ({ id, data }) => ({
        url: `/shipment/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["SHIPMENTS"],
    }),

    // Delete a shipment company by ID
    deleteShipment: builder.mutation({
      query: (id) => ({
        url: `/shipment/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["SHIPMENTS"],
    }),

    // Toggle active/inactive status of a shipment company
    toggleShipmentStatus: builder.mutation({
      query: (id) => ({
        url: `/shipment/${id}/toggle-status`,
        method: "PATCH",
      }),
      invalidatesTags: ["SHIPMENTS"],
    }),
  }),
});

export const {
  useGetAllShipmentsQuery,
  useGetActiveShipmentsQuery,
  useGetShipmentByIdQuery,
  useGetShipmentByCodeQuery,
  useAddShipmentMutation,
  useUpdateShipmentMutation,
  useDeleteShipmentMutation,
  useToggleShipmentStatusMutation,
} = shipmentApi;

export default shipmentApi;













// import { baseApi } from "@/Redux/BaseApi";

// /* -------------------------------------------------------------------------- */
// /*                                🧩 Type Definitions                         */
// /* -------------------------------------------------------------------------- */

// // ✅ Shipment company data structure
// export interface Shipment {
//   _id: string;
//   name: string;
//   code: string;
//   description?: string;
//   contactEmail?: string;
//   contactPhone?: string;
//   isActive: boolean;
//   logo?: string;
//   trackingUrl?: string;
//   createdAt?: string;
//   updatedAt?: string;
// }

// // ✅ Pagination metadata
// export interface Pagination {
//   total: number;
//   page: number;
//   limit: number;
//   totalPages: number;
// }

// // ✅ Generic API response wrapper
// export interface ApiResponse<T> {
//   success: boolean;
//   message: string;
//   data: T;
//   pagination?: Pagination;
// }

// /* -------------------------------------------------------------------------- */
// /*                              🧠 API Endpoints                              */
// /* -------------------------------------------------------------------------- */

// const shipmentApi = baseApi.injectEndpoints({
//   endpoints: (builder) => ({
//     // ✅ Get all shipments (paginated)
//     getAllShipments: builder.query<ApiResponse<Shipment[]>, { page?: number; limit?: number }>({
//       query: ({ page = 1, limit = 10 } = {}) => ({
//         url: `/shipment?page=${page}&limit=${limit}`,
//       }),
//       providesTags: ["SHIPMENTS"],
//     }),

//     // ✅ Get all active shipments
//     getActiveShipments: builder.query<ApiResponse<Shipment[]>, void>({
//       query: () => ({
//         url: `/shipment/active`,
//       }),
//       providesTags: ["SHIPMENTS"],
//     }),

//     // ✅ Get shipment by ID
//     getShipmentById: builder.query<ApiResponse<Shipment>, string>({
//       query: (id) => ({
//         url: `/shipment/${id}`,
//       }),
//       providesTags: ["SHIPMENTS"],
//     }),

//     // ✅ Get shipment by code
//     getShipmentByCode: builder.query<ApiResponse<Shipment>, string>({
//       query: (code) => ({
//         url: `/shipment/code/${code}`,
//       }),
//       providesTags: ["SHIPMENTS"],
//     }),

//     // ✅ Create a new shipment
//     addShipment: builder.mutation<ApiResponse<Shipment>, Omit<Shipment, "_id" | "createdAt" | "updatedAt">>({
//       query: (data) => ({
//         url: `/shipment`,
//         method: "POST",
//         body: data,
//       }),
//       invalidatesTags: ["SHIPMENTS"],
//     }),

//     // ✅ Update existing shipment
//     updateShipment: builder.mutation<ApiResponse<Shipment>, Partial<Shipment> & { id: string }>({
//       query: ({ id, ...data }) => ({
//         url: `/shipment/${id}`,
//         method: "PUT",
//         body: data,
//       }),
//       invalidatesTags: ["SHIPMENTS"],
//     }),

//     // ✅ Delete shipment
//     deleteShipment: builder.mutation<ApiResponse<null>, string>({
//       query: (id) => ({
//         url: `/shipment/${id}`,
//         method: "DELETE",
//       }),
//       invalidatesTags: ["SHIPMENTS"],
//     }),

//     // ✅ Toggle shipment active/inactive status
//     toggleShipmentStatus: builder.mutation<ApiResponse<Shipment>, string>({
//       query: (id) => ({
//         url: `/shipment/${id}/toggle-status`,
//         method: "PATCH",
//       }),
//       invalidatesTags: ["SHIPMENTS"],
//     }),
//   }),
// });

// /* -------------------------------------------------------------------------- */
// /*                             🧷 React Hooks Export                           */
// /* -------------------------------------------------------------------------- */
// export const {
//   useGetAllShipmentsQuery,         // ✅ Get all shipment companies (paginated)
//   useGetActiveShipmentsQuery,      // ✅ Get only active shipment companies
//   useGetShipmentByIdQuery,         // ✅ Get a single shipment by ID
//   useGetShipmentByCodeQuery,       // ✅ Get shipment by code
//   useAddShipmentMutation,          // ✅ Create a new shipment company
//   useUpdateShipmentMutation,       // ✅ Update an existing shipment company
//   useDeleteShipmentMutation,       // ✅ Delete a shipment company
//   useToggleShipmentStatusMutation, // ✅ Toggle a shipment company’s active/inactive status
// } = shipmentApi;

// export default shipmentApi;













// import { baseApi } from "@/Redux/BaseApi";

// /* -------------------------------------------------------------------------- */
// /*                                🧩 Type Definitions                         */
// /* -------------------------------------------------------------------------- */

// // ✅ Shipment company data structure
// export interface Shipment {
//   _id: string;
//   name: string;
//   code: string;
//   description?: string;
//   contactEmail?: string;
//   contactPhone?: string;
//   isActive: boolean;
//   logo?: string;
//   trackingUrl?: string;
//   createdAt?: string;
//   updatedAt?: string;
// }

// // ✅ Pagination metadata
// export interface Pagination {
//   total: number;
//   page: number;
//   limit: number;
//   totalPages: number;
// }

// // ✅ Generic API response wrapper
// export interface ApiResponse<T> {
//   success: boolean;
//   message: string;
//   data: T;
//   pagination?: Pagination;
// }

// /* -------------------------------------------------------------------------- */
// /*                              🧠 API Endpoints                              */
// /* -------------------------------------------------------------------------- */

// const shipmentApi = baseApi.injectEndpoints({
//   endpoints: (builder) => ({
//     // ✅ Get all shipments (paginated)
//     getAllShipments: builder.query<ApiResponse<Shipment[]>, { page?: number; limit?: number }>({
//       query: ({ page = 1, limit = 10 } = {}) => ({
//         url: `/shipment?page=${page}&limit=${limit}`,
//       }),
//     }),

//     // ✅ Get all active shipments
//     getActiveShipments: builder.query<ApiResponse<Shipment[]>, void>({
//       query: () => ({
//         url: `/shipment/active`,
//       }),
//     }),

//     // ✅ Get shipment by ID
//     getShipmentById: builder.query<ApiResponse<Shipment>, string>({
//       query: (id) => ({
//         url: `/shipment/${id}`,
//       }),
//     }),

//     // ✅ Get shipment by code
//     getShipmentByCode: builder.query<ApiResponse<Shipment>, string>({
//       query: (code) => ({
//         url: `/shipment/code/${code}`,
//       }),
//     }),

//     // ✅ Create a new shipment
//     createShipment: builder.mutation<ApiResponse<Shipment>, Omit<Shipment, "_id" | "createdAt" | "updatedAt">>({
//       query: (data) => ({
//         url: `/shipment`,
//         method: "POST",
//         body: data,
//       }),
//     }),

//     // ✅ Update existing shipment
//     updateShipment: builder.mutation<ApiResponse<Shipment>, Partial<Shipment> & { id: string }>({
//       query: ({ id, ...data }) => ({
//         url: `/shipment/${id}`,
//         method: "PUT",
//         body: data,
//       }),
//     }),

//     // ✅ Delete shipment
//     deleteShipment: builder.mutation<ApiResponse<null>, string>({
//       query: (id) => ({
//         url: `/shipment/${id}`,
//         method: "DELETE",
//       }),
//     }),

//     // ✅ Toggle shipment active/inactive status
//     toggleShipmentStatus: builder.mutation<ApiResponse<Shipment>, string>({
//       query: (id) => ({
//         url: `/shipment/${id}/toggle-status`,
//         method: "PATCH",
//       }),
//     }),
//   }),
// });

// /* -------------------------------------------------------------------------- */
// /*                             🧷 React Hooks Export                           */
// /* -------------------------------------------------------------------------- */
// export const {
//   useGetAllShipmentsQuery,         // ✅ Get all shipment companies (paginated)
//   useGetActiveShipmentsQuery,      // ✅ Get only active shipment companies
//   useGetShipmentByIdQuery,         // ✅ Get a single shipment by its ID
//   useGetShipmentByCodeQuery,       // ✅ Get shipment details by its code
//   useCreateShipmentMutation,       // ✅ Create a new shipment company
//   useUpdateShipmentMutation,       // ✅ Update an existing shipment company
//   useDeleteShipmentMutation,       // ✅ Delete a shipment company
//   useToggleShipmentStatusMutation, // ✅ Toggle a shipment company’s active/inactive status
// } = shipmentApi;

// export default shipmentApi;
