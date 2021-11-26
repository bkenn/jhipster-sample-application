import { IMeasurementType } from '@/shared/model/measurement-type.model';

export interface IBodyMeasurement {
  id?: number;
  value?: number;
  bodyMeasurementDateTime?: Date | null;
  measurementType?: IMeasurementType | null;
}

export class BodyMeasurement implements IBodyMeasurement {
  constructor(
    public id?: number,
    public value?: number,
    public bodyMeasurementDateTime?: Date | null,
    public measurementType?: IMeasurementType | null
  ) {}
}
