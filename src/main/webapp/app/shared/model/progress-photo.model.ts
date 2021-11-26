export interface IProgressPhoto {
  id?: number;
  note?: string | null;
  imageContentType?: string | null;
  image?: string | null;
  weightDate?: Date | null;
}

export class ProgressPhoto implements IProgressPhoto {
  constructor(
    public id?: number,
    public note?: string | null,
    public imageContentType?: string | null,
    public image?: string | null,
    public weightDate?: Date | null
  ) {}
}
