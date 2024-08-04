export default interface IServiceResponse<Data> {
  status: number,
  data: Data | { [key: string]: string }
}
