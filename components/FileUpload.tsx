'use client'
import config from '../lib/config'
import {
  Image,
  ImageKitAbortError,
  ImageKitInvalidRequestError,
  ImageKitProvider,
  ImageKitServerError,
  ImageKitUploadNetworkError,
  upload,
} from '@imagekit/next'
import { useRef, useState } from 'react'
import { Button } from './ui/button'
import { cn } from '@/lib/utils'
import { Upload } from 'lucide-react'
const authenticator = async () => {
  const res = await fetch(`${config.api.endpoint}/auth/imagekit`)
  if (!res.ok) {
    throw new Error('Authentication failed')
  }
  return res.json()
}

interface Props {
  variant?: 'dark' | 'light'
  fieldName: string
  value?: string
  onChange?: (value: string) => void
}

const FileUpload = ({
  variant = 'dark',
  fieldName,
  value,
  onChange,
  ...props
}: Props) => {
  const styles = {
    button:
      variant === 'dark'
        ? 'bg-dark-300'
        : 'bg-light-600 border-gray-100 border',
    placeholder: variant === 'dark' ? 'text-light-100' : 'text-slate-500',
    text: variant === 'dark' ? 'text-light-100' : 'text-dark-400',
  }

  const [isLoading, setIsLoading] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const abortControllerRef = useRef<AbortController | null>(null)
  const [file, setFile] = useState<File | undefined>()
  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const selectedFile = event.target.files?.[0]
    if (!selectedFile) return

    setFile(selectedFile)

    // Validate file
    if (selectedFile.size > 5 * 1024 * 1024) {
      console.error('File too large')
      return
    }
    if (!selectedFile.type.startsWith('image/')) {
      console.error('Invalid file type')
      return
    }

    setIsLoading(true)
    abortControllerRef.current = new AbortController()
    let authParams: any
    try {
      authParams = await authenticator()
    } catch (authError) {
      console.error('Authentication failed:', authError)
      setIsLoading(false)
      return
    }
    try {
      const uploadResponse = await upload({
        ...authParams,
        publicKey: config.imagekit.publicKey,
        file: selectedFile,
        fileName: selectedFile.name,
        abortSignal: abortControllerRef.current.signal,
        folder: 'bookify/university-cards',
      })
      onChange?.(uploadResponse.url!)
      console.log('Upload successful', uploadResponse)
    } catch (error) {
      if (error instanceof ImageKitAbortError)
        console.log('Upload aborted', error.reason)
      else if (error instanceof ImageKitInvalidRequestError)
        console.log('Invalid request', error.message)
      else if (error instanceof ImageKitUploadNetworkError)
        console.log('Network error', error.message)
      else if (error instanceof ImageKitServerError)
        console.error('Server error:', error.message)
      else if (error instanceof Error)
        console.error('Upload Error:', error.message)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <ImageKitProvider urlEndpoint={config.imagekit.urlEndpoint}>
      <div className=''>
        <input
          type='file'
          ref={fileInputRef}
          onChange={handleFileChange}
          style={{ display: 'none' }}
          accept='image/*'
          name={fieldName}
        />
        <Button
          type='button'
          onClick={() => fileInputRef.current?.click()}
          disabled={isLoading}
          className={cn('upload-btn', styles.button)}
        >
          <Upload />

          <p className='text-base text-lime-100'>Upload a File</p>
          {file && <p className='upload-filename'>{file.name}</p>}
        </Button>
        {value && (
          <Image
            className='object-cover aspect-square h-36 rounded-t-lg'
            width={500}
            height={300}
            src={value}
            alt='University card'
          />
        )}
      </div>
    </ImageKitProvider>
  )
}

export default FileUpload
