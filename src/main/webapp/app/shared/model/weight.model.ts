import { IMeasurementType } from '@/shared/model/measurement-type.model';

export interface IWeight {
  id?: number;
  value?: number | null;
  weightDateTime?: Date | null;
  measurementType?: IMeasurementType | null;
}

export class Weight implements IWeight {
  constructor(
    public id?: number,
    public value?: number | null,
    public weightDateTime?: Date | null,
    public measurementType?: IMeasurementType | null
  ) {}
}
