export interface IImageGroup {
  fileName: string
  description: string
  uploadDate: Date
  uploadUser: string
  instances: IImageInstance[] 
}

export interface IImageInstance {
  url: string
  fileSize: number
  formatName: string
  formatOrder: number
}
