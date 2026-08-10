"use server"

import type { ActionResult } from "@/lib/actions/action-result"
import { actionFailure } from "@/lib/actions/action-result"
import { post } from "@/lib/api/axios"
import { endpoints } from "@/lib/endpoints"
import type { UploadFileResponse } from "@/lib/types/upload"

export async function uploadFileAction(
  formData: FormData
): Promise<ActionResult<UploadFileResponse>> {
  try {
    const { data } = await post<UploadFileResponse>(
      endpoints.uploads.file,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    )
    return { success: true, data }
  } catch (error) {
    console.error("Upload file action failed:", error)
    return actionFailure(error, "Could not upload file")
  }
}
