"use client"

import { useMutation } from "@tanstack/react-query"
import { toast } from "sonner"

import { uploadFileAction } from "@/features/uploads/actions"
import type { UploadDescription } from "@/lib/types/upload"

export function useUploadFile(description: UploadDescription) {
  return useMutation({
    mutationFn: (file: File) => {
      const formData = new FormData()
      formData.append("file", file)
      formData.append("description", description)
      return uploadFileAction(formData)
    },
    onError: (e) => {
      toast.error(e instanceof Error ? e.message : "Could not upload file")
      console.error("Upload file error:", e)
    },
  })
}
