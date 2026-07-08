"use server"

import { post } from "@/lib/api/axios"
import { endpoints } from "@/lib/endpoints"
import type { UploadFileResponse } from "@/lib/types/upload"

export async function uploadFileAction(
  formData: FormData
): Promise<UploadFileResponse> {
  const { data } = await post<UploadFileResponse>(
    endpoints.uploads.file,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  )
  return data
}
