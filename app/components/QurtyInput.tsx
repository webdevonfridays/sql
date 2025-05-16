export interface QueryInputParam {
  columName: string;
  columType: string;
}
export default function QueryInput({ columName, columType }: QueryInputParam) {
  return (
    <div>
      <label htmlFor="columName">search by {columName}</label>
      <input type={columType} />
    </div>
  );
}
